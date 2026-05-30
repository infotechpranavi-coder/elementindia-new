"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { catalogItemToProductCard } from "@/lib/map-product-card";
import type { ProductCategoryItem, ProductItem } from "@/lib/catalog-types";
import { productMatchesCategory } from "@/lib/product-category-match";

type Props = {
  products: ProductItem[];
  showHeader?: boolean;
  showFilters?: boolean;
  showViewAllLink?: boolean;
  showPrice?: boolean;
  largeCards?: boolean;
  layout?: "grid" | "list";
  searchQuery?: string;
};

function matchesSearch(product: ProductItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    product.name.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q)
  );
}

export default function ProductsCatalog({
  products,
  showHeader = true,
  showFilters = true,
  showViewAllLink = false,
  showPrice = true,
  largeCards = false,
  layout = "grid",
  searchQuery = "",
}: Props) {
  const [active, setActive] = useState("All");
  const [categories, setCategories] = useState<ProductCategoryItem[]>([]);
  const searchableProducts = useMemo(
    () => products.filter((product) => matchesSearch(product, searchQuery)),
    [products, searchQuery],
  );
  const cards = useMemo(
    () => searchableProducts.map(catalogItemToProductCard),
    [searchableProducts],
  );

  useEffect(() => {
    void fetch("/api/product-categories", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const filterTabs = useMemo(() => {
    const categoriesWithProducts = categories.filter((category) =>
      searchableProducts.some((product) => productMatchesCategory(product, category)),
    );
    return ["All", ...categoriesWithProducts.map((cat) => cat.name)];
  }, [categories, searchableProducts]);

  useEffect(() => {
    if (active !== "All" && !filterTabs.includes(active)) {
      setActive("All");
    }
  }, [active, filterTabs]);

  const filtered = useMemo(() => {
    if (active === "All") return cards;
    const category = categories.find((cat) => cat.name === active);
    const matchingIds = new Set(
      searchableProducts
        .filter((product) =>
          category ? productMatchesCategory(product, category) : product.category === active,
        )
        .map((product) => product.id),
    );
    return cards.filter((card) => matchingIds.has(String(card.id)));
  }, [active, cards, categories, searchableProducts]);

  const gridClass = largeCards
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  const gridGap = largeCards ? 28 : 20;

  if (layout === "list") {
    return (
      <div>
        {showFilters ? (
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 24 }}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 50,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: active === tab ? "var(--wine-berry)" : "transparent",
                  color: active === tab ? "#fff" : "var(--text-mid)",
                  border: active === tab ? "1.5px solid var(--wine-berry)" : "1.5px solid var(--border)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
          {filtered.map((product) => {
            const item = searchableProducts.find((p) => p.id === product.id);
            if (!item) return null;
            return (
              <figure
                key={product.id}
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  margin: 0,
                  background: "#fff",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
                <figcaption style={{ padding: 14 }}>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--wine-berry)",
                      fontWeight: 600,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      margin: "0 0 6px",
                    }}
                  >
                    {categoryLabelFor(item, categories)}
                  </p>
                  <h3 style={{ fontSize: 16, margin: "0 0 8px", color: "var(--navy)" }}>{item.name}</h3>
                  <p style={{ margin: "0 0 10px", fontWeight: 600 }}>
                    Rs. {item.price?.toLocaleString("en-IN") ?? "—"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--text-mid)" }}>{item.description}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-mid)", marginTop: 16 }}>No products in this category yet.</p>
        ) : null}
      </div>
    );
  }

  return (
    <section className={showHeader ? "elemen-section-white" : undefined} style={{ padding: showHeader ? "80px 0" : 0 }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: showHeader ? "0 20px" : 0 }}>
        {showHeader ? (
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            style={{ marginBottom: 40 }}
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "var(--wine-berry)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Featured
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 40px)",
                  color: "var(--navy)",
                  margin: "10px 0 0",
                  fontWeight: 700,
                }}
              >
                Security & IT Products
              </h2>
            </div>
            {showFilters ? (
              <div className="flex flex-wrap gap-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActive(tab)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 50,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      background: active === tab ? "var(--wine-berry)" : "transparent",
                      color: active === tab ? "#fff" : "var(--text-mid)",
                      border: active === tab ? "1.5px solid var(--wine-berry)" : "1.5px solid var(--border)",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : showFilters ? (
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 24 }}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 50,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: active === tab ? "var(--wine-berry)" : "transparent",
                  color: active === tab ? "#fff" : "var(--text-mid)",
                  border: active === tab ? "1.5px solid var(--wine-berry)" : "1.5px solid var(--border)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : null}

        <div className={gridClass} style={{ gap: gridGap }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} showPrice={showPrice} large={largeCards} />
          ))}
        </div>

        {searchQuery.trim() && filtered.length === 0 ? (
          <p style={{ color: "var(--text-mid)", textAlign: "center", marginTop: 24 }}>
            No products found for &ldquo;{searchQuery.trim()}&rdquo;.
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "var(--text-mid)", textAlign: "center", marginTop: 24 }}>
            No products in this category yet.
          </p>
        ) : null}

        {showViewAllLink ? (
          <div className="text-center" style={{ marginTop: 50 }}>
            <Link href="/products" className="elemen-btn-outline">
              View All Products →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function categoryLabelFor(product: ProductItem, categories: ProductCategoryItem[]) {
  const match = categories.find((cat) => productMatchesCategory(product, cat));
  return match?.name ?? product.category;
}
