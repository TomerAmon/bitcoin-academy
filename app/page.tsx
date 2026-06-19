import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BitcoinLogo from "@/components/ui/BitcoinLogo";
import HeroSection from "@/components/home/HeroSection";
import WhyBitcoinSection from "@/components/home/WhyBitcoinSection";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BitcoinVsGold from "@/components/home/BitcoinVsGold";
import NotCriminalMoney from "@/components/home/NotCriminalMoney";

const stats = [
  { label: "היצע מקסימלי — קבוע בקוד", value: "21M ₿" },
  { label: "זמינות הרשת מאז 2009", value: "99.98%" },
  { label: "ירידת ערך השקל מ-2020", value: "~30%" },
  { label: "הסמלים ב-Halving האחרון", value: "×0.5" },
];

const roadmapLevels = [
  {
    level: "01",
    label: "מתחיל",
    title: "כסף, אינפלציה ולמה השקל נשחק",
    description: "הבן את הבעיה לפני הפתרון.",
    color: "border-[#F7931A]/30 bg-[#F7931A]/5",
    accent: "text-[#F7931A]",
  },
  {
    level: "02",
    label: "בסיסי",
    title: "ביטקוין 101 — איך זה עובד",
    description: "Blockchain, כריה ועסקאות — בפשטות.",
    color: "border-amber-500/30 bg-amber-500/5",
    accent: "text-amber-400",
  },
  {
    level: "03",
    label: "מתקדם",
    title: "ריבונות פיננסית ואבטחה",
    description: "ארנקים, seed phrase, Cold Storage.",
    color: "border-yellow-500/30 bg-yellow-500/5",
    accent: "text-yellow-400",
  },
  {
    level: "04",
    label: "HODLER",
    title: "הכלכלה של ביטקוין",
    description: "Lightning, Layer 2 ועתיד הכסף.",
    color: "border-[#FFD700]/30 bg-[#FFD700]/5",
    accent: "text-[#FFD700]",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <HeroSection />

        {/* ─── Stats bar ─── */}
        <section className="bg-[#111118] border-y border-[#1e1e2e] py-10 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7931A]/3 via-transparent to-[#F7931A]/3 pointer-events-none" />
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center relative">
            {stats.map((s) => (
              <div key={s.label} className="group">
                <p className="text-3xl font-black text-[#F7931A] tabular-nums">{s.value}</p>
                <p className="text-xs text-gray-600 mt-1.5 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Why Bitcoin — alternating blocks ─── */}
        <WhyBitcoinSection />

        {/* ─── Savings calculator ─── */}
        <SavingsCalculator />

        {/* ─── Learning roadmap ─── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#F7931A]/10 text-[#F7931A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                מסלול הלמידה
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">4 רמות, הבנה אמיתית</h2>
              <p className="text-gray-500 text-lg">מהבסיס ועד הטכנולוגיה — כל שיעור בונה על הקודם</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roadmapLevels.map((lvl) => (
                <Link
                  key={lvl.level}
                  href="/learn"
                  className={`group rounded-2xl border p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform ${lvl.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${lvl.accent} opacity-60`}>{lvl.level}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvl.accent} border-current opacity-50`}>
                      {lvl.label}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-sm leading-snug group-hover:text-opacity-90">
                    {lvl.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{lvl.description}</p>
                  <span className={`text-xs font-semibold mt-auto ${lvl.accent} flex items-center gap-1`}>
                    למד ←
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/learn"
                className="inline-block bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-full border border-white/10 hover:border-white/20 transition-colors text-sm"
              >
                לכל מסלול הלמידה ←
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Bitcoin vs Gold ─── */}
        <BitcoinVsGold />

        {/* ─── Not criminal money ─── */}
        <NotCriminalMoney />

        {/* ─── Testimonials ─── */}
        <div className="bg-[#111118] border-y border-[#1e1e2e]">
          <TestimonialsSection />
        </div>

        {/* ─── IsraBit teaser ─── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#F7931A]/10 to-transparent border border-[#F7931A]/15 rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#F7931A]/10 border border-[#F7931A]/20 flex items-center justify-center text-4xl">
                🤖
              </div>
              <div className="flex-1 text-center sm:text-right">
                <h2 className="text-xl font-bold text-white mb-2">
                  ישראביט — המדריך האישי שלך
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  לחצו על כל מונח שאתם לא מבינים — ישראביט יסביר לכם אותו בעברית פשוטה. הוא זמין בכל עמוד, 24/7. אין שאלות טיפשיות — רק תשובות פשוטות.
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {["Proof of Work", "Halving", "Lightning Network", "Seed Phrase"].map((term) => (
                    <span
                      key={term}
                      className="bg-[#F7931A]/10 text-[#F7931A] text-xs font-medium px-3 py-1 rounded-full border border-[#F7931A]/20 cursor-pointer hover:bg-[#F7931A]/20 transition-colors"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="relative py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/30 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F7931A] opacity-[0.05] blur-[140px] rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-[#F7931A]/10 border border-[#F7931A]/20 text-[#F7931A] text-xs font-semibold px-4 py-2 rounded-full mb-8">
              <BitcoinLogo size={16} />
              הצטרפו עכשיו — חינמי לחלוטין
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              מוכנים לשמור
              <br />
              <span className="bg-gradient-to-l from-[#F7931A] to-[#FFD700] bg-clip-text text-transparent">
                על הערך שלכם?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              הצטרפו לאלפי ישראלים שלומדים, מבינים, ופועלים. השיעור הראשון חינמי תמיד.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/learn"
                className="group inline-flex items-center justify-center gap-2 bg-[#F7931A] hover:bg-[#e88010] text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all shadow-2xl shadow-orange-900/40 hover:shadow-orange-800/50 hover:scale-[1.02] w-full sm:w-auto"
              >
                לשיעור הראשון
                <span className="group-hover:translate-x-[-3px] transition-transform">←</span>
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-9 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto"
              >
                מילון מונחים
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
