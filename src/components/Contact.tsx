import { getDictionary } from "@/lib/i18n";
import { MotionDiv } from "./Motion";

export default async function Contact() {
  const dict = (await getDictionary()).contact;

  return (
    <section id="contact" className="px-6 py-24 relative overflow-hidden">
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          {dict.titlePrefix} <span className="text-indigo-400">{dict.titleHighlight}</span>
        </h2>
        
        <p className="text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
          {dict.desc}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:admin@jihadprakoso.com"
            className="inline-flex items-center px-10 py-5 bg-foreground text-background rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/10"
          >
            {dict.email}
          </a>

          <a
            href="https://www.linkedin.com/in/jihad-prakoso"
            target="_blank"
            rel="noreferrer"
            className="px-10 py-5 glass rounded-full font-bold hover:bg-foreground/5 transition-all active:scale-95"
          >
            LinkedIn
          </a>
        </div>
      </MotionDiv>
    </section>
  );
}