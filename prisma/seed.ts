import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@jihadprakoso.com" },
    update: {},
    create: {
      email: "admin@jihadprakoso.com",
      password: hashedPassword,
      name: "Jihad Prakoso",
      role: "admin",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Seed projects
  const projects = [
    {
      title: "Portfolio Website",
      slug: "portfolio-website",
      description: "Personal portfolio built with Next.js and Tailwind CSS.",
      content: `# Portfolio Website

## Overview
A modern, high-performance portfolio website built to showcase my projects and skills as a frontend developer.

## The Challenge
I needed a personal website that not only looks professional but also demonstrates my technical abilities. The site had to be fast, responsive, and SEO-optimized.

## The Solution
Built with **Next.js App Router** and **Tailwind CSS**, featuring:
- Glassmorphic design system with dark/light mode
- Smooth scroll animations
- SEO-optimized metadata and OpenGraph tags
- Responsive layout for all devices

## Tech Stack
- Next.js 16
- Tailwind CSS
- TypeScript
- Vercel (deployment)

## Results
A premium portfolio that serves as both a personal brand showcase and a demonstration of modern frontend development practices.`,
      tech: JSON.stringify(["Next.js", "Tailwind CSS", "TypeScript"]),
      liveUrl: "https://jihadprakoso.com",
      githubUrl: "https://github.com/jihadprakoso/porto",
      published: true,
    },
    {
      title: "Coming Soon",
      slug: "coming-soon",
      description: "More exciting projects will be added here soon.",
      content: `# Coming Soon

## Stay Tuned
New projects are currently in development. Check back soon for updates!`,
      tech: JSON.stringify(["Future Tech"]),
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log("✅ Projects seeded:", projects.length);

  // Seed blog posts
  const posts = [
    {
      title: "Getting Started with Next.js App Router",
      slug: "getting-started-nextjs-app-router",
      excerpt: "Learn the fundamentals of Next.js App Router and how it changes the way we build React applications.",
      content: `# Getting Started with Next.js App Router

The App Router is a new paradigm in Next.js that leverages React Server Components. Here's what you need to know.

## Why App Router?

The App Router brings several improvements:
- **Server Components by default** — Less JavaScript shipped to the client
- **Nested layouts** — Share UI between routes without re-rendering
- **Streaming** — Progressive rendering for better UX
- **Built-in SEO** — Native metadata API

## Key Concepts

### File-based Routing
Every folder in \`app/\` becomes a route. Special files like \`page.tsx\`, \`layout.tsx\`, and \`loading.tsx\` define the UI.

### Server vs Client Components
By default, components are Server Components. Add \`"use client"\` only when you need interactivity.

\`\`\`tsx
// Server Component (default)
export default function Page() {
  return <h1>Hello from the server!</h1>;
}

// Client Component
"use client";
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## Getting Started

1. Create a new Next.js project
2. Explore the \`app/\` directory
3. Build your first page and layout

Happy coding! 🚀`,
      published: true,
      authorId: admin.id,
    },
    {
      title: "Why I Choose Tailwind CSS",
      slug: "why-i-choose-tailwind-css",
      excerpt: "A deep dive into why Tailwind CSS is my go-to styling solution for modern web development.",
      content: `# Why I Choose Tailwind CSS

After years of trying different CSS approaches, Tailwind CSS has become my default choice. Here's why.

## The Problem with Traditional CSS

Writing custom CSS for every project leads to:
- Inconsistent naming conventions
- Unused styles
- Specificity wars
- Difficulty maintaining large codebases

## How Tailwind Solves This

### Utility-First Approach
Instead of inventing class names, you compose styles from utilities:

\`\`\`html
<div class="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg">
  <img class="w-12 h-12 rounded-full" src="avatar.jpg" />
  <div>
    <h3 class="font-bold text-gray-900">John Doe</h3>
    <p class="text-gray-500">Developer</p>
  </div>
</div>
\`\`\`

### Design System Built-In
Tailwind gives you a consistent design system out of the box with spacing, colors, typography, and breakpoints.

### Performance
Tailwind purges unused styles in production, resulting in tiny CSS bundles.

## My Verdict
Tailwind CSS isn't just a framework — it's a productivity multiplier. Combined with Next.js, it's the perfect stack for modern web development.`,
      published: true,
      authorId: admin.id,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("✅ Blog posts seeded:", posts.length);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
