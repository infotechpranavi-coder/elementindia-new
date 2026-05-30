"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { catalogItemToProductCard } from "@/lib/map-product-card";
import type { ProductItem } from "@/lib/catalog-types";
import { formatProductPrice } from "@/lib/format-product-price";

type Props = {
  product: ProductItem;
};

export default function ProductDetailActions({ product }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const cardProduct = catalogItemToProductCard(product);
  const priceLabel = formatProductPrice(product.price);
  const discount =
    product.price != null && product.oldPrice
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  function handleAddToCart() {
    addToCart(cardProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <p
        style={{
          fontSize: 12,
          letterSpacing: 2,
          color: "var(--wine-berry)",
          textTransform: "uppercase",
          fontWeight: 600,
          margin: "0 0 10px",
        }}
      >
        {product.category}
      </p>

      {product.badge ? (
        <span
          style={{
            display: "inline-block",
            marginBottom: 12,
            padding: "4px 12px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
            background: product.badgeColor || "var(--wine-berry)",
            color: "#fff",
          }}
        >
          {product.badge}
        </span>
      ) : null}

      <h1
        style={{
          fontSize: "clamp(26px, 4vw, 36px)",
          color: "var(--navy)",
          margin: "0 0 14px",
          lineHeight: 1.25,
          fontWeight: 700,
        }}
      >
        {product.name}
      </h1>

      <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: 22 }}>
        {priceLabel ? (
          <span style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>{priceLabel}</span>
        ) : (
          <span style={{ fontSize: 20, fontWeight: 600, color: "var(--text-mid)" }}>Price on request</span>
        )}
        {product.oldPrice ? (
          <>
            <span style={{ fontSize: 18, color: "#aaa", textDecoration: "line-through" }}>
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>
            {discount ? (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  background: "#e74c3c",
                  padding: "4px 10px",
                  borderRadius: 4,
                }}
              >
                -{discount}%
              </span>
            ) : null}
          </>
        ) : null}
      </div>

      <p style={{ fontSize: 15, color: "var(--text-mid)", lineHeight: 1.85, margin: "0 0 28px" }}>
        {product.description}
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="elemen-btn-primary"
          onClick={handleAddToCart}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px" }}
        >
          <ShoppingCart size={18} />
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
        <Link href="/contact-us" className="elemen-btn-outline" style={{ padding: "14px 28px" }}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
