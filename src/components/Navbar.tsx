"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ dict, currentLocale }: { dict: any, currentLocale: 'en' | 'id' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict.about, href: "/#about" },
    { name: dict.projects, href: "/#projects" },
    { name: dict.stack, href: "/#stack" },
    { name: dict.blog, href: "/blog" },
    { name: dict.dashboard, href: "/dashboard" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-4 bg-background/50 backdrop-blur-md border-b border-foreground/10" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          JP<span className="text-indigo-500">.</span>
        </Link>

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
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle currentLocale={currentLocale} />
            <ThemeToggle />
          </div>
          <a
            href="#contact"
            className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-all active:scale-95"
          >
            {dict.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}
