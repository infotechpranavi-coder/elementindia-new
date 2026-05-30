"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { pageImages } from "@/lib/content/images";

type Tab = "login" | "register";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "12px 14px",
  fontSize: 14,
  background: "#fff",
};

export default function AccountPage() {
  const { user, loading, login, register, logout } = useAuth();
  const { items, count, updateQuantity, removeFromCart } = useCart();
  const [tab, setTab] = useState<Tab>("login");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const err = await login({ email: loginEmail, password: loginPassword });
    setSubmitting(false);
    if (err) setError(err);
  }

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    const err = await register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
    });
    setSubmitting(false);
    if (err) setError(err);
  }

  return (
    <main>
      <PageHero
        title="My Account"
        subtitle="Sign in, manage your profile, and view your cart."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Account" },
        ]}
        imageSrc={pageImages.elements}
        imageAlt="Elemen India account"
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 80px" }}>
        {loading ? (
          <p style={{ color: "var(--text-mid)" }}>Loading account…</p>
        ) : user ? (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 360px) 1fr", gap: 32 }}>
            <section
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 24,
                height: "fit-content",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--wine-berry)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <User size={28} />
              </div>
              <h2 style={{ fontSize: 22, margin: "0 0 8px", color: "var(--navy)" }}>{user.name}</h2>
              <p style={{ margin: "0 0 4px", color: "var(--text-mid)", fontSize: 14 }}>Email</p>
              <p style={{ margin: "0 0 12px", fontWeight: 600, color: "var(--navy)" }}>{user.email}</p>
              <p style={{ margin: "0 0 4px", color: "var(--text-mid)", fontSize: 14 }}>Mobile</p>
              <p style={{ margin: "0 0 20px", fontWeight: 600, color: "var(--navy)" }}>{user.phone}</p>
              <button
                type="button"
                className="elemen-btn-outline"
                style={{ width: "100%" }}
                onClick={() => void logout()}
              >
                Sign out
              </button>
            </section>

            <section>
              <h2 style={{ fontSize: 24, margin: "0 0 8px", color: "var(--navy)" }}>My Cart</h2>
              <p style={{ color: "var(--text-mid)", marginBottom: 20 }}>
                {count === 0
                  ? "No products in your cart yet."
                  : `${count} item${count === 1 ? "" : "s"} saved in your cart`}
              </p>

              {items.length === 0 ? (
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: 32,
                    textAlign: "center",
                  }}
                >
                  <ShoppingCart size={36} color="var(--wine-berry)" style={{ marginBottom: 12 }} />
                  <Link href="/products" className="elemen-btn-primary">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {items.map((line) => (
                    <article
                      key={line.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "90px 1fr auto",
                        gap: 14,
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={line.img}
                        alt={line.name}
                        style={{ width: 90, height: 72, objectFit: "cover", borderRadius: 8 }}
                      />
                      <div>
                        <p
                          style={{
                            fontSize: 11,
                            color: "var(--wine-berry)",
                            fontWeight: 600,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            margin: "0 0 4px",
                          }}
                        >
                          {line.category}
                        </p>
                        <h3 style={{ fontSize: 15, margin: "0 0 8px", color: "var(--navy)" }}>{line.name}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            style={qtyBtn}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ minWidth: 20, textAlign: "center", fontWeight: 600 }}>
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            style={qtyBtn}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(line.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "var(--wine-berry)",
                          cursor: "pointer",
                          padding: 8,
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </article>
                  ))}
                  <Link href="/cart" className="elemen-btn-primary" style={{ width: "fit-content" }}>
                    View full cart
                  </Link>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div style={{ maxWidth: 440, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                marginBottom: 24,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              {(["login", "register"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setTab(key);
                    setError("");
                  }}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 14,
                    background: tab === key ? "var(--wine-berry)" : "#fff",
                    color: tab === key ? "#fff" : "var(--navy)",
                  }}
                >
                  {key === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {error ? (
              <p
                style={{
                  background: "#fdecea",
                  color: "#b71c1c",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                {error}
              </p>
            ) : null}

            {tab === "login" ? (
              <form onSubmit={onLogin} style={{ display: "grid", gap: 14 }}>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Email
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    style={inputStyle}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Password
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    minLength={6}
                    style={inputStyle}
                  />
                </label>
                <button type="submit" className="elemen-btn-primary" disabled={submitting}>
                  {submitting ? "Signing in…" : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={onRegister} style={{ display: "grid", gap: 14 }}>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Full name
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Your name"
                    required
                    minLength={2}
                    style={inputStyle}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Email
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    style={inputStyle}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Mobile number
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    required
                    style={inputStyle}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Password
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    minLength={6}
                    style={inputStyle}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Confirm password
                  <input
                    type="password"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    required
                    minLength={6}
                    style={inputStyle}
                  />
                </label>
                <p style={{ fontSize: 12, color: "var(--text-mid)", margin: 0 }}>
                  Sign in later with your email and password.
                </p>
                <button type="submit" className="elemen-btn-primary" disabled={submitting}>
                  {submitting ? "Creating account…" : "Create Account"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

const qtyBtn: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid var(--border)",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
