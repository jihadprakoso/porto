"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function BlogForm({ post }: { post?: any }) {
  const router = useRouter();
  const isEditing = !!post;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    published: post?.published ?? true,
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
      const url = isEditing ? `/api/blog/${post.id}` : `/api/blog`;
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save post");
      
      router.push("/dashboard/blog");
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
          <Link href="/dashboard/blog" className="p-2 mr-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>
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
                placeholder="Post Title"
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
                placeholder="post-title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Excerpt</label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="A brief summary for the blog card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2 flex justify-between">
              <span>Content (Markdown)</span>
              <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Markdown Guide</a>
            </label>
            <textarea
              required
              rows={16}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm leading-relaxed"
              placeholder="# Post Title&#10;&#10;Write your post content here..."
            />
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
          <Link href="/dashboard/blog" className="px-6 py-3 rounded-xl font-medium text-foreground/70 hover:bg-foreground/5 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
