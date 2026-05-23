"use client";

import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import SocialIcons from "@/components/SocialIcons";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { OFFICE_ADDRESS_FULL, PHONE_PRIMARY } from "@/lib/brand";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Rayaansh+Arcade+Thane+Station+West+Thane+400602&t=&z=16&ie=UTF8&iwloc=&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Thane+Station+West+Thane+400602+Maharashtra";

export default function ContactAddressSection() {
  return (
    <section
      className="elemen-dots"
      style={{
        padding: "56px 20px 72px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal variant="fade-up">
          <article
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid var(--border)",
              boxShadow: "0 12px 40px rgba(26, 39, 68, 0.1)",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "28px 32px 24px",
                borderBottom: "1px solid var(--border)",
                background:
                  "linear-gradient(135deg, var(--bg-light) 0%, #fff 100%)",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "var(--wine-berry)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Visit us
              </span>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 30px)",
                  fontWeight: 700,
                  color: "var(--navy)",
                  margin: "8px 0 0",
                }}
              >
                Office Address & Location
              </h2>
            </div>

            {/* Address + map in one row */}
            <div
              className="flex flex-col lg:flex-row"
              style={{ minHeight: 380 }}
            >
              {/* Address side */}
              <div
                style={{
                  flex: "0 0 auto",
                  width: "100%",
                  maxWidth: "100%",
                  padding: "28px 32px",
                  borderBottom: "1px solid var(--border)",
                }}
                className="contact-address-side"
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--wine-berry)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <MapPin size={22} style={{ color: "#fff" }} />
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--navy)",
                    marginBottom: 12,
                  }}
                >
                  ELEMEN INDIA Office
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--text-mid)",
                    lineHeight: 1.85,
                    marginBottom: 16,
                  }}
                >
                  {OFFICE_ADDRESS_FULL}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-light)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  Near Thane Station (West) — accessible by road and rail.
                  Schedule a site visit or consultation with our team.
                </p>
                <p style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 20 }}>
                  <strong style={{ color: "var(--navy)" }}>Phone:</strong>{" "}
                  <a
                    href={`tel:+91${PHONE_PRIMARY}`}
                    style={{ color: "var(--wine-berry)", textDecoration: "none" }}
                  >
                    (+91) {PHONE_PRIMARY}
                  </a>
                </p>
                <Link
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--wine-berry)",
                    textDecoration: "none",
                  }}
                >
                  Open in Google Maps
                  <ExternalLink size={14} />
                </Link>
              </div>

              {/* Google Map preview */}
              <div
                style={{
                  flex: 1,
                  minHeight: 320,
                  position: "relative",
                  background: "var(--bg-section)",
                }}
              >
                <iframe
                  title="Google Maps — Elemen India office, Thane"
                  src={MAP_EMBED}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    display: "block",
                    position: "absolute",
                    inset: 0,
                    minHeight: 320,
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Card footer — social */}
            <div
              style={{
                padding: "22px 32px",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-light)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
              }}

            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--navy)",
                  margin: 0,
                }}
              >
                Follow ELEMEN INDIA
              </p>
              <SocialIcons size={36} gap={14} />
            </div>
          </article>
        </ScrollReveal>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-address-side {
            width: 340px !important;
            max-width: 340px !important;
            border-right: 1px solid var(--border) !important;
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
