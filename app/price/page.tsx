import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PriceStats from "@/components/price/PriceStats";
import AssetComparisonChart from "@/components/charts/AssetComparisonChart";
import StockToFlowChart from "@/components/charts/StockToFlowChart";
import PowerLawChart from "@/components/charts/PowerLawChart";
import { getBitcoinPrice, getMempoolData } from "@/lib/bitcoin-data";

export const revalidate = 60;

export default async function PricePage() {
  const [price, mempool] = await Promise.all([
    getBitcoinPrice().catch(() => null),
    getMempoolData().catch(() => null),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 pb-12 px-4 border-b border-[#1e1e2e] bg-gradient-to-b from-[#F7931A]/5 to-transparent">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-[#111118] border border-[#F7931A]/20 text-[#F7931A] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#F7931A] rounded-full animate-pulse" />
              נתונים חיים
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">מחיר ביטקוין ומודלים</h1>
            <p className="text-gray-400 text-lg">
              מחיר חי, ניתוח S2F, Power Law, והשוואה לזהב ולדולר
            </p>
          </div>
        </section>

        {/* Live stats */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <PriceStats initialPrice={price} initialMempool={mempool} />
          </div>
        </section>

        {/* Charts section */}
        <section className="py-4 px-4 space-y-8">
          <div className="max-w-5xl mx-auto space-y-8">

            {/* BTC vs Gold vs USD */}
            <div>
              <SectionLabel
                tag="השוואת נכסים"
                title="ביטקוין מול זהב מול דולר"
                desc="השוואת ביצועים נורמלזים מ-2012. ציר Y לוגריתמי מדגיש את הפערים."
              />
              <AssetComparisonChart />
            </div>

            {/* Stock-to-Flow */}
            <div>
              <SectionLabel
                tag="מודל S2F"
                title="Stock-to-Flow — נדירות כמנוע ערך"
                desc="כל Halving מכפיל את יחס ה-SF ומנבא עלייה במחיר לפי המודל של Plan B."
              />
              <StockToFlowChart />
            </div>

            {/* Power Law */}
            <div>
              <SectionLabel
                tag="חוק החזקה"
                title="Power Law — מגמה בסקאלה לוגריתמית"
                desc='מחיר ביטקוין על ציר לוגריתמי מציג מגמת צמיחה עקבית מאז 2009. התנודות הן "רעש" בתוך ערוץ מובנה.'
              />
              <PowerLawChart />
            </div>
          </div>
        </section>

        {/* Context section */}
        <section className="py-12 px-4 border-t border-[#1e1e2e] mt-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">הקשר: ביטקוין מול שקל</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <ContextCard icon="📉" title="השקל נשחק"
                body="מאז 2020, כוח הקנייה של השקל ירד בכ-30% בשל אינפלציה והדפסת כסף." />
              <ContextCard icon="₿" title="ביטקוין נדיר"
                body="21 מיליון מטבעות לנצח. ככל שהביקוש גדל וההיצע קבוע — המחיר עולה לאורך זמן." />
              <ContextCard icon="⚡" title="גידול היסטורי"
                body="ביטקוין עלה מ-$0.01 ב-2010 לעשרות אלפי דולרים — למרות תנודות עצומות בדרך." />
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="pb-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-gray-700 text-xs text-center border border-[#1e1e2e] rounded-xl px-6 py-4">
              הנתונים והמודלים המוצגים הם לצורך מידע חינוכי בלבד ואינם מהווים ייעוץ פיננסי. מודלים כמו S2F ו-Power Law הם כלים אנליטיים ולא ערובות לביצועים עתידיים. יש להתייעץ עם איש מקצוע לפני השקעה.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionLabel({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="mb-4">
      <span className="inline-block bg-[#F7931A]/10 text-[#F7931A] text-xs font-semibold px-3 py-1 rounded-full mb-2">
        {tag}
      </span>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-gray-500 text-sm mt-1">{desc}</p>
    </div>
  );
}

function ContextCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6">
      <span className="text-2xl block mb-3">{icon}</span>
      <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
    </div>
  );
}
