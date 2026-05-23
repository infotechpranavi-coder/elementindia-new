"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { SplitBrandTitle } from "@/components/ElemenDecor";
import { homeImages } from "@/lib/content/home-images";

const slides = [
  {
    id: 1,
    discount: "Nationwide Service Across India",
    line1: "Security, CCTV",
    line2: "& IT Solutions",
    cta: "Our Services",
    ctaHref: "/our-services",
    imgSrc: homeImages.hero.cctv,
    imgAlt: "CCTV surveillance and security installation",
  },
  {
    id: 2,
    discount: "Trusted by Corporate & Industry",
    line1: "Access Control",
    line2: "& Visitor Management",
    cta: "View Solutions",
    ctaHref: "/our-services/access-control-system",
    imgSrc: homeImages.hero.accessControl,
    imgAlt: "Access control and security systems",
  },
  {
    id: 3,
    discount: "Engineering & Technology Experts",
    line1: "IT & Network",
    line2: "Infrastructure",
    cta: "Contact Us",
    ctaHref: "/contact-us",
    imgSrc: homeImages.hero.itInfra,
    imgAlt: "IT and network infrastructure management",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 350);
    },
    [animating, current]
  );

  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = useCallback(
    () => go((current + 1) % slides.length),
    [current, go]
  );

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = slides[current];

  const navBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "var(--wine-berry)",
    border: "2px solid var(--gold)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    cursor: "pointer",
    zIndex: 10,
    boxShadow: "0 4px 14px rgba(26, 39, 68, 0.35)",
    transition: "background 0.2s, transform 0.2s",
  };

  return (
    <>
      <section
        className="elemen-dots"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(420px, 52vw, 580px)",
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${s.imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.8s ease",
              zIndex: 0,
            }}
            aria-hidden={i !== current}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(26,39,68,0.65) 0%, rgba(26,39,68,0.35) 40%, rgba(245,244,241,0.5) 65%, rgba(245,244,241,0.92) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "0 80px 0 20px",
            minHeight: "clamp(420px, 52vw, 580px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <motion.div
            key={slide.id}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 40 }
            }
            animate={
              reduceMotion || animating
                ? { opacity: animating ? 0 : 1, x: 0 }
                : { opacity: animating ? 0 : 1, x: 0 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 480, padding: "48px 0" }}
          >
            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "var(--text-mid)",
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              {slide.discount}
            </p>
            <SplitBrandTitle line1={slide.line1} line2={slide.line2} />
            <Link href={slide.ctaHref} className="elemen-btn-primary">
              {slide.cta}
            </Link>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          style={{ ...navBtnStyle, left: 16 }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          style={{ ...navBtnStyle, right: 16 }}
        >
          <ChevronRight size={22} />
        </button>
      </section>

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--wine-berry)",
            border: "2px solid var(--gold)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 999,
            boxShadow: "0 4px 16px rgba(122, 32, 50, 0.45)",
          }}
        >
          <ChevronUp size={22} />
        </button>
      )}
    </>
  );
}
