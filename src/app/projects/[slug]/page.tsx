import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Jihad Prakoso`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) notFound();

  const techStack = JSON.parse(project.tech);

  return (
    <div className="bg-grid min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto animate-reveal">
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-indigo-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {project.title}
          </h1>
          
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {techStack.map((tech: string) => (
              <span 
                key={tech} 
                className="px-4 py-2 bg-foreground/5 rounded-full text-sm font-medium text-foreground/80 border border-foreground/10"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-6 border-t border-foreground/10">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-6 py-3 bg-foreground/10 text-foreground rounded-xl font-bold hover:bg-foreground/20 transition-all active:scale-95"
              >
                <Code className="w-4 h-4 mr-2" />
                Source Code
              </a>
            )}
          </div>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-indigo-400 prose-strong:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
