import { NextResponse } from "next/server";
import {
  createProductCategory,
  listProductCategories,
} from "@/lib/server/product-categories-store";

export async function GET() {
  const categories = await listProductCategories();
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const category = await createProductCategory({
      name: String(body.name || "").trim(),
      slug: String(body.slug || "").trim(),
      description: String(body.description || "").trim() || undefined,
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid category payload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
