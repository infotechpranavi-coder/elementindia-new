"use client";

import type { CSSProperties, MouseEvent } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { SOCIAL_LINKS, type SocialPlatform } from "@/lib/brand";

type SocialIconsProps = {
  size?: number;
  gap?: number;
};

const icons: {
  key: SocialPlatform;
  label: string;
  Icon: IconType;
  background: string;
}[] = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF, background: "#1877F2" },
  {
    key: "instagram",
    label: "Instagram",
    Icon: FaInstagram,
    background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 45%, #8134AF 100%)",
  },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn, background: "#0A66C2" },
  { key: "youtube", label: "YouTube", Icon: FaYoutube, background: "#FF0000" },
  { key: "x", label: "X", Icon: FaXTwitter, background: "#000000" },
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp, background: "#25D366" },
];

function isActiveLink(url: string) {
  const trimmed = url.trim();
  return trimmed.length > 0 && trimmed !== "#";
}

export default function SocialIcons({ size = 36, gap = 8 }: SocialIconsProps) {
  const iconSize = Math.round(size * 0.48);

  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${icons.length}, ${size}px)`,
    gap,
    width: "fit-content",
    maxWidth: "100%",
  };

  const hoverIn = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.35)";
  };

  const hoverOut = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
  };

  const buttonStyle = (background: string, active: boolean): CSSProperties => ({
    width: size,
    height: size,
    borderRadius: "50%",
    background,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    textDecoration: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    cursor: active ? "pointer" : "default",
  });

  return (
    <div style={rowStyle}>
      {icons.map(({ key, label, Icon, background }) => {
        const href = SOCIAL_LINKS[key];
        const active = isActiveLink(href);
        const content = <Icon size={iconSize} aria-hidden />;

        if (!active) {
          return (
            <span
              key={key}
              title={`${label} — link coming soon`}
              aria-label={`${label} — link coming soon`}
              style={buttonStyle(background, false)}
            >
              {content}
            </span>
          );
        }

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — Elemen India`}
            title={label}
            style={buttonStyle(background, true)}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
