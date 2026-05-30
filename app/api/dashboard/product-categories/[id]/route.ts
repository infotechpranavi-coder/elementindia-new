import { NextResponse } from "next/server";
import {
  deleteProductCategory,
  updateProductCategory,
} from "@/lib/server/product-categories-store";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await req.json();
    const category = await updateProductCategory(id, {
      name: String(body.name || "").trim(),
      slug: String(body.slug || "").trim(),
      description: String(body.description || "").trim() || undefined,
    });
    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ category });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid category payload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const removed = await deleteProductCategory(id);
  if (!removed) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
