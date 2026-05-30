import type { ProductCategoryItem } from "@/lib/catalog-types";

export type ProductCategoryDocument = ProductCategoryItem & {
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export function toProductCategoryItem(doc: ProductCategoryDocument): ProductCategoryItem {
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
  };
}
