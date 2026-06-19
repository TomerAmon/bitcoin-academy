"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqClient({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-[#111118] border border-[#1e1e2e] rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 hover:bg-white/[0.02] transition-colors"
          >
            <span className="font-semibold text-white text-sm leading-snug">{item.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[#F7931A] text-xl flex-shrink-0 font-light"
            >
              +
            </motion.span>
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-[#1e1e2e]">
                  <p className="text-gray-400 text-sm leading-relaxed mt-4 whitespace-pre-line">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
