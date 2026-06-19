const highlights = [
  { icon: "check_circle", text: "מנטורים מומחים בעלי ניסיון מעשי מוכח." },
  { icon: "check_circle", text: "גישה לקהילת בוגרים סגורה ואיכותית." },
  { icon: "check_circle", text: "תוכן מבוסס Bitcoin Standard ו-Grokking Bitcoin." },
];

export default function BentoWhyUs() {
  return (
    <section className="py-28 bg-surface-container-lowest relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[240px]">
          {/* Large highlight card — 8 cols, 2 rows */}
          <div className="md:col-span-8 md:row-span-2 glass-panel rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden border border-outline-variant/40 bg-gradient-to-br from-surface-container-high/50 to-background min-h-[340px]">
            <div className="absolute bottom-0 right-0 opacity-[0.07] pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: "200px", fontVariationSettings: "'FILL' 1" }}>
                groups
              </span>
            </div>
            <div className="relative z-10 max-w-[560px]">
              <h2 className="text-[36px] font-bold text-on-background mb-6 leading-tight tracking-tight">
                למה ללמוד איתנו?
              </h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                אנו מספקים סביבה לימודית ברמה גבוהה, המשלבת ידע תיאורטי מעמיק עם
                פרקטיקה עדכנית. הקהילה שלנו מורכבת מאנשי מקצוע, משקיעים ויזמים
                הדוחפים את התעשייה קדימה.
              </p>
              <ul className="space-y-4">
                {highlights.map((h) => (
                  <li key={h.text} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "22px" }}>
                      {h.icon}
                    </span>
                    <span className="text-on-surface font-bold text-sm">{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Small card 1 — 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 glass-panel rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-outline-variant/30 hover:border-primary/50 transition-colors">
            <span
              className="material-symbols-outlined text-4xl text-primary mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <h3 className="text-xl font-bold text-on-background">הסמכה מקצועית</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              תעודה מוכרת בתעשייה בסיום המסלול.
            </p>
          </div>

          {/* Small card 2 — 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 glass-panel rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-outline-variant/30 hover:border-primary/50 transition-colors bg-surface-container-high/20">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              terminal
            </span>
            <h3 className="text-xl font-bold text-on-background">למידה מעשית</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              תרגולים וסימולציות חיות בסביבה בטוחה.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
