"use client";

import { useId } from "react";
import { SOCIAL_LINKS } from "@/lib/brand";

type SocialIconsProps = {
  size?: number;
  gap?: number;
};

function FacebookIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#1877F2" />
      <path
        d="M22.2 20.9h2.7l1.1-4.4h-3.8v-2.8c0-1.2.4-2.1 2.2-2.1h1.7V7.8c-.3 0-1.5-.1-2.9-.1-2.9 0-4.9 1.8-4.9 5v3.1h-3.3v4.4h3.3v10.6h4.9V20.9z"
        fill="#fff"
      />
    </svg>
  );
}

function InstagramIcon({ size, gradientId }: { size: number; gradientId: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill={`url(#${gradientId})`} />
      <rect
        x="10"
        y="10"
        width="20"
        height="20"
        rx="6"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="20" cy="20" r="5" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="27.5" cy="12.5" r="1.8" fill="#fff" />
    </svg>
  );
}

function LinkedInIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#0A66C2" />
      <path
        d="M12.5 16.5h3.5v12.5h-3.5V16.5zm1.75-5.5a2 2 0 110 4 2 2 0 010-4zm3.25 5.5h3.35v1.7h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18v7.62H24.5v-6.75c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.54v6.86h-3.5V16.5z"
        fill="#fff"
      />
    </svg>
  );
}

const icons = [
  { key: "facebook" as const, label: "Facebook", Icon: FacebookIcon },
  { key: "instagram" as const, label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin" as const, label: "LinkedIn", Icon: LinkedInIcon },
];

export default function SocialIcons({ size = 40, gap = 14 }: SocialIconsProps) {
  const igGradientId = useId().replace(/:/g, "");

  return (
    <div className="flex items-center" style={{ gap }}>
      {icons.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={SOCIAL_LINKS[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} — Elemen India`}
          title={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            transition: "transform 0.2s ease, opacity 0.2s ease",
            lineHeight: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.opacity = "0.92";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          {key === "instagram" ? (
            <InstagramIcon size={size} gradientId={igGradientId} />
          ) : (
            <Icon size={size} />
          )}
        </a>
      ))}
    </div>
  );
}
