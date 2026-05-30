import { NextResponse } from "next/server";
import { listPublishedBlogs } from "@/lib/server/blogs-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitRaw = searchParams.get("limit");
  const limit = limitRaw ? Number.parseInt(limitRaw, 10) : undefined;
  const blogs = await listPublishedBlogs(
    limit != null && Number.isFinite(limit) && limit > 0 ? limit : undefined,
  );
  return NextResponse.json({ blogs });
}
