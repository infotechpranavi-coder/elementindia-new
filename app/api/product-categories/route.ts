import { NextResponse } from "next/server";
import { listProductCategories } from "@/lib/server/product-categories-store";

export async function GET() {
  const categories = await listProductCategories();
  return NextResponse.json({ categories });
}
