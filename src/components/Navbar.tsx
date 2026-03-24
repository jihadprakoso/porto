"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#stack" },
    { name: "Contact", href: "#contact" },
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
        <a href="#" className="text-xl font-bold tracking-tighter">
          JP<span className="text-indigo-500">.</span>
        </a>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <a
            href="#contact"
            className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-all active:scale-95"
          >
            Work With Me
          </a>
        </div>
      </div>
    </nav>
  );
}
