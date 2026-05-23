"use client";

import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export default function RichContent({ blocks }: { blocks: Block[] }) {
  return (
    <ScrollStagger
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
      stagger={0.1}
    >
      {blocks.map((block, i) => {
        const variant = staggerVariantAt(i);

        if (block.type === "h2") {
          return (
            <ScrollStaggerItem key={i} variant={variant}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginTop: i > 0 ? 20 : 0,
                  paddingBottom: 8,
                  borderBottom: "2px solid var(--gold)",
                }}
              >
                {block.text}
              </h2>
            </ScrollStaggerItem>
          );
        }
        if (block.type === "h3") {
          return (
            <ScrollStaggerItem key={i} variant={variant}>
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
        if (block.type === "ul") {
          return (
            <ScrollStaggerItem key={i} variant={variant}>
              <ul
                style={{
                  paddingLeft: 22,
                  color: "var(--text-mid)",
                  fontSize: 15,
                  lineHeight: 1.85,
                }}
              >
                {block.items.map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollStaggerItem>
          );
        }
        return (
          <ScrollStaggerItem key={i} variant={variant}>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-mid)",
                lineHeight: 1.9,
              }}
            >
              {block.text}
            </p>
          </ScrollStaggerItem>
        );
      })}
    </ScrollStagger>
  );
}

export type { Block };
