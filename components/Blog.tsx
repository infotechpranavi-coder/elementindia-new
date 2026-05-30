"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import BlogPostCard from "@/components/BlogPostCard";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";
import type { BlogPost } from "@/lib/catalog-types";

type Props = {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
};

export default function Blog({ limit = 3, showHeader = true, showViewAll = true }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    void fetch(`/api/blogs?limit=${limit}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setPosts(data.blogs || []))
      .catch(() => setPosts([]));
  }, [limit]);

  if (posts.length === 0) return null;

  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        {showHeader ? (
          <div
            className="flex flex-col md:flex-row items-end justify-between gap-4"
            style={{ marginBottom: 40 }}
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "var(--wine-berry)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Insights
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 40px)",
                  color: "var(--navy)",
                  margin: "10px 0 0",
                  fontWeight: 700,
                }}
              >
                Security & IT Articles
              </h2>
            </div>
            {showViewAll ? (
              <Link
                href="/blogs"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--wine-berry)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                View All Posts <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
        ) : null}

        <ScrollStagger className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }} stagger={0.12}>
          {posts.map((post, i) => (
            <ScrollStaggerItem key={post.id} variant={staggerVariantAt(i)}>
              <BlogPostCard
                post={post}
                index={i}
                hovered={hovered === i}
                onHover={(value) => setHovered(value ? i : null)}
              />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
