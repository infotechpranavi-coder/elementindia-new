"use client";
import Link from "next/link";
import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { homeImages } from "@/lib/content/home-images";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";

const posts = [
  {
    id: 1,
    title: "How to Choose the Right CCTV System for Your Facility",
    excerpt: "A practical guide to camera types, storage, resolution, and remote monitoring for offices and industrial sites.",
    img: homeImages.blog.cctvGuide,
    date: "Dec 15, 2024",
    readTime: "5 min read",
    cat: "CCTV",
  },
  {
    id: 2,
    title: "5 Benefits of Biometric Access Control",
    excerpt: "Why fingerprint and face recognition systems improve security and workforce management.",
    img: homeImages.blog.accessTips,
    date: "Dec 8, 2024",
    readTime: "7 min read",
    cat: "Access Control",
  },
  {
    id: 3,
    title: "IT Infrastructure Best Practices for SMEs",
    excerpt: "Network security, backups, and monitoring essentials for growing businesses in India.",
    img: homeImages.blog.itSecurity,
    date: "Nov 28, 2024",
    readTime: "4 min read",
    cat: "IT Solutions",
  },
];

export default function Blog() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <div className="flex flex-col md:flex-row items-end justify-between gap-4" style={{ marginBottom: 40 }}>
          <div>
            <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--wine-berry)", textTransform: "uppercase", fontWeight: 600 }}>Insights</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "var(--navy)", margin: "10px 0 0", fontWeight: 700 }}>
              Security & IT Articles
            </h2>
          </div>
          <Link href="/elements#blog" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--wine-berry)", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>

        <ScrollStagger className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }} stagger={0.12}>
          {posts.map((post, i) => (
            <ScrollStaggerItem key={post.id} variant={staggerVariantAt(i)}>
            <article
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                boxShadow: hovered === i ? "0 15px 40px rgba(26,39,68,0.12)" : "0 4px 20px rgba(26,39,68,0.06)",
                transition: "all 0.35s ease",
                transform: hovered === i ? "translateY(-6px)" : "none",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ overflow: "hidden", height: 220 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.img}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hovered === i ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                />
              </div>
              <div style={{ padding: "24px 22px" }}>
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
                  }}
                >
                  {post.cat}
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
                <p style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 16 }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4" style={{ fontSize: 12, color: "#999" }}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </div>
            </article>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
