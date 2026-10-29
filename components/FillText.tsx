"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Headline whose ink fills in as it scrolls through the viewport. */
export default function FillText({ children, className = "", from = "#b8bcc4", to = "#0b0c10" }: { children: React.ReactNode; className?: string; from?: string; to?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 45%",
      onUpdate: (s) => el.style.setProperty("--p", `${(s.progress * 100).toFixed(2)}%`),
    });
    return () => st.kill();
  }, []);
  return (
    <span
      ref={ref}
      className={className}
      style={{
        backgroundImage: `linear-gradient(90deg, ${to} var(--p, 0%), ${from} calc(var(--p, 0%) + 12%))`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}
