"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AMOUNTS = [500, 1000, 2000, 5000];
const PERIODS = [
  { label: "שנה אחת", years: 1, multiplier: 1.5 },
  { label: "3 שנים", years: 3, multiplier: 3.8 },
  { label: "5 שנים", years: 5, multiplier: 5.2 },
  { label: "10 שנים", years: 10, multiplier: 28 },
];

function formatILS(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M ₪`;
  if (n >= 1_000) return `${Math.round(n / 1000).toLocaleString("he-IL")}K ₪`;
  return `${n.toLocaleString("he-IL")} ₪`;
}

export default function SavingsCalculator() {
  const [amount, setAmount] = useState(1000);
  const [periodIdx, setPeriodIdx] = useState(1);

  const period = PERIODS[periodIdx];
  const totalInvested = amount * 12 * period.years;
  const currentValue = Math.round(totalInvested * period.multiplier);
  const profit = currentValue - totalInvested;
  const pct = Math.round((profit / totalInvested) * 100);

  return (
    <section className="py-20 px-4 bg-[#111118] border-y border-[#1e1e2e]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#F7931A]/10 text-[#F7931A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            מחשבון חיסכון
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            מה היה קורה אם...?
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            כמה שווה היה ה-BTC שלך היום, לו חסכת סכום קבוע כל חודש לפני X שנים.
            <span className="text-gray-700 block text-xs mt-1">*הערכה לצורך המחשה בלבד, לא ייעוץ פיננסי</span>
          </p>
        </div>

        <div className="bg-[#0a0a0f] rounded-3xl border border-[#1e1e2e] p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-3">
                  כמה ₪ לחודש?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        amount === a
                          ? "bg-[#F7931A] text-white shadow-lg shadow-orange-900/30"
                          : "bg-[#1e1e2e] text-gray-400 hover:text-white"
                      }`}
                    >
                      {a.toLocaleString("he-IL")} ₪
                    </button>
                  ))}
                </div>
              </div>

              {/* Period */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-3">
                  לפני כמה זמן התחלת?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {PERIODS.map((p, i) => (
                    <button
                      key={p.label}
                      onClick={() => setPeriodIdx(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        periodIdx === i
                          ? "bg-[#F7931A] text-white shadow-lg shadow-orange-900/30"
                          : "bg-[#1e1e2e] text-gray-400 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${amount}-${periodIdx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#111118] rounded-2xl border border-[#1e1e2e] p-6 text-center"
                >
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-1">השקעת סה״כ</p>
                    <p className="text-xl font-bold text-white">{formatILS(totalInvested)}</p>
                  </div>

                  <div className="w-full h-px bg-[#1e1e2e] mb-4" />

                  <div className="mb-2">
                    <p className="text-gray-500 text-sm mb-1">שווי ה-BTC שלך היום (בערך)</p>
                    <p className="text-4xl font-bold text-[#F7931A]">{formatILS(currentValue)}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-sm font-bold px-4 py-1.5 rounded-full mt-2">
                    <span>↑</span>
                    <span>+{formatILS(profit)} ({pct}%)</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
