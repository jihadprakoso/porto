import Link from "next/link";
import { LayoutDashboard, FolderKanban, BookOpen, LogOut, Settings } from "lucide-react";
import { signOut } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-foreground/10 bg-foreground/[0.02] p-6 flex flex-col hidden md:flex">
        <div className="mb-10">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            JP<span className="text-indigo-500">.</span> Admin
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-foreground/5 transition-colors">
            <LayoutDashboard className="w-4 h-4 mr-3 text-indigo-500" />
            Overview
          </Link>
          <Link href="/dashboard/projects" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-foreground/5 transition-colors">
            <FolderKanban className="w-4 h-4 mr-3" />
            Projects
          </Link>
          <Link href="/dashboard/blog" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-foreground/5 transition-colors">
            <BookOpen className="w-4 h-4 mr-3" />
            Blog Posts
          </Link>
          <Link href="/dashboard/settings" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-foreground/5 transition-colors">
            <Settings className="w-4 h-4 mr-3 text-foreground/50" />
            Settings
          </Link>
        </nav>

        <div className="mt-auto">
          <form action={async () => {
             "use server";
             await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 md:p-12 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
