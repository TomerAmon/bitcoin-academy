"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const rows = [
  { trait: "היצע קבוע ומוכח", btc: "21M בדיוק — מקודד", gold: "לא ידוע, מוערך ~200K טון", btcWin: true },
  { trait: "ניידות", btc: "שולחים $1B בדקות", gold: "כבד, יקר לשינוע", btcWin: true },
  { trait: "חלוקה", btc: "עד 8 מקומות עשרוניים (סאטושי)", gold: "קשה, יקר לחתוך", btcWin: true },
  { trait: "אימות", btc: "קריפטוגרפי — מיידי", gold: "דרוש ציוד מיוחד", btcWin: true },
  { trait: "עמידות לצנזורה", btc: "לא ניתן לעצור עסקה", gold: "ניתן להחרים (היה ב-1933)", btcWin: true },
  { trait: "היסטוריה", btc: "15 שנה", gold: "5,000+ שנה", btcWin: false },
  { trait: "שווי שוק (2024)", btc: "~$2 טריליון", gold: "~$14 טריליון", btcWin: false },
  { trait: "תשואה 2012-2024", btc: "×7,307", gold: "×1.58", btcWin: true },
];

export default function BitcoinVsGold() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 px-4 bg-[#111118] border-y border-[#1e1e2e]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            ביטקוין מול זהב
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            הזהב החדש — לא מטפורה
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            ביטקוין עושה את כל מה שזהב עושה — ועוד. השוואה עובדתית.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="text-right py-3 px-4 text-gray-500 font-semibold w-1/3">מאפיין</th>
                <th className="text-center py-3 px-4 text-[#F7931A] font-bold">₿ ביטקוין</th>
                <th className="text-center py-3 px-4 text-[#FFD700] font-bold">🏅 זהב</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.trait}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                  className="border-b border-[#1e1e2e] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-4 text-gray-400">{row.trait}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 ${row.btcWin ? "text-white font-semibold" : "text-gray-500"}`}>
                      {row.btcWin && <span className="w-1.5 h-1.5 rounded-full bg-[#F7931A] flex-shrink-0" />}
                      {row.btc}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 ${!row.btcWin ? "text-white font-semibold" : "text-gray-500"}`}>
                      {!row.btcWin && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0" />}
                      {row.gold}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 bg-[#0a0a0f] border border-[#F7931A]/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5"
        >
          <div className="text-4xl">💡</div>
          <div className="flex-1 text-center sm:text-right">
            <p className="text-white font-semibold mb-1">אם שוק הזהב ישנה את ידיו לביטקוין</p>
            <p className="text-gray-400 text-sm">
              שוק הזהב שווה ~$14 טריליון. ביטקוין שווה כיום ~$2 טריליון. אם רק 10% מהזהב יעבור לביטקוין — המחיר יוכפל.
            </p>
          </div>
          <Link
            href="/price"
            className="flex-shrink-0 bg-[#F7931A]/10 hover:bg-[#F7931A]/20 text-[#F7931A] text-sm font-semibold px-5 py-2.5 rounded-full border border-[#F7931A]/20 transition-colors"
          >
            ראה נתוני שוק ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
