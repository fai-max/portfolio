"use client";

import { useEffect, useState } from "react";
import { usePersonality } from "@/hooks/usePersonality";
import { SECTIONS } from "@/lib/constants";

export function Navbar() {
  const { mode, setMode } = usePersonality();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mode) return null;

  const isCreative = mode === "creative";

  return (
    <>
      <nav
        className={`nav-enter fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
        style={{
          padding: scrolled ? "0.75rem 0" : (isCreative ? "1.25rem 0" : "1.25rem 0"),
          borderBottom: scrolled ? (isCreative ? "1px solid rgba(204,34,34,0.2)" : "1px solid rgba(68,136,255,0.1)") : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#home">
            {isCreative ? (
              <span className="font-[family-name:var(--font-display)] riso-offset" style={{
                fontSize: "1.75rem", fontWeight: 900, color: "#cc2222",
                letterSpacing: "-0.02em",
              }}>FM</span>
            ) : (
              <span className="font-[family-name:var(--font-mono)]" style={{
                fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-1)",
              }}>&gt;FM</span>
            )}
          </a>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center" style={{ gap: isCreative ? "2.5rem" : "2rem" }}>
            {SECTIONS.filter((s) => s !== "home").map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={isCreative ? "font-[family-name:var(--font-display)]" : "font-[family-name:var(--font-mono)]"}
                style={{
                  fontSize: isCreative ? "0.85rem" : "0.7rem",
                  letterSpacing: isCreative ? "0.2em" : "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  fontWeight: isCreative ? 600 : 400,
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isCreative ? "#cc2222" : "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {mode === "tech" ? `/${section}` : section}
              </a>
            ))}
          </div>

          {/* Mode toggle + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={() => setMode(null)}
              className="font-[family-name:var(--font-mono)]"
              style={{
                background: "transparent",
                border: isCreative ? "1px solid rgba(204,34,34,0.3)" : "1px solid var(--border-color)",
                borderRadius: isCreative ? "2px" : "9999px",
                padding: "0.375rem 0.75rem",
                fontSize: "0.65rem", fontWeight: 600,
                color: isCreative ? "#cc2222" : "var(--text-secondary)",
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isCreative ? "#cc2222" : "var(--accent-1)";
                e.currentTarget.style.color = isCreative ? "#0d0d0d" : "#08090f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = isCreative ? "#cc2222" : "var(--text-secondary)";
              }}
              title="Return to choice"
            >
              CHOOSE AGAIN
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              style={{ width: "2rem", height: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              <span style={{
                width: "20px", height: "1.5px", background: "var(--text-primary)",
                transition: "all 0.3s",
                transform: mobileOpen ? "rotate(45deg) translateY(3.25px)" : "none",
              }} />
              <span style={{
                width: "20px", height: "1.5px", background: "var(--text-primary)",
                transition: "all 0.3s",
                transform: mobileOpen ? "rotate(-45deg) translateY(-3.25px)" : "none",
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: isCreative ? "rgba(13,13,13,0.97)" : "rgba(8,9,15,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem",
        }}>
          {SECTIONS.filter((s) => s !== "home").map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setMobileOpen(false)}
              className={isCreative ? "font-[family-name:var(--font-display)]" : "font-[family-name:var(--font-mono)]"}
              style={{
                fontSize: "1.75rem", color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: isCreative ? "0.2em" : "0.15em",
                textDecoration: "none",
              }}
            >
              {mode === "tech" ? `> ${section}` : section}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
