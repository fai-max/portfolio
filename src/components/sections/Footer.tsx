"use client";

import { useState } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const { mode } = usePersonality();
  const [coffeeFloat, setCoffeeFloat] = useState(false);

  if (!mode) return null;

  if (mode === "creative") {
    return (
      <footer style={{
        background: "#0d0d0d",
        borderTop: "1px solid #cc2222",
        padding: "4rem 1.5rem 3rem",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
          {/* Left — large name */}
          <div>
            <span className="font-[family-name:var(--font-display)] riso-offset" style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900,
              color: "#cc2222", display: "block", lineHeight: 1,
            }}>FAHIM.</span>
            <p className="font-[family-name:var(--font-display)]" style={{
              fontSize: "0.85rem", color: "#9a8e84", marginTop: "0.75rem", fontStyle: "italic",
            }}>
              Designed with obsession.
            </p>
          </div>

          {/* Right — credits + links */}
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "flex-end", marginBottom: "1rem" }}>
              {[
                { label: "GH", href: SOCIAL_LINKS.github },
                { label: "LI", href: SOCIAL_LINKS.linkedin },
                { label: "@", href: `mailto:${SOCIAL_LINKS.email}` },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "@" ? "_blank" : undefined}
                  rel={link.label !== "@" ? "noopener noreferrer" : undefined}
                  className="font-[family-name:var(--font-mono)]"
                  style={{
                    fontSize: "0.75rem", fontWeight: 600, color: "#9a8e84",
                    textDecoration: "none", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#cc2222"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#9a8e84"}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.65rem", color: "#5a5048" }}>
              Built with{" "}
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: "#e87f36", textDecoration: "none" }}>Claude AI</a>
            </p>
            <p className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.6rem", color: "#5a5048", marginTop: "0.25rem" }}>
              &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Tech mode footer
  return (
    <footer style={{
      padding: "2rem 1.5rem",
      borderTop: "1px solid var(--border-color)",
      position: "relative", zIndex: 1,
    }}>
      {coffeeFloat && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-2xl animate-bounce z-50 pointer-events-none">
          ☕
        </div>
      )}

      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="font-[family-name:var(--font-mono)]" style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center" }}>
          <span style={{ color: "var(--accent-1)" }}>&gt;_</span> built by Fahim | Next.js + Three.js + GSAP +{" "}
          <button
            onClick={() => { setCoffeeFloat(true); setTimeout(() => setCoffeeFloat(false), 2000); }}
            style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
          >
            coffee
          </button>{" "}
          | powered by{" "}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: "#e87f36", textDecoration: "none" }}>Claude</a>{" "}
          | &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
