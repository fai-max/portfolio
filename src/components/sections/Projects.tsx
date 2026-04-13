"use client";

import { useRef, useEffect } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";
import { getFilteredProjects } from "@/lib/filters";

export function Projects() {
  const { mode } = usePersonality();
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects = mode ? getFilteredProjects(mode) : [];

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.95 },
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

  const isPlaceholder = (id: string) =>
    id.startsWith("3d-") || id.startsWith("motion-") || id.startsWith("brand-");

  return (
    <section ref={sectionRef} className="section bg-bg-primary" id="projects">
      <div className="max-w-5xl mx-auto">
        {mode === "tech" ? (
          <>
            {/* Tech Header */}
            <div style={{ marginBottom: "3.5rem" }}>
              <span className="section-label font-[family-name:var(--font-mono)]">
                ~/projects $
              </span>
              <h2 className="font-[family-name:var(--font-mono)] text-4xl md:text-5xl lg:text-7xl font-bold mt-2">
                ls -la
              </h2>
            </div>

            {/* Bento Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="project-card"
                  style={{
                    gridColumn: i === 0 ? "1 / -1" : undefined,
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius)",
                    padding: "1.5rem",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(68,136,255,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                >
                  {/* Subtitle */}
                  <span className="font-[family-name:var(--font-mono)]" style={{
                    fontSize: "0.65rem", color: "var(--accent-1)",
                    textTransform: "uppercase", letterSpacing: "0.15em",
                  }}>
                    {project.subtitle}
                  </span>

                  {/* Title row */}
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginTop: "0.375rem", marginBottom: "0.75rem" }}>
                    <h3 className="font-[family-name:var(--font-mono)]" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {project.name}
                    </h3>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-mono)]"
                        style={{
                          fontSize: "0.7rem", color: "var(--accent-1)", textDecoration: "none",
                          border: "1px solid rgba(68,136,255,0.2)", borderRadius: "var(--radius)",
                          padding: "0.25rem 0.625rem", whiteSpace: "nowrap",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(68,136,255,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        Source ↗
                      </a>
                    )}
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-[family-name:var(--font-mono)]"
                        style={{
                          fontSize: "0.65rem", padding: "0.2rem 0.5rem",
                          background: "rgba(68,136,255,0.08)", color: "var(--accent-1)",
                          borderRadius: "2px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Creative Header — marquee strip */}
            <div className="marquee-strip" style={{ marginBottom: "4rem", position: "relative", zIndex: 1 }}>
              <div className="marquee-inner font-[family-name:var(--font-mono)]" style={{
                fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--accent-1)", opacity: 0.6,
              }}>
                {"SELECTED WORK — ".repeat(12)}
              </div>
            </div>

            {/* Lookbook Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
              {filteredProjects.map((project, i) => {
                const isOdd = i % 2 === 0; // 0-indexed: even index = odd item
                const comingSoon = isPlaceholder(project.id);

                return (
                  <div
                    key={project.id}
                    className="project-card"
                    style={{
                      position: "relative",
                      textAlign: isOdd ? "left" : "right",
                      marginLeft: isOdd ? "0" : "auto",
                      marginRight: isOdd ? "auto" : "0",
                      maxWidth: "85%",
                    }}
                  >
                    {/* Giant watermark number */}
                    <span className="font-[family-name:var(--font-display)]" style={{
                      fontSize: "clamp(6rem, 15vw, 12rem)",
                      fontWeight: 900,
                      opacity: 0.05,
                      color: "var(--text-primary)",
                      position: "absolute",
                      top: "-2rem",
                      right: isOdd ? "0" : undefined,
                      left: isOdd ? undefined : "0",
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Subtitle */}
                    <span className="font-[family-name:var(--font-mono)]" style={{
                      fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}>
                      {project.subtitle}
                    </span>

                    {/* Project name */}
                    <h3 className="font-[family-name:var(--font-display)]" style={{
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      lineHeight: 1,
                      color: "var(--text-primary)",
                      marginTop: "0.5rem",
                      ...(comingSoon ? { filter: "blur(1px)", opacity: 0.5, textDecoration: "line-through" } : {}),
                    }}>
                      {project.name}
                    </h3>

                    {/* Description — offset */}
                    <p style={{
                      fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)",
                      maxWidth: "28rem", marginTop: "1.5rem",
                      fontFamily: "var(--font-display)", fontWeight: 300,
                      ...(isOdd ? { marginLeft: "2rem" } : { marginRight: "2rem", marginLeft: "auto" }),
                    }}>
                      {project.description}
                    </p>

                    {/* Tech pills with slight rotation */}
                    <div style={{
                      display: "flex", flexWrap: "wrap", gap: "0.5rem",
                      marginTop: "1.5rem",
                      ...(isOdd ? { marginLeft: "2rem" } : { justifyContent: "flex-end", marginRight: "2rem" }),
                    }}>
                      {project.techStack.map((tech, ti) => (
                        <span
                          key={tech}
                          className="font-[family-name:var(--font-mono)]"
                          style={{
                            fontSize: "0.65rem", padding: "0.25rem 0.625rem",
                            border: "1px solid var(--border-color)",
                            color: "var(--text-secondary)",
                            borderRadius: "2px",
                            transform: `rotate(${(ti % 3 - 1)}deg)`,
                            display: "inline-block",
                          }}
                        >
                          {tech}
                        </span>
                      ))}

                      {comingSoon && (
                        <span className="font-[family-name:var(--font-mono)]" style={{
                          fontSize: "0.65rem", padding: "0.25rem 0.625rem",
                          color: "var(--accent-1)", border: "1px solid var(--accent-1)",
                          borderRadius: "2px", opacity: 0.6,
                        }}>
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
