"use client";

import Link from "next/link";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Photos", href: "/photos" },
  { label: "Now", href: "/now" },
  { label: "Resume", href: "/resume" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/sazanyogi",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sajanyogi",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:sazanyogi@gmail.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "4rem clamp(1.5rem, 6vw, 8rem) 2.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gap: "3rem",
          alignItems: "start",
          marginBottom: "3rem",
        }}
        className="footer-grid"
      >
        {/* Left — brand */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}
          >
            YOGI<span style={{ color: "var(--cyan)" }}>.</span>
          </Link>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.875rem",
              color: "var(--text-sec)",
              lineHeight: 1.65,
              maxWidth: "280px",
            }}
          >
            Data Analyst · AI Automation · Photographer.
            Based in Mississauga, Ontario.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: "var(--text-sec)",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
            }}
          >
            PAGES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.8rem",
                  color: "var(--text-sec)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: "var(--text-sec)",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
            }}
          >
            CONNECT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.8rem",
                  color: "var(--text-sec)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.68rem",
            color: "var(--text-sec)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} SAJAN YOGI · BUILT WITH NEXT.JS + VERCEL
        </span>

        <button
          onClick={scrollToTop}
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            color: "var(--text-sec)",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "2rem",
            padding: "0.35rem 0.9rem",
            cursor: "none",
            transition: "color 0.2s, border-color 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
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
          ↑ BACK TO TOP
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>
      </div>
    </footer>
  );
}
