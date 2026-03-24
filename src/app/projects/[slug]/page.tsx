import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import NavbarWrapper from "@/components/NavbarWrapper";
import { getLocale } from "@/lib/i18n";

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
  const locale = await getLocale();
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) notFound();

  const techStack = JSON.parse(project.tech);
  
  const displayTitle = locale === 'id' && project.titleId ? project.titleId : project.title;
  const displayDesc = locale === 'id' && project.descriptionId ? project.descriptionId : project.description;
  const displayContent = locale === 'id' && project.contentId ? project.contentId : project.content;

  return (
    <div className="bg-grid min-h-screen">
      <NavbarWrapper />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto animate-reveal">
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-indigo-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {locale === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {displayTitle}
          </h1>
          
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            {displayDesc}
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
                {locale === 'id' ? 'Demo Langsung' : 'Live Demo'}
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
                {locale === 'id' ? 'Kode Sumber' : 'Source Code'}
              </a>
            )}
          </div>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-indigo-400 prose-strong:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayContent}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
