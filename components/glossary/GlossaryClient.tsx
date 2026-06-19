"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Term {
  term: string;
  en?: string;
  definition: string;
  extended?: string;
  category: string;
}

const CATEGORIES = ["הכל", "יסודות", "טכנולוגיה", "אבטחה", "כלכלה"];

export default function GlossaryClient({ terms }: { terms: Term[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("הכל");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = terms.filter((t) => {
    const matchSearch =
      !search ||
      t.term.includes(search) ||
      t.en?.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.includes(search);
    const matchCat = category === "הכל" || t.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="חפש מונח..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#111118] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#F7931A]/40"
          dir="rtl"
        />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                category === cat
                  ? "bg-[#F7931A] text-white"
                  : "bg-[#111118] border border-[#1e1e2e] text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-gray-600 text-xs mb-5">{filtered.length} מונחים</p>

      {/* Terms */}
      <div className="space-y-2">
        {filtered.map((t) => (
          <div
            key={t.term}
            className="bg-[#111118] border border-[#1e1e2e] rounded-2xl overflow-hidden"
          >
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-right hover:bg-white/[0.02] transition-colors"
              onClick={() => setExpanded(expanded === t.term ? null : t.term)}
            >
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-white font-semibold text-sm">{t.term}</span>
                  {t.en && (
                    <span className="text-gray-600 text-xs mr-2 font-normal">{t.en}</span>
                  )}
                </div>
                <span className="text-[10px] bg-[#F7931A]/10 text-[#F7931A] px-2 py-0.5 rounded-full">
                  {t.category}
                </span>
              </div>
              <motion.span
                animate={{ rotate: expanded === t.term ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-600 text-xs ml-3 flex-shrink-0"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {expanded === t.term && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-[#1e1e2e]">
                    <p className="text-gray-300 text-sm leading-relaxed mt-4">{t.definition}</p>
                    {t.extended && (
                      <p className="text-gray-500 text-xs leading-relaxed mt-3">{t.extended}</p>
                    )}
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(
                            new CustomEvent("israbit-explain", { detail: t.term })
                          );
                        }
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 text-[#F7931A] text-xs font-semibold hover:underline"
                    >
                      🤖 בקש מישראביט להסביר בהרחבה
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <p className="text-4xl mb-3">🔍</p>
            <p>לא נמצאו מונחים עבור &ldquo;{search}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
