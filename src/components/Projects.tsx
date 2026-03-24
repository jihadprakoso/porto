export default function Projects() {
    const projects = [
        {
            title: "Portfolio Website",
            description: "Personal portfolio built with Next.js and Tailwind CSS.",
            tech: ["Next.js", "Tailwind CSS", "TypeScript"]
        },
        {
            title: "Coming Soon",
            description: "More exciting projects will be added here soon.",
            tech: ["Future Tech"]
        }
    ];

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
                    {projects.map((project, idx) => (
                        <div key={idx} className="glass glass-hover p-8 rounded-3xl transition-all duration-500 group">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-foreground/60 mb-6">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-foreground/5 rounded-full text-xs font-medium text-foreground/70">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}