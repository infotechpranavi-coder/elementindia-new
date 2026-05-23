"use client";

import { Phone, Mail, Clock, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  SUPPORT_EMAIL,
  CONTACT_EMAIL,
} from "@/lib/brand";

type InfoCard = {
  icon: LucideIcon;
  title: string;
  lines: string[];
  href?: string;
};

const cards: InfoCard[] = [
  {
    icon: Phone,
    title: "Phone",
    lines: [`(+91) ${PHONE_PRIMARY}`, `(+91) ${PHONE_SECONDARY}`],
    href: `tel:+91${PHONE_PRIMARY}`,
  },
  {
    icon: Mail,
    title: "Support",
    lines: [SUPPORT_EMAIL],
    href: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    icon: Headphones,
    title: "General enquiry",
    lines: [CONTACT_EMAIL],
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Clock,
    title: "Business hours",
    lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
  },
];

export default function ContactInfoCards() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {cards.map((card) => {
        const Icon = card.icon;
        const inner = (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid var(--border)",
              padding: "22px 20px",
              boxShadow: "0 4px 20px rgba(26, 39, 68, 0.06)",
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(26, 39, 68, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(26, 39, 68, 0.06)";
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--wine-berry)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Icon size={20} style={{ color: "#fff" }} />
            </div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--navy)",
                marginBottom: 8,
              }}
            >
              {card.title}
            </h3>
            {card.lines.map((line) => (
              <p
                key={line}
                style={{
                  fontSize: 14,
                  color: "var(--text-mid)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        );

        if (card.href) {
          return (
            <a
              key={card.title}
              href={card.href}
              style={{ textDecoration: "none", display: "block" }}
            >
              {inner}
            </a>
          );
        }
        return <div key={card.title}>{inner}</div>;
      })}
    </div>
  );
}
