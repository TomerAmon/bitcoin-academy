"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const facts = [
  {
    claim: "ביטקוין הוא כסף לפשע",
    reality: "פחות מ-0.34% מעסקאות הקריפטו ב-2023 היו קשורות לפעילות בלתי חוקית (Chainalysis, 2024). דולר נייר — פשוט להסתיר — הוא כלי ה-מספר-1 לפשע פיננסי.",
    icon: "🔍",
    source: "Chainalysis Crypto Crime Report 2024",
  },
  {
    claim: "ביטקוין אנונימי לחלוטין",
    reality: "ביטקוין הוא PSEUDONYMOUS, לא אנונימי. כל עסקה גלויה לכולם ב-Blockchain. משטרת ארה\"ב שחזרה מיליארד דולר מ-Silk Road בדיוק בגלל השקיפות הזו.",
    icon: "🔗",
    source: "DOJ v. Silk Road (2020) — $1B הוחזר",
  },
  {
    claim: "עברייני מס מסתירים ב-BTC",
    reality: "רשות המסים האמריקאית (IRS) וחברות כמו Chainalysis, Elliptic ו-TRM Labs מסוגלות לעקוב אחרי כל סנט בבלוקצ'יין. קשה יותר להסתתר ב-BTC מאשר בשקל מזומן.",
    icon: "🏛️",
    source: "IRS Criminal Investigation — 2023 Annual Report",
  },
  {
    claim: "ביטקוין רק כספי שחור",
    reality: "BlackRock, Fidelity, MicroStrategy, El Salvador, ו-ETF-ים מוסדרים ב-SEC. ביטקוין הפך לנכס מוסדי — הנחת הפשע הוחלפה בהנחת ה-hedge fund.",
    icon: "🏦",
    source: "BlackRock Bitcoin ETF — $20B AUM (2024)",
  },
];

const cashVsCrypto = [
  { label: "הלבנת הון עולמית (מזומן)", amount: "$800B-$2T בשנה", color: "text-red-400" },
  { label: "פשיעת קריפטו (כל המטבעות)", amount: "$24.2B ב-2023", color: "text-orange-400" },
  { label: "פשיעת ביטקוין בלבד", amount: "< 0.34% מהנפח", color: "text-[#F7931A]" },
];

export default function NotCriminalMoney() {
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
          <span className="inline-block bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            עובדות מול מיתוסים
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            "ביטקוין הוא כסף עברייני" — עובדות נגד
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            הטענה הזו מגיעה לרוב מאנשים שלא בדקו את הנתונים. הנה הנתונים.
          </p>
        </motion.div>

        {/* Cash vs Crypto scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 mb-8"
        >
          <h3 className="text-white font-semibold mb-4 text-sm">הכסף העברייני האמיתי בעולם</h3>
          <div className="space-y-3">
            {cashVsCrypto.map((item, i) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <span className="text-gray-400 text-sm">{item.label}</span>
                <span className={`font-bold text-sm ${item.color}`}>{item.amount}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-700 text-xs mt-4">מקורות: UNODC World Drug Report, Chainalysis Crypto Crime Report 2024</p>
        </motion.div>

        {/* Fact cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.claim}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
              className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{fact.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20 line-through opacity-70">
                      {fact.claim}
                    </span>
                    <span className="text-green-400 text-xs">✗ שקר</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{fact.reality}</p>
                  <p className="text-gray-600 text-xs">📎 {fact.source}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transparency highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/15 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">🔎</span>
            <div>
              <h3 className="text-white font-bold mb-2">הפרדוקס: ביטקוין הוא הנכס השקוף ביותר שיש</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                כל עסקה ביטקוין נשמרת לנצח ב-Blockchain הציבורי — גלויה לכל אחד. עם כלי ניתוח כמו Chainalysis, רשויות החוק מסוגלות לעקוב אחרי BTC <span className="text-white font-semibold">טוב יותר ממזומן</span>. מכל הדרכים להלבין כסף — ביטקוין היא אחת ה<span className="text-white font-semibold">גרועות</span> עבור פושעים.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
