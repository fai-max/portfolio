"use client";

import { useRef, useEffect } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";

const showcaseItems = [
  { title: "3D Renders", tool: "Blender", color: "#ff6b6b" },
  { title: "Motion Graphics", tool: "DaVinci Resolve", color: "#845ef7" },
  { title: "Design Work", tool: "Adobe Illustrator", color: "#ffd93d" },
  { title: "Print & Layout", tool: "Affinity Publisher", color: "#00d2ff" },
];

export function Creative() {
  const { mode } = usePersonality();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === "creative") return;
    registerGsapPlugins();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".creative-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mode]);

  if (!mode) return null;
  return null; // Section removed — creative content is shown via mode-specific sections

  return (
    <section
      ref={sectionRef}
      className="section"
      id="creative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div>
            <span className="text-accent-1 font-[family-name:var(--font-mono)] text-sm">
              ~/creative $
            </span>
            <h2 className="text-2xl font-bold mt-2 font-[family-name:var(--font-mono)]">
              other_side
            </h2>
            <p className="text-text-muted text-sm mt-2 font-[family-name:var(--font-mono)]">
              # I also make visual things. Switch to{" "}
              <button
                onClick={() => {
                  const { toggle } = usePersonality.getState();
                  toggle();
                }}
                className="text-accent-1 underline"
              >
                Creative mode
              </button>{" "}
              to see more.
            </p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          {showcaseItems.map((item) => (
            <div
              key={item.title}
              className="creative-card relative overflow-hidden rounded-[var(--radius)] border border-border-color group cursor-pointer aspect-square"
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${item.color}40, transparent)`,
                }}
              />

              {/* Mesh pattern */}
              <div className="absolute inset-0 opacity-[0.05]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(${item.color} 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="font-bold text-text-primary mb-1 text-sm">
                  {item.title}
                </h3>
                <p className="text-text-muted text-xs">{item.tool}</p>
                <div
                  className="mt-3 px-3 py-1 rounded-full text-[10px] font-medium opacity-60"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  Coming Soon
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
