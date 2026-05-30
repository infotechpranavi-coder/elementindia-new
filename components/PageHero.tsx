"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DEFAULT_IMAGE } from "@/lib/content/images";

export type Breadcrumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  imageSrc: string;
  imageAlt: string;
};

export default function PageHero({
  title,
  subtitle,
  breadcrumbs = [{ label: "Home", href: "/" }],
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const [src, setSrc] = useState(imageSrc);

  useEffect(() => {
    setSrc(imageSrc);
  }, [imageSrc]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "clamp(280px, 42vw, 420px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "var(--navy)",
      }}
      aria-label={`${title} — ${imageAlt}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        src={src}
        alt={imageAlt}
        fetchPriority="high"
        decoding="async"
        onError={() => {
          const fallback = DEFAULT_IMAGE;
          if (src !== fallback) setSrc(fallback);
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(26,39,68,0.55) 0%, rgba(91,29,54,0.28) 55%, rgba(26,39,68,0.2) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1300,
          margin: "0 auto",
          padding: "48px 20px 56px",
        }}
      >
        <motion.nav
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 13,
            marginBottom: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            alignItems: "center",
          }}
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, i) => (
            <span
              key={`${crumb.label}-${i}`}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.45)" }}>/</span>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  style={{
                    color: "var(--gold)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: subtitle ? 12 : 0,
            maxWidth: 800,
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.92)",
              maxWidth: 620,
              lineHeight: 1.6,
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
