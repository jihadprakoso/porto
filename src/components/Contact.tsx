export default function Contact() {
    return (
        <section id="contact" className="px-6 py-32 border-t border-foreground/5 bg-foreground/[0.02]">
            <div className="max-w-3xl mx-auto text-center animate-reveal">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                    Let’s <span className="text-indigo-400">Build Something Great</span>
                </h2>

                <p className="text-xl text-foreground/60 mb-12 leading-relaxed">
                    Whether you need a high-performance web application, a custom CMS, 
                    or a scalable product architecture, I'm ready to turn your vision into reality.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <a
                        href="mailto:jihadprakoso@gmail.com"
                        className="px-8 py-4 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-all active:scale-95"
                    >
                        Email Me
                    </a>

                    <a
                        href="https://www.linkedin.com/in/jihad-prakoso"
                        target="_blank"
                        className="px-8 py-4 glass rounded-full font-bold hover:bg-foreground/5 transition-all active:scale-95"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/jihadprakoso"
                        target="_blank"
                        className="px-8 py-4 glass rounded-full font-bold hover:bg-foreground/5 transition-all active:scale-95"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}