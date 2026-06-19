"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BitcoinLogo from "@/components/ui/BitcoinLogo";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/learn", label: "למד" },
  { href: "/price", label: "מחיר חי" },
  { href: "/glossary", label: "מילון" },
  { href: "/faq", label: "שאלות נפוצות" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e1e2e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-base text-white hover:text-[#F7931A] transition-colors"
        >
          <BitcoinLogo size={26} />
          <span className="leading-tight">
            הזהב החדש
            <span className="block text-[10px] font-normal text-gray-500 leading-none">The New Gold</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#F7931A]/10 text-[#F7931A]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/learn"
            className="mr-3 bg-[#F7931A] hover:bg-[#e07b10] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            התחל עכשיו
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#F7931A]/10 text-[#F7931A]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/learn"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-[#F7931A] hover:bg-[#e07b10] text-white text-sm font-semibold px-5 py-3 rounded-full text-center transition-colors"
          >
            התחל עכשיו
          </Link>
        </div>
      )}
    </header>
  );
}
