"use client";

import { brandCategories } from "@/lib/content/brands";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";

function BrandTile({ name, tagline }: { name: string; tagline?: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 6,
        minHeight: 88,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 12px",
        textAlign: "center",
        transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(26, 39, 68, 0.1)";
        e.currentTarget.style.borderColor = "var(--gold)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e0e0e0";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          fontSize: name.length > 12 ? 13 : 15,
          fontWeight: 700,
          color: "#1a1a1a",
          letterSpacing: name === name.toUpperCase() ? 0.5 : 0,
          lineHeight: 1.25,
          textTransform: name === "dahua" || name === "apollo" ? "none" : undefined,
        }}
      >
        {name}
      </span>
      {tagline && (
        <span
          style={{
            fontSize: 10,
            color: "#666",
            marginTop: 6,
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {tagline}
        </span>
      )}
    </div>
  );
}

export default function BrandsShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {brandCategories.map((category, catIndex) => (
        <ScrollReveal
          key={category.id}
          variant={staggerVariantAt(catIndex)}
        >
          <section>
            <h2
              style={{
                fontSize: "clamp(18px, 2.5vw, 22px)",
                fontWeight: 700,
                color: "var(--wine-berry)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              {category.title}
            </h2>
            <div
              style={{
                height: 4,
                background: "#1a1a1a",
                marginBottom: 24,
                borderRadius: 1,
              }}
              aria-hidden
            />
            <ScrollStagger
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 16,
              }}
              stagger={0.05}
            >
              {category.brands.map((brand, i) => (
                <ScrollStaggerItem key={`${category.id}-${brand.name}`} variant="fade-up">
                  <BrandTile name={brand.name} tagline={brand.tagline} />
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </section>
        </ScrollReveal>
      ))}
    </div>
  );
}
