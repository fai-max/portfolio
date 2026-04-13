"use client";

import { useRef, useEffect, useState } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { gsap, registerGsapPlugins } from "@/lib/gsap-config";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Contact() {
  const { mode } = usePersonality();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // No GSAP animation — section is always visible
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formState.name}`
    );
    const body = encodeURIComponent(formState.message);
    window.open(`mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  if (!mode) return null;

  if (mode === "tech") {
    return (
      <section
        ref={sectionRef}
        className="section bg-bg-primary"
        id="contact"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <span className="font-[family-name:var(--font-mono)] section-label" style={{ color: "var(--accent-1)" }}>
              ~/contact $
            </span>
            <h2 className="font-[family-name:var(--font-mono)]" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 700, marginTop: "0.5rem" }}>
              ssh fahim@hello
            </h2>
          </div>

          {/* Terminal + socials stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Terminal card */}
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
                  fahim — contact — zsh
                </span>
              </div>

              {/* CLI body — everything is inline text, inputs blend in */}
              <form onSubmit={handleSubmit} className="font-[family-name:var(--font-mono)]" style={{
                padding: "1.25rem 1.5rem", fontSize: "0.82rem", lineHeight: "2.2",
                color: "rgba(255,255,255,0.5)",
              }}>
                <div>
                  <span style={{ color: "var(--accent-1)" }}>fahim@portfolio</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
                  <span style={{ color: "#6a9eff" }}>~</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
                  <span>echo </span><span style={{ color: "#6a9eff" }}>$NAME</span>
                </div>
                <div style={{ position: "relative" }}>
                  {!formState.name && <span className="cursor-blink" style={{ position: "absolute", left: 0, top: 0, color: "var(--accent-1)", fontSize: "0.82rem", lineHeight: "2.2", pointerEvents: "none" }}>_</span>}
                  <input
                    type="text" value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    required className="font-[family-name:var(--font-mono)]"
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: 0, color: "#e0e4ec", outline: "none",
                      fontSize: "0.82rem", lineHeight: "2.2", caretColor: "var(--accent-1)",
                    }}
                  />
                </div>

                <div>
                  <span style={{ color: "var(--accent-1)" }}>fahim@portfolio</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
                  <span style={{ color: "#6a9eff" }}>~</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
                  <span>echo </span><span style={{ color: "#6a9eff" }}>$EMAIL</span>
                </div>
                <div style={{ position: "relative" }}>
                  {!formState.email && <span className="cursor-blink" style={{ position: "absolute", left: 0, top: 0, color: "var(--accent-1)", fontSize: "0.82rem", lineHeight: "2.2", pointerEvents: "none" }}>_</span>}
                  <input
                    type="email" value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    required className="font-[family-name:var(--font-mono)]"
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: 0, color: "#e0e4ec", outline: "none",
                      fontSize: "0.82rem", lineHeight: "2.2", caretColor: "var(--accent-1)",
                    }}
                  />
                </div>

                <div>
                  <span style={{ color: "var(--accent-1)" }}>fahim@portfolio</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
                  <span style={{ color: "#6a9eff" }}>~</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
                  <span>cat &lt;&lt; </span><span style={{ color: "#e8a060" }}>EOF</span><span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", marginLeft: "1rem" }}># write your message below</span>
                </div>
                <div style={{ position: "relative" }}>
                  {!formState.message && <span className="cursor-blink" style={{ position: "absolute", left: 0, top: 0, color: "var(--accent-1)", fontSize: "0.82rem", lineHeight: "2.2", pointerEvents: "none" }}>_</span>}
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    rows={3} required className="font-[family-name:var(--font-mono)]"
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: 0, color: "#e0e4ec", outline: "none",
                      fontSize: "0.82rem", lineHeight: "2.2", resize: "none",
                      caretColor: "var(--accent-1)",
                    }}
                  />
                </div>
                <div style={{ color: "#e8a060" }}>EOF</div>

                <div style={{ marginTop: "0.75rem" }}>
                  <span style={{ color: "var(--accent-1)" }}>fahim@portfolio</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>:</span>
                  <span style={{ color: "#6a9eff" }}>~</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
                  <button type="submit" className="font-[family-name:var(--font-mono)]" style={{
                    background: "transparent", border: "none", padding: 0,
                    color: "#e0e4ec", fontSize: "0.82rem", cursor: "pointer",
                    textDecoration: "underline", textUnderlineOffset: "3px",
                    textDecorationColor: "rgba(255,255,255,0.2)",
                  }}>
                    {sent ? "# sent ✓" : "mail --send --urgent"}
                  </button>
                </div>
              </form>
            </div>

            {/* Social links — compact row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {[
                {
                  label: "GitHub", sub: "@fai-max", href: SOCIAL_LINKS.github,
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
                },
                {
                  label: "LinkedIn", sub: "/in/mdfahim", href: SOCIAL_LINKS.linkedin,
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
                {
                  label: "Email", sub: "contact@mdfahim.in", href: `mailto:${SOCIAL_LINKS.email}`,
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>,
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "1rem 1.25rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius)",
                    textDecoration: "none", transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-1)";
                    e.currentTarget.style.background = "rgba(68,136,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.background = "var(--card-bg)";
                  }}
                >
                  <span style={{ color: "var(--accent-1)", flexShrink: 0 }}>{link.icon}</span>
                  <div>
                    <div className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{link.label}</div>
                    <div className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{link.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Creative mode — full-bleed inverted RED section
  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative", zIndex: 1,
        background: "#cc2222",
        padding: "5rem 1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay on red */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px", mixBlendMode: "multiply",
      }} />

      {/* Decorative bg text */}
      <span className="font-[family-name:var(--font-display)]" style={{
        position: "absolute", top: "-2rem", right: "-2rem",
        fontSize: "clamp(10rem, 25vw, 20rem)", fontWeight: 900,
        color: "rgba(0,0,0,0.06)", lineHeight: 0.85,
        pointerEvents: "none", userSelect: "none",
      }}>SAY</span>

      <div style={{ maxWidth: "64rem", margin: "0 auto", position: "relative" }}>
        {/* Heading — dark on red */}
        <h2 className="font-[family-name:var(--font-display)]" style={{
          fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900,
          color: "#0d0d0d", lineHeight: 0.95,
          marginBottom: "3rem",
        }}>
          Let&apos;s Talk.
        </h2>

        {/* Form — dark inputs on red */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "36rem" }}>
          {[
            { label: "Name", field: "name" as const, type: "text", placeholder: "Your name" },
            { label: "Email", field: "email" as const, type: "email", placeholder: "you@example.com" },
          ].map((input) => (
            <div key={input.field}>
              <label className="font-[family-name:var(--font-mono)]" style={{
                display: "block", fontSize: "0.6rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "rgba(0,0,0,0.5)", marginBottom: "0.375rem",
              }}>{input.label}</label>
              <input
                type={input.type} value={formState[input.field]} placeholder={input.placeholder}
                onChange={(e) => setFormState((s) => ({ ...s, [input.field]: e.target.value }))}
                required className="font-[family-name:var(--font-display)]"
                style={{
                  width: "100%", background: "transparent", border: "none",
                  borderBottom: "2px solid rgba(0,0,0,0.2)", padding: "0.75rem 0",
                  color: "#0d0d0d", outline: "none", fontSize: "1.1rem",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = "#0d0d0d"}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.2)"}
              />
            </div>
          ))}
          <div>
            <label className="font-[family-name:var(--font-mono)]" style={{
              display: "block", fontSize: "0.6rem", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "rgba(0,0,0,0.5)", marginBottom: "0.375rem",
            }}>Message</label>
            <textarea
              value={formState.message} placeholder="What's on your mind?"
              onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              rows={4} required className="font-[family-name:var(--font-display)]"
              style={{
                width: "100%", background: "transparent", border: "none",
                borderBottom: "2px solid rgba(0,0,0,0.2)", padding: "0.75rem 0",
                color: "#0d0d0d", outline: "none", fontSize: "1.1rem", resize: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderBottomColor = "#0d0d0d"}
              onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.2)"}
            />
          </div>
          <button type="submit" className="font-[family-name:var(--font-mono)]" style={{
            background: "#0d0d0d", color: "#cc2222",
            border: "none", borderRadius: "2px",
            padding: "1rem 2rem", fontSize: "0.75rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.2em",
            cursor: "pointer", transition: "opacity 0.2s", width: "fit-content",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            {sent ? "Sent!" : "Send Message"}
          </button>
        </form>

        {/* Social links — dark on red, horizontal */}
        <div style={{ display: "flex", gap: "2rem", marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.15)" }}>
          {[
            { label: "GitHub", href: SOCIAL_LINKS.github },
            { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
            { label: "Email", href: `mailto:${SOCIAL_LINKS.email}` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="font-[family-name:var(--font-mono)]"
              style={{
                color: "#0d0d0d", textDecoration: "underline",
                textUnderlineOffset: "3px", textDecorationColor: "rgba(0,0,0,0.3)",
                fontSize: "0.8rem", letterSpacing: "0.1em",
                transition: "text-decoration-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecorationColor = "#0d0d0d"}
              onMouseLeave={(e) => e.currentTarget.style.textDecorationColor = "rgba(0,0,0,0.3)"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
