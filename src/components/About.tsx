import { getDictionary } from "@/lib/i18n";
import { MotionDiv } from "./Motion";

export default async function About() {
    const dict = (await getDictionary()).about;

    return (
        <section id="about" className="px-6 py-24 relative overflow-hidden">
            <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="max-w-3xl mx-auto text-center"
            >
                <h2 className="text-4xl font-bold mb-8 tracking-tight">
                    {dict.titlePrefix} <span className="text-indigo-400">{dict.titleHighlight}</span>
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                    {dict.description}
                </p>
            </MotionDiv>
        </section>
    );
}