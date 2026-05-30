import { NextResponse } from "next/server";
import { isMongoConfigured, pingMongo } from "@/lib/server/db/mongodb";
import { listProducts } from "@/lib/server/catalog-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const configured = isMongoConfigured();
  const ping = configured ? await pingMongo() : { ok: false, error: "MONGODB_URI is not set" };

  let productCount = 0;
  try {
    productCount = (await listProducts()).length;
  } catch {
    productCount = 0;
  }

  return NextResponse.json({
    mongoConfigured: configured,
    mongoConnected: ping.ok,
    database: ping.dbName ?? null,
    productCount,
    error: ping.error ?? null,
  });
}
