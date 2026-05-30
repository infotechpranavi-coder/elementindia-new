import { NextResponse } from "next/server";
import { deleteService, updateService } from "@/lib/server/catalog-store";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await req.json();
    const service = await updateService(id, {
      title: String(body.title || "").trim(),
      slug: String(body.slug || "").trim(),
      summary: String(body.summary || "").trim(),
      imageUrl: String(body.imageUrl || "").trim(),
    });
    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch {
    return NextResponse.json({ error: "Invalid service payload." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const removed = await deleteService(id);
  if (!removed) {
    return NextResponse.json({ error: "Service not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
