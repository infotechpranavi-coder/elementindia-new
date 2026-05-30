import { NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "@/lib/server/catalog-store";

function parseOptionalPrice(value: unknown) {
  if (value == null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await req.json();
    const product = await updateProduct(id, {
      name: String(body.name || "").trim(),
      category: String(body.category || "").trim(),
      price: parseOptionalPrice(body.price),
      description: String(body.description || "").trim(),
      imageUrl: String(body.imageUrl || "").trim(),
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Invalid product payload." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const removed = await deleteProduct(id);
  if (!removed) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
