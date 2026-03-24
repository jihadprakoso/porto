"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLanguage } from "@/app/actions";

export default function LanguageToggle({ currentLocale }: { currentLocale: 'en' | 'id' }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleLanguage = () => {
    startTransition(async () => {
      const newLocale = currentLocale === 'en' ? 'id' : 'en';
      await setLanguage(newLocale);
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className={`relative w-12 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 flex items-center justify-center font-bold text-xs active:scale-95 overflow-hidden ${isPending ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
      title="Toggle Language"
    >
      <span 
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          currentLocale === 'en' 
            ? 'translate-y-0 opacity-100 scale-100' 
            : '-translate-y-6 opacity-0 scale-75'
        }`}
      >
        EN
      </span>
      <span 
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          currentLocale === 'id' 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-6 opacity-0 scale-75'
        }`}
      >
        ID
      </span>
    </button>
  );
}
