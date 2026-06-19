"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[820px] flex items-center justify-center px-4 md:px-8 py-28 overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-25 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-primary rounded-full blur-[130px] -translate-y-1/4 translate-x-1/4" />
      </div>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto text-center space-y-6">
        {/* Badge */}
        <motion.div {...fade(0.05)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container/50 backdrop-blur-sm">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>verified</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            חינוך ריבוני לעידן הדיגיטלי
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.15)}
          className="text-[clamp(48px,8vw,80px)] font-black leading-none tracking-tight text-on-background"
        >
          לשלוט בעתיד ה<span className="text-primary">פיננסים</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fade(0.25)}
          className="text-lg text-on-surface-variant max-w-[700px] mx-auto leading-relaxed"
        >
          הצטרפו לאקדמיה המובילה ללימודי ביטקוין. רכשו ידע מעמיק, הבנה טכנולוגית
          וכלים מעשיים לעצמאות כלכלית — בעברית, בפשטות, ללא שטויות.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.35)}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 glow-effect"
          >
            <span>התחל ללמוד</span>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_back</span>
          </Link>
          <Link
            href="/glossary"
            className="inline-flex items-center justify-center gap-2 border border-outline-variant hover:border-primary text-on-surface hover:text-primary font-bold text-lg px-8 py-4 rounded-full transition-all duration-200 bg-surface-container/30 backdrop-blur-sm"
          >
            <span>מילון מונחים</span>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>menu_book</span>
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          {...fade(0.45)}
          className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-on-surface-variant"
        >
          {["16 שיעורים חינמיים", "ישראביט AI 24/7", "ללא ייעוץ פיננסי", "מבוסס Bitcoin Standard"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-primary">✦</span>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
