"use client";

import { useEffect, useState } from "react";
import ProductsCatalog from "@/components/ProductsCatalog";
import type { ProductItem } from "@/lib/catalog-types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    void fetch("/api/dashboard/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  return <ProductsCatalog products={products} showViewAllLink />;
}
