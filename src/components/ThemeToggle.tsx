"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 w-9 h-9 flex items-center justify-center rounded-full glass glass-hover transition-all duration-300 active:scale-95 overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun 
        className={`absolute w-5 h-5 text-yellow-500 transition-all duration-500 ease-out
          ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"}
        `} 
      />
      <Moon 
        className={`absolute w-5 h-5 text-indigo-400 transition-all duration-500 ease-out
          ${theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0"}
        `} 
      />
    </button>
  );
}
