"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/brand";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "inherit",
  color: "var(--navy)",
  background: "#fff",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--navy)",
  marginBottom: 6,
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    const mailSubject = encodeURIComponent(
      subject || `Enquiry from ${name} — Elemen India`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      form.reset();
    }, 400);
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid var(--border)",
          padding: "48px 32px",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(26, 39, 68, 0.08)",
        }}
      >
        <CheckCircle
          size={48}
          style={{ color: "var(--wine-berry)", marginBottom: 16 }}
        />
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: 10,
          }}
        >
          Message sent
        </h3>
        <p style={{ fontSize: 15, color: "var(--text-mid)", lineHeight: 1.7 }}>
          Thank you for contacting Elemen India. Our team will get back to you
          shortly.
        </p>
        <button
          type="button"
          className="elemen-btn-primary"
          style={{ marginTop: 24, border: "none", cursor: "pointer" }}
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid var(--border)",
        padding: "32px 28px",
        boxShadow: "0 8px 32px rgba(26, 39, 68, 0.08)",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "var(--navy)",
          marginBottom: 8,
        }}
      >
        Send us a message
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-mid)",
          marginBottom: 28,
          lineHeight: 1.6,
        }}
      >
        Fill in the form and our team will respond within one business day.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
        className="contact-form-grid"
      >
        <div style={{ gridColumn: "1 / -1" }} className="contact-form-full">
          <label htmlFor="name" style={labelStyle}>
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91"
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="subject" style={labelStyle}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="CCTV quote, AMC, support…"
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="message" style={labelStyle}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project or enquiry…"
            style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="elemen-btn-primary"
        style={{
          border: "none",
          cursor: loading ? "wait" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          opacity: loading ? 0.8 : 1,
        }}
      >
        <Send size={16} />
        {loading ? "Sending…" : "Submit enquiry"}
      </button>

      <style>{`
        @media (max-width: 540px) {
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
