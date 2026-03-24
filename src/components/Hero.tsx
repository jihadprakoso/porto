export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center animate-reveal">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
          Jihad <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Prakoso</span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          I engineer robust full-stack products, seamlessly integrating scalable backend architectures with premium, high-performance web interfaces.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Explore Products
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 glass border-white/10 rounded-full font-bold hover:bg-foreground/5 transition-all active:scale-95"
          >
            Get in Touch
          </a>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -z-10 rounded-full"></div>
    </section>
  );
}