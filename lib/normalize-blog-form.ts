import type { BlogPost } from "@/lib/catalog-types";
import { estimateReadTimeMinutes } from "@/lib/format-blog";
import { slugify } from "@/lib/slugify";

export type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  readTimeMinutes: number;
  published: boolean;
};

export function emptyBlogForm(): BlogFormState {
  return normalizeBlogForm({});
}

export function normalizeBlogForm(input: Partial<BlogFormState>): BlogFormState {
  let publishedAt = input.publishedAt ?? "";
  if (publishedAt.length > 10) {
    publishedAt = publishedAt.slice(0, 10);
  }
  if (!publishedAt) {
    publishedAt = new Date().toISOString().slice(0, 10);
  }

  const readTime = input.readTimeMinutes;

  return {
    title: input.title ?? "",
    slug: input.slug ?? "",
    excerpt: input.excerpt ?? "",
    content: input.content ?? "",
    category: input.category ?? "",
    imageUrl: input.imageUrl ?? "",
    publishedAt,
    readTimeMinutes:
      typeof readTime === "number" && Number.isFinite(readTime) && readTime > 0
        ? Math.round(readTime)
        : 5,
    published: input.published !== false,
  };
}

export function blogToForm(item: BlogPost): BlogFormState {
  return normalizeBlogForm({
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category,
    imageUrl: item.imageUrl,
    publishedAt: item.publishedAt,
    readTimeMinutes: item.readTimeMinutes,
    published: item.published,
  });
}

export function formToBlogPayload(form: BlogFormState, existingSlug?: string) {
  const title = form.title.trim();
  const slug = (form.slug.trim() || slugify(title) || existingSlug || "").trim();
  const content = form.content.trim();
  const readTime =
    Number.isFinite(form.readTimeMinutes) && form.readTimeMinutes > 0
      ? Math.round(form.readTimeMinutes)
      : estimateReadTimeMinutes(content);

  return {
    slug,
    title,
    excerpt: form.excerpt.trim(),
    content,
    category: form.category.trim(),
    imageUrl: form.imageUrl.trim(),
    publishedAt: new Date(form.publishedAt || Date.now()).toISOString(),
    readTimeMinutes: readTime,
    published: Boolean(form.published),
  };
}
