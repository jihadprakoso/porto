import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Projects() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: "asc" } // Keep them in insertion order for now
    });

    return (
        <section
            id="projects"
            className="scroll-mt-20 px-6 py-24 relative overflow-hidden"
        >
            <div className="max-w-5xl mx-auto animate-reveal">
                <h2 className="text-4xl font-bold mb-12 text-center tracking-tight">
                    Featured <span className="text-indigo-400">Projects</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => {
                        const techStack = JSON.parse(project.tech);
                        return (
                            <Link href={`/projects/${project.slug}`} key={project.id} className="block group">
                                <div className="glass glass-hover p-8 rounded-3xl transition-all duration-500 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-foreground/60 mb-6 line-clamp-2">
                                            {project.description}
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
                                        Read Case Study <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}