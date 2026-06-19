"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

// ── Deterministic particles (avoids SSR/hydration mismatch) ──────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  x: ((i * 73 + 17) % 96) + 2,
  y: ((i * 47 + 31) % 80) + 5,
  size: (i % 3) * 0.6 + 1,
  dur: 5 + (i % 5),
  del: (i * 0.38) % 4,
  opacity: 0.15 + (i % 4) * 0.08,
}));

// ── Stat cards shown below CTAs ───────────────────────────────────────────────
const STATS = [
  { icon: "currency_bitcoin", label: "היצע מקסימלי", value: "21,000,000" },
  { icon: "timer", label: "בלוק ממוצע", value: "~10 דקות" },
  { icon: "verified_user", label: "זמינות רשת", value: "99.98%" },
];

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

// ── ₿ with rotating ring + breathing glow ────────────────────────────────────
function BitcoinOrb() {
  return (
    <span className="relative inline-flex items-center justify-center mx-1">
      {/* Outer slow-rotating dashed ring */}
      <motion.span
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border-2 border-dashed border-primary/25 pointer-events-none"
        style={{ width: "1.45em", height: "1.45em" }}
      />
      {/* Inner fast-rotating solid arc */}
      <motion.span
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border-2 border-transparent pointer-events-none"
        style={{
          width: "1.2em",
          height: "1.2em",
          borderTopColor: "rgba(255,184,116,0.6)",
          borderRightColor: "rgba(255,184,116,0.15)",
        }}
      />
      {/* Breathing glow blob */}
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full bg-primary blur-lg pointer-events-none"
        style={{ width: "0.9em", height: "0.9em" }}
      />
      {/* The symbol */}
      <motion.span
        animate={{
          filter: [
            "drop-shadow(0 0 12px rgba(255,184,116,0.4))",
            "drop-shadow(0 0 32px rgba(255,184,116,0.85))",
            "drop-shadow(0 0 12px rgba(255,184,116,0.4))",
          ],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 text-primary"
      >
        ₿
      </motion.span>
    </span>
  );
}

// ── Mouse-parallax glow ───────────────────────────────────────────────────────
function ParallaxGlow() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 18 });
  const y = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX - window.innerWidth / 2) * 0.04);
      my.set((e.clientY - window.innerHeight / 2) * 0.04);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      style={{ x, y }}
      aria-hidden
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-[700px] h-[700px] bg-primary rounded-full blur-[150px] opacity-[0.18]" />
    </motion.div>
  );
}

// ── Floating particles ────────────────────────────────────────────────────────
function Particles() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -90], opacity: [0, p.opacity, 0] }}
          transition={{
            duration: p.dur,
            delay: p.del,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Small stat card ───────────────────────────────────────────────────────────
function StatCard({ icon, label, value, delay }: { icon: string; label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="flex items-center gap-3 glass-panel rounded-xl px-4 py-3 cursor-default"
    >
      <span
        className="material-symbols-outlined text-primary"
        style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <div className="text-right">
        <p className="text-xs text-on-surface-variant leading-none mb-0.5">{label}</p>
        <p className="text-sm font-black text-on-surface">{value}</p>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-[880px] flex items-center justify-center px-4 md:px-8 py-28 overflow-hidden">
      <ParallaxGlow />
      <Particles />

      {/* Static dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Edge vignette */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#0a0a0f_100%)]" />

      <div className="relative z-10 max-w-[1000px] mx-auto text-center space-y-6">
        {/* Badge */}
        <motion.div {...fade(0.05)}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container/50 backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "15px" }}>verified</span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              חינוך ריבוני לעידן הדיגיטלי
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.15)}
          className="text-[clamp(52px,9vw,88px)] font-black leading-none tracking-tight text-on-background flex flex-wrap items-center justify-center gap-x-3"
        >
          <span>הזהב</span>
          <BitcoinOrb />
          <span>החדש</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fade(0.25)} className="text-xl text-on-surface-variant max-w-[680px] mx-auto leading-relaxed font-medium">
          בוא ללמוד על הנכס שיצור מערכת פיננסית חדשה והוגנת,
          הבינו לעומק כיצד הוא עובד!
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.35)} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-bold text-lg px-8 py-4 rounded-full glow-effect"
            >
              <span>התחל ללמוד</span>
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_back</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 border border-outline-variant hover:border-primary text-on-surface hover:text-primary font-bold text-lg px-8 py-4 rounded-full bg-surface-container/30 backdrop-blur-sm transition-colors"
            >
              <span>שאל את ישראביט AI</span>
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>smart_toy</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stat cards */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={0.5 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
