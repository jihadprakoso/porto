export default function About() {
    return (
        <section id="about" className="px-6 py-32">
            <div className="max-w-4xl mx-auto glass p-12 rounded-3xl animate-reveal">
                <h2 className="text-4xl font-bold mb-8 tracking-tight text-center">
                    About <span className="text-indigo-500">Me</span>
                </h2>

                <p className="text-xl text-foreground/70 leading-relaxed text-center">
                    I am a full-stack developer dedicated to building end-to-end digital experiences. 
                    I specialize in <span className="text-foreground font-medium">Next.js, Prisma, and modern UI design</span>, 
                    empowering me to deliver fully-featured web applications—from robust database architectures to stunning, high-performance interfaces.
                </p>
            </div>
        </section>
    );
}