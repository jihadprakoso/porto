import { prisma } from "@/lib/prisma";
import Link from "next/link";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Calendar } from "lucide-react";
import { getLocale } from "@/lib/i18n";
import { MotionDiv, MotionH1, MotionP, MotionArticle } from "@/components/Motion";

export const metadata = {
  title: "Blog | Jihad Prakoso",
  description: "Notes, thoughts, and lessons learned about frontend development and software engineering.",
};

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="bg-grid min-h-screen">
      <NavbarWrapper />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <MotionDiv 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <MotionH1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            {locale === 'id' ? 'Tulisan & ' : 'Writing & '}
            <span className="text-indigo-500">{locale === 'id' ? 'Catatan' : 'Notes'}</span>
          </MotionH1>
          <MotionP 
            variants={fadeInUp}
            className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto"
          >
            {locale === 'id' 
              ? 'Catatan, pemikiran, dan pelajaran seputar rekayasa perangkat lunak.' 
              : 'Notes, thoughts, and lessons learned about software engineering.'}
          </MotionP>
        </MotionDiv>

        <MotionDiv 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          {posts.map((post) => {
            const displayTitle = locale === 'id' && post.titleId ? post.titleId : post.title;
            const displayExcerpt = locale === 'id' && post.excerptId ? post.excerptId : post.excerpt;
            
            return (
              <MotionArticle 
                key={post.id} 
                variants={fadeInUp}
                className="glass glass-hover p-8 rounded-3xl group transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center text-sm text-foreground/50 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time dateTime={post.createdAt.toISOString()}>
                      {new Intl.DateTimeFormat(locale === 'id' ? "id-ID" : "en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(post.createdAt)}
                    </time>
                    <span className="mx-3">•</span>
                    <span>{post.author.name}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
                    {displayTitle}
                  </h2>
                  
                  <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-2">
                    {displayExcerpt}
                  </p>
                  
                  <div className="text-indigo-500 font-medium text-sm inline-flex items-center">
                    {locale === 'id' ? 'Baca Artikel →' : 'Read Article →'}
                  </div>
                </Link>
              </MotionArticle>
            );
          })}

          {posts.length === 0 && (
            <MotionDiv 
              variants={fadeInUp}
              className="text-center py-20 glass rounded-3xl"
            >
              <p className="text-foreground/60 text-lg">
                {locale === 'id' ? 'Belum ada postingan. Silakan cek kembali nanti!' : 'No posts available yet. Check back soon!'}
              </p>
            </MotionDiv>
          )}
        </MotionDiv>
      </main>
    </div>
  );
}
