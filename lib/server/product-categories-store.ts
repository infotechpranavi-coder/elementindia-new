import type { ProductCategoryItem } from "@/lib/catalog-types";
import { slugify } from "@/lib/slugify";
import { PRODUCT_CATEGORIES_COLLECTION, getDb, isMongoConfigured } from "@/lib/server/db/mongodb";
import {
  toProductCategoryItem,
  type ProductCategoryDocument,
} from "@/lib/server/db/product-category-schema";

const DEFAULT_CATEGORIES = [
  { name: "CCTV", slug: "cctv", description: "Surveillance cameras and recording systems." },
  { name: "Access", slug: "access", description: "Access control and biometric solutions." },
  { name: "Network", slug: "network", description: "Networking and connectivity products." },
  { name: "Safety", slug: "safety", description: "Safety and security hardware." },
];

function fallbackCategories(): ProductCategoryItem[] {
  return DEFAULT_CATEGORIES.map((item, index) => ({
    id: `pcat-${item.slug}`,
    name: item.name,
    slug: item.slug,
    description: item.description,
    sortOrder: index,
  }));
}

async function ensureDefaultCategories() {
  const db = await getDb();
  const collection = db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION);
  const count = await collection.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await collection.insertMany(
    DEFAULT_CATEGORIES.map((item, index) => ({
      id: `pcat-${item.slug}`,
      name: item.name,
      slug: item.slug,
      description: item.description,
      sortOrder: index,
      createdAt: now,
      updatedAt: now,
    })),
  );
}

async function uniqueSlug(base: string, excludeId?: string) {
  const db = await getDb();
  let slug = slugify(base) || `category-${Date.now()}`;
  let attempt = 0;

  while (attempt < 20) {
    const existing = await collectionFindBySlug(db, slug, excludeId);
    if (!existing) return slug;
    attempt += 1;
    slug = `${slugify(base) || "category"}-${attempt + 1}`;
  }

  return `${slugify(base) || "category"}-${Date.now()}`;
}

async function collectionFindBySlug(db: Awaited<ReturnType<typeof getDb>>, slug: string, excludeId?: string) {
  return db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION).findOne({
    slug,
    ...(excludeId ? { id: { $ne: excludeId } } : {}),
  });
}

export async function listProductCategories() {
  if (!isMongoConfigured()) return fallbackCategories();

  try {
    await ensureDefaultCategories();
    const db = await getDb();
    const docs = await db
      .collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION)
      .find({})
      .sort({ sortOrder: 1, name: 1 })
      .toArray();

    const seenSlugs = new Set<string>();
    return docs
      .map(toProductCategoryItem)
      .filter((cat) => {
        const slugKey = cat.slug.toLowerCase();
        if (seenSlugs.has(slugKey)) return false;
        seenSlugs.add(slugKey);
        return true;
      });
  } catch (err) {
    console.error("[categories] Failed to load product categories:", err);
    return fallbackCategories();
  }
}

export async function getProductCategoryBySlug(slug: string) {
  if (!isMongoConfigured()) {
    const match = DEFAULT_CATEGORIES.find((cat) => cat.slug === slug);
    if (!match) return null;
    return {
      id: `pcat-${match.slug}`,
      name: match.name,
      slug: match.slug,
      description: match.description,
      sortOrder: DEFAULT_CATEGORIES.indexOf(match),
    };
  }

  try {
    await ensureDefaultCategories();
    const db = await getDb();
    const doc = await db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION).findOne({ slug });
    if (!doc) return null;
    return toProductCategoryItem(doc);
  } catch (err) {
    console.error("[categories] Failed to load category:", err);
    return null;
  }
}

export async function getProductCategoryById(id: string) {
  await ensureDefaultCategories();
  const db = await getDb();
  const doc = await db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION).findOne({ id });
  if (!doc) return null;
  return toProductCategoryItem(doc);
}

export async function createProductCategory(input: Omit<ProductCategoryItem, "id">) {
  await ensureDefaultCategories();
  const db = await getDb();
  const collection = db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION);
  const name = input.name.trim();
  const nameTaken = await collection.findOne({
    name: { $regex: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
  });
  if (nameTaken) {
    throw new Error("A category with this name already exists.");
  }
  const slug = await uniqueSlug(input.slug || input.name);
  const sortOrder = await collection.countDocuments();
  const now = new Date();
  const doc: ProductCategoryDocument = {
    id: `pcat-${Date.now()}`,
    name: input.name.trim(),
    slug,
    description: input.description?.trim(),
    sortOrder,
    createdAt: now,
    updatedAt: now,
  };
  await collection.insertOne(doc);
  return toProductCategoryItem(doc);
}

export async function updateProductCategory(id: string, input: Omit<ProductCategoryItem, "id">) {
  await ensureDefaultCategories();
  const db = await getDb();
  const collection = db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION);
  const name = input.name.trim();
  const nameTaken = await collection.findOne({
    id: { $ne: id },
    name: { $regex: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
  });
  if (nameTaken) {
    throw new Error("A category with this name already exists.");
  }
  const slug = await uniqueSlug(input.slug || input.name, id);
  const result = await db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION).findOneAndUpdate(
    { id },
    {
      $set: {
        name: input.name.trim(),
        slug,
        description: input.description?.trim(),
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  );
  if (!result) return null;
  return toProductCategoryItem(result);
}

export async function deleteProductCategory(id: string) {
  await ensureDefaultCategories();
  const db = await getDb();
  const result = await db.collection<ProductCategoryDocument>(PRODUCT_CATEGORIES_COLLECTION).deleteOne({ id });
  return result.deletedCount === 1;
}
