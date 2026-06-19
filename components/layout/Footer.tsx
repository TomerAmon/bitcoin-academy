import Link from "next/link";
import BitcoinLogo from "@/components/ui/BitcoinLogo";

const links = [
  { href: "/learn", label: "למד" },
  { href: "/price", label: "מחיר חי" },
  { href: "/glossary", label: "מילון" },
  { href: "/faq", label: "שאלות נפוצות" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-[#1e1e2e] text-gray-500 py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <BitcoinLogo size={20} />
          <span>הזהב החדש</span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-gray-700">
          © {new Date().getFullYear()} הזהב החדש — אין כאן ייעוץ פיננסי
        </p>
      </div>
    </footer>
  );
}
