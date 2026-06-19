"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "כל חיי חסכתי בשקלים ולא הבנתי למה הכסף נראה אותו דבר אבל קונה פחות. אחרי שלמדתי כאן על ביטקוין, הכל הפך ברור.",
    name: "דן לוי",
    role: "מהנדס תוכנה, תל אביב",
    avatar: "ד",
  },
  {
    quote: "ישראביט הסביר לי מה זה Proof of Work תוך דקה, בעברית פשוטה. לא הצלחתי להבין מיוטיוב כמה חודשים.",
    name: "מיכל שפירא",
    role: "מורה, ירושלים",
    avatar: "מ",
  },
  {
    quote: "המחשבון הראה לי שאם הייתי משקיע 500 שקל בחודש לפני 5 שנים — הייתי מרוויח פי 5. עכשיו אני מבין למה זה 'הזהב החדש'.",
    name: "אסף כהן",
    role: "איש עסקים, חיפה",
    avatar: "א",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">מה אומרים הלומדים שלנו</h2>
          <p className="text-gray-500">ישראלים שהפכו את הלמידה לפעולה</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="text-[#F7931A] text-2xl">&ldquo;</div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#1e1e2e]">
                <div className="w-9 h-9 rounded-full bg-[#F7931A]/15 border border-[#F7931A]/20 flex items-center justify-center text-[#F7931A] font-bold text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
