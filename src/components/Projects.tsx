import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLocale } from "@/lib/i18n";
import { MotionDiv, MotionH2 } from "./Motion";

export default async function Projects() {
    const locale = await getLocale();
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: "asc" }
    });

    const titlePrefix = locale === 'id' ? 'Proyek' : 'Featured';
    const titleHighlight = locale === 'id' ? 'Pilihan' : 'Projects';
    const readMore = locale === 'id' ? 'Baca Studi Kasus' : 'Read Case Study';

    const container = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const item = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    };

    return (
        <section
            id="projects"
            className="scroll-mt-20 px-6 py-24 relative overflow-hidden"
        >
            <MotionDiv 
                variants={container}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto"
            >
                <MotionH2 
                    variants={item}
                    className="text-4xl font-bold mb-12 text-center tracking-tight"
                >
                    {titlePrefix} <span className="text-indigo-400">{titleHighlight}</span>
                </MotionH2>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => {
                        const techStack = JSON.parse(project.tech);
                        const displayTitle = locale === 'id' && project.titleId ? project.titleId : project.title;
                        const displayDesc = locale === 'id' && project.descriptionId ? project.descriptionId : project.description;
                        
                        return (
                            <MotionDiv variants={item} key={project.id}>
                                <Link href={`/projects/${project.slug}`} className="block group h-full">
                                    <div className="glass glass-hover p-8 rounded-3xl transition-all duration-500 h-full flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">
                                                {displayTitle}
                                            </h3>
                                            <p className="text-foreground/60 mb-6 line-clamp-2">
                                                {displayDesc}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {techStack.map((tech: string) => (
                                                    <span key={tech} className="px-3 py-1 bg-foreground/5 rounded-full text-xs font-medium text-foreground/70">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                            {readMore} <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </MotionDiv>
                        );
                    })}
                </div>
            </MotionDiv>
        </section>
    );
}