"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "/#work" },
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-bricolage)",
          fontWeight: 800,
          fontSize: "1.5rem",
          color: "var(--text)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        YOGI
        <span style={{ color: "var(--cyan)" }}>.</span>
      </Link>

      {/* Desktop links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
        className="nav-desktop"
      >
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.8rem",
              color: "var(--text-sec)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              border: "1px solid transparent",
              borderRadius: "6px",
              padding: "0.35rem 0.75rem",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--cyan)";
              e.currentTarget.style.borderColor = "var(--cyan)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-sec)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {l.label}
          </Link>
        ))}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          style={{
            background: theme === "dark" ? "var(--chip-bg)" : "var(--chip-bg)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            width: "56px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            padding: "0 4px",
            cursor: "none",
            position: "relative",
            transition: "border-color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          <span style={{ fontSize: "0.65rem", position: "absolute", left: "7px", opacity: theme === "light" ? 1 : 0.3 }}>☀</span>
          <span style={{ fontSize: "0.65rem", position: "absolute", right: "7px", opacity: theme === "dark" ? 1 : 0.3 }}>☽</span>
          <span
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "var(--cyan)",
              display: "block",
              transform: theme === "dark" ? "translateX(28px)" : "translateX(0px)",
              transition: "transform 0.25s ease",
              flexShrink: 0,
            }}
          />
        </button>

        {/* Hire me */}
        <Link
          href="#contact"
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            color: "var(--bg)",
            background: "var(--cyan)",
            padding: "0.45rem 1.1rem",
            borderRadius: "2rem",
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.04em",
            transition: "opacity 0.2s",
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
          background: "none",
          border: "none",
          color: "var(--text)",
          fontSize: "1.4rem",
          cursor: "none",
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.9rem",
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.8rem",
              color: "var(--bg)",
              background: "var(--cyan)",
              padding: "0.6rem 1.2rem",
              borderRadius: "2rem",
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-block",
              width: "fit-content",
            }}
          >
            HIRE ME
          </Link>
        </div>
      )}
    </nav>
  );
}
