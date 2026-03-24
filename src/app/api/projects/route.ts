import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        titleId: data.titleId,
        slug: data.slug,
        description: data.description,
        descriptionId: data.descriptionId,
        content: data.content,
        contentId: data.contentId,
        tech: JSON.stringify(data.tech || []),
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        published: data.published ?? true,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
