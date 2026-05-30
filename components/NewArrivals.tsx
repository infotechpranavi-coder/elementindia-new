"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { catalogItemToProductCard } from "@/lib/map-product-card";
import type { ProductItem } from "@/lib/catalog-types";
import { homeImages } from "@/lib/content/home-images";

type Props = {
  products: ProductItem[];
};

export default function NewArrivals({ products }: Props) {
  const [hovered, setHovered] = useState(false);

  const latestProducts = useMemo(
    () =>
      products.slice(0, 4).map((item) => ({
        ...catalogItemToProductCard(item),
        badge: item.badge ?? "New",
        badgeColor: item.badgeColor ?? "#5B1D36",
      })),
    [products],
  );

  return (
    <section className="elemen-dots" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <div className="flex flex-col md:flex-row gap-8">
          <div
            style={{ flex: "0 0 300px", borderRadius: 12, overflow: "hidden", position: "relative", minHeight: 500 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={homeImages.newSolutionsBanner}
              alt="Security system installation"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.5s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(91,29,54,0.9) 0%, rgba(26,39,68,0.5) 60%, transparent 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 28px", color: "#fff" }}>
              <span style={{ fontSize: 11, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", fontWeight: 600 }}>
                Just Launched
              </span>
              <h3 style={{ fontSize: 28, margin: "10px 0 12px", lineHeight: 1.2, fontWeight: 700 }}>
                Latest Security Solutions
              </h3>
              <p style={{ fontSize: 13, color: "#ccc", marginBottom: 20, lineHeight: 1.7 }}>
                New CCTV, access control, and IT products added from your catalog.
              </p>
              <Link
                href="/products"
                style={{
                  display: "inline-block",
                  padding: "11px 24px",
                  background: "var(--wine-berry)",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: 3,
                }}
              >
                View All Products
              </Link>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--wine-berry)", textTransform: "uppercase", fontWeight: 600 }}>
                New Arrivals
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--navy)", margin: "10px 0 0", fontWeight: 700 }}>
                Latest Products
              </h2>
            </div>

            {latestProducts.length === 0 ? (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 32,
                  textAlign: "center",
                }}
              >
                <p style={{ color: "var(--text-mid)", marginBottom: 16 }}>
                  Products you add in the dashboard will appear here automatically.
                </p>
                <Link href="/products" className="elemen-btn-primary">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" style={{ gap: 16 }}>
                {latestProducts.map((p, i) => (
                  <div
                    key={p.id}
                    style={{ animation: "fadeInUp 0.5s ease both", animationDelay: `${i * 0.1}s` }}
                  >
                    <ProductCard product={p} showPrice={false} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
