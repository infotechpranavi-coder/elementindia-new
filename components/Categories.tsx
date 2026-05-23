"use client";
import Link from "next/link";
import { useState } from "react";
import { homeImages } from "@/lib/content/home-images";

const categories = [
  { name: "CCTV Systems", count: 120, href: "/our-services/cctv-system", img: homeImages.categories.cctv },
  { name: "Access Control", count: 85, href: "/our-services/access-control-system", img: homeImages.categories.accessControl },
  { name: "Fire Safety", count: 64, href: "/our-services/fire-alarm-system", img: homeImages.categories.fireSafety },
  { name: "Network & IT", count: 92, href: "/our-services/network-management", img: homeImages.categories.network },
  { name: "Visitor Management", count: 48, href: "/our-services/visitor-management", img: homeImages.categories.visitor },
  { name: "Time Attendance", count: 56, href: "/our-services/time-attendance-management", img: homeImages.categories.attendance },
];

export default function Categories() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="elemen-dots" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <div className="text-center" style={{ marginBottom: 50 }}>
          <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--wine-berry)", textTransform: "uppercase", fontWeight: 600 }}>Our Expertise</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--navy)", margin: "10px 0 16px", fontWeight: 700 }}>Solutions We Provide</h2>
          <p style={{ color: "var(--text-mid)", fontSize: 15, maxWidth: 560, margin: "0 auto" }}>
            End-to-end security, surveillance, and IT infrastructure services for every industry.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6" style={{ gap: 16 }}>
          {categories.map((cat, i) => (
            <Link href={cat.href} key={cat.name} style={{ textDecoration: "none" }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "3/4", boxShadow: hovered === i ? "0 15px 40px rgba(26,39,68,0.2)" : "0 4px 15px rgba(26,39,68,0.08)", transition: "all 0.35s ease", transform: hovered === i ? "translateY(-6px)" : "none", border: hovered === i ? "2px solid var(--gold)" : "2px solid transparent" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === i ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: hovered === i ? "linear-gradient(to top, rgba(91,29,54,0.9) 0%, rgba(26,39,68,0.45) 60%, transparent 100%)" : "linear-gradient(to top, rgba(26,39,68,0.7) 0%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 14px", color: "#fff" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{cat.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{cat.count}+ Projects</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
