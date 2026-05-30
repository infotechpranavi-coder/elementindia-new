export const BLOG_CATEGORIES = [
  "CCTV",
  "Access Control",
  "IT Solutions",
  "Network",
  "Safety",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}
