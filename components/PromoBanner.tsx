"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { homeImages } from "@/lib/content/home-images";

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 34, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = 23;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      style={{
        background: `linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 45%, var(--wine-berry-dark) 100%)`,
        padding: "70px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "2px solid var(--gold)",
          opacity: 0.25,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -80,
          right: -40,
          width: 280,
          height: 280,
          borderRadius: "24px",
          background: "var(--wine-berry)",
          opacity: 0.35,
        }}
      />

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div style={{ flex: "0 0 42%", position: "relative" }}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
                border: "2px solid var(--gold)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={homeImages.promo}
                alt="CCTV and surveillance installation"
                style={{
                  width: "100%",
                  display: "block",
                  height: 380,
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                background: "var(--wine-berry)",
                color: "#fff",
                padding: "12px 18px",
                borderRadius: 6,
                textAlign: "center",
                border: "1px solid var(--gold)",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                40%
              </div>
              <div style={{ fontSize: 11, letterSpacing: 1 }}>OFF</div>
            </div>
          </div>

          <div style={{ flex: 1, color: "#fff" }}>
            <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", fontWeight: 600 }}>Special Offer</span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                margin: "14px 0 16px",
                lineHeight: 1.2,
              }}
            >
              Complete CCTV
              <br />
              <span style={{ color: "var(--gold)" }}>Surveillance Package</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: 32,
                fontSize: 15,
              }}
            >
              HD cameras, NVR recording, remote monitoring, and professional
              installation — tailored for offices, retail, and industrial sites.
            </p>

            <div style={{ marginBottom: 36 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--gold)",
                  marginBottom: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Offer Ends In:
              </div>
              <div className="flex gap-3">
                {[
                  ["Hours", timeLeft.h],
                  ["Minutes", timeLeft.m],
                  ["Seconds", timeLeft.s],
                ].map(([label, val]) => (
                  <div key={label as string} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        background: "var(--wine-berry)",
                        border: "1px solid var(--gold)",
                        color: "#fff",
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        fontWeight: 700,
                      }}
                    >
                      {pad(val as number)}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.6)",
                        marginTop: 6,
                        letterSpacing: 1,
                      }}
                    >
                      {label as string}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/top-deals" className="elemen-btn-primary">
                Get a Quote
              </Link>
              <Link
                href="/our-services/cctv-system"
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  color: "#ddd",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 4,
                  border: "1.5px solid var(--gold)",
                  transition: "all 0.25s",
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
