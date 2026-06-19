"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PriceData {
  usd: number;
  ils: number;
  usd_24h_change: number;
}

function fmtUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
function fmtILS(n: number) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(n);
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// ─── Price card ──────────────────────────────────────────────────────────────
function PriceCard({ price }: { price: PriceData | null }) {
  const isPos = (price?.usd_24h_change ?? 0) >= 0;
  const pct = Math.abs(price?.usd_24h_change ?? 0).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[380px] mx-auto lg:mx-0"
    >
      {/* Gradient border wrapper */}
      <div className="relative p-px rounded-3xl bg-gradient-to-br from-[#F7931A]/40 via-[#FFD700]/15 to-[#F7931A]/5 shadow-2xl shadow-orange-950/50">
        {/* Card body */}
        <div className="relative bg-[#0d0d14] rounded-[calc(1.5rem-1px)] overflow-hidden">
          {/* Inner glow */}
          <div className="absolute -top-24 -right-16 w-56 h-56 bg-[#F7931A] opacity-[0.07] blur-[60px] rounded-full pointer-events-none" />
          {/* Dot grid inside card */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#1e1e2e 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative p-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange-700/40">
                  ₿
                </div>
                <span className="text-white font-bold text-sm">Bitcoin</span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Price */}
            {price ? (
              <>
                <div className="mb-1">
                  <p className="text-4xl font-black text-white tracking-tight leading-none">
                    {fmtUSD(price.usd)}
                  </p>
                  <p className="text-gray-500 text-sm mt-1.5">{fmtILS(price.ils)}</p>
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${
                      isPos
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {isPos ? "▲" : "▼"} {pct}% היום
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="h-10 w-48 bg-[#1e1e2e] rounded-xl animate-pulse mb-2" />
                <div className="h-4 w-28 bg-[#1e1e2e] rounded-lg animate-pulse" />
                <div className="h-7 w-24 bg-[#1e1e2e] rounded-xl animate-pulse mt-4" />
              </>
            )}

            {/* Divider */}
            <div className="h-px bg-gradient-to-l from-[#F7931A]/20 via-[#1e1e2e] to-transparent my-5" />

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "היצע כולל", value: "21M", sub: "מקסימום" },
                { label: "כרוי", value: "19.7M", sub: "עד כה" },
                { label: "Halving", value: "3.125", sub: "BTC/בלוק" },
              ].map((s) => (
                <div key={s.label} className="bg-[#111118] rounded-xl p-2.5 border border-[#1e1e2e]">
                  <p className="text-[#F7931A] font-bold text-sm leading-none mb-1">{s.value}</p>
                  <p className="text-gray-600 text-[10px]">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative badges floating around card */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -left-6 bg-[#111118] border border-[#F7931A]/25 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#F7931A] shadow-lg shadow-orange-950/30"
      >
        ₿ 21,000,000
      </motion.div>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-4 bg-[#111118] border border-emerald-500/20 rounded-full px-3 py-1.5 text-[11px] font-semibold text-emerald-400 shadow-lg"
      >
        ✓ 99.98% uptime
      </motion.div>
    </motion.div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [price, setPrice] = useState<PriceData | null>(null);

  useEffect(() => {
    fetch("/api/bitcoin-price")
      .then((r) => r.json())
      .then(setPrice)
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* ── Background system ── */}
      {/* Base dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1e1e2e 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Main orange orb — upper right */}
      <div className="absolute -top-40 right-0 w-[700px] h-[600px] bg-[#F7931A] opacity-[0.065] blur-[140px] rounded-full pointer-events-none" />
      {/* Gold orb — lower left */}
      <div className="absolute bottom-0 left-1/4 w-96 h-80 bg-[#FFD700] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      {/* Subtle blue accent — far bottom-right */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-700 opacity-[0.04] blur-[80px] rounded-full pointer-events-none" />
      {/* Top edge fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />
      {/* Bottom edge fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />

      {/* ── Content grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-8 items-center">
        {/* ── Left column: Text (appears on RIGHT in RTL) ── */}
        <div className="flex flex-col">
          {/* Badge */}
          <motion.div {...fade(0.05)} className="mb-7">
            <span className="inline-flex items-center gap-2 bg-[#111118] border border-[#F7931A]/25 text-[#F7931A] text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-orange-950/30">
              <span className="w-1.5 h-1.5 bg-[#F7931A] rounded-full animate-pulse" />
              פלטפורמה חינוכית לישראלים — חינמי לחלוטין
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-7 space-y-1">
            <motion.p
              {...fade(0.15)}
              className="text-gray-400 text-xl sm:text-2xl font-medium"
            >
              כשהשקל מאבד ערך כל שנה —
            </motion.p>

            <motion.h1
              {...fade(0.25)}
              className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight"
            >
              <span className="bg-gradient-to-l from-[#F7931A] to-[#FFD700] bg-clip-text text-transparent">
                הזהב החדש
              </span>
            </motion.h1>

            <motion.p
              {...fade(0.35)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              שומר על הערך שלך
            </motion.p>
          </div>

          {/* Body */}
          <motion.p
            {...fade(0.45)}
            className="text-gray-400 text-lg leading-relaxed max-w-lg mb-9"
          >
            למד מדוע ביטקוין הוא המענה לאינפלציה, להדפסת כסף ולאובדן ריבונות
            פיננסית — בעברית, בפשטות, בלי שטויות.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fade(0.55)}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <Link
              href="/learn"
              className="group relative inline-flex items-center justify-center gap-2 bg-[#F7931A] hover:bg-[#e88010] text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-orange-900/40 hover:shadow-orange-800/50 hover:scale-[1.02] active:scale-[0.99]"
            >
              <span>התחל ללמוד חינם</span>
              <span className="text-white/70 group-hover:translate-x-[-3px] transition-transform">←</span>
            </Link>
            <Link
              href="/price"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              מחיר ומודלים ↗
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            {...fade(0.65)}
            className="flex flex-wrap gap-4 text-xs text-gray-600"
          >
            {[
              "16 שיעורים חינמיים",
              "ישראביט 24/7",
              "ללא ייעוץ פיננסי",
              "מבוסס Bitcoin Standard",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-[#F7931A] text-[10px]">✦</span>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: Price card (appears on LEFT in RTL) ── */}
        <div className="relative flex justify-center lg:justify-end items-center">
          {/* Large ambient glow behind card */}
          <div className="absolute inset-0 bg-[#F7931A] opacity-[0.04] blur-[80px] rounded-full scale-75 pointer-events-none" />
          <PriceCard price={price} />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-700"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gray-700 to-transparent"
        />
        <span className="text-[10px] font-medium tracking-widest uppercase">גלול</span>
      </motion.div>
    </section>
  );
}
