"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, count, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <main style={{ background: "var(--bg-cream)", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 80px" }}>
        <h1 style={{ fontSize: 36, color: "var(--navy)", marginBottom: 8 }}>Your Cart</h1>
        <p style={{ color: "var(--text-mid)", marginBottom: 28 }}>
          {count === 0 ? "Your cart is empty." : `${count} item${count === 1 ? "" : "s"} in cart`}
        </p>

        {items.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 40,
              textAlign: "center",
            }}
          >
            <ShoppingCart size={40} color="var(--wine-berry)" style={{ marginBottom: 12 }} />
            <p style={{ color: "var(--text-mid)", marginBottom: 20 }}>Browse products and add items to your cart.</p>
            <Link href="/products" className="elemen-btn-primary">
              View Products
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
            <div style={{ display: "grid", gap: 12 }}>
              {items.map((line) => (
                <article
                  key={line.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr auto",
                    gap: 16,
                    alignItems: "center",
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: 14,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={line.img}
                    alt={line.name}
                    style={{ width: 100, height: 80, objectFit: "cover", borderRadius: 8 }}
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
                    <h2 style={{ fontSize: 16, margin: "0 0 6px", color: "var(--navy)" }}>{line.name}</h2>
                    <p style={{ margin: 0, fontWeight: 700, color: "var(--navy)" }}>
                      ₹{line.price.toLocaleString("en-IN")}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        style={qtyBtnStyle}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        style={qtyBtnStyle}
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
            </div>

            <aside
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 20,
                height: "fit-content",
                position: "sticky",
                top: 24,
              }}
            >
              <h2 style={{ fontSize: 18, margin: "0 0 16px", color: "var(--navy)" }}>Order Summary</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  color: "var(--text-mid)",
                }}
              >
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--navy)",
                }}
              >
                <span>Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <Link
                href="/contact-us"
                className="elemen-btn-primary"
                style={{ display: "block", textAlign: "center", marginBottom: 10 }}
              >
                Request Quote
              </Link>
              <button type="button" className="elemen-btn-outline" style={{ width: "100%" }} onClick={clearCart}>
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "1px solid var(--border)",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
