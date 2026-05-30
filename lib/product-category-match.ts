import type { ProductCategoryItem } from "@/lib/catalog-types";
import type { ProductItem } from "@/lib/catalog-types";

export function productMatchesCategory(
  product: ProductItem,
  category: ProductCategoryItem,
) {
  const value = product.category.trim().toLowerCase();
  return (
    value === category.slug.toLowerCase() || value === category.name.toLowerCase()
  );
}

export function categoryLabelForProduct(
  product: ProductItem,
  categories: ProductCategoryItem[],
) {
  const match = categories.find((cat) => productMatchesCategory(product, cat));
  return match?.name ?? product.category;
}
