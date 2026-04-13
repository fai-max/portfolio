"use client";

import { usePersonality } from "@/hooks/usePersonality";

export function MarqueeStrip() {
  const { mode } = usePersonality();
  if (mode !== "creative") return null;

  const text = "DESIGN — MOTION — 3D — VIDEO — BLENDER — DAVINCI — ILLUSTRATOR — STORYTELLING — ";
  // Repeat the text enough times for seamless loop
  const repeated = text.repeat(6);

  return (
    <div className="marquee-strip" style={{ position: "relative", zIndex: 1 }}>
      <div className="marquee-inner font-[family-name:var(--font-mono)]" style={{
        fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--accent-1)", opacity: 0.6,
      }}>
        {repeated}
      </div>
    </div>
  );
}
