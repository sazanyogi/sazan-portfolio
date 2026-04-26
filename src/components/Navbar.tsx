"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Photos", href: "/photos" },
  { label: "Now", href: "/now" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          right: "1rem",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          padding: "0.45rem 0.45rem 0.45rem 1.5rem",
          borderRadius: "999px",
          background: scrolled
            ? "rgba(10,10,15,0.75)"
            : "rgba(10,10,15,0.5)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--border)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
          whiteSpace: "nowrap",
        }}
        className="navbar-pill"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-bricolage)",
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            marginRight: "0.75rem",
            flexShrink: 0,
          }}
        >
          YOGI<span style={{ color: "var(--cyan)" }}>.</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }} className="nav-desktop">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.72rem",
                color: "var(--text-sec)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                padding: "0.35rem 0.7rem",
                borderRadius: "999px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-sec)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "var(--border)", margin: "0 0.25rem" }} />

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              width: "52px",
              height: "26px",
              display: "flex",
              alignItems: "center",
              padding: "0 3px",
              cursor: "none",
              position: "relative",
              transition: "border-color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <span style={{ fontSize: "0.6rem", position: "absolute", left: "6px", opacity: theme === "light" ? 1 : 0.35 }}>☀</span>
            <span style={{ fontSize: "0.6rem", position: "absolute", right: "6px", opacity: theme === "dark" ? 1 : 0.35 }}>☽</span>
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "var(--cyan)",
                display: "block",
                transform: theme === "dark" ? "translateX(26px)" : "translateX(0px)",
                transition: "transform 0.25s ease",
                flexShrink: 0,
              }}
            />
          </button>

          {/* Hire me pill */}
          <Link
            href="/#contact"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.72rem",
              color: "#000",
              background: "var(--cyan)",
              padding: "0.45rem 1rem",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.04em",
              transition: "opacity 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            HIRE ME
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: "none",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            fontSize: "1rem",
            cursor: "none",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile full-page menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--bg)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 10vw, 4rem)",
                color: "var(--text)",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.8rem",
              color: "#000",
              background: "var(--cyan)",
              padding: "0.75rem 2rem",
              borderRadius: "3rem",
              textDecoration: "none",
              fontWeight: 700,
              marginTop: "1.5rem",
              display: "inline-block",
            }}
          >
            HIRE ME
          </Link>

          <div style={{ position: "absolute", bottom: "2rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", letterSpacing: "0.12em" }}>
            SAJAN YOGI · MISSISSAUGA, ON
          </div>
        </div>
      )}
    </>
  );
}
