"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

/* ── Lazy-load Three.js pill (heavy) ── */
const Pill3DScene = dynamic(
  () => import("@/components/ui/Pill3D").then((m) => m.Pill3DScene),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">Loading 3D...</div> }
);

/* ═══════════════════════════════════════════════
   MATRIX RAIN (shared background)
   ═══════════════════════════════════════════════ */
const RAIN_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

function MatrixRain() {
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 25; i++) {
      const chars = Array.from(
        { length: 20 + (i * 3) % 10 },
        (_, j) => RAIN_CHARS[(i * 7 + j * 3) % RAIN_CHARS.length]
      ).join(" ");
      cols.push({
        left: `${(i / 25) * 100}%`,
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
          style={{ left: col.left, animationDuration: col.duration, animationDelay: col.delay }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MORPHEUS SILHOUETTES
   ═══════════════════════════════════════════════ */

/* Morpheus A: Minimal Edge Glow */
function MorpheusEdgeGlow() {
  return (
    <svg viewBox="0 0 600 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
        <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
      </defs>

      {/* Very subtle filled silhouette */}
      {/* Head */}
      <ellipse cx="300" cy="120" rx="45" ry="55" fill="#0d0d18" />
      {/* Neck */}
      <rect x="285" y="170" width="30" height="25" fill="#0d0d18" />
      {/* Torso */}
      <path d="M220 195 L380 195 L390 380 L210 380 Z" fill="#0d0d18" />
      {/* Shoulders */}
      <path d="M220 195 Q180 200 140 230 L160 250 Q190 225 220 215 Z" fill="#0d0d18" />
      <path d="M380 195 Q420 200 460 230 L440 250 Q410 225 380 215 Z" fill="#0d0d18" />

      {/* Left arm + hand (blue side) */}
      <path d="M140 230 Q100 280 80 340 Q75 360 90 370 L170 380 Q160 360 150 340 Q160 300 160 250 Z"
        fill="#0d0d18" />
      {/* Left hand open */}
      <path d="M60 360 Q50 340 55 330 Q65 320 80 330 L90 370 Q75 380 60 370 Z" fill="#0d0d18" />

      {/* Right arm + hand (red side) */}
      <path d="M460 230 Q500 280 520 340 Q525 360 510 370 L430 380 Q440 360 450 340 Q440 300 440 250 Z"
        fill="#0d0d18" />
      {/* Right hand open */}
      <path d="M540 360 Q550 340 545 330 Q535 320 520 330 L510 370 Q525 380 540 370 Z" fill="#0d0d18" />

      {/* Glasses */}
      <path d="M265 110 Q270 105 285 105 Q295 105 300 110 Q305 105 315 105 Q325 105 335 110"
        stroke="#0d0d18" strokeWidth="3" fill="none" />

      {/* Edge glow - LEFT (blue/cyan) */}
      <path d="M220 195 Q180 200 140 230 Q100 280 80 340 Q75 360 60 370"
        stroke="#00aaff" strokeWidth="1" fill="none" filter="url(#glow-blue)" opacity="0.4" />
      <path d="M265 65 Q255 80 250 120 Q245 160 220 195"
        stroke="#00aaff" strokeWidth="1" fill="none" filter="url(#glow-blue)" opacity="0.3" />

      {/* Edge glow - RIGHT (red/pink) */}
      <path d="M380 195 Q420 200 460 230 Q500 280 520 340 Q525 360 540 370"
        stroke="#ff4466" strokeWidth="1" fill="none" filter="url(#glow-red)" opacity="0.4" />
      <path d="M335 65 Q345 80 350 120 Q355 160 380 195"
        stroke="#ff4466" strokeWidth="1" fill="none" filter="url(#glow-red)" opacity="0.3" />

      {/* Glow spots on hands */}
      <circle cx="80" cy="350" r="30" fill="#00aaff" opacity="0.06" filter="url(#soft-glow)" />
      <circle cx="520" cy="350" r="30" fill="#ff4466" opacity="0.06" filter="url(#soft-glow)" />
    </svg>
  );
}

/* Morpheus B: Gradient Silhouette */
function MorpheusGradient() {
  return (
    <svg viewBox="0 0 600 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>
        <linearGradient id="edge-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00aaff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="edge-right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff4466" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="backlight" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>
      </defs>

      {/* Backlight glow */}
      <ellipse cx="300" cy="250" rx="200" ry="250" fill="#ffffff" opacity="0.015" filter="url(#backlight)" />

      {/* Body fill */}
      <ellipse cx="300" cy="120" rx="48" ry="58" fill="url(#body-grad)" />
      <rect x="282" y="172" width="36" height="28" fill="url(#body-grad)" />
      <path d="M215 195 L385 195 L395 400 L205 400 Z" fill="url(#body-grad)" />

      {/* Coat lapels */}
      <path d="M300 195 L260 400" stroke="#252540" strokeWidth="1.5" opacity="0.5" />
      <path d="M300 195 L340 400" stroke="#252540" strokeWidth="1.5" opacity="0.5" />

      {/* Shoulders + arms */}
      <path d="M215 195 Q170 200 130 235 Q90 280 70 350 L85 375 L170 385 Q155 340 150 300 Q155 250 215 215 Z"
        fill="url(#body-grad)" />
      <path d="M385 195 Q430 200 470 235 Q510 280 530 350 L515 375 L430 385 Q445 340 450 300 Q445 250 385 215 Z"
        fill="url(#body-grad)" />

      {/* Hands - left (open, palm up) */}
      <ellipse cx="85" cy="370" rx="35" ry="12" fill="#1a1a2e" />
      {/* Fingers left */}
      <path d="M55 365 Q50 355 55 350 Q62 348 67 355 L65 365" fill="#1a1a2e" />
      <path d="M65 360 Q62 348 66 343 Q72 340 76 348 L74 360" fill="#1a1a2e" />
      <path d="M78 358 Q77 346 80 340 Q86 337 89 345 L87 358" fill="#1a1a2e" />
      <path d="M90 360 Q90 350 93 345 Q98 343 100 350 L98 360" fill="#1a1a2e" />
      {/* Thumb left */}
      <path d="M110 365 Q118 360 120 355 Q118 350 112 352 L105 365" fill="#1a1a2e" />

      {/* Hands - right (open, palm up) */}
      <ellipse cx="515" cy="370" rx="35" ry="12" fill="#1a1a2e" />
      {/* Fingers right */}
      <path d="M545 365 Q550 355 545 350 Q538 348 533 355 L535 365" fill="#1a1a2e" />
      <path d="M535 360 Q538 348 534 343 Q528 340 524 348 L526 360" fill="#1a1a2e" />
      <path d="M522 358 Q523 346 520 340 Q514 337 511 345 L513 358" fill="#1a1a2e" />
      <path d="M510 360 Q510 350 507 345 Q502 343 500 350 L502 360" fill="#1a1a2e" />
      {/* Thumb right */}
      <path d="M490 365 Q482 360 480 355 Q482 350 488 352 L495 365" fill="#1a1a2e" />

      {/* Glasses */}
      <rect x="265" y="103" width="30" height="18" rx="4" fill="none" stroke="#252540" strokeWidth="1.5" />
      <rect x="305" y="103" width="30" height="18" rx="4" fill="none" stroke="#252540" strokeWidth="1.5" />
      <line x1="295" y1="112" x2="305" y2="112" stroke="#252540" strokeWidth="1" />

      {/* Edge highlights */}
      <path d="M215 195 Q170 200 130 235 Q90 280 70 350"
        stroke="url(#edge-left)" strokeWidth="2" fill="none" />
      <path d="M385 195 Q430 200 470 235 Q510 280 530 350"
        stroke="url(#edge-right)" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* Morpheus C: Stylized Line Art (like the reference image) */
function MorpheusLineArt() {
  return (
    <svg viewBox="0 0 600 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Head outline */}
      <ellipse cx="300" cy="118" rx="46" ry="56" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />

      {/* Glasses */}
      <path d="M262 108 Q265 100 280 100 Q292 100 298 108" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
      <path d="M302 108 Q308 100 320 100 Q332 100 338 108" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
      <line x1="298" y1="105" x2="302" y2="105" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" />

      {/* Neck + collar */}
      <path d="M285 170 L285 195 L260 210" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.12" />
      <path d="M315 170 L315 195 L340 210" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.12" />

      {/* Coat outline - body */}
      <path d="M260 210 L240 400" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.1" />
      <path d="M340 210 L360 400" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.1" />
      <path d="M300 210 L295 400" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.06" />
      <path d="M300 210 L305 400" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.06" />

      {/* LEFT ARM + HAND (cyan/blue strokes) */}
      {/* Shoulder */}
      <path d="M260 210 Q220 215 180 240" fill="none" stroke="#00bbff" strokeWidth="1" opacity="0.35" filter="url(#line-glow)" />
      {/* Upper arm */}
      <path d="M180 240 Q145 280 120 330" fill="none" stroke="#00bbff" strokeWidth="1" opacity="0.3" filter="url(#line-glow)" />
      {/* Forearm */}
      <path d="M120 330 Q100 355 85 365" fill="none" stroke="#00bbff" strokeWidth="1.2" opacity="0.4" filter="url(#line-glow)" />
      {/* Palm */}
      <ellipse cx="85" cy="368" rx="32" ry="10" fill="none" stroke="#00bbff" strokeWidth="1" opacity="0.45" filter="url(#line-glow)" />
      {/* Fingers */}
      <path d="M58 363 Q53 350 57 342" fill="none" stroke="#00bbff" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      <path d="M67 358 Q64 344 68 336" fill="none" stroke="#00bbff" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      <path d="M78 356 Q77 342 80 334" fill="none" stroke="#00bbff" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      <path d="M89 357 Q89 345 92 338" fill="none" stroke="#00bbff" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      {/* Thumb */}
      <path d="M112 363 Q120 355 118 348" fill="none" stroke="#00bbff" strokeWidth="0.8" opacity="0.35" filter="url(#line-glow)" />

      {/* RIGHT ARM + HAND (red/pink strokes) */}
      {/* Shoulder */}
      <path d="M340 210 Q380 215 420 240" fill="none" stroke="#ff4466" strokeWidth="1" opacity="0.35" filter="url(#line-glow)" />
      {/* Upper arm */}
      <path d="M420 240 Q455 280 480 330" fill="none" stroke="#ff4466" strokeWidth="1" opacity="0.3" filter="url(#line-glow)" />
      {/* Forearm */}
      <path d="M480 330 Q500 355 515 365" fill="none" stroke="#ff4466" strokeWidth="1.2" opacity="0.4" filter="url(#line-glow)" />
      {/* Palm */}
      <ellipse cx="515" cy="368" rx="32" ry="10" fill="none" stroke="#ff4466" strokeWidth="1" opacity="0.45" filter="url(#line-glow)" />
      {/* Fingers */}
      <path d="M542 363 Q547 350 543 342" fill="none" stroke="#ff4466" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      <path d="M533 358 Q536 344 532 336" fill="none" stroke="#ff4466" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      <path d="M522 356 Q523 342 520 334" fill="none" stroke="#ff4466" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      <path d="M511 357 Q511 345 508 338" fill="none" stroke="#ff4466" strokeWidth="0.8" opacity="0.4" filter="url(#line-glow)" />
      {/* Thumb */}
      <path d="M488 363 Q480 355 482 348" fill="none" stroke="#ff4466" strokeWidth="0.8" opacity="0.35" filter="url(#line-glow)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   PILL RENDERINGS
   ═══════════════════════════════════════════════ */

/* Pill Approach A: CSS 3D Capsules */
function PillCSS({ color }: { color: "blue" | "red" }) {
  const isBlue = color === "blue";
  return (
    <div className="relative animate-float" style={{ animationDuration: "3s", animationDelay: isBlue ? "0s" : "0.5s" }}>
      {/* Glow underneath */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full blur-lg"
        style={{ backgroundColor: isBlue ? "#00aaff" : "#ff4466", opacity: 0.4 }}
      />
      {/* Pill body */}
      <div
        className="relative w-20 h-9 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
        style={{
          background: isBlue
            ? "linear-gradient(135deg, #66ddff 0%, #00aaff 30%, #0077cc 70%, #004488 100%)"
            : "linear-gradient(135deg, #ff8888 0%, #ff4444 30%, #cc2222 70%, #881111 100%)",
          boxShadow: isBlue
            ? "0 0 20px rgba(0,170,255,0.4), 0 0 60px rgba(0,170,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.3)"
            : "0 0 20px rgba(255,68,68,0.4), 0 0 60px rgba(255,68,68,0.15), inset 0 -2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute top-1.5 left-3 w-6 h-2 rounded-full"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)" }}
        />
        {/* Secondary highlight */}
        <div
          className="absolute top-2.5 right-4 w-2 h-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.2)" }}
        />
      </div>
    </div>
  );
}

/* Pill Approach B: SVG Rendered */
function PillSVG({ color }: { color: "blue" | "red" }) {
  const isBlue = color === "blue";
  return (
    <div className="relative animate-float cursor-pointer transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
      style={{ animationDuration: "3s", animationDelay: isBlue ? "0s" : "0.5s" }}>
      {/* Glow underneath */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full blur-lg"
        style={{ backgroundColor: isBlue ? "#00aaff" : "#ff4466", opacity: 0.4 }}
      />
      <svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`pill-grad-${color}`} x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={isBlue ? "#88eeff" : "#ffaaaa"} />
            <stop offset="30%" stopColor={isBlue ? "#00aaff" : "#ff4444"} />
            <stop offset="70%" stopColor={isBlue ? "#0066cc" : "#cc2222"} />
            <stop offset="100%" stopColor={isBlue ? "#003366" : "#881111"} />
          </linearGradient>
          <radialGradient id={`pill-highlight-${color}`} cx="0.3" cy="0.25" r="0.5">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id={`pill-glow-${color}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
          <filter id={`pill-shadow-${color}`}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={isBlue ? "#00aaff" : "#ff4444"} floodOpacity="0.4" />
          </filter>
        </defs>
        {/* Outer glow */}
        <rect x="5" y="5" width="70" height="30" rx="15" ry="15"
          fill={isBlue ? "#00aaff" : "#ff4444"} opacity="0.3" filter={`url(#pill-glow-${color})`} />
        {/* Main pill body */}
        <rect x="5" y="5" width="70" height="30" rx="15" ry="15"
          fill={`url(#pill-grad-${color})`} filter={`url(#pill-shadow-${color})`} />
        {/* Specular highlight */}
        <rect x="5" y="5" width="70" height="30" rx="15" ry="15"
          fill={`url(#pill-highlight-${color})`} />
        {/* Small bright spot */}
        <ellipse cx="25" cy="14" rx="8" ry="3" fill="white" opacity="0.25" />
      </svg>
    </div>
  );
}

/* Pill Approach C: Three.js 3D — renders as a full-screen overlay canvas with both pills */
function PillThreeJSOverlay() {
  return (
    <div className="absolute inset-0 z-30" style={{ pointerEvents: "none" }}>
      <Pill3DScene
        onClickLeft={() => {}}
        onClickRight={() => {}}
        hovered={null}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PLAYGROUND PAGE
   ═══════════════════════════════════════════════ */
type MorpheusStyle = "edge-glow" | "gradient" | "line-art";
type PillStyle = "css" | "svg" | "threejs";

export default function PlaygroundPage() {
  const [morpheusStyle, setMorpheusStyle] = useState<MorpheusStyle>("line-art");
  const [pillStyle, setPillStyle] = useState<PillStyle>("css");

  const morpheusComponents: Record<MorpheusStyle, React.ReactNode> = {
    "edge-glow": <MorpheusEdgeGlow />,
    gradient: <MorpheusGradient />,
    "line-art": <MorpheusLineArt />,
  };

  const pillComponent = (color: "blue" | "red") => {
    switch (pillStyle) {
      case "css": return <PillCSS color={color} />;
      case "svg": return <PillSVG color={color} />;
      case "threejs": return null; // Three.js renders both pills in a single canvas overlay
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-8">
          {/* Morpheus style */}
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)]">Morpheus:</span>
            {(["edge-glow", "gradient", "line-art"] as MorpheusStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setMorpheusStyle(style)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 font-[family-name:var(--font-mono)] ${
                  morpheusStyle === style
                    ? "border-white/60 text-white bg-white/10"
                    : "border-white/15 text-white/40 hover:border-white/30 hover:text-white/60"
                }`}
              >
                {style === "edge-glow" ? "Edge Glow" : style === "gradient" ? "Gradient" : "Line Art"}
              </button>
            ))}
          </div>

          {/* Pill style */}
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)]">Pills:</span>
            {(["css", "svg", "threejs"] as PillStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setPillStyle(style)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 font-[family-name:var(--font-mono)] ${
                  pillStyle === style
                    ? "border-white/60 text-white bg-white/10"
                    : "border-white/15 text-white/40 hover:border-white/30 hover:text-white/60"
                }`}
              >
                {style === "css" ? "CSS 3D" : style === "svg" ? "SVG" : "Three.js"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scene */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Matrix rain */}
        <MatrixRain />

        {/* Morpheus silhouette */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] md:w-[700px] h-[450px] md:h-[580px]">
            {morpheusComponents[morpheusStyle]}
          </div>
        </div>

        {/* "Make your choice" tagline */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10">
          <p className="text-white/25 text-xs md:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-mono)]">
            Make your choice
          </p>
        </div>

        {/* Pills positioned over hands */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative w-[500px] md:w-[700px] h-[450px] md:h-[580px]">
            {/* Blue pill - over left hand */}
            <div className="absolute pointer-events-auto" style={{ left: "8%", top: "55%", transform: "translate(-50%, -50%)" }}>
              {pillComponent("blue")}
            </div>
            {/* Red pill - over right hand */}
            <div className="absolute pointer-events-auto" style={{ right: "8%", top: "55%", transform: "translate(50%, -50%)" }}>
              {pillComponent("red")}
            </div>
          </div>
        </div>

        {/* Three.js pill overlay (when selected) */}
        {pillStyle === "threejs" && <PillThreeJSOverlay />}

        {/* Bottom quote */}
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-10">
          <p className="text-white/10 text-xs md:text-sm italic font-[family-name:var(--font-display)] max-w-sm text-center">
            &ldquo;I can only show you the door. You&rsquo;re the one that has to walk through it.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
