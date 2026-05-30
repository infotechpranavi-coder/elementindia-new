/** Product filter tabs used on homepage and /products (not services). */
export const PRODUCT_CATEGORIES = ["CCTV", "Access", "Network", "Safety"] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}
