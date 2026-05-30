import type { ProductItem } from "@/lib/catalog-types";

/** MongoDB document shape for the `products` collection. */
export type ProductDocument = ProductItem & {
  createdAt: Date;
  updatedAt: Date;
};

export function toProductItem(doc: ProductDocument): ProductItem {
  const price =
    typeof doc.price === "number" && Number.isFinite(doc.price) ? doc.price : undefined;

  return {
    id: String(doc.id ?? ""),
    name: String(doc.name ?? ""),
    category: String(doc.category ?? ""),
    ...(price !== undefined ? { price } : {}),
    description: String(doc.description ?? ""),
    imageUrl: String(doc.imageUrl ?? ""),
    oldPrice: doc.oldPrice,
    badge: doc.badge,
    badgeColor: doc.badgeColor,
    rating: doc.rating,
    reviews: doc.reviews,
  };
}
