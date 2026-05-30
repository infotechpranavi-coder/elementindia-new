import type { ProductItem } from "@/lib/catalog-types";
import { PRODUCTS_COLLECTION, getDb } from "@/lib/server/db/mongodb";
import { toProductItem, type ProductDocument } from "@/lib/server/db/product-schema";
import { ensureProductsMigrated, listProductsFromDb } from "@/lib/server/migrate-products";

export async function listProducts() {
  return listProductsFromDb();
}

export async function getProductById(id: string) {
  await ensureProductsMigrated();
  const db = await getDb();
  const doc = await db.collection<ProductDocument>(PRODUCTS_COLLECTION).findOne({ id });
  if (!doc) return null;
  return toProductItem(doc);
}

export async function createProduct(input: Omit<ProductItem, "id">) {
  await ensureProductsMigrated();
  const db = await getDb();
  const id = `prod-${Date.now()}`;
  const now = new Date();
  const doc: ProductDocument = {
    id,
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  await db.collection<ProductDocument>(PRODUCTS_COLLECTION).insertOne(doc);
  return toProductItem(doc);
}

export async function updateProduct(id: string, input: Omit<ProductItem, "id">) {
  await ensureProductsMigrated();
  const db = await getDb();
  const { price, ...rest } = input;
  const $set: Record<string, unknown> = { ...rest, updatedAt: new Date() };
  if (price !== undefined) {
    $set.price = price;
  }
  const updateDoc: { $set: Record<string, unknown>; $unset?: { price: "" } } = { $set };
  if (price === undefined) {
    updateDoc.$unset = { price: "" };
  }
  const result = await db.collection<ProductDocument>(PRODUCTS_COLLECTION).findOneAndUpdate(
    { id },
    updateDoc,
    { returnDocument: "after" },
  );
  if (!result) return null;
  return toProductItem(result);
}

export async function deleteProduct(id: string) {
  await ensureProductsMigrated();
  const db = await getDb();
  const result = await db.collection<ProductDocument>(PRODUCTS_COLLECTION).deleteOne({ id });
  return result.deletedCount === 1;
}
