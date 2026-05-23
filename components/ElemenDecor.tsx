import type { ReactNode } from "react";

export function GoldDivider({ width = 80 }: { width?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "12px 0 16px",
      }}
      aria-hidden
    >
      <span
        style={{
          width,
          height: 2,
          background: "linear-gradient(90deg, var(--gold), transparent)",
        }}
      />
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--wine-berry)",
        }}
      />
      <span
        style={{
          width,
          height: 2,
          background: "linear-gradient(270deg, var(--gold), transparent)",
        }}
      />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        letterSpacing: 3,
        color: "var(--wine-berry)",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  centered,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <>
      {centered ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <GoldDivider />
        </div>
      ) : (
        <GoldDivider />
      )}
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--navy)",
          margin: centered ? "0 0 16px" : "0 0 12px",
          textAlign: centered ? "center" : "left",
        }}
      >
        {children}
      </h2>
    </>
  );
}

export function SplitBrandTitle({
  line1,
  line2,
}: {
  line1: string;
  line2: string;
}) {
  return (
    <h1
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "clamp(32px, 4.5vw, 52px)",
        fontWeight: 700,
        lineHeight: 1.15,
        marginBottom: 28,
      }}
    >
      <span style={{ color: "var(--navy)", display: "block" }}>{line1}</span>
      <span style={{ color: "var(--wine-berry)", display: "block" }}>{line2}</span>
    </h1>
  );
}
