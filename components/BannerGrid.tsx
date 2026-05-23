"use client";
import Link from "next/link";
import { useState } from "react";
import { homeImages } from "@/lib/content/home-images";

const banners = [
  {
    title: "Corporate Office",
    sub: "Access, CCTV & IT",
    cta: "Explore",
    href: "/industry/corporate-office",
    img: homeImages.banners.corporate,
    discount: "Enterprise Ready",
    color: "#5B1D36",
    size: "large",
  },
  {
    title: "Healthcare",
    sub: "Hospital & Clinics",
    cta: "Learn More",
    href: "/industry/hospital-healthcare",
    img: homeImages.banners.hospital,
    discount: "Life Safety",
    color: "#1a2744",
    size: "small",
  },
  {
    title: "Banking & Finance",
    sub: "Secure Facilities",
    cta: "View Solutions",
    href: "/industry/banking-finance-sector",
    img: homeImages.banners.banking,
    discount: "High Security",
    color: "#5B1D36",
    size: "small",
  },
];

export default function BannerGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="elemen-section-white" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <div className="text-center" style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--wine-berry)", textTransform: "uppercase", fontWeight: 600 }}>Industries</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", color: "var(--navy)", fontWeight: 700 }}>Solutions by Sector</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "260px 260px", gap: 20 }}>
          <Link
            href={banners[0].href}
            style={{ gridRow: "1 / 3", gridColumn: "1", borderRadius: 12, overflow: "hidden", position: "relative", display: "block", textDecoration: "none" }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banners[0].img} alt={banners[0].title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === 0 ? "scale(1.06)" : "scale(1)", transition: "transform 0.55s ease" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,39,68,0.85) 0%, rgba(26,39,68,0.2) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px" }}>
              <span style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{banners[0].discount}</span>
              <h3 style={{ fontSize: 28, color: "#fff", margin: "8px 0 6px", fontWeight: 700 }}>{banners[0].title}</h3>
              <p style={{ color: "#ccc", fontSize: 13, marginBottom: 18 }}>{banners[0].sub}</p>
              <span style={{ display: "inline-block", padding: "10px 24px", background: banners[0].color, color: "#fff", fontWeight: 600, fontSize: 13, borderRadius: 3 }}>{banners[0].cta}</span>
            </div>
          </Link>

          {[1, 2].map((idx) => (
            <Link
              key={idx}
              href={banners[idx].href}
              style={{
                gridColumn: idx === 1 ? "2 / 4" : "2",
                gridRow: idx === 1 ? "1" : "2",
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                display: "block",
                textDecoration: "none",
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={banners[idx].img} alt={banners[idx].title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === idx ? "scale(1.06)" : "scale(1)", transition: "transform 0.55s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,39,68,0.75) 0%, transparent 70%)" }} />
              <div style={{ position: "absolute", top: 28, left: 28 }}>
                <span style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{banners[idx].discount}</span>
                <h3 style={{ fontSize: 22, color: "#fff", margin: "8px 0 6px", fontWeight: 700 }}>{banners[idx].title}</h3>
                <p style={{ color: "#ccc", fontSize: 13, marginBottom: 16 }}>{banners[idx].sub}</p>
                <span style={{ display: "inline-block", padding: "9px 20px", background: banners[idx].color, color: "#fff", fontWeight: 600, fontSize: 12, borderRadius: 3 }}>{banners[idx].cta}</span>
              </div>
            </Link>
          ))}

          <div
            style={{
              gridColumn: "3",
              gridRow: "2",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              background: "linear-gradient(135deg, var(--navy), var(--wine-berry-dark))",
            }}
          >
            <div style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Free Consultation</span>
              <h3 style={{ fontSize: 22, color: "#fff", margin: "10px 0 8px", fontWeight: 700 }}>Get a Site Survey</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 18 }}>Expert assessment for CCTV & security needs</p>
              <Link href="/contact-us" style={{ display: "inline-block", padding: "10px 22px", background: "#fff", color: "var(--navy)", textDecoration: "none", fontWeight: 600, fontSize: 13, borderRadius: 3, width: "fit-content" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
