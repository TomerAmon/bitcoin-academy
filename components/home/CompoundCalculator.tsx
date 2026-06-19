"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const PRESETS = [
  { label: "שמרני", rate: 25, desc: "25% שנתי" },
  { label: "מתון", rate: 60, desc: "60% שנתי" },
  { label: "היסטורי", rate: 100, desc: "100% שנתי (ממוצע 10Y)" },
];

function formatILS(n: number) {
  if (n >= 1_000_000) return `₪${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `₪${(n / 1_000).toFixed(0)}K`;
  return `₪${n.toFixed(0)}`;
}

function compound(principal: number, monthly: number, rate: number, years: number) {
  const r = rate / 100;
  const months = years * 12;
  const monthlyRate = Math.pow(1 + r, 1 / 12) - 1;
  let balance = principal;
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate) + monthly;
  }
  return balance;
}

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState(10_000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(10);
  const [rateIdx, setRateIdx] = useState(1);

  const rate = PRESETS[rateIdx].rate;
  const bankRate = 3;

  const btcResult = useMemo(() => compound(principal, monthly, rate, years), [principal, monthly, rate, years]);
  const bankResult = useMemo(() => compound(principal, monthly, bankRate, years), [principal, monthly, years]);
  const totalInvested = principal + monthly * 12 * years;
  const multiplier = btcResult / totalInvested;

  return (
    <section className="py-28 px-4 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container/50 mb-4">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>trending_up</span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">מחשבון ריבית דריבית</span>
          </div>
          <h2 className="text-[36px] font-bold text-on-background tracking-tight mb-3">
            מה היה קורה אם השקעת ב<span className="text-primary">ביטקוין</span>?
          </h2>
          <p className="text-on-surface-variant text-lg max-w-[560px] mx-auto leading-relaxed">
            ראו את כוח הריבית דריבית על נכס שצומח — לעומת פיקדון בנקאי.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs panel */}
          <div className="glass-panel rounded-2xl p-8 space-y-7">
            {/* Preset buttons */}
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3 block">
                תרחיש תשואה
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setRateIdx(i)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      rateIdx === i
                        ? "bg-primary text-on-primary glow-effect"
                        : "bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    <span className="block">{p.label}</span>
                    <span className="block text-[10px] font-normal opacity-80">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Principal */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  השקעה התחלתית
                </label>
                <span className="text-sm font-bold text-primary">₪{principal.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={500_000}
                step={1000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                <span>₪1,000</span>
                <span>₪500,000</span>
              </div>
            </div>

            {/* Monthly */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  תוספת חודשית
                </label>
                <span className="text-sm font-bold text-primary">₪{monthly.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10_000}
                step={100}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                <span>₪0</span>
                <span>₪10,000</span>
              </div>
            </div>

            {/* Years */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  תקופת השקעה
                </label>
                <span className="text-sm font-bold text-primary">{years} שנים</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                <span>שנה 1</span>
                <span>20 שנה</span>
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="flex flex-col gap-4">
            {/* Bitcoin result — big card */}
            <motion.div
              key={`${btcResult.toFixed(0)}`}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-2xl p-8 border border-primary/30 glow-effect flex-1 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-br-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl font-black text-primary">₿</span>
                  <span className="text-sm font-bold text-on-surface">ביטקוין — {PRESETS[rateIdx].desc}</span>
                  <span className="mr-auto bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30">
                    ×{multiplier.toFixed(1)}
                  </span>
                </div>

                <p className="text-5xl font-black text-on-surface mb-2 tracking-tight">
                  {formatILS(btcResult)}
                </p>
                <p className="text-on-surface-variant text-sm mb-6">ערך סופי משוער לאחר {years} שנים</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container rounded-xl p-3 border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant mb-1">סה"כ הושקע</p>
                    <p className="text-sm font-bold text-on-surface">{formatILS(totalInvested)}</p>
                  </div>
                  <div className="bg-surface-container rounded-xl p-3 border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant mb-1">רווח נקי</p>
                    <p className="text-sm font-bold text-tertiary">+{formatILS(btcResult - totalInvested)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bank comparison — small card */}
            <div className="glass-panel rounded-2xl p-5 flex items-center gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>account_balance</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-on-surface-variant mb-0.5">פיקדון בנקאי — 3% שנתי</p>
                <p className="text-lg font-bold text-on-surface">{formatILS(bankResult)}</p>
              </div>
              <div className="text-left flex-shrink-0">
                <p className="text-[10px] text-on-surface-variant mb-0.5">ביטקוין מול בנק</p>
                <p className="text-sm font-black text-primary">
                  ×{(btcResult / bankResult).toFixed(0)} יותר
                </p>
              </div>
            </div>

            <p className="text-[11px] text-on-surface-variant/50 text-center leading-relaxed px-2">
              * חישוב לצרכי המחשה בלבד. ביצועי עבר אינם ערובה לעתיד. אין כאן ייעוץ פיננסי.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
