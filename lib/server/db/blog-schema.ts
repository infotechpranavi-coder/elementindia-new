import type { BlogPost } from "@/lib/catalog-types";

export type BlogDocument = BlogPost & {
  createdAt: Date;
  updatedAt: Date;
};

export function toBlogPost(doc: BlogDocument): BlogPost {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    category: doc.category,
    imageUrl: doc.imageUrl,
    publishedAt: doc.publishedAt,
    readTimeMinutes: doc.readTimeMinutes,
    published: doc.published,
  };
}
