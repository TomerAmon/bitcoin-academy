import Link from "next/link";
import BitcoinLogo from "@/components/ui/BitcoinLogo";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-20 w-full">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-xl">
            <BitcoinLogo size={24} />
            הזהב החדש
          </div>
          <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed">
            © {new Date().getFullYear()} הזהב החדש. כל הזכויות שמורות.
            חינוך ריבוני לעידן הדיגיטלי — אין כאן ייעוץ פיננסי.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-on-surface text-sm">משפטי</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                מדיניות פרטיות
              </a>
            </li>
            <li>
              <a href="#" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                תנאי שימוש
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-on-surface text-sm">האקדמיה</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/learn" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                קורסים
              </Link>
            </li>
            <li>
              <Link href="/price" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                מחיר חי
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                מילון מונחים
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                שאלות נפוצות
              </Link>
            </li>
            <li>
              <Link href="/chat" className="text-on-surface-variant hover:text-tertiary transition-colors text-sm">
                ישראביט AI
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
