export default function TechStack() {
    const stack = [
        "Next.js", "React", "Tailwind CSS", "TypeScript",
        "Git", "Figma", "Node.js (Learning)", "Backend System (WIP)"
    ];

    return (
        <section id="stack" className="px-6 py-24 border-t border-white/5">
            <div className="max-w-5xl mx-auto text-center animate-reveal">
                <h2 className="text-4xl font-bold mb-12 tracking-tight">
                    Tech <span className="text-indigo-400">Stack</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stack.map((item) => (
                        <div
                            key={item}
                            className="p-6 glass rounded-2xl flex items-center justify-center text-center font-medium text-foreground/80 hover:scale-105 transition-all cursor-default"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}