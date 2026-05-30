import type { ProductItem } from "@/lib/catalog-types";

export type ProductFormState = Omit<ProductItem, "id">;

export function emptyProductForm(): ProductFormState {
  return {
    name: "",
    category: "",
    description: "",
    imageUrl: "",
  };
}

export function normalizeProductForm(input: Partial<ProductFormState>): ProductFormState {
  const result: ProductFormState = {
    name: input.name ?? "",
    category: input.category ?? "",
    description: input.description ?? "",
    imageUrl: input.imageUrl ?? "",
    oldPrice: input.oldPrice,
    badge: input.badge,
    badgeColor: input.badgeColor,
    rating: input.rating,
    reviews: input.reviews,
  };

  if (Object.prototype.hasOwnProperty.call(input, "price")) {
    if (typeof input.price === "number" && Number.isFinite(input.price)) {
      result.price = input.price;
    }
  } else if (typeof input.price === "number" && Number.isFinite(input.price)) {
    result.price = input.price;
  }

  return result;
}

export function productToForm(item: ProductItem): ProductFormState {
  return normalizeProductForm({
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    imageUrl: item.imageUrl,
    oldPrice: item.oldPrice,
    badge: item.badge,
    badgeColor: item.badgeColor,
    rating: item.rating,
    reviews: item.reviews,
  });
}
