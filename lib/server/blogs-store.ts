import type { BlogPost } from "@/lib/catalog-types";
import { BLOGS_COLLECTION, getDb } from "@/lib/server/db/mongodb";
import { toBlogPost, type BlogDocument } from "@/lib/server/db/blog-schema";
import { slugify } from "@/lib/slugify";

async function uniqueSlug(base: string, excludeId?: string) {
  const db = await getDb();
  let slug = slugify(base) || `blog-${Date.now()}`;
  let attempt = 0;

  while (attempt < 20) {
    const existing = await db.collection<BlogDocument>(BLOGS_COLLECTION).findOne({
      slug,
      ...(excludeId ? { id: { $ne: excludeId } } : {}),
    });
    if (!existing) return slug;
    attempt += 1;
    slug = `${slugify(base) || "blog"}-${attempt + 1}`;
  }

  return `${slugify(base) || "blog"}-${Date.now()}`;
}

export async function listBlogs() {
  const db = await getDb();
  const docs = await db
    .collection<BlogDocument>(BLOGS_COLLECTION)
    .find({})
    .sort({ publishedAt: -1, createdAt: -1 })
    .toArray();
  return docs.map(toBlogPost);
}

export async function listPublishedBlogs(limit?: number) {
  const db = await getDb();
  let cursor = db
    .collection<BlogDocument>(BLOGS_COLLECTION)
    .find({ published: true })
    .sort({ publishedAt: -1 });

  if (limit && limit > 0) {
    cursor = cursor.limit(limit);
  }

  const docs = await cursor.toArray();
  return docs.map(toBlogPost);
}

export async function getBlogBySlug(slug: string, publishedOnly = false) {
  const db = await getDb();
  const doc = await db.collection<BlogDocument>(BLOGS_COLLECTION).findOne({
    slug,
    ...(publishedOnly ? { published: true } : {}),
  });
  if (!doc) return null;
  return toBlogPost(doc);
}

export async function getBlogById(id: string) {
  const db = await getDb();
  const doc = await db.collection<BlogDocument>(BLOGS_COLLECTION).findOne({ id });
  if (!doc) return null;
  return toBlogPost(doc);
}

export async function createBlog(input: Omit<BlogPost, "id">) {
  const db = await getDb();
  const id = `blog-${Date.now()}`;
  const slug = await uniqueSlug(input.slug || input.title);
  const now = new Date();
  const doc: BlogDocument = {
    id,
    ...input,
    slug,
    createdAt: now,
    updatedAt: now,
  };
  await db.collection<BlogDocument>(BLOGS_COLLECTION).insertOne(doc);
  return toBlogPost(doc);
}

export async function updateBlog(id: string, input: Omit<BlogPost, "id">) {
  const db = await getDb();
  const slug = await uniqueSlug(input.slug || input.title, id);
  const result = await db.collection<BlogDocument>(BLOGS_COLLECTION).findOneAndUpdate(
    { id },
    {
      $set: {
        ...input,
        slug,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  );
  if (!result) return null;
  return toBlogPost(result);
}

export async function deleteBlog(id: string) {
  const db = await getDb();
  const result = await db.collection<BlogDocument>(BLOGS_COLLECTION).deleteOne({ id });
  return result.deletedCount === 1;
}
