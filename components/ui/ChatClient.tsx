"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const suggestions = [
  "מה זה Proof of Work?",
  "איך לשמור על ביטקוין בבטחה?",
  "מה זה Halving?",
  "למה יש רק 21 מיליון ביטקוין?",
  "מה ההבדל בין Hot ל-Cold Wallet?",
  "מה זה Lightning Network?",
];

const initialMessage: Message = {
  role: "assistant",
  text: "שלום! אני ישראביט 🤖\n\nאני כאן לעזור לך להבין ביטקוין, כלכלה, ומונחים פיננסיים — בפשטות ובעברית.\n\nשאל אותי כל שאלה שעל הלב!",
};

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text?: string) {
    const query = (text ?? input).trim();
    if (!query || loading) return;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: query }]);

    await new Promise((r) => setTimeout(r, 800));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: `⏳ ישראביט חושב...\n\n(חיבור ל-API יתווסף בקרוב. בינתיים — שאלה מצוינת: "${query}")`,
      },
    ]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full flex-1 max-w-[900px] mx-auto w-full px-4 md:px-8 py-8 gap-6">
      {/* Page header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
          <span className="text-3xl">🤖</span>
        </div>
        <h1 className="text-3xl font-black text-on-background tracking-tight">
          ישראביט <span className="text-primary">AI</span>
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          שאל כל שאלה על ביטקוין, כלכלה, ומונחים פיננסיים — תשובה מיידית בעברית
        </p>
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/40 text-on-surface-variant hover:text-primary text-xs font-medium px-4 py-2 rounded-full transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
            >
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm ml-3 flex-shrink-0 mt-1">
                  🤖
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[75%] text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary/15 text-on-surface border border-primary/20"
                    : "bg-surface-container border border-outline-variant/20 text-on-surface"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm ml-3 flex-shrink-0">
              🤖
            </div>
            <div className="bg-surface-container border border-outline-variant/20 rounded-2xl px-4 py-3 flex gap-1 items-center">
              {[0, 0.15, 0.3].map((d, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.8, delay: d, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="glass-panel rounded-2xl p-3 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="שאל את ישראביט כל שאלה..."
          className="flex-1 bg-transparent text-on-surface text-sm placeholder-on-surface-variant outline-none px-2"
          disabled={loading}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="bg-primary hover:bg-primary-container text-on-primary font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center gap-2 text-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>send</span>
          שלח
        </button>
      </div>

      <p className="text-center text-xs text-on-surface-variant/50">
        ישראביט הוא כלי חינוכי בלבד — אין כאן ייעוץ פיננסי
      </p>
    </div>
  );
}
