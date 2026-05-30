"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { WINE_BERRY } from "@/lib/nav";

export default function AccountMenu() {
  const { user, loading, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative hidden sm:block" style={{ zIndex: 1200 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          color: "#fff",
          padding: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        aria-label={user ? `Account, ${user.name}` : "Account"}
        aria-expanded={open}
      >
        <User size={22} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            minWidth: 260,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            border: "1px solid #e8e0d5",
            zIndex: 1200,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <p style={{ padding: "16px 18px", margin: 0, fontSize: 14, color: "#666" }}>
              Loading…
            </p>
          ) : user ? (
            <>
              <div style={{ padding: "16px 18px", borderBottom: "1px solid #eee" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: WINE_BERRY,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Signed in
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>{user.name}</div>
                <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>{user.email}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{user.phone}</div>
              </div>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 18px",
                  textDecoration: "none",
                  color: "#333",
                  fontSize: 14,
                }}
              >
                <ShoppingCart size={18} color={WINE_BERRY} />
                My Cart
                {count > 0 ? (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: WINE_BERRY,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 999,
                    }}
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                ) : null}
              </Link>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 18px",
                  textDecoration: "none",
                  color: "#333",
                  fontSize: 14,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                Account details
              </Link>
              <button
                type="button"
                onClick={() => void handleLogout()}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 18px",
                  border: "none",
                  borderTop: "1px solid #f0f0f0",
                  background: "#faf8f5",
                  cursor: "pointer",
                  fontSize: 14,
                  color: WINE_BERRY,
                  fontWeight: 600,
                }}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </>
          ) : (
            <>
              <div style={{ padding: "16px 18px", borderBottom: "1px solid #eee" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>Your account</div>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                  Sign in with your email or create a new account.
                </p>
              </div>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 18px",
                  textDecoration: "none",
                  color: "#fff",
                  background: WINE_BERRY,
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Sign in / Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
