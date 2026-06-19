"use client";

import { motion } from "framer-motion";

const COMPANIES = ["BINANCE", "COINBASE", "KRAKEN", "LEDGER", "TREZOR", "STRIKE", "BITFINEX"];

export default function TrustSection() {
  return (
    <section className="py-12 border-y border-outline-variant/20 bg-surface-container-lowest/50 backdrop-blur-sm overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center mb-8">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
          המידע מבוסס על המקורות האמינים ביותר בתעשייה
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {/* Duplicate for seamless loop */}
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-xl md:text-2xl font-black tracking-tighter text-on-surface/40 hover:text-primary transition-colors duration-300 cursor-default select-none"
            >
              <span className="text-primary/30 text-sm">✦</span>
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
