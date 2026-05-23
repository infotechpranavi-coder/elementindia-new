"use client";
import { DEFAULT_IMAGE } from "@/lib/content/images";

type PageImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
};

export default function PageImage({
  src,
  alt,
  caption,
  priority = false,
}: PageImageProps) {
  return (
    <figure
      style={{
        margin: "0 0 32px",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 40px rgba(26, 39, 68, 0.1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== DEFAULT_IMAGE) img.src = DEFAULT_IMAGE;
        }}
        style={{
          width: "100%",
          height: "clamp(220px, 40vw, 380px)",
          objectFit: "cover",
          display: "block",
          background: "var(--bg-section)",
        }}
      />
      {caption && (
        <figcaption
          style={{
            padding: "12px 16px",
            fontSize: 13,
            color: "var(--text-mid)",
            background: "var(--bg-light)",
            borderTop: "2px solid var(--gold)",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
