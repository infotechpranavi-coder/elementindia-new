import type { ProductItem } from "@/lib/catalog-types";
import type { Product } from "@/components/ProductCard";

export function catalogItemToProductCard(item: ProductItem): Product {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    oldPrice: item.oldPrice,
    img: item.imageUrl,
    rating: item.rating ?? 4.5,
    reviews: item.reviews ?? 0,
    badge: item.badge,
    badgeColor: item.badgeColor,
    category: item.category,
  };
}
