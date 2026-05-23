"use client";
import Link from "next/link";
import { DEFAULT_IMAGE } from "@/lib/content/images";

type ContentCardProps = {
  href: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  index?: number;
};

export default function ContentCard({
  href,
  title,
  imageSrc,
  imageAlt,
  index,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        display: "block",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "#fff",
        boxShadow: "0 4px 20px rgba(26, 39, 68, 0.06)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      className="content-card"
    >
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== DEFAULT_IMAGE) img.src = DEFAULT_IMAGE;
          }}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            display: "block",
            background: "var(--bg-section)",
          }}
        />
        {index !== undefined && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "var(--wine-berry)",
              color: "#fff",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {index}
          </span>
        )}
      </div>
      <div style={{ padding: "16px 18px" }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--navy)",
            lineHeight: 1.4,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontSize: 13,
            color: "var(--wine-berry)",
            fontWeight: 600,
            marginTop: 8,
            display: "inline-block",
          }}
        >
          Learn more →
        </span>
      </div>
      <style>{`
        a.content-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(26, 39, 68, 0.12);
        }
      `}</style>
    </Link>
  );
}
