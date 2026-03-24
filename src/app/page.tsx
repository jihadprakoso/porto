import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import NavbarWrapper from "@/components/NavbarWrapper";

export default function Home() {
  return (
    <div className="bg-grid min-h-screen">
      <NavbarWrapper />
      <main>
        <Hero />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}