import { getDictionary } from "@/lib/i18n";
import { MotionDiv, MotionH2 } from "./Motion";

export default async function TechStack() {
    const dict = (await getDictionary()).tech;

    const container = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const item = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
    };

    return (
        <section id="stack" className="px-6 py-24 border-t border-white/5">
            <MotionDiv 
                variants={container}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto text-center"
            >
                <MotionH2 
                    variants={item}
                    className="text-4xl font-bold mb-12 tracking-tight"
                >
                    {dict.titlePrefix} <span className="text-indigo-400">{dict.titleHighlight}</span>
                </MotionH2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {dict.items.map((tech) => (
                        <MotionDiv
                            key={tech}
                            variants={item}
                            whileHover={{ scale: 1.05, translateY: -5 }}
                            className="p-6 glass rounded-2xl flex items-center justify-center text-center font-medium text-foreground/80 transition-shadow hover:shadow-lg hover:shadow-indigo-500/10 cursor-default"
                        >
                            {tech}
                        </MotionDiv>
                    ))}
                </div>
            </MotionDiv>
        </section>
    );
}