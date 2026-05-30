"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  Headphones,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import AccountMenu from "@/components/AccountMenu";
import { useCart } from "@/components/CartProvider";
import { HEADER_BG, WINE_BERRY, SEARCH_ALL_CATEGORIES } from "@/lib/nav";
import { BRAND_NAME, LOGO_SRC } from "@/lib/brand";
import type { ProductCategoryItem } from "@/lib/catalog-types";

export default function SiteHeader() {
  const router = useRouter();
  const { count } = useCart();
  const [productCategories, setProductCategories] = useState<ProductCategoryItem[]>([]);
  const [category, setCategory] = useState(SEARCH_ALL_CATEGORIES);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const searchCategoryOptions = useMemo(
    () => [SEARCH_ALL_CATEGORIES, ...productCategories.map((cat) => cat.name)],
    [productCategories],
  );

  useEffect(() => {
    void fetch("/api/product-categories", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProductCategories(data.categories || []))
      .catch(() => setProductCategories([]));
  }, []);

  function runSearch(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = query.trim();
    const selected = productCategories.find((cat) => cat.name === category);

    if (selected) {
      const path = trimmed
        ? `/products/category/${selected.slug}?q=${encodeURIComponent(trimmed)}`
        : `/products/category/${selected.slug}`;
      router.push(path);
      return;
    }

    const path = trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products";
    router.push(path);
  }

  return (
    <header
      style={{
        background: HEADER_BG,
        position: "relative",
        zIndex: 1100,
        overflow: "visible",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={BRAND_NAME}
            style={{
              height: 56,
              width: "auto",
              maxWidth: 200,
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>

        <form
          className="hidden md:flex"
          style={{
            flex: 1,
            maxWidth: 720,
            minWidth: 280,
            marginLeft: 48,
            marginRight: 16,
          }}
          onSubmit={runSearch}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              borderRadius: 999,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Search in product category"
                style={{
                  appearance: "none",
                  padding: "12px 36px 12px 18px",
                  border: "none",
                  background: "#f0f0f0",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#333",
                  cursor: "pointer",
                  outline: "none",
                  borderRight: "1px solid #e0e0e0",
                  height: "100%",
                  maxWidth: 160,
                }}
              >
                {searchCategoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#666",
                }}
              />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name..."
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "none",
                fontSize: 14,
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0 22px",
                background: WINE_BERRY,
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        <div
          className="flex items-center"
          style={{
            marginLeft: "auto",
            flexShrink: 0,
            gap: 20,
          }}
        >
          <Link
            href="/contact-us"
            className="hidden lg:flex items-center gap-3"
            style={{ textDecoration: "none", flexShrink: 0 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: WINE_BERRY,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Headphones size={20} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#aaa" }}>Contact Us</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                (+91) 9867111459
              </div>
            </div>
          </Link>
          <AccountMenu />

          <div
            style={{
              width: 1,
              height: 36,
              background: "rgba(255,255,255,0.15)",
            }}
            className="hidden sm:block"
          />

          <Link
            href="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              padding: 8,
              textDecoration: "none",
              color: "#fff",
            }}
            aria-label={`Cart, ${count} items`}
          >
            <div style={{ position: "relative" }}>
              <ShoppingCart size={24} strokeWidth={1.5} />
              {count > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -8,
                    background: WINE_BERRY,
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    padding: "0 4px",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </div>
          </Link>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: 8,
            }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <form
        className="md:hidden"
        style={{ padding: "0 20px 12px" }}
        onSubmit={runSearch}
      >
        <div
          style={{
            display: "flex",
            borderRadius: 999,
            overflow: "hidden",
            background: "#fff",
            marginBottom: 8,
          }}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Search in product category"
            style={{
              padding: "10px 12px",
              border: "none",
              background: "#f0f0f0",
              fontSize: 13,
              maxWidth: 130,
            }}
          >
            {searchCategoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0 16px",
              background: WINE_BERRY,
              border: "none",
              color: "#fff",
            }}
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      <div style={{ height: 3, background: "var(--gold)" }} />

      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            background: HEADER_BG,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "12px 20px 16px",
          }}
        >
          <Link
            href="/contact-us"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#fff",
              textDecoration: "none",
              marginBottom: 12,
              fontSize: 14,
            }}
            onClick={() => setMobileOpen(false)}
          >
            <Headphones size={18} />
            (+91) 9867111459
          </Link>
          <Link
            href="/account"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
            }}
            onClick={() => setMobileOpen(false)}
          >
            My Account
          </Link>
        </div>
      )}
    </header>
  );
}
