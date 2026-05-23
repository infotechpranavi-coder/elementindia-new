"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { homeImages } from "@/lib/content/home-images";

const tabs = ["All", "CCTV", "Access", "Network", "Safety"];

const products: Product[] = [
  { id: 1, name: "HD CCTV Camera System (8 Channel)", price: 45999, oldPrice: 52999, img: homeImages.solutions.cctvKit, img2: homeImages.solutions.nvr, rating: 4.9, reviews: 124, badge: "Best Seller", badgeColor: "#1a2744", category: "CCTV" },
  { id: 2, name: "Biometric Access Control Terminal", price: 28999, oldPrice: 34999, img: homeImages.solutions.biometric, rating: 4.8, reviews: 87, badge: "Popular", badgeColor: "#5B1D36", category: "Access" },
  { id: 3, name: "Network Video Recorder (NVR)", price: 18999, img: homeImages.solutions.nvr, rating: 4.9, reviews: 203, category: "CCTV" },
  { id: 4, name: "IP Dome Camera — 4MP Night Vision", price: 8999, oldPrice: 10999, img: homeImages.solutions.cctvKit, rating: 4.7, reviews: 156, badge: "Sale", badgeColor: "#5B1D36", category: "CCTV" },
  { id: 5, name: "Enterprise Firewall Appliance", price: 64999, img: homeImages.solutions.firewall, rating: 4.6, reviews: 42, category: "Network" },
  { id: 6, name: "WiFi Management Access Point", price: 12999, oldPrice: 15999, img: homeImages.solutions.wifi, rating: 4.5, reviews: 68, category: "Network" },
  { id: 7, name: "Smoke & Heat Detector Kit", price: 7499, img: homeImages.categories.fireSafety, rating: 4.8, reviews: 94, category: "Safety" },
  { id: 8, name: "Visitor Management Kiosk", price: 54999, oldPrice: 62999, img: homeImages.solutions.visitor, rating: 4.7, reviews: 51, category: "Access" },
];

export default function FeaturedProducts() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);
  return (
    <section className="elemen-section-white" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" style={{ marginBottom: 40 }}>
          <div>
            <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--wine-berry)", textTransform: "uppercase", fontWeight: 600 }}>Featured</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "var(--navy)", margin: "10px 0 0", fontWeight: 700 }}>Security & IT Products</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button key={tab} type="button" onClick={() => setActive(tab)} style={{ padding: "8px 20px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "pointer", background: active === tab ? "var(--wine-berry)" : "transparent", color: active === tab ? "#fff" : "var(--text-mid)", border: active === tab ? "1.5px solid var(--wine-berry)" : "1.5px solid var(--border)" }}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: 20 }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 50 }}>
          <Link href="/products" className="elemen-btn-outline">View All Products →</Link>
        </div>
      </div>
    </section>
  );
}
