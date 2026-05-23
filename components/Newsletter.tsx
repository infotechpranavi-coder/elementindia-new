"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <section style={{
      background: "linear-gradient(135deg, var(--navy) 0%, var(--wine-berry) 100%)",
      padding: "70px 0"
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px"
        }}>
          <Send size={26} color="#fff" />
        </div>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#fff", marginBottom: 14, fontWeight: 700 }}>
          Stay Inspired
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>
          Subscribe to our newsletter for exclusive deals, design tips, and first access to new collections.
          <br />No spam — just beautiful things.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3" style={{ color: "#fff", fontSize: 17 }}>
            <CheckCircle size={24} />
            <span>You&apos;re subscribed! Welcome to Elemen India.</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-0" style={{ maxWidth: 500, margin: "0 auto", borderRadius: 4, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="Your email address"
              style={{
                flex: 1, padding: "16px 22px", border: "none", outline: "none",
                fontSize: 14, background: "#fff", color: "#333"
              }}
            />
            <button onClick={handleSubmit} style={{
              padding: "16px 28px", background: "var(--wine-berry)", color: "#fff",
              border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
              transition: "background 0.2s", whiteSpace: "nowrap"
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2d2d2d")}>
              Subscribe
            </button>
          </div>
        )}

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 16 }}>
          Join 45,000+ subscribers. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
