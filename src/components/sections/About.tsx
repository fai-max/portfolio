"use client";

import { useRef, useEffect } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";
import { personal } from "@/data/personal";

/* ── Inline SVG icons ── */
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const DeviceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const AcademicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
  </svg>
);

/* Flag badges */
const FlagBadge = ({ code }: { code: string }) => (
  <span className="inline-flex items-center justify-center w-7 h-5 rounded text-[10px] font-bold tracking-wider bg-accent-1/10 text-accent-1 font-[family-name:var(--font-mono)]">
    {code}
  </span>
);

const flagCodes: Record<string, string> = {
  English: "EN",
  Hindi: "HI",
  Tamil: "TA",
  Malayalam: "ML",
  French: "FR",
  German: "DE",
};

/* ── Tech Mode ── */
function TechAbout() {
  const vit = personal.education[0];

  const statIcons = [
    <GlobeIcon key="globe" />,
    <DeviceIcon key="device" />,
    <AcademicIcon key="academic" />,
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col" style={{ gap: "2.5rem" }}>
      {/* Section label + heading */}
      <div className="about-reveal">
        <span className="section-label font-[family-name:var(--font-mono)]">
          ~/about $
        </span>
        <h2 className="font-[family-name:var(--font-mono)] text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary" style={{ marginTop: "0.75rem" }}>
          whoami
        </h2>
      </div>

      {/* Terminal bio card — matching contact terminal style */}
      <div className="about-reveal">
        <div style={{
          background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
          borderRadius: "10px", overflow: "hidden",
        }}>
          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", position: "relative",
            padding: "10px 14px", background: "var(--bg-tertiary)",
            borderBottom: "1px solid var(--border-color)",
          }}>
            <div style={{ display: "flex", gap: "7px" }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <span className="font-[family-name:var(--font-mono)]" style={{
              fontSize: "0.7rem", color: "var(--text-muted)",
              position: "absolute", left: "50%", transform: "translateX(-50%)",
            }}>
              fahim — about — zsh
            </span>
          </div>

          {/* CLI body */}
          <div className="font-[family-name:var(--font-mono)]" style={{ padding: "1.25rem 1.5rem", fontSize: "0.82rem", lineHeight: "2.2", color: "rgba(255,255,255,0.5)" }}>
            <div>
              <span style={{ color: "var(--accent-1)" }}>fahim@portfolio</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
              <span style={{ color: "#6a9eff" }}>~</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
              <span>cat bio.txt</span>
            </div>
            <p style={{ color: "#e0e4ec", marginTop: "0.5rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              {personal.bio.tech}
            </p>

            <div>
              <span style={{ color: "var(--accent-1)" }}>fahim@portfolio</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
              <span style={{ color: "#6a9eff" }}>~</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
              <span>cat education.json</span>
            </div>
            <pre style={{ marginTop: "0.5rem", fontSize: "0.78rem", lineHeight: 2 }}>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>{"{"}</span>{"\n"}
              {"  "}<span style={{ color: "#4488ff" }}>&quot;degree&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>: </span><span style={{ color: "#a8d8a8" }}>&quot;{vit.degree}&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>{"\n"}
              {"  "}<span style={{ color: "#4488ff" }}>&quot;institution&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>: </span><span style={{ color: "#a8d8a8" }}>&quot;{vit.institution}&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>{"\n"}
              {"  "}<span style={{ color: "#4488ff" }}>&quot;period&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>: </span><span style={{ color: "#a8d8a8" }}>&quot;{vit.period}&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>,</span>{"\n"}
              {"  "}<span style={{ color: "#4488ff" }}>&quot;score&quot;</span><span style={{ color: "rgba(255,255,255,0.3)" }}>: </span><span style={{ color: "#a8d8a8" }}>&quot;{vit.score}&quot;</span>{"\n"}
              <span style={{ color: "rgba(255,255,255,0.3)" }}>{"}"}</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="about-reveal grid grid-cols-1 sm:grid-cols-3" style={{ gap: "1.5rem" }}>
        {personal.stats.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center rounded-[var(--radius)] border border-border-color bg-bg-secondary"
            style={{ padding: "1.25rem 1rem" }}
          >
            <div className="flex justify-center mb-4 text-accent-1">
              {statIcons[i]}
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <span
                className="stat-counter text-3xl font-bold font-[family-name:var(--font-mono)] text-accent-1 tabular-nums"
                data-target={stat.value}
              >
                0
              </span>
              {stat.suffix && (
                <span className="text-text-muted text-xs font-[family-name:var(--font-mono)]">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="text-text-secondary text-xs mt-4">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="about-reveal">
        <h3 className="text-lg font-bold font-[family-name:var(--font-mono)] text-accent-1" style={{ marginBottom: "1.5rem" }}>
          $ echo $LANGUAGES
        </h3>
        <div className="flex flex-wrap" style={{ gap: "0.75rem" }}>
          {personal.languages.map((lang) => (
            <div
              key={lang.name}
              className="group relative flex items-center px-5 py-3.5 rounded-[var(--radius)] border border-border-color transition-all duration-300 hover:border-accent-1 bg-bg-secondary"
            >
              <FlagBadge code={flagCodes[lang.name] || lang.name.slice(0, 2).toUpperCase()} />
              <span className="text-sm text-text-primary ml-3 leading-none">{lang.name}</span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-bg-secondary border border-border-color rounded-[var(--radius)] text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {lang.native}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Creative Mode ── */
function CreativeAbout() {
  const pullQuote = personal.bio.creative.split('.')[0] + '.';
  const fullBio = personal.bio.creative;

  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
      {/* Decorative background text */}
      <span className="bg-text font-[family-name:var(--font-display)]" style={{ top: "-3rem", right: "0" }}>ABOUT</span>

      {/* Vertical section label */}
      <div className="about-reveal" style={{
        position: "absolute", left: "-2rem", top: "0",
        writingMode: "vertical-rl", transform: "rotate(180deg)",
      }}>
        <span className="font-[family-name:var(--font-mono)]" style={{
          fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--accent-1)",
        }}>ABOUT</span>
      </div>

      {/* Two-column asymmetric layout */}
      <div className="about-reveal" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
        {/* Pull quote — massive */}
        <p className="font-[family-name:var(--font-display)]" style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.15,
          color: "var(--text-primary)", maxWidth: "48rem",
        }}>
          {pullQuote}
        </p>

        {/* Full bio + right column */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "4rem" }}>
          <div>
            <p style={{
              fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)",
              fontStyle: "italic", fontFamily: "var(--font-display)",
              borderLeft: "3px solid var(--accent-1)", paddingLeft: "1.5rem",
            }}>
              {fullBio}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {personal.stats.map((stat) => (
                <div key={stat.label}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span className="stat-counter font-[family-name:var(--font-display)]"
                      data-target={stat.value}
                      style={{ fontSize: "3rem", fontWeight: 900, color: "var(--accent-1)" }}>0</span>
                    {stat.suffix && <span className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{stat.suffix}</span>}
                  </div>
                  <span className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)" }}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Leadership */}
            <div>
              <span className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--accent-1)", display: "block", marginBottom: "0.75rem" }}>Roles</span>
              {personal.leadership.map((entry, i) => (
                <p key={i} className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                  {entry.role} — {entry.org}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal line */}
      <div className="diagonal-line about-reveal" style={{ margin: "3rem 0" }} />

      {/* Languages — scattered, different sizes */}
      <div className="about-reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "baseline" }}>
        {personal.languages.map((lang, i) => (
          <span key={lang.name} className="font-[family-name:var(--font-display)]" style={{
            fontSize: i % 3 === 0 ? "1.5rem" : i % 3 === 1 ? "1rem" : "0.8rem",
            fontWeight: i % 2 === 0 ? 800 : 400,
            color: i % 2 === 0 ? "var(--text-primary)" : "var(--text-secondary)",
            transform: i % 3 === 1 ? "rotate(-2deg)" : "none",
            display: "inline-block",
          }}>
            {lang.name}
          </span>
        ))}
      </div>

      {/* Education — minimal */}
      <div className="about-reveal" style={{ marginTop: "2rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {personal.education.map((edu, i) => (
          <div key={i} className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
            <span style={{ color: "var(--text-secondary)" }}>{edu.institution}</span> — {edu.period}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export function About() {
  const { mode } = usePersonality();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      const counters = document.querySelectorAll(".stat-counter");
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        const isFloat = target % 1 !== 0;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          onUpdate: () => {
            counter.textContent = isFloat
              ? obj.val.toFixed(2)
              : Math.round(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mode]);

  if (!mode) return null;

  return (
    <section ref={sectionRef} className="section bg-bg-primary" id="about">
      {mode === "tech" ? <TechAbout /> : <CreativeAbout />}
    </section>
  );
}
