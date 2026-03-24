import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Blog | Jihad Prakoso",
  description: "Notes, thoughts, and lessons learned about frontend development and software engineering.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="bg-grid min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto animate-reveal">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Blog & <span className="text-indigo-500">Notes</span>
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Sharing my learnings, thoughts, and tutorials about frontend development,
            Next.js, and building modern web applications.
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="glass glass-hover p-8 rounded-3xl group transition-all duration-300">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center text-sm text-foreground/50 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.createdAt.toISOString()}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }).format(post.createdAt)}
                  </time>
                  <span className="mx-3">•</span>
                  <span>{post.author.name}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="text-indigo-500 font-medium text-sm inline-flex items-center">
                  Read Article →
                </div>
              </Link>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl">
              <p className="text-foreground/60 text-lg">No posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
