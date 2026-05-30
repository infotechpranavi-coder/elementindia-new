import type { ProductItem } from "@/lib/catalog-types";
import { PRODUCTS_COLLECTION, getDb, isMongoConfigured } from "@/lib/server/db/mongodb";
import { toProductItem, type ProductDocument } from "@/lib/server/db/product-schema";
import { readSeedProducts } from "@/lib/server/seed-catalog";

let migrationPromise: Promise<void> | null = null;

/** One-time import from data/catalog.json into MongoDB when the collection is empty. */
export async function ensureProductsMigrated() {
  if (!isMongoConfigured()) return;

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
    const doc: ProductDocument = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };
    await collection.insertOne(doc);
  }
}

async function readProductsFromDb(): Promise<ProductItem[]> {
  const db = await getDb();
  const docs = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(toProductItem);
}

export async function listProductsFromDb(): Promise<ProductItem[]> {
  if (!isMongoConfigured()) {
    return readSeedProducts();
  }

  try {
    let products = await readProductsFromDb();

    if (products.length === 0) {
      try {
        await ensureProductsMigrated();
        products = await readProductsFromDb();
      } catch (migrationErr) {
        console.error("[products] Migration failed:", migrationErr);
      }
    }

    if (products.length > 0) return products;

    const seed = await readSeedProducts();
    if (seed.length > 0) {
      console.warn("[products] MongoDB returned no products; using bundled catalog seed.");
    }
    return seed;
  } catch (err) {
    console.error("[products] Failed to load products from MongoDB:", err);
    const seed = await readSeedProducts();
    if (seed.length > 0) {
      console.warn("[products] Using bundled catalog seed after MongoDB error.");
    }
    return seed;
  }
}
