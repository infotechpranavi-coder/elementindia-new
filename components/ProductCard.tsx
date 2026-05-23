"use client";
import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";

export interface Product {
  id: number; name: string; price: number; oldPrice?: number;
  img: string; img2?: string; rating: number; reviews: number;
  badge?: string; badgeColor?: string; category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <div style={{
      background: "#fff", borderRadius: 10, overflow: "hidden",
      boxShadow: hovered ? "0 15px 40px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
      transition: "all 0.35s ease", position: "relative",
      transform: hovered ? "translateY(-4px)" : "translateY(0)"
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1", background: "#f9f6f2" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.img} alt={product.name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered && product.img2 ? "scale(0)" : hovered ? "scale(1.05)" : "scale(1)",
          transition: "all 0.5s ease", position: "absolute", inset: 0
        }} />
        {product.img2 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.img2} alt={product.name} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(0)",
            transition: "all 0.5s ease", position: "absolute", inset: 0
          }} />
        )}

        {/* Badges */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 6, zIndex: 2 }}>
          {product.badge && (
            <span style={{
              padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 700,
              background: product.badgeColor || "#5B1D36", color: "#fff", letterSpacing: 0.5
            }}>{product.badge}</span>
          )}
          {discount && (
            <span style={{ padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 700, background: "#e74c3c", color: "#fff" }}>-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={() => setWishlisted(!wishlisted)} style={{
          position: "absolute", top: 12, right: 12, width: 34, height: 34,
          borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)", zIndex: 2, transition: "all 0.2s",
          transform: hovered ? "translateX(0)" : "translateX(50px)", opacity: hovered ? 1 : 0
        }}>
          <Heart size={15} fill={wishlisted ? "#e74c3c" : "none"} color={wishlisted ? "#e74c3c" : "#666"} />
        </button>

        {/* Quick View */}
        <button style={{
          position: "absolute", top: 54, right: 12, width: 34, height: 34,
          borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)", zIndex: 2, transition: "all 0.25s 0.05s",
          transform: hovered ? "translateX(0)" : "translateX(50px)", opacity: hovered ? 1 : 0
        }}>
          <Eye size={15} color="#666" />
        </button>

        {/* Add to Cart overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px",
          background: "rgba(255,255,255,0.96)",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease", zIndex: 2
        }}>
          <button onClick={handleCart} style={{
            width: "100%", padding: "10px", background: addedToCart ? "#4caf50" : "var(--wine-berry)",
            color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
            borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.25s"
          }}>
            <ShoppingCart size={15} />
            {addedToCart ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: 11, color: "var(--wine-berry)", marginBottom: 5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
          {product.category}
        </div>
        <h3 style={{
          fontSize: 15, fontWeight: 600,
          color: "var(--navy)", marginBottom: 8, lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>{product.name}</h3>

        <div className="flex items-center gap-1" style={{ marginBottom: 10 }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"} color={i < Math.floor(product.rating) ? "#f59e0b" : "#ddd"} />
          ))}
          <span style={{ fontSize: 11, color: "#888", marginLeft: 4 }}>({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.oldPrice && (
            <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
