import { NextResponse } from "next/server";
import { deleteBlog, updateBlog } from "@/lib/server/blogs-store";
import { estimateReadTimeMinutes } from "@/lib/format-blog";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await req.json();
    const content = String(body.content || "").trim();
    const readTimeRaw = Number(body.readTimeMinutes);
    const blog = await updateBlog(id, {
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
    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }
    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ error: "Invalid blog payload." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const removed = await deleteBlog(id);
  if (!removed) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
