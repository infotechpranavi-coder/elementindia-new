"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kulkarni",
    location: "Mumbai, Maharashtra",
    rating: 5,
    avatar: "RK",
    color: "#5B1D36",
    text: "Elemen India installed a complete CCTV and access control system across our corporate office. Professional team, clean cabling, and excellent after-sales support. We feel much more secure now.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Thane, Maharashtra",
    rating: 5,
    avatar: "PS",
    color: "#1a2744",
    text: "From site survey to commissioning, the process was smooth. Biometric attendance and visitor management were integrated perfectly with our HR workflow. Highly recommend for any growing business.",
  },
  {
    id: 3,
    name: "Amit Desai",
    location: "Pune, Maharashtra",
    rating: 5,
    avatar: "AD",
    color: "#8fa08a",
    text: "Our warehouse needed perimeter cameras and fire alarm integration. Elemen India delivered on time and trained our staff on the monitoring software. Reliable partner for industrial security.",
  },
  {
    id: 4,
    name: "Neha Mehta",
    location: "Navi Mumbai, Maharashtra",
    rating: 4,
    avatar: "NM",
    color: "#a87c5a",
    text: "We upgraded our IT network and firewall setup along with IP cameras. The team understood our compliance needs and proposed a cost-effective solution. Great value and responsive AMC support.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="elemen-dots" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
        <div className="text-center" style={{ marginBottom: 50 }}>
          <span style={{ fontSize: 12, letterSpacing: 3, color: "var(--wine-berry)", textTransform: "uppercase", fontWeight: 600 }}>Happy Clients</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "var(--navy)", margin: "10px 0 0", fontWeight: 700 }}>
            What Our Customers Say
          </h2>
        </div>

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "48px 48px 40px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 28, left: 36, color: "#5B1D36", opacity: 0.3 }}>
              <Quote size={48} />
            </div>

            <div className="flex justify-center gap-1" style={{ marginBottom: 24 }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < reviews[current].rating ? "#f59e0b" : "none"}
                  color={i < reviews[current].rating ? "#f59e0b" : "#ddd"}
                />
              ))}
            </div>

            <p style={{ fontSize: 17, color: "#444", lineHeight: 1.8, marginBottom: 32, fontStyle: "italic" }}>
              &ldquo;{reviews[current].text}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-4">
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${reviews[current].color}, ${reviews[current].color}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {reviews[current].avatar}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: 16 }}>{reviews[current].name}</div>
                <div style={{ fontSize: 13, color: "#888" }}>{reviews[current].location}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4" style={{ marginTop: 32 }}>
            <button
              onClick={() => setCurrent((current - 1 + reviews.length) % reviews.length)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5B1D36";
                e.currentTarget.style.borderColor = "#5B1D36";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.color = "#333";
              }}
            >
              <ChevronLeft size={16} />
            </button>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? "#5B1D36" : "#ddd",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
            <button
              onClick={() => setCurrent((current + 1) % reviews.length)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5B1D36";
                e.currentTarget.style.borderColor = "#5B1D36";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.color = "#333";
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
