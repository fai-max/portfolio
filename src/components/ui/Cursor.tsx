"use client";

import { useEffect, useRef } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import gsap from "gsap";

export function Cursor() {
  const { mode } = usePersonality();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    // Check for touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const moveDot = gsap.quickTo(dot, "left", { duration: 0.1, ease: "power2.out" });
    const moveDotY = gsap.quickTo(dot, "top", { duration: 0.1, ease: "power2.out" });
    const moveRing = gsap.quickTo(ring, "left", { duration: 0.3, ease: "power2.out" });
    const moveRingY = gsap.quickTo(ring, "top", { duration: 0.3, ease: "power2.out" });

    function onMove(e: MouseEvent) {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    }

    function onEnterLink() {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3 });
    }

    function onLeaveLink() {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
    }

    window.addEventListener("mousemove", onMove);

    // Add hover effects to all links and buttons
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // Show cursor elements
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, [mode]);

  if (!mode) return null;

  const dotColor = mode === "tech" ? "#4488ff" : "#cc2222";
  const ringColor = mode === "tech" ? "#4488ff" : "#cc2222";

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block"
        style={{ backgroundColor: dotColor, mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block transition-colors duration-500"
        style={{
          border: `1.5px solid ${ringColor}`,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
