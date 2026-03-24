import { getDictionary } from "@/lib/i18n";
import { MotionDiv, MotionH1, MotionP, MotionA } from "./Motion";

export default async function Hero() {
  const dict = (await getDictionary()).hero;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <MotionDiv 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto text-center"
      >
        <MotionH1 
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
        >
          {dict.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">{dict.surname}</span>
        </MotionH1>

        <MotionP 
          variants={fadeInUp}
          className="text-xl md:text-2xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {dict.subtitle}
        </MotionP>

        <MotionDiv 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {dict.explore}
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 glass border-white/10 rounded-full font-bold hover:bg-foreground/5 transition-all active:scale-95"
          >
            {dict.contact}
          </a>
        </MotionDiv>
      </MotionDiv>
      
      {/* Decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -z-10 rounded-full"></div>
    </section>
  );
}