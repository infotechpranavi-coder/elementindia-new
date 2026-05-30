import { NextResponse } from "next/server";
import { createBlog, listBlogs } from "@/lib/server/blogs-store";
import { estimateReadTimeMinutes } from "@/lib/format-blog";

export async function GET() {
  const blogs = await listBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const content = String(body.content || "").trim();
    const readTimeRaw = Number(body.readTimeMinutes);
    const blog = await createBlog({
      slug: String(body.slug || "").trim(),
      title: String(body.title || "").trim(),
      excerpt: String(body.excerpt || "").trim(),
      content,
      category: String(body.category || "").trim(),
      imageUrl: String(body.imageUrl || "").trim(),
      publishedAt: body.publishedAt
        ? new Date(String(body.publishedAt)).toISOString()
        : new Date().toISOString(),
      readTimeMinutes:
        Number.isFinite(readTimeRaw) && readTimeRaw > 0
          ? Math.round(readTimeRaw)
          : estimateReadTimeMinutes(content),
      published: body.published !== false,
    });
    return NextResponse.json({ blog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid blog payload." }, { status: 400 });
  }
}
