"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  yOffset?: number;
}

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  yOffset = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    // Immediately show if already within or near viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 100) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 150px 0px",
      }
    );

    observer.observe(el);

    // Bulletproof fallback: ensure element becomes visible regardless
    const fallbackTimer = setTimeout(() => {
      setVisible(true);
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible && delayMs ? `${delayMs}ms` : "0ms",
        transform: visible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${yOffset}px, 0)`,
        opacity: visible ? 1 : 0,
      }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
}
