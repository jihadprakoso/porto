"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import { MotionDiv, AnimatePresence } from "./Motion";

export default function Navbar({ dict, currentLocale }: { dict: any, currentLocale: 'en' | 'id' }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: dict.about, href: "/#about" },
    { name: dict.projects, href: "/#projects" },
    { name: dict.stack, href: "/#stack" },
    { name: dict.blog, href: "/blog" },
    { name: dict.dashboard, href: "/dashboard" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "py-4 bg-background/95 backdrop-blur-md border-b border-foreground/10" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            JP<span className="text-indigo-500">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <LanguageToggle currentLocale={currentLocale} />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <a
                  href="#contact"
                  className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-all active:scale-95"
                >
                  {dict.contact}
                </a>
              </div>
              
              {/* Mobile Toggles & Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <LanguageToggle currentLocale={currentLocale} />
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 glass rounded-full"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Overlay (Sibling to prevent nested CSS backdrop-filter bug) */}
      <AnimatePresence>
        {isMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-[61px] bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-2xl flex flex-col pt-8 px-8 overflow-y-auto border-t border-foreground/10"
          >
            <div className="flex flex-col gap-2 relative z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-foreground/80 hover:text-indigo-500 transition-colors py-4 border-b border-foreground/5"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 px-6 py-4 bg-indigo-500 text-white text-center font-bold text-lg rounded-full hover:bg-indigo-600 transition-all"
              >
                {dict.contact}
              </a>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
