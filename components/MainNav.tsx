"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { WINE_BERRY, mainNavLinks, dropdownItems } from "@/lib/nav";

export default function MainNav() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const linkIsActive = (href: string, label: string) => {
    if (href === "/") return pathname === "/";
    if (label === "Our Services") return pathname.startsWith("/our-services");
    if (label === "Industry") return pathname.startsWith("/industry");
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const openDropdown = useCallback((label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  return (
    <nav
      style={{
        background: WINE_BERRY,
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        overflow: "visible",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          minHeight: 48,
          padding: "0 20px",
          overflow: "visible",
        }}
      >
        <ul
          className="main-nav-links"
          style={{
            display: "flex",
            alignItems: "stretch",
            listStyle: "none",
            margin: 0,
            padding: 0,
            flexWrap: "wrap",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          {mainNavLinks.map((link, i) => {
            const active = linkIsActive(link.href, link.label);
            const hasDropdown = "hasDropdown" in link && link.hasDropdown;
            const isOpen = activeDropdown === link.label;
            const items = hasDropdown ? dropdownItems[link.label] : null;

            return (
              <li
                key={link.label}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "stretch",
                  flexShrink: 0,
                  borderLeft:
                    i > 0 ? "1px solid rgba(255,255,255,0.25)" : "none",
                }}
                onMouseEnter={() => hasDropdown && openDropdown(link.label)}
                onMouseLeave={hasDropdown ? scheduleClose : undefined}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (!hasDropdown) return;
                    if (activeDropdown !== link.label) {
                      e.preventDefault();
                      openDropdown(link.label);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "0 clamp(10px, 1.5vw, 22px)",
                    height: 48,
                    fontSize: "clamp(11px, 1.2vw, 13px)",
                    fontWeight: active ? 700 : 500,
                    letterSpacing: 0.5,
                    color: "#fff",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    borderBottom: active
                      ? "3px solid #fff"
                      : "3px solid transparent",
                    opacity: active || isOpen ? 1 : 0.95,
                  }}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  aria-haspopup={hasDropdown ? "true" : undefined}
                >
                  {link.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={12}
                      style={{
                        opacity: 0.9,
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  )}
                </Link>

                {hasDropdown && isOpen && items && (
                  <div
                    role="menu"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: 4,
                      zIndex: 1100,
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        boxShadow: "0 10px 32px rgba(0,0,0,0.15)",
                        minWidth: 300,
                        maxHeight: "min(70vh, 420px)",
                        overflowY: "auto",
                        borderBottom: `3px solid ${WINE_BERRY}`,
                      }}
                    >
                      {items.map((item, idx, arr) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                          style={{
                            display: "block",
                            padding: "12px 18px",
                            fontSize: 13,
                            color:
                              pathname === item.href ? WINE_BERRY : "#444",
                            fontWeight:
                              pathname === item.href ? 600 : 400,
                            textDecoration: "none",
                            borderBottom:
                              idx < arr.length - 1
                                ? "1px solid #eee"
                                : "none",
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = WINE_BERRY;
                            e.currentTarget.style.background = "#faf9f7";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              pathname === item.href ? WINE_BERRY : "#444";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
