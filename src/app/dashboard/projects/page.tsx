import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Manage Projects | Admin",
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-reveal">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link 
          href="/dashboard/projects/new" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Link>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/5">
                <th className="p-4 font-medium text-foreground/70">Title</th>
                <th className="p-4 font-medium text-foreground/70">Status</th>
                <th className="p-4 font-medium text-foreground/70">Created</th>
                <th className="p-4 font-medium text-foreground/70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-foreground/5 relative group hover:bg-foreground/[0.02]">
                  <td className="p-4 font-medium">
                    {project.title}
                    <div className="text-xs text-foreground/50 font-normal mt-1">{project.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${project.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-foreground/10 text-foreground/60'}`}>
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-foreground/60">
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(project.createdAt)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/projects/${project.slug}`} target="_blank" rel="noreferrer" className="p-2 text-foreground/50 hover:text-indigo-400 transition-colors tooltip" title="View Live">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Link href={`/dashboard/projects/${project.id}/edit`} className="p-2 text-foreground/50 hover:text-amber-400 transition-colors tooltip" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      {/* Delete is left out for simplicity in this file, handled via API directly if needed, or added to a client component */}
                      <button className="p-2 text-foreground/50 hover:text-red-400 transition-colors tooltip" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-foreground/50">
                    No projects found. Create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
