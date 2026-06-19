"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function IsraBit() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text: "שלום! אני ישראביט 🤖\nשאל אותי כל שאלה על ביטקוין, כלכלה, או מונח שאתה לא מכיר — אסביר לך בפשטות.",
    },
  ]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "assistant", text: "⏳ ישראביט חושב... (מענה AI יתווסף בקרוב)" },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 bg-[#111118] border border-[#1e1e2e] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e2e] bg-[#0d0d14]">
              <span className="text-xl">🤖</span>
              <div>
                <p className="text-white text-sm font-bold leading-none">ישראביט</p>
                <p className="text-[10px] text-[#F7931A] mt-0.5">המדריך שלך לביטקוין</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mr-auto text-gray-600 hover:text-white transition-colors text-lg leading-none"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto max-h-72 p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                  <p
                    className={`text-xs leading-relaxed rounded-xl px-3 py-2 max-w-[90%] whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-[#F7931A]/15 text-white"
                        : "bg-[#1e1e2e] text-gray-300"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-[#1e1e2e] p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="שאל את ישראביט..."
                className="flex-1 bg-[#1e1e2e] text-white text-xs rounded-lg px-3 py-2 placeholder-gray-600 outline-none border border-transparent focus:border-[#F7931A]/40 transition-colors"
              />
              <button
                onClick={handleSend}
                className="bg-[#F7931A] hover:bg-[#e07b10] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                aria-label="שלח"
              >
                ←
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#F7931A] hover:bg-[#e07b10] text-white rounded-full shadow-xl shadow-orange-900/40 flex items-center justify-center text-2xl transition-colors"
        aria-label="פתח את ישראביט"
      >
        {open ? "×" : "🤖"}
      </motion.button>
    </div>
  );
}
