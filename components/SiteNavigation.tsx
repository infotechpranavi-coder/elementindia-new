"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import MainNav from "@/components/MainNav";

const SCROLL_THRESHOLD = 12;
const TOP_OFFSET = 64;

/** Top bar (logo/search) collapses on scroll down; maroon menu stays pinned. */
export default function SiteNavigation() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mainNavHeight, setMainNavHeight] = useState(0);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const mainNavRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function measure() {
      if (headerInnerRef.current) setHeaderHeight(headerInnerRef.current.offsetHeight);
      if (mainNavRef.current) setMainNavHeight(mainNavRef.current.offsetHeight);
    }

    measure();

    const observer = new ResizeObserver(measure);
    if (headerInnerRef.current) observer.observe(headerInnerRef.current);
    if (mainNavRef.current) observer.observe(mainNavRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;

      if (currentY <= TOP_OFFSET) {
        setHeaderVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;

      if (delta > SCROLL_THRESHOLD) {
        setHeaderVisible(false);
        lastScrollY.current = currentY;
        return;
      }

      if (delta < -SCROLL_THRESHOLD) {
        setHeaderVisible(true);
        lastScrollY.current = currentY;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalHeight = headerHeight + mainNavHeight;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <div
          style={{
            overflow: "hidden",
            maxHeight: headerVisible ? headerHeight || 9999 : 0,
            transition: "max-height 0.32s ease",
          }}
        >
          <div ref={headerInnerRef}>
            <SiteHeader />
          </div>
        </div>
        <div ref={mainNavRef}>
          <MainNav />
        </div>
      </div>
      <div aria-hidden style={{ height: totalHeight, flexShrink: 0 }} />
    </>
  );
}
