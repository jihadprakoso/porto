"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function ProjectForm({ project }: { project?: any }) {
  const router = useRouter();
  const isEditing = !!project;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    content: project?.content || "",
    tech: project?.tech ? JSON.parse(project.tech).join(", ") : "",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    published: project?.published ?? true,
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing && !prev.slug ? generateSlug(title) : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/projects/${project.id}` : `/api/projects`;
      const method = isEditing ? "PUT" : "POST";
      
      const payload = {
        ...formData,
        tech: formData.tech.split(",").map((t: string) => t.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save project");
      
      router.push("/dashboard/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="animate-reveal">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard/projects" className="p-2 mr-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Project" : "New Project"}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {error && <div className="p-4 bg-red-500/10 text-red-400 rounded-xl">{error}</div>}

        <div className="glass p-8 rounded-3xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                placeholder="Project Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-mono"
                placeholder="project-title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Short Description</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="A brief overview for the project card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2 flex justify-between">
              <span>Case Study Content (Markdown)</span>
              <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Markdown Guide</a>
            </label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm leading-relaxed"
              placeholder="# Project Name&#10;&#10;## Overview&#10;..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={formData.tech}
                onChange={e => setFormData({ ...formData, tech: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
                placeholder="Next.js, Tailwind CSS, Prisma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          
          <div className="flex items-center pt-4 border-t border-foreground/10">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={e => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded border-foreground/20 text-indigo-600 focus:ring-indigo-500/50 bg-background"
              />
              <span className="ml-3 font-medium text-foreground/80">Published</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/projects" className="px-6 py-3 rounded-xl font-medium text-foreground/70 hover:bg-foreground/5 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
