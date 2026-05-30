import { NextResponse } from "next/server";
import { createProduct, listProducts } from "@/lib/server/catalog-store";

function parseOptionalPrice(value: unknown) {
  if (value == null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET() {
  const products = await listProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await createProduct({
      name: String(body.name || "").trim(),
      category: String(body.category || "").trim(),
      price: parseOptionalPrice(body.price),
      description: String(body.description || "").trim(),
      imageUrl: String(body.imageUrl || "").trim(),
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid product payload." }, { status: 400 });
  }
}
