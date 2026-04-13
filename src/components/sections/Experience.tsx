"use client";

import { useRef, useEffect } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";
import { getFilteredExperiences } from "@/lib/filters";
import type { Experience as ExperienceType } from "@/data/experience";

function TechTimeline({ experiences }: { experiences: ExperienceType[] }) {
  const isCurrent = (period: string) => period.toLowerCase().includes("present");

  return (
    <div className="relative" style={{ paddingLeft: "1.75rem" }}>
      {/* Vertical timeline line */}
      <div style={{ position: "absolute", left: "4px", top: "12px", bottom: "12px", width: "1px", background: "var(--border-color)" }} />

      {experiences.map((exp, i) => (
        <div key={exp.id} className="exp-item relative" style={{ paddingLeft: "2rem", paddingBottom: i < experiences.length - 1 ? "2rem" : "0" }}>
          {/* Timeline node — filled for current, outline for past */}
          <div style={{
            position: "absolute", left: "-1.75rem", top: "6px",
            width: "10px", height: "10px", borderRadius: "50%",
            background: isCurrent(exp.period) ? "var(--accent-1)" : "var(--bg-primary)",
            border: isCurrent(exp.period) ? "none" : "1.5px solid var(--accent-1)",
            boxShadow: isCurrent(exp.period) ? "0 0 8px var(--accent-1)" : "none",
            zIndex: 10,
          }} />

          {/* Card */}
          <div style={{
            background: "var(--card-bg)", border: "1px solid var(--border-color)",
            borderRadius: "var(--radius)", padding: "1.25rem 1.5rem",
          }}>
            {/* Header row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <h3 className="font-[family-name:var(--font-mono)]" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {exp.company}
              </h3>
              <span className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                {exp.period}
              </span>
            </div>

            <p className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.8rem", color: "var(--accent-1)", marginBottom: "0.125rem" }}>
              {exp.role}
            </p>
            <p className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              {exp.location}
            </p>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              {exp.techDescription}
            </p>

            {/* Project chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {exp.projects.map((proj) => (
                <div key={proj.name} className="group relative">
                  <span className="font-[family-name:var(--font-mono)]" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    padding: "0.25rem 0.625rem", fontSize: "0.7rem",
                    background: "rgba(68,136,255,0.08)", color: "var(--accent-1)",
                    borderRadius: "var(--radius)", border: "1px solid rgba(68,136,255,0.15)",
                    cursor: "default", transition: "background 0.2s",
                  }}>
                    {proj.name}
                  </span>
                  {/* Tooltip */}
                  <div style={{
                    position: "absolute", bottom: "100%", left: 0, marginBottom: "0.5rem",
                    padding: "0.75rem 1rem", background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)", borderRadius: "var(--radius)",
                    opacity: 0, pointerEvents: "none", zIndex: 20,
                    minWidth: "200px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    transition: "opacity 0.2s",
                  }} className="group-hover:!opacity-100">
                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                      {proj.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="font-[family-name:var(--font-mono)]" style={{
                          padding: "0.125rem 0.375rem", fontSize: "0.6rem",
                          background: "rgba(68,136,255,0.08)", color: "var(--accent-1)", borderRadius: "2px",
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {exp.certLink && (
              <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                <span className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--accent-1)" }}>✓</span> Certification verified
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CreativeCards({ experiences }: { experiences: ExperienceType[] }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Vertical label */}
      <div style={{ position: "absolute", left: "-2rem", top: "0", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
        <span className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-1)" }}>WORK</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
        {experiences.map((exp) => (
          <div key={exp.id} className="exp-item" style={{ position: "relative", borderLeft: "4px solid var(--accent-1)", paddingLeft: "2rem" }}>
            {/* Period — top right, slightly rotated */}
            <span className="font-[family-name:var(--font-mono)]" style={{
              position: "absolute", top: "0", right: "0",
              fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em",
              transform: "rotate(-3deg)",
            }}>{exp.period}</span>

            {/* Company — massive */}
            <h3 className="font-[family-name:var(--font-display)]" style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900,
              textTransform: "uppercase", lineHeight: 0.95,
              color: "var(--text-primary)",
            }}>{exp.company}</h3>

            {/* Role */}
            <span className="font-[family-name:var(--font-mono)]" style={{
              fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--accent-1)", display: "block", marginTop: "0.75rem",
            }}>{exp.role}</span>

            {/* Description — offset right */}
            <p style={{
              fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)",
              maxWidth: "32rem", marginTop: "1.5rem", marginLeft: "2rem",
              fontFamily: "var(--font-display)", fontWeight: 300,
            }}>{exp.creativeDescription}</p>

            {/* Projects inline */}
            {exp.projects.length > 0 && (
              <p className="font-[family-name:var(--font-mono)]" style={{
                fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "1.5rem", marginLeft: "2rem",
              }}>
                {exp.projects.map(p => p.name).join(" / ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const { mode } = usePersonality();
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences = mode
    ? getFilteredExperiences(mode)
    : [];

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
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

  return (
    <section ref={sectionRef} className="section bg-bg-primary" id="experience">
      <div className="max-w-5xl mx-auto">
        <div style={{ marginBottom: "3.5rem" }}>
          {mode === "tech" ? (
            <div>
              <span className="font-[family-name:var(--font-mono)] section-label">
                ~/experience $
              </span>
              <h2 className="font-[family-name:var(--font-mono)] text-4xl md:text-5xl lg:text-7xl font-bold mt-2">
                work_history
              </h2>
            </div>
          ) : (
            // Creative mode — no heading, vertical label in CreativeCards handles it
            <></>
          )}
        </div>

        {mode === "tech" ? (
          <TechTimeline experiences={experiences} />
        ) : (
          <CreativeCards experiences={experiences} />
        )}
      </div>
    </section>
  );
}
