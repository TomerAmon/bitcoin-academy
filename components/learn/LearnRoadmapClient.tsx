"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Lesson {
  order: number;
  title: string;
  summary: string;
  duration: string;
  content: string[];
  keyPoints?: string[];
}

interface Level {
  num: string;
  label: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  textAccent: string;
  lessons: Lesson[];
}

export default function LearnRoadmapClient({ levels }: { levels: Level[] }) {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const toggleLesson = (key: string) => {
    setExpandedLesson(expandedLesson === key ? null : key);
  };

  return (
    <div className="space-y-12">
      {levels.map((level, li) => (
        <div
          key={level.num}
          className={`rounded-3xl border ${level.color} bg-[#111118] overflow-hidden`}
        >
          {/* Level header */}
          <div className="px-6 py-5 border-b border-[#1e1e2e] flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl ${level.accent} flex items-center justify-center text-[#0a0a0f] font-black text-sm flex-shrink-0`}>
              {level.num}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold ${level.textAccent}`}>{level.label}</span>
                <span className="text-gray-700 text-xs">·</span>
                <span className="text-gray-600 text-xs">{level.lessons.length} שיעורים</span>
              </div>
              <h2 className="text-lg font-bold text-white">{level.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{level.description}</p>
            </div>
          </div>

          {/* Lessons */}
          <div className="divide-y divide-[#1e1e2e]">
            {level.lessons.map((lesson) => {
              const key = `${level.num}-${lesson.order}`;
              const isOpen = expandedLesson === key;

              return (
                <div key={lesson.order}>
                  <button
                    className="w-full px-6 py-5 flex items-start gap-4 group hover:bg-white/[0.02] transition-colors text-right"
                    onClick={() => toggleLesson(key)}
                  >
                    <div className="w-7 h-7 rounded-full border border-[#2a2a3a] flex items-center justify-center text-xs text-gray-600 flex-shrink-0 mt-0.5">
                      {li * 4 + lesson.order}
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className={`font-semibold text-white text-sm mb-1 ${isOpen ? level.textAccent : ""} transition-colors`}>
                        {lesson.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{lesson.summary}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
                      <span className="text-gray-700 text-xs hidden sm:block">{lesson.duration}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`text-xs ${level.textAccent} opacity-60`}
                      >
                        ▼
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 border-t border-[#1e1e2e]">
                          <div className="pt-5 space-y-3 mr-11">
                            {lesson.content.map((para, pi) => (
                              <p key={pi} className="text-gray-400 text-sm leading-relaxed">
                                {para}
                              </p>
                            ))}
                            {lesson.keyPoints && (
                              <div className="mt-5">
                                <p className={`text-xs font-bold ${level.textAccent} mb-3`}>נקודות מפתח</p>
                                <ul className="space-y-2">
                                  {lesson.keyPoints.map((pt, pi) => (
                                    <li key={pi} className="flex items-start gap-2 text-xs text-gray-400">
                                      <span className={`${level.textAccent} flex-shrink-0 mt-0.5`}>✓</span>
                                      {pt}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
