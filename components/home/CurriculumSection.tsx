"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const courses = [
  {
    icon: "school",
    title: "יסודות הביטקוין",
    description:
      "מבוא מקיף לרשת הביטקוין, היסטוריה של הכסף, קריפטוגרפיה בסיסית והבנת המנגנון הכלכלי.",
    href: "/learn",
    featured: false,
    tag: "מתחיל",
  },
  {
    icon: "account_balance",
    title: "ריבונות פיננסית",
    description:
      "אסטרטגיות החזקה ארוכות טווח, Cold Storage, ניהול סיכונים והבנת המאקרו-כלכלה של עידן הביטקוין.",
    href: "/learn",
    featured: true,
    tag: "פופולרי",
  },
  {
    icon: "security",
    title: "אבטחה דיגיטלית",
    description:
      "סדנה מעשית לאבטחת נכסים דיגיטליים, ארנקי חומרה, ניהול מפתחות פרטיים והגנה מפני מתקפות.",
    href: "/learn",
    featured: false,
    tag: "מתקדם",
  },
];

// ── 3D Tilt card ──────────────────────────────────────────────────────────────
function TiltCard({ children, featured }: { children: React.ReactNode; featured: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(rawX, [-1, 1], ["15%", "85%"]);
  const glowY = useTransform(rawY, [-1, 1], ["15%", "85%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left - r.width / 2) / (r.width / 2));
    rawY.set((e.clientY - r.top - r.height / 2) / (r.height / 2));
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glass-panel rounded-xl p-8 flex flex-col h-full relative overflow-hidden cursor-default select-none ${
        featured ? "border border-primary/30 glow-effect bg-gradient-to-br from-surface-container to-background" : ""
      }`}
    >
      {/* Dynamic spotlight that follows cursor */}
      <motion.div
        aria-hidden
        style={{ left: glowX, top: glowY }}
        className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none"
      />
      {children}
    </motion.div>
  );
}

export default function CurriculumSection() {
  return (
    <section className="py-28 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4"
        >
          <h2 className="text-[36px] font-bold text-on-background leading-tight tracking-tight">
            מסלולי הלימוד שלנו
          </h2>
          <p className="text-lg text-on-surface-variant max-w-[600px] mx-auto leading-relaxed">
            תוכניות הכשרה מקיפות המותאמות לרמות ידע שונות, מהבסיס ועד למומחיות טכנית.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <TiltCard featured={course.featured}>
                {/* Tag + corner glow */}
                {course.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-[11px] font-bold px-3 py-1 rounded-full z-20">
                    {course.tag}
                  </div>
                )}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full blur-2xl pointer-events-none transition-colors ${
                    course.featured ? "bg-primary/15" : "bg-primary/8"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 text-primary z-10 ${
                    course.featured
                      ? "bg-primary/20 border border-primary/50"
                      : "bg-surface-container-high border border-outline-variant/30"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {course.icon}
                  </span>
                </div>

                {!course.featured && (
                  <span className="absolute top-4 left-4 text-[11px] font-bold text-on-surface-variant border border-outline-variant/30 px-2 py-0.5 rounded-full">
                    {course.tag}
                  </span>
                )}

                <h3 className="text-xl font-bold text-on-background mb-3 z-10">{course.title}</h3>
                <p className="text-sm text-on-surface-variant flex-grow z-10 mb-6 leading-relaxed">{course.description}</p>

                <Link
                  href={course.href}
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all z-10 text-sm"
                >
                  למידע נוסף
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
