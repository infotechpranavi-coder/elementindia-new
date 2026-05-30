"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/catalog-types";
import { formatBlogDate, formatReadTime } from "@/lib/format-blog";

type Props = {
  post: BlogPost;
  index?: number;
  hovered?: boolean;
  onHover?: (hover: boolean) => void;
};

export default function BlogPostCard({ post, index, hovered, onHover }: Props) {
  const isHovered = hovered ?? false;

  return (
    <article
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        boxShadow: isHovered
          ? "0 15px 40px rgba(26,39,68,0.12)"
          : "0 4px 20px rgba(26,39,68,0.06)",
        transition: "all 0.35s ease",
        transform: isHovered ? "translateY(-6px)" : "none",
        border: "1px solid var(--border)",
        height: "100%",
      }}
    >
      <Link
        href={`/blogs/${post.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div style={{ overflow: "hidden", height: 220 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt={post.title}
            loading={index != null && index > 0 ? "lazy" : undefined}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>
        <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              background: "#5B1D36",
              padding: "4px 10px",
              borderRadius: 3,
              textTransform: "uppercase",
              letterSpacing: 1,
              alignSelf: "flex-start",
            }}
          >
            {post.category}
          </span>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "var(--navy)",
              margin: "14px 0 10px",
              lineHeight: 1.45,
            }}
          >
            {post.title}
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4" style={{ fontSize: 12, color: "#999" }}>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {formatBlogDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {formatReadTime(post.readTimeMinutes)}
            </span>
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: 16,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--wine-berry)",
              borderBottom: "1px solid var(--wine-berry)",
              width: "fit-content",
            }}
          >
            View Details →
          </span>
        </div>
      </Link>
    </article>
  );
}
