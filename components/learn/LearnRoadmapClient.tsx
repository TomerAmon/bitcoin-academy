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

const LEVEL_ICONS = ["school", "code", "security", "workspace_premium"];
const LEVEL_COLORS: Record<string, { border: string; bg: string; glow: string; text: string }> = {
  "01": { border: "border-[#F7931A]", bg: "bg-[#F7931A]", glow: "shadow-[0_0_30px_rgba(247,147,26,0.4)]", text: "text-[#F7931A]" },
  "02": { border: "border-amber-400", bg: "bg-amber-400", glow: "shadow-[0_0_30px_rgba(251,191,36,0.4)]", text: "text-amber-400" },
  "03": { border: "border-yellow-300", bg: "bg-yellow-300", glow: "shadow-[0_0_30px_rgba(253,224,71,0.4)]", text: "text-yellow-300" },
  "04": { border: "border-[#FFD700]", bg: "bg-[#FFD700]", glow: "shadow-[0_0_30px_rgba(255,215,0,0.4)]", text: "text-[#FFD700]" },
};

export default function LearnRoadmapClient({ levels }: { levels: Level[] }) {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [completedLessons] = useState<Set<string>>(new Set(["01-1"]));

  const toggle = (key: string) => setExpandedLesson((k) => (k === key ? null : key));

  return (
    <div className="relative">
      {/* Central vertical line */}
      <div className="absolute right-[28px] md:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F7931A] via-amber-400 to-[#FFD700] opacity-20 pointer-events-none md:translate-x-px" />

      <div className="space-y-20">
        {levels.map((level, li) => {
          const colors = LEVEL_COLORS[level.num] ?? LEVEL_COLORS["01"];
          const icon = LEVEL_ICONS[li] ?? "star";
          const totalLessons = level.lessons.length;
          const globalOffset = li * 4;

          return (
            <div key={level.num} className="relative">
              {/* Level milestone */}
              <div className="flex items-center gap-4 md:gap-6 mb-8 relative">
                {/* Node circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-14 h-14 rounded-full ${colors.bg} ${colors.glow} flex items-center justify-center text-[#0a0a0f] font-black text-lg shadow-xl`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "24px", fontVariationSettings: "'FILL' 1" }}
                    >
                      {icon}
                    </span>
                  </div>
                  {/* Connector dot */}
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${colors.bg} opacity-60`} />
                </div>

                {/* Level info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span
                      className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${colors.border} ${colors.text} bg-current/5`}
                      style={{ backgroundColor: "transparent" }}
                    >
                      {level.label}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {totalLessons} שיעורים
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-on-background leading-snug">
                    {level.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                    {level.description}
                  </p>
                </div>

                {/* Level number badge */}
                <div className={`hidden md:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-xl border ${colors.border} bg-surface-container`}>
                  <span className={`text-xl font-black ${colors.text}`}>{level.num}</span>
                </div>
              </div>

              {/* Lessons */}
              <div className="mr-[72px] space-y-3">
                {level.lessons.map((lesson, lessonIdx) => {
                  const key = `${level.num}-${lesson.order}`;
                  const isOpen = expandedLesson === key;
                  const isDone = completedLessons.has(key);
                  const globalNum = globalOffset + lesson.order;

                  return (
                    <div key={lesson.order} className="relative">
                      {/* Connector line from left */}
                      <div
                        className={`absolute -right-[28px] top-6 w-7 h-0.5 opacity-30`}
                        style={{ background: `linear-gradient(to left, transparent, ${colors.bg.includes("F7931A") ? "#F7931A" : colors.bg.includes("amber") ? "#fbbf24" : colors.bg.includes("yellow") ? "#fde047" : "#FFD700"})` }}
                      />
                      {/* Dot on the connector */}
                      <div
                        className={`absolute -right-[33px] top-[22px] w-3 h-3 rounded-full border-2 ${
                          isDone ? colors.bg : "bg-surface-container"
                        } ${colors.border}`}
                      />

                      <button
                        onClick={() => toggle(key)}
                        className={`w-full text-right rounded-xl border transition-all duration-200 group ${
                          isOpen
                            ? `${colors.border} bg-surface-container-high`
                            : "border-outline-variant/20 bg-surface-container hover:border-outline-variant/50 hover:bg-surface-container-high"
                        }`}
                      >
                        <div className="flex items-center gap-4 p-4">
                          {/* Lesson number */}
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                              isDone
                                ? `${colors.bg} text-[#0a0a0f]`
                                : isOpen
                                ? `border-2 ${colors.border} ${colors.text}`
                                : "border border-outline-variant/40 text-on-surface-variant"
                            }`}
                          >
                            {isDone ? (
                              <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>check</span>
                            ) : (
                              globalNum
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-right min-w-0">
                            <h3
                              className={`font-bold text-sm leading-snug transition-colors ${
                                isOpen ? colors.text : "text-on-surface group-hover:text-on-background"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-on-surface-variant mt-0.5 truncate leading-relaxed">
                              {lesson.summary}
                            </p>
                          </div>

                          {/* Duration + chevron */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="hidden sm:flex items-center gap-1 text-xs text-on-surface-variant">
                              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>schedule</span>
                              {lesson.duration}
                            </span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className={`material-symbols-outlined ${colors.text} opacity-60`}
                              style={{ fontSize: "18px" }}
                            >
                              expand_more
                            </motion.span>
                          </div>
                        </div>
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className={`border border-t-0 rounded-b-xl ${colors.border} bg-surface-container-high/50 p-5 space-y-3`}>
                              {lesson.content.map((para, pi) => (
                                <p key={pi} className="text-sm text-on-surface-variant leading-relaxed">
                                  {para}
                                </p>
                              ))}

                              {lesson.keyPoints && (
                                <div className="mt-5 pt-4 border-t border-outline-variant/20">
                                  <p className={`text-xs font-bold ${colors.text} mb-3 flex items-center gap-2`}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>lightbulb</span>
                                    נקודות מפתח
                                  </p>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {lesson.keyPoints.map((pt, pi) => (
                                      <li
                                        key={pi}
                                        className="flex items-start gap-2 text-xs text-on-surface bg-surface-container rounded-lg p-2.5 border border-outline-variant/20"
                                      >
                                        <span className={`${colors.text} flex-shrink-0 mt-0.5 material-symbols-outlined`} style={{ fontSize: "13px", fontVariationSettings: "'FILL' 1" }}>
                                          check_circle
                                        </span>
                                        {pt}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Level completion line to next */}
              {li < levels.length - 1 && (
                <div className="flex items-center gap-3 mr-[28px] mt-8 opacity-40">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-current to-transparent mr-[14px]" />
                </div>
              )}
            </div>
          );
        })}

        {/* End milestone */}
        <div className="flex items-center gap-4 relative">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#F7931A] to-[#FFD700] flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.5)] z-10">
            <span className="material-symbols-outlined text-[#0a0a0f] text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFD700] uppercase tracking-widest mb-1">יעד סופי</p>
            <h3 className="text-xl font-bold text-on-background">HODLER מוסמך</h3>
            <p className="text-sm text-on-surface-variant">הבנה מלאה של ביטקוין — מהיסוד ועד ריבונות פיננסית אמיתית.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
