import { NextResponse } from "next/server";
import { listProductCategories } from "@/lib/server/product-categories-store";

export async function GET() {
  try {
    const categories = await listProductCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ categories: [] });
  }
}
