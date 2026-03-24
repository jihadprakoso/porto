export default function About() {
    return (
        <section id="about" className="px-6 py-32">
            <div className="max-w-4xl mx-auto glass p-12 rounded-3xl animate-reveal">
                <h2 className="text-4xl font-bold mb-8 tracking-tight text-center">
                    About <span className="text-indigo-500">Me</span>
                </h2>

                <p className="text-xl text-foreground/70 leading-relaxed text-center">
                    I’m a frontend developer focused on building
                    high-performance web interfaces. Currently working with modern 
                    technologies like <span className="text-foreground font-medium">Next.js and Tailwind CSS</span>, 
                    and continuously expanding my skills toward fullstack development.
                </p>
            </div>
        </section>
    );
}