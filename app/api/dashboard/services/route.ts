import { NextResponse } from "next/server";
import { createService, listServices } from "@/lib/server/catalog-store";

export async function GET() {
  const services = await listServices();
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const service = await createService({
      title: String(body.title || "").trim(),
      slug: String(body.slug || "").trim(),
      summary: String(body.summary || "").trim(),
      imageUrl: String(body.imageUrl || "").trim(),
    });
    return NextResponse.json({ service }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid service payload." }, { status: 400 });
  }
}
