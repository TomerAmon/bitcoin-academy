"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BitcoinLogo from "@/components/ui/BitcoinLogo";

const navLinks = [
  { href: "/learn", label: "קורסים" },
  { href: "/price", label: "מחיר חי" },
  { href: "/glossary", label: "מילון" },
  { href: "/faq", label: "שאלות" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-8 py-4 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black text-primary tracking-tighter"
        >
          <BitcoinLogo size={28} />
          הזהב החדש
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors text-sm font-medium ${
                pathname === link.href
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="hidden md:block text-on-surface hover:text-primary transition-colors font-bold px-4 py-2 rounded-full border border-outline-variant/30 hover:border-primary/50 text-sm"
          >
            ישראביט AI
          </Link>
          <Link
            href="/learn"
            className="bg-primary text-on-primary font-bold px-5 py-2 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 glow-effect text-sm"
          >
            הצטרף לאקדמיה
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
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
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-background/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/chat"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
          >
            ישראביט AI
          </Link>
          <Link
            href="/learn"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-primary text-on-primary text-sm font-bold px-5 py-3 rounded-full text-center"
          >
            הצטרף לאקדמיה
          </Link>
        </div>
      )}
    </header>
  );
}
