import { prisma } from "@/lib/prisma";
import { FolderKanban, BookOpen, Clock } from "lucide-react";

export const metadata = {
  title: "Dashboard | Admin",
};

export default async function DashboardPage() {
  const [projectCount, postCount] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
  ]);

  return (
    <div className="animate-reveal">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground/60 font-medium">Total Projects</h3>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <p className="text-4xl font-bold">{projectCount}</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground/60 font-medium">Blog Posts</h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-4xl font-bold">{postCount}</p>
        </div>
        
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground/60 font-medium">Uptime</h3>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-4xl font-bold">100%</p>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/dashboard/projects" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors">
            Manage Projects
          </a>
          <a href="/dashboard/blog" className="px-6 py-3 bg-foreground/5 text-foreground rounded-xl font-medium hover:bg-foreground/10 transition-colors">
            Write a Post
          </a>
        </div>
      </div>
    </div>
  );
}
