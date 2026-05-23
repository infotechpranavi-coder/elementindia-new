"use client";
import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";

const features = [
  { icon: Shield, title: "Certified Installations", desc: "Professional CCTV & security setup" },
  { icon: Truck, title: "Pan-India Service", desc: "Nationwide support & deployment" },
  { icon: RefreshCw, title: "AMC & Maintenance", desc: "Annual maintenance contracts" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated technical assistance" },
];

export default function Features() {
  return (
    <section
      className="elemen-section-white"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <ScrollStagger className="grid grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {features.map((f, i) => (
            <ScrollStaggerItem
              key={f.title}
              variant={
                (["fade-up", "fade-left", "fade-right", "zoom-in"] as const)[i]
              }
            >
            <div
              style={{
                padding: "28px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderRight:
                  i < 3 ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "var(--wine-berry)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <f.icon size={22} style={{ color: "#fff" }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--navy)",
                    marginBottom: 2,
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-light)" }}>
                  {f.desc}
                </div>
              </div>
            </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
