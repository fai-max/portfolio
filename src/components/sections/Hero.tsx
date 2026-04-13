"use client";

import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";

function LoadingDots() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => (c + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <span style={{ display: "inline-block", width: "1.5em", textAlign: "left", color: "#00ff41" }}>{".".repeat(count)}</span>;
}

function Typewriter({ text, delay = 0, ready = true }: { text: string; delay?: number; ready?: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay, ready]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 70 + Math.random() * 40);

    return () => clearTimeout(timeout);
  }, [started, displayed, text]);

  const done = displayed.length >= text.length;

  return (
    <>
      {displayed}
      {started && !done && <span className="cursor-blink" style={{ color: "rgba(255,255,255,0.5)" }}>|</span>}
      {done && <LoadingDots />}
    </>
  );
}

/* ── Matrix rain characters ── */
const RAIN_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

function MatrixRain() {
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 30; i++) {
      const chars = Array.from(
        { length: 20 + Math.floor(i * 1.7 % 15) },
        () => RAIN_CHARS[Math.floor((i * 7 + cols.length * 3) % RAIN_CHARS.length)]
      ).join(" ");
      cols.push({
        left: `${(i / 30) * 100}%`,
        duration: `${8 + (i * 3) % 12}s`,
        delay: `${-(i * 1.3) % 10}s`,
        chars,
      });
    }
    return cols;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {columns.map((col, i) => (
        <div
          key={i}
          className="matrix-column"
          style={{
            left: col.left,
            animationDuration: col.duration,
            animationDelay: col.delay,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
}

export function Hero({ loaded = false }: { loaded?: boolean }) {
  const { mode, setMode } = usePersonality();
  const hasSelected = mode !== null;
  const [choosing, setChoosing] = useState<"tech" | "creative" | null>(null);
  const [hovered, setHovered] = useState<"tech" | "creative" | null>(null);

  // Reset interaction state when returning to pill choice
  useEffect(() => {
    if (!mode) {
      setChoosing(null);
      setHovered(null);
    }
  }, [mode]);

  const bluePillRef = useRef<HTMLButtonElement>(null);
  const redPillRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);
  const morpheusRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (side: "tech" | "creative") => {
      if (choosing || hasSelected) return;
      setChoosing(side);
      registerGsapPlugins();

      const chosen = side === "tech" ? bluePillRef.current : redPillRef.current;
      const rejected = side === "tech" ? redPillRef.current : bluePillRef.current;

      const tl = gsap.timeline({ onComplete: () => setMode(side) });

      // Reject the other pill, boost the chosen
      tl.to(rejected, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power2.in" }, 0)
        .to(chosen, { scale: 1.3, duration: 0.4, ease: "power2.out" }, 0)
        .to(textRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, 0)
        .to(morpheusRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.1);

      // Chosen pill explodes outward
      tl.to(chosen, { scale: 12, opacity: 0, duration: 0.5, ease: "power3.in" }, 0.4);

      // Fade rain
      if (rainRef.current) {
        tl.to(rainRef.current, { opacity: 0, duration: 0.4 }, 0.3);
      }
    },
    [choosing, hasSelected, setMode]
  );

  /* ── Selected state hero (post-choice) ── */
  if (hasSelected) {
    const isTech = mode === "tech";
    const accentColor = isTech ? "#4488ff" : "#cc2222";

    return (
      <section key="hero-selected" id="home" style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        overflow: "hidden",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: isTech ? "center" : "flex-start",
      }}>
        {/* Background decorations */}
        {isTech ? null : (
          <>
            <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", pointerEvents: "none", opacity: 0.06, background: "radial-gradient(circle at 80% 20%, #cc2222, transparent 70%)" }} />
            <span className="bg-text font-[family-name:var(--font-display)]" style={{ top: "5%", left: "-5%", fontSize: "clamp(15rem, 40vw, 30rem)" }}>F.</span>
            <div style={{ position: "absolute", top: "50%", right: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", border: "1px solid rgba(204,34,34,0.08)", pointerEvents: "none" }} />
          </>
        )}

        <div style={{
          position: "relative", zIndex: 2, width: "100%",
          maxWidth: "72rem", margin: "0 auto",
          padding: isTech ? "0 2rem" : "0 2rem 0 4rem",
          textAlign: isTech ? "center" as const : "left" as const,
        }}>
          {/* Label */}
          <p className="section-label animate-fade-in-up" style={{
            fontFamily: "var(--font-mono)",
            color: isTech ? "#7a84a0" : "#cc2222",
            fontSize: isTech ? undefined : "0.6rem",
            letterSpacing: isTech ? undefined : "0.3em",
            marginBottom: "1.5rem",
            opacity: 0, animationDelay: "0.15s", animationFillMode: "forwards",
          }}>
            {isTech ? "> initializing..." : "Creative Technologist"}
          </p>

          {/* Name */}
          <h1 className="animate-fade-in-up" style={{
            fontSize: isTech ? "clamp(3.5rem, 10vw, 8rem)" : "clamp(5rem, 15vw, 12rem)",
            fontWeight: isTech ? 700 : 900,
            lineHeight: 0.95,
            letterSpacing: isTech ? "-0.02em" : "-0.03em",
            marginBottom: "2rem",
            fontFamily: isTech ? "inherit" : "var(--font-display)",
            opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards",
          }}>
            <span className={!isTech ? "riso-offset" : ""} style={{
              backgroundImage: isTech
                ? "linear-gradient(135deg, #4488ff, #2266dd)"
                : "linear-gradient(135deg, #cc2222, #ff4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Fahim.
            </span>
          </h1>

          {/* Bio */}
          <p className="animate-fade-in-up" style={{
            color: isTech ? "#7a84a0" : "#9a8e84",
            fontSize: isTech ? "1.1rem" : "1.25rem",
            fontWeight: isTech ? 400 : 300,
            maxWidth: isTech ? "36rem" : "28rem",
            margin: isTech ? "0 auto 3rem" : "0 0 3rem",
            lineHeight: 1.6,
            fontStyle: isTech ? "normal" : "italic",
            fontFamily: isTech ? "inherit" : "var(--font-display)",
            opacity: 0, animationDelay: "0.5s", animationFillMode: "forwards",
          }}>
            {isTech
              ? "Software Engineer crafting cross-platform systems that scale."
              : "Bridging code, design, and storytelling through motion, dimension, and visual narrative."}
          </p>

          {/* CTAs */}
          {isTech ? (
            <div className="animate-fade-in-up" style={{
              display: "flex", flexWrap: "wrap", gap: "1rem",
              justifyContent: "center",
              opacity: 0, animationDelay: "0.7s", animationFillMode: "forwards",
            }}>
              <a href="#about" style={{
                padding: "0.875rem 2rem", borderRadius: "4px",
                fontSize: "0.875rem", fontWeight: 500,
                background: "linear-gradient(135deg, #4488ff, #2266dd)",
                color: "#08090f",
                fontFamily: "var(--font-mono)",
                textDecoration: "none", transition: "transform 0.3s",
              }}>
                $ explore --more
              </a>
              <a href="#contact" style={{
                padding: "0.875rem 2rem", borderRadius: "4px",
                fontSize: "0.875rem", fontWeight: 500,
                border: "1px solid #1a1e30",
                color: "#dce0e8",
                fontFamily: "var(--font-mono)",
                textDecoration: "none", background: "transparent", transition: "border-color 0.3s",
              }}>
                $ reach --out
              </a>
            </div>
          ) : (
            <div className="animate-fade-in-up" style={{
              display: "flex", flexWrap: "wrap", gap: "2rem",
              justifyContent: "flex-start",
              opacity: 0, animationDelay: "0.7s", animationFillMode: "forwards",
            }}>
              <a href="#about" style={{
                color: "#cc2222", textDecoration: "underline", textUnderlineOffset: "4px",
                textDecorationColor: "rgba(204,34,34,0.4)",
                fontSize: "0.85rem", fontFamily: "var(--font-display)",
                textTransform: "uppercase", letterSpacing: "0.15em",
              }}>
                See My Work
              </a>
              <a href="#contact" style={{
                color: "#cc2222", textDecoration: "underline", textUnderlineOffset: "4px",
                textDecorationColor: "rgba(204,34,34,0.4)",
                fontSize: "0.85rem", fontFamily: "var(--font-display)",
                textTransform: "uppercase", letterSpacing: "0.15em",
              }}>
                Get in Touch
              </a>
            </div>
          )}
        </div>

      </section>
    );
  }

  /* ── Pill choice screen (undecided state) ── */
  return (
    <section key="hero-choosing" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]" id="home">
      {/* Matrix rain background */}
      <div ref={rainRef}>
        <MatrixRain />
      </div>

      {/* Tagline - top with spacing */}
      <div ref={textRef} className="absolute top-[8%] md:top-[10%] z-20 text-center w-full px-4">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-mono)]"
           style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.6), 0 0 20px rgba(0,255,65,0.4), 0 0 50px rgba(0,255,65,0.2), 0 0 100px rgba(0,255,65,0.1)" }}>
          <Typewriter text="Make your choice" delay={600} ready={loaded} />
        </p>
      </div>

      {/* Morpheus + Pill images — pushed down for spacing from text */}
      <div
        ref={morpheusRef}
        className="relative z-10 w-full max-w-[900px] mx-auto animate-fade-in-up"
        style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards", marginTop: "2rem" }}
      >
        {/* Morpheus image (mirrored so teal hand is left, red hand is right) */}
        <img
          src="/morpheus.png"
          alt=""
          className="w-full h-auto select-none pointer-events-none"
          style={{ transform: "scaleX(-1)" }}
          draggable={false}
        />

        {/* Blue Pill – left hand */}
        <button
          ref={bluePillRef}
          onClick={() => handleSelect("tech")}
          onMouseEnter={() => setHovered("tech")}
          onMouseLeave={() => setHovered(null)}
          className={`pill-photo pill-photo-blue absolute transition-all duration-500 origin-bottom ${
            hovered === "creative" ? "opacity-30" : ""
          } ${choosing ? "pointer-events-none" : ""}`}
          style={{
            left: "28%",
            bottom: "22%",
            transform: `translateX(-50%) ${hovered === "tech" ? "scale(1.12) translateY(-6px)" : hovered === "creative" ? "scale(0.92)" : "scale(1)"}`,
          }}
          aria-label="Choose the blue pill"
        >
          <img src="/pill-blue.png" alt="" className="pill-photo-img" draggable={false} style={{ transform: "scaleX(-1)" }} />
        </button>

        {/* Red Pill – right hand */}
        <button
          ref={redPillRef}
          onClick={() => handleSelect("creative")}
          onMouseEnter={() => setHovered("creative")}
          onMouseLeave={() => setHovered(null)}
          className={`pill-photo pill-photo-red absolute transition-all duration-500 origin-bottom ${
            hovered === "tech" ? "opacity-30" : ""
          } ${choosing ? "pointer-events-none" : ""}`}
          style={{
            left: "72%",
            bottom: "22%",
            transform: `translateX(-50%) ${hovered === "creative" ? "scale(1.12) translateY(-6px)" : hovered === "tech" ? "scale(0.92)" : "scale(1)"}`,
          }}
          aria-label="Choose the red pill"
        >
          <img src="/pill-red.png" alt="" className="pill-photo-img" draggable={false} style={{ transform: "scaleX(-1)" }} />
        </button>
      </div>

      {/* Bottom quote — positioned at fixed bottom, not overlapping image */}
      <p
        className="z-20 font-[family-name:var(--font-display)] text-center"
        style={{
          position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontStyle: "italic",
          letterSpacing: "0.05em", maxWidth: "28rem", padding: "0 1rem",
        }}
      >
        &ldquo;I can only show you the door.<br />You&rsquo;re the one that has to walk through it.&rdquo;
      </p>
    </section>
  );
}
