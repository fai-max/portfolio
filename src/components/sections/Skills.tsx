"use client";

import { useRef, useEffect, useState } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";
import { getFilteredSkills, getFilteredSkillCategories } from "@/lib/filters";

export function Skills() {
  const { mode } = usePersonality();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      if (mode === "tech") {
        gsap.fromTo(
          ".skill-bar-fill",
          { width: "0%" },
          {
            width: (i: number, el: HTMLElement) =>
              el.getAttribute("data-width") || "0%",
            duration: 1,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mode]);

  if (!mode) return null;

  if (mode === "tech") {
    const categories = getFilteredSkillCategories("tech");
    const allSkills = getFilteredSkills("tech");

    const groupedSkills = categories.map((cat) => ({
      category: cat,
      items: allSkills.filter((s) => s.category === cat),
    }));

    return (
      <section
        ref={sectionRef}
        className="section bg-bg-primary"
        id="skills"
      >
        <div className="max-w-5xl mx-auto">
          <div style={{ marginBottom: "3.5rem" }}>
            <span className="section-label font-[family-name:var(--font-mono)]">
              ~/skills $
            </span>
            <h2 className="font-[family-name:var(--font-mono)] text-4xl md:text-5xl lg:text-7xl font-bold" style={{ marginTop: "0.75rem" }}>
              tech_stack
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {groupedSkills.map((group) => (
              <div key={group.category} style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius)",
                padding: "1.25rem 1.5rem",
              }}>
                <h3 className="font-[family-name:var(--font-mono)]" style={{
                  fontSize: "0.75rem", color: "var(--accent-1)",
                  marginBottom: "1rem", letterSpacing: "0.05em",
                }}>
                  $ ls {group.category.toLowerCase().replace(/ & /g, "-")}/
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem 1.5rem" }}>
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-item"
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                    >
                      <span
                        className="font-[family-name:var(--font-mono)]"
                        style={{
                          fontSize: "0.8rem", flexShrink: 0, width: "8rem",
                          color: skill.isHighlighted ? "#e87f36" : "var(--text-primary)",
                          fontWeight: skill.isHighlighted ? 700 : 400,
                        }}
                      >
                        {skill.name}
                      </span>
                      <div style={{
                        flex: 1, height: "4px", background: "var(--bg-tertiary)",
                        borderRadius: "9999px", overflow: "hidden",
                      }}>
                        <div
                          className="skill-bar-fill"
                          style={{
                            height: "100%", borderRadius: "9999px",
                            background: skill.isHighlighted ? "#e87f36" : "var(--accent-1)",
                          }}
                          data-width={`${skill.proficiency * 20}%`}
                        />
                      </div>
                      <span className="font-[family-name:var(--font-mono)]" style={{
                        fontSize: "0.7rem", color: "var(--text-muted)",
                        width: "1rem", textAlign: "right",
                      }}>
                        {skill.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Creative mode — scattered type composition
  const creativeSkills = getFilteredSkills("creative");

  return (
    <section
      ref={sectionRef}
      className="section bg-bg-primary"
      id="skills"
    >
      <div className="max-w-5xl mx-auto">
        {/* No heading — floating type speaks for itself */}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem 3rem", alignItems: "baseline" }}>
          {creativeSkills.map((skill, index) => (
            <CreativeSkillItem key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreativeSkillItem({ skill, index }: { skill: { name: string; proficiency: number }; index: number }) {
  const [hovered, setHovered] = useState(false);

  const sizeMap: Record<number, { fontSize: string; fontWeight: number }> = {
    5: { fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 900 },
    4: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700 },
    3: { fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 400 },
  };

  const { fontSize, fontWeight } = sizeMap[skill.proficiency] || sizeMap[3];

  const baseColor = index % 2 === 0 ? "var(--accent-1)" : "var(--text-primary)";
  const hoverColor = index % 2 === 0 ? "var(--text-primary)" : "var(--accent-1)";

  const rotation = index % 3 === 0 ? "rotate(-3deg)" : index % 4 === 0 ? "rotate(2deg)" : "none";

  return (
    <div
      className="skill-item"
      style={{
        display: "inline-flex", flexDirection: "column", alignItems: "center",
        cursor: "default",
        transform: hovered ? `scale(1.05) ${rotation}` : rotation,
        transition: "transform 0.3s, color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-[family-name:var(--font-display)]"
        style={{
          fontSize,
          fontWeight,
          color: hovered ? hoverColor : baseColor,
          lineHeight: 1.1,
          transition: "color 0.3s",
        }}
      >
        {skill.name}
      </span>
      <span className="font-[family-name:var(--font-mono)]" style={{
        fontSize: "0.6rem", color: "var(--text-muted)", marginTop: "0.25rem",
        letterSpacing: "0.1em",
      }}>
        {"●".repeat(skill.proficiency)}{"○".repeat(5 - skill.proficiency)}
      </span>
    </div>
  );
}
