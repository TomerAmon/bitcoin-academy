"use client";

import { motion } from "framer-motion";

const highlights = [
  { icon: "check_circle", text: "תוכן חינמי לחלוטין — ללא תשלום, ללא הרשמה." },
  { icon: "check_circle", text: "מבוסס על Bitcoin Standard, Grokking Bitcoin ו-Bitcoin.org." },
  { icon: "check_circle", text: "מוסבר בעברית פשוטה, בלי ז'רגון מיותר." },
];

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function BentoWhyUs() {
  return (
    <section className="py-28 bg-surface-container-lowest relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[240px]">
          {/* Large highlight card — 8 cols, 2 rows */}
          <motion.div
            {...enter(0)}
            className="md:col-span-8 md:row-span-2 glass-panel rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden border border-outline-variant/40 bg-gradient-to-br from-surface-container-high/50 to-background min-h-[340px]"
          >
            <div aria-hidden className="absolute bottom-0 right-0 opacity-[0.07] pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: "200px", fontVariationSettings: "'FILL' 1" }}>
                groups
              </span>
            </div>
            <div className="relative z-10 max-w-[560px]">
              <h2 className="text-[36px] font-bold text-on-background mb-6 leading-tight tracking-tight">
                למה הזהב החדש?
              </h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                האתר נבנה כדי שכל ישראלי יוכל להבין מה זה ביטקוין באמת — לא שיווק,
                לא הבטחות תשואה. רק הסבר ישר ומבוסס על העובדות הכלכליות והטכניות.
              </p>
              <ul className="space-y-4">
                {highlights.map((h, i) => (
                  <motion.li
                    key={h.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "22px" }}>
                      {h.icon}
                    </span>
                    <span className="text-on-surface font-bold text-sm">{h.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Small card 1 — 4 cols, 1 row */}
          <motion.div
            {...enter(0.1)}
            whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(247,147,26,0.2)" }}
            className="md:col-span-4 md:row-span-1 glass-panel rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-outline-variant/30 hover:border-primary/50 transition-colors"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="material-symbols-outlined text-4xl text-primary mb-4 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </motion.span>
            <h3 className="text-xl font-bold text-on-background">ידע עצמאי</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              לא תלוי בבנק, ביועץ השקעות או בגורם שלישי.
            </p>
          </motion.div>

          {/* Small card 2 — 4 cols, 1 row */}
          <motion.div
            {...enter(0.2)}
            whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(247,147,26,0.2)" }}
            className="md:col-span-4 md:row-span-1 glass-panel rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-outline-variant/30 hover:border-primary/50 transition-colors bg-surface-container-high/20"
          >
            <motion.span
              animate={{ scaleY: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="material-symbols-outlined text-4xl text-primary mb-4 inline-block"
            >
              terminal
            </motion.span>
            <h3 className="text-xl font-bold text-on-background">קריאה בקצב שלך</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              כל השיעורים פתוחים תמיד — תתקדם מתי שנוח לך.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
