import Link from "next/link";

const courses = [
  {
    icon: "school",
    title: "יסודות הביטקוין",
    description:
      "מבוא מקיף לרשת הביטקוין, היסטוריה של הכסף, קריפטוגרפיה בסיסית והבנת המנגנון הכלכלי העומד בבסיס המטבע.",
    href: "/learn",
    featured: false,
  },
  {
    icon: "account_balance",
    title: "ריבונות פיננסית",
    description:
      "אסטרטגיות החזקה ארוכות טווח, Cold Storage, ניהול סיכונים והבנת המאקרו-כלכלה של עידן הביטקוין.",
    href: "/learn",
    featured: true,
    badge: "פופולרי",
  },
  {
    icon: "security",
    title: "אבטחה דיגיטלית",
    description:
      "סדנה מעשית לאבטחת נכסים דיגיטליים, ארנקי חומרה, ניהול מפתחות פרטיים והגנה מפני מתקפות סייבר.",
    href: "/learn",
    featured: false,
  },
];

export default function CurriculumSection() {
  return (
    <section className="py-28 px-4 md:px-8 relative">
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-[36px] font-bold text-on-background leading-tight tracking-tight">
            מסלולי הלימוד שלנו
          </h2>
          <p className="text-lg text-on-surface-variant max-w-[600px] mx-auto leading-relaxed">
            תוכניות הכשרה מקיפות המותאמות לרמות ידע שונות, מהבסיס ועד למומחיות
            טכנית.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.title}
              className={`glass-panel p-8 rounded-xl hover:scale-[1.02] transition-transform duration-300 group flex flex-col h-full relative overflow-hidden ${
                course.featured
                  ? "border border-primary/30 glow-effect bg-gradient-to-br from-surface-container to-background"
                  : ""
              }`}
            >
              {/* Featured badge */}
              {course.featured && course.badge && (
                <div className="absolute top-4 left-4 bg-primary text-on-primary text-[11px] font-bold px-3 py-1 rounded-full z-20">
                  {course.badge}
                </div>
              )}

              {/* Corner glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full blur-2xl transition-all pointer-events-none ${
                  course.featured
                    ? "bg-primary/20 group-hover:bg-primary/30"
                    : "bg-primary/10 group-hover:bg-primary/20"
                }`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 text-primary z-10 transition-colors ${
                  course.featured
                    ? "bg-primary/20 border border-primary/50"
                    : "bg-surface-container-high border border-outline-variant/30 group-hover:bg-primary/10"
                }`}
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {course.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-on-background mb-3 z-10">{course.title}</h3>
              <p className="text-sm text-on-surface-variant flex-grow z-10 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* CTA */}
              <Link
                href={course.href}
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all z-10 text-sm"
              >
                למידע נוסף
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
