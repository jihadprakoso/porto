import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import NavbarWrapper from "@/components/NavbarWrapper";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Jihad Prakoso`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const locale = await getLocale();
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug },
    include: { author: { select: { name: true } } },
  });

  if (!post) notFound();

  const displayTitle = locale === 'id' && post.titleId ? post.titleId : post.title;
  const displayContent = locale === 'id' && post.contentId ? post.contentId : post.content;

  return (
    <div className="bg-grid min-h-screen">
      <NavbarWrapper />
      
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto animate-reveal">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-indigo-500 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {locale === 'id' ? 'Kembali ke Blog' : 'Back to Blog'}
        </Link>
        
        <article>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {displayTitle}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm text-foreground/50 gap-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={post.createdAt.toISOString()}>
                  {new Intl.DateTimeFormat(locale === 'id' ? "id-ID" : "en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(post.createdAt)}
                </time>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author.name}</span>
              </div>
            </div>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-indigo-400 prose-strong:text-foreground glass p-8 md:p-12 rounded-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayContent}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
