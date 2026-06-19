"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PlaylistItem {
  order: number;
  title: string;
  duration: string;
  status: "current" | "completed" | "locked";
}

interface Lesson {
  title: string;
  description: string;
  course: string;
  duration: string;
  progress: string;
  content: string[];
  keyPoints: string[];
}

export default function LessonClient({
  lesson,
  playlist,
}: {
  lesson: Lesson;
  playlist: PlaylistItem[];
}) {
  const [playing, setPlaying] = useState(false);
  const progressPct = `${Math.round(
    (parseTime(lesson.progress) / parseTime(lesson.duration)) * 100
  )}%`;

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-10 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-on-surface-variant mb-6 text-xs font-bold uppercase tracking-widest">
        <Link href="/learn" className="hover:text-primary transition-colors">
          קורסים
        </Link>
        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>chevron_left</span>
        <span className="text-primary">{lesson.course}</span>
        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>chevron_left</span>
        <span className="text-on-surface">{lesson.title.split(":")[0]}</span>
      </div>

      {/* Video + Playlist grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Video player — 8 cols */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div
            className="relative w-full aspect-video rounded-xl overflow-hidden card-level-1 glow-primary group cursor-pointer"
            onClick={() => setPlaying((p) => !p)}
          >
            {/* Poster gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-background" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="material-symbols-outlined opacity-10"
                style={{ fontSize: "160px", color: "#ffb874" }}
              >
                currency_bitcoin
              </span>
            </div>

            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/50 hover:bg-primary/40 transition-colors"
              >
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
                >
                  {playing ? "pause" : "play_arrow"}
                </span>
              </motion.button>
            </div>

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              {/* Progress bar */}
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-primary relative"
                  style={{ width: progressPct }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,184,116,0.8)]" />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-on-surface">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" style={{ fontSize: "20px" }}>
                    {playing ? "pause" : "play_arrow"}
                  </span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" style={{ fontSize: "20px" }}>
                    volume_up
                  </span>
                  <span className="text-on-surface-variant">
                    {lesson.progress} / {lesson.duration}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" style={{ fontSize: "20px" }}>
                    closed_caption
                  </span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" style={{ fontSize: "20px" }}>
                    settings
                  </span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" style={{ fontSize: "20px" }}>
                    fullscreen
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson header */}
          <div className="flex justify-between items-start pt-4 border-t border-outline-variant/30">
            <div className="flex-1 ml-4">
              <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2 leading-tight tracking-tight">
                {lesson.title}
              </h1>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">
                {lesson.description}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="p-2.5 rounded-full bg-surface-container hover:bg-surface-bright transition-colors border border-outline-variant/20">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>bookmark</span>
              </button>
              <button className="p-2.5 rounded-full bg-surface-container hover:bg-surface-bright transition-colors border border-outline-variant/20">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Playlist sidebar — 4 cols */}
        <div className="lg:col-span-4 bg-glass rounded-xl p-6 flex flex-col max-h-[600px]">
          <div className="mb-6 border-b border-outline-variant/30 pb-4">
            <h2 className="text-lg font-bold text-on-surface">{lesson.course}</h2>
            <span className="text-sm text-on-surface-variant mt-1 block">
              {playlist.length} שיעורים • {lesson.duration} שעות
            </span>
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-grow flex flex-col gap-2 pl-1">
            {playlist.map((item) => (
              <div
                key={item.order}
                className={`p-4 rounded-lg flex gap-4 cursor-pointer relative overflow-hidden group transition-colors ${
                  item.status === "current"
                    ? "bg-primary/10 border border-primary/30"
                    : item.status === "locked"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-surface-container border border-transparent hover:border-outline-variant/20"
                }`}
              >
                {item.status === "current" && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-r-lg" />
                )}

                {/* Thumbnail placeholder */}
                <div className="w-20 h-14 bg-surface-container rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.status === "locked" ? (
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>lock</span>
                  ) : item.status === "current" ? (
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>equalizer</span>
                  ) : (
                    <span
                      className="material-symbols-outlined text-tertiary"
                      style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <h3
                    className={`text-sm font-bold mb-1 truncate ${
                      item.status === "current" ? "text-primary" : "text-on-surface group-hover:text-primary transition-colors"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {item.status === "current"
                      ? `מתנגן כעת • ${item.duration}`
                      : item.status === "completed"
                      ? "הושלם ✓"
                      : item.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div className="max-w-[760px] mx-auto bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-outline-variant/20">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}
          >
            description
          </span>
          <h2 className="text-2xl font-bold text-on-surface">סיכום ומקורות</h2>
        </div>

        <div className="space-y-5 text-sm text-on-surface-variant leading-relaxed">
          {lesson.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Key points */}
        {lesson.keyPoints.length > 0 && (
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>lightbulb</span>
              נקודות מפתח
            </p>
            <ul className="space-y-3">
              {lesson.keyPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5" style={{ fontSize: "16px" }}>
                    check_circle
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-outline-variant/20">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-bold">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            שיעור קודם
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform glow-effect text-sm">
            שיעור הבא
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function parseTime(t: string): number {
  const [m, s] = t.split(":").map(Number);
  return m * 60 + s;
}
