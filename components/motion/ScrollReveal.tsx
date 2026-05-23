"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { revealVariants, type RevealVariant } from "@/lib/motion-presets";

export type { RevealVariant };

/** @deprecated use RevealVariant */
export type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none"
  | "scale";

const directionToVariant: Record<RevealDirection, RevealVariant> = {
  up: "fade-up",
  down: "fade-down",
  left: "fade-left",
  right: "fade-right",
  none: "fade-up",
  scale: "zoom-in",
};

const ease = [0.22, 1, 0.36, 1] as const;

type ScrollRevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Legacy — maps to variant */
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
};

export default function ScrollReveal({
  children,
  variant,
  direction,
  delay = 0,
  duration = 0.65,
  className,
  style,
  amount = 0.12,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const resolved = variant ?? (direction ? directionToVariant[direction] : "fade-up");
  const preset = revealVariants[resolved];
  const needsPerspective =
    resolved === "flip-up" || resolved === "rotate-in" || resolved === "skew-up";

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        ...(needsPerspective ? { perspective: 1200 } : {}),
      }}
      initial={preset.hidden}
      whileInView={preset.visible}
      viewport={{ once: true, amount, margin: "0px 0px -48px 0px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type ScrollStaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delayChildren?: number;
};

export function ScrollStagger({
  children,
  className,
  style,
  stagger = 0.08,
  delayChildren = 0,
}: ScrollStaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -48px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type ScrollStaggerItemProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: RevealVariant;
  /** Legacy */
  direction?: RevealDirection;
};

export function ScrollStaggerItem({
  children,
  className,
  style,
  variant,
  direction,
}: ScrollStaggerItemProps) {
  const reduce = useReducedMotion();
  const resolved = variant ?? (direction ? directionToVariant[direction] : "fade-up");
  const preset = revealVariants[resolved];

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: preset.hidden,
        visible: {
          ...preset.visible,
          transition: { duration: 0.55, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

