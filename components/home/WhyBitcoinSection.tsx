"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const reasons = [
  {
    tag: "אספקה קבועה",
    headline: "21 מיליון ביטקוין — ולא יותר לנצח",
    body: "בעוד שהבנק המרכזי יכול להדפיס שקלים ללא הגבלה — ביטקוין קובע בקוד שאי פשר ליצור יותר מ-21 מיליון מטבעות. אי פעם. זו לא הבטחה של פוליטיקאי — זה מתמטיקה.",
    stat: "21,000,000",
    statLabel: "היצע מקסימלי — קבוע בקוד",
    href: "/learn",
    cta: "הבן את ההבדל",
    side: "right",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="32" r="30" stroke="#F7931A" strokeWidth="2" opacity="0.2" />
        <circle cx="32" cy="32" r="20" stroke="#F7931A" strokeWidth="1.5" opacity="0.4" />
        <text x="32" y="38" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#F7931A">₿</text>
      </svg>
    ),
  },
  {
    tag: "ריבונות פיננסית",
    headline: "Not your keys, not your coins",
    body: "בבנק, הכסף שלך הוא חוב של הבנק כלפיך. ביטקוין מאפשר לך להחזיק ערך ישירות — ללא גורם שלישי, ללא אפשרות להקפאת חשבון, ללא קריסת בנקים.",
    stat: "0",
    statLabel: "גורמי ביניים נדרשים",
    href: "/learn",
    cta: "למד על ארנקים",
    side: "left",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="12" y="28" width="40" height="28" rx="4" stroke="#F7931A" strokeWidth="2" opacity="0.4" />
        <path d="M20 28V20a12 12 0 0 1 24 0v8" stroke="#F7931A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="32" cy="42" r="4" fill="#F7931A" opacity="0.8" />
      </svg>
    ),
  },
  {
    tag: "גידור אינפלציה",
    headline: "כשהשקל נשחק — ביטקוין שומר",
    body: "מאז 2020 איבד השקל כ-30% מכוח הקנייה שלו. ביטקוין, לעומת זאת, נועד להיות נדיר יותר עם הזמן — כל 4 שנים ה-Halving מחצה את קצב הפקת מטבעות חדשים.",
    stat: "~30%",
    statLabel: "ירידת ערך השקל מ-2020",
    href: "/price",
    cta: "ראה נתונים חיים",
    side: "right",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <polyline points="8,48 20,36 30,42 44,20 56,8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <polyline points="8,52 20,44 30,46 44,28 56,12" stroke="#F7931A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="56" cy="12" r="3" fill="#F7931A" />
      </svg>
    ),
  },
];

function Block({ reason, index }: { reason: (typeof reasons)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = reason.side === "right";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex flex-col ${isRight ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16 py-16 md:py-20 border-b border-[#1e1e2e] last:border-0`}
    >
      {/* Visual */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <div className="relative mx-auto w-52 h-52 md:w-64 md:h-64">
          <div className="absolute inset-0 bg-[#F7931A]/5 rounded-3xl border border-[#F7931A]/10" />
          <div className="absolute inset-6">{reason.icon}</div>
          <div className="absolute bottom-4 inset-x-4 bg-[#0a0a0f]/80 rounded-xl px-4 py-2.5 border border-[#1e1e2e] text-center">
            <p className="text-2xl font-bold text-[#F7931A]">{reason.stat}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{reason.statLabel}</p>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 text-center md:text-right">
        <span className="inline-block bg-[#F7931A]/10 text-[#F7931A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {reason.tag}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
          {reason.headline}
        </h2>
        <p className="text-gray-400 leading-relaxed mb-6 text-base md:text-lg">
          {reason.body}
        </p>
        <Link
          href={reason.href}
          className="inline-flex items-center gap-2 text-[#F7931A] font-semibold hover:gap-3 transition-all text-sm"
        >
          {reason.cta} ←
        </Link>
      </div>
    </motion.div>
  );
}

export default function WhyBitcoinSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">למה ביטקוין?</h2>
        <p className="text-gray-500 text-lg">שלושה עקרונות שמשנים את כללי המשחק</p>
      </motion.div>

      <div>
        {reasons.map((reason, i) => (
          <Block key={reason.tag} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}
