import { promises as fs } from "fs";
import path from "path";
import type { CatalogData, ProductItem } from "@/lib/catalog-types";
import { PRODUCTS_COLLECTION, getDb } from "@/lib/server/db/mongodb";
import { toProductItem, type ProductDocument } from "@/lib/server/db/product-schema";
import { isCloudinaryUrl, uploadRemoteImageToCloudinary } from "@/lib/server/media/upload-remote-image";

const dataFile = path.join(process.cwd(), "data", "catalog.json");

async function readSeedProducts(): Promise<ProductItem[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CatalogData>;
    return Array.isArray(parsed.products) ? parsed.products : [];
  } catch {
    return [];
  }
}

async function resolveImageUrl(imageUrl: string) {
  if (!imageUrl.trim()) return imageUrl;
  if (isCloudinaryUrl(imageUrl)) return imageUrl;
  try {
    return await uploadRemoteImageToCloudinary(imageUrl);
  } catch {
    return imageUrl;
  }
}

let migrationPromise: Promise<void> | null = null;

/** One-time import from data/catalog.json into MongoDB + Cloudinary. */
export async function ensureProductsMigrated() {
  if (!migrationPromise) {
    migrationPromise = runMigration().catch((err) => {
      migrationPromise = null;
      throw err;
    });
  }
  await migrationPromise;
}

async function runMigration() {
  const db = await getDb();
  const collection = db.collection<ProductDocument>(PRODUCTS_COLLECTION);
  const existing = await collection.countDocuments();

  if (existing > 0) return;

  const seed = await readSeedProducts();
  if (seed.length === 0) return;

  await collection.createIndex({ id: 1 }, { unique: true });

  const now = new Date();
  for (const product of seed) {
    const imageUrl = await resolveImageUrl(product.imageUrl);
    const doc: ProductDocument = {
      ...product,
      imageUrl,
      createdAt: now,
      updatedAt: now,
    };
    await collection.insertOne(doc);
  }
}

export async function listProductsFromDb(): Promise<ProductItem[]> {
  await ensureProductsMigrated();
  const db = await getDb();
  const docs = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(toProductItem);
}
