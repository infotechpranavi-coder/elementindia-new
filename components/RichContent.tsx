"use client";

import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";

type Block =
  | { type: "p"; text: string; boldPrefix?: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

type RichContentProps = {
  blocks: Block[];
  /** About page uses maroon headings without underline */
  variant?: "default" | "about";
};

export default function RichContent({ blocks, variant = "default" }: RichContentProps) {
  const isAbout = variant === "about";
  return (
    <ScrollStagger
      style={{ display: "flex", flexDirection: "column", gap: isAbout ? 20 : 16 }}
      stagger={0.1}
    >
      {blocks.map((block, i) => {
        const revealVariant = staggerVariantAt(i);

        if (block.type === "h2") {
          return (
            <ScrollStaggerItem key={i} variant={revealVariant}>
              <h2
                style={{
                  fontSize: isAbout ? 24 : 22,
                  fontWeight: 700,
                  color: isAbout ? "var(--wine-berry)" : "var(--navy)",
                  marginTop: i > 0 ? 28 : 0,
                  marginBottom: isAbout ? 12 : 0,
                  paddingBottom: isAbout ? 0 : 8,
                  borderBottom: isAbout ? "none" : "2px solid var(--gold)",
                }}
              >
                {block.text}
              </h2>
            </ScrollStaggerItem>
          );
        }
        if (block.type === "h3") {
          return (
            <ScrollStaggerItem key={i} variant={revealVariant}>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--wine-berry)",
                  marginTop: 8,
                }}
              >
                {block.text}
              </h3>
            </ScrollStaggerItem>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const ListTag = block.type === "ol" ? "ol" : "ul";
          return (
            <ScrollStaggerItem key={i} variant={revealVariant}>
              <ListTag
                style={{
                  paddingLeft: 22,
                  color: "var(--text-mid)",
                  fontSize: 15,
                  lineHeight: 1.85,
                }}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${itemIndex}-${item.slice(0, 24)}`} style={{ marginBottom: 8 }}>
                    {item}
                  </li>
                ))}
              </ListTag>
            </ScrollStaggerItem>
          );
        }
        return (
          <ScrollStaggerItem key={i} variant={revealVariant}>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-mid)",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {block.boldPrefix ? (
                <>
                  <strong style={{ color: "#333", fontWeight: 700 }}>{block.boldPrefix}</strong>
                  {block.text}
                </>
              ) : (
                block.text
              )}
            </p>
          </ScrollStaggerItem>
        );
      })}
    </ScrollStagger>
  );
}

export type { Block };
