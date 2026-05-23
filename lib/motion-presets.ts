/** Preset scroll-reveal animations — use a different one per section/page block */

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "rotate-in"
  | "blur-in"
  | "skew-up";

export type MotionState = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  skewY?: number;
  filter?: string;
};

export const revealVariants: Record<
  RevealVariant,
  { hidden: MotionState; visible: MotionState }
> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.88, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1 },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 14, y: 36 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -4, scale: 0.92, y: 24 },
    visible: { opacity: 1, rotate: 0, scale: 1, y: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  "skew-up": {
    hidden: { opacity: 0, skewY: 4, y: 48 },
    visible: { opacity: 1, skewY: 0, y: 0 },
  },
};

/** Cycle through variants for grid items */
export function staggerVariantAt(index: number): RevealVariant {
  const pool: RevealVariant[] = [
    "fade-up",
    "fade-left",
    "fade-right",
    "zoom-in",
    "rotate-in",
    "blur-in",
  ];
  return pool[index % pool.length];
}

const detailPagePool: RevealVariant[] = [
  "fade-left",
  "fade-right",
  "zoom-in",
  "flip-up",
  "rotate-in",
  "blur-in",
  "skew-up",
  "fade-down",
];

/** Unique image + content animation per detail page slug */
export function variantsForSlug(slug: string): {
  image: RevealVariant;
  content: RevealVariant;
} {
  const hash = slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return {
    image: detailPagePool[hash % detailPagePool.length],
    content: detailPagePool[(hash + 3) % detailPagePool.length],
  };
}
