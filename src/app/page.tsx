"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ROLES = [
  "Data Analyst",
  "AI Automation Builder",
  "Creative Technologist",
  "Photographer",
];

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{ color: "var(--cyan)" }}>
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

const STATS = [
  { value: "5+", label: "Years in Tech" },
  { value: "10+", label: "Projects Built" },
  { value: "3K+", label: "Photos Taken" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(1.5rem, 6vw, 8rem)",
          paddingTop: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "900px", position: "relative" }}>
          {/* Label */}
          <div
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.75rem",
              color: "var(--cyan)",
              letterSpacing: "0.15em",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              className="animate-pulse-dot"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--cyan)",
                display: "inline-block",
              }}
            />
            AVAILABLE FOR WORK — MISSISSAUGA, ON
          </div>

          {/* Name */}
          <h1
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "1.25rem",
              animationDelay: "0.1s",
            }}
          >
            Sajan
            <br />
            Yogi
            <span style={{ color: "var(--cyan)" }}>.</span>
          </h1>

          {/* Tagline */}
          <div
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
              color: "var(--text-sec)",
              marginBottom: "1rem",
              animationDelay: "0.2s",
            }}
          >
            Tech<span style={{ color: "var(--border)" }}> · </span>
            Vision<span style={{ color: "var(--border)" }}> · </span>
            Craft
          </div>

          {/* Typing role */}
          <div
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              marginBottom: "2.5rem",
              animationDelay: "0.3s",
              minHeight: "1.6em",
            }}
          >
            <TypingText />
          </div>

          {/* CTA buttons */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              animationDelay: "0.4s",
            }}
          >
            <Link
              href="#work"
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "var(--bg)",
                background: "var(--cyan)",
                padding: "0.85rem 2rem",
                borderRadius: "3rem",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              VIEW WORK
            </Link>
            <Link
              href="#contact"
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "var(--text)",
                background: "transparent",
                border: "1px solid var(--border)",
                padding: "0.85rem 2rem",
                borderRadius: "3rem",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--cyan)";
                e.currentTarget.style.color = "var(--cyan)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              GET IN TOUCH
            </Link>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "5rem",
              animationDelay: "0.55s",
              flexWrap: "wrap",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: "2rem",
                    color: "var(--text)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-sec)",
                    letterSpacing: "0.08em",
                    marginTop: "0.3rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: "var(--text-sec)",
              letterSpacing: "0.12em",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "50px",
              background: "linear-gradient(to bottom, var(--cyan), transparent)",
              animation: "pulse 2s ease infinite",
            }}
          />
        </div>
      </section>

      {/* Placeholder sections — will build in next sessions */}
      <section id="work" style={{ minHeight: "100vh", padding: "8rem clamp(1.5rem, 6vw, 8rem)" }}>
        <div
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            color: "var(--cyan)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          SELECTED WORK
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          Projects
        </h2>
        <p style={{ color: "var(--text-sec)", marginTop: "1rem" }}>Coming soon — building in next session.</p>
      </section>

      <section id="about" style={{ minHeight: "60vh", padding: "8rem clamp(1.5rem, 6vw, 8rem)", background: "var(--surface)" }}>
        <div
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            color: "var(--cyan)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          ABOUT
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          The Builder
        </h2>
        <p style={{ color: "var(--text-sec)", marginTop: "1rem", maxWidth: "600px", lineHeight: 1.7 }}>
          Big Data Analytics graduate from Lambton College. I build AI-powered tools, data pipelines,
          and digital products. Based in Mississauga, ON — running Click & Cast Inc and hunting
          for the right Data Analyst role.
        </p>
      </section>

      <section id="contact" style={{ minHeight: "60vh", padding: "8rem clamp(1.5rem, 6vw, 8rem)" }}>
        <div
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            color: "var(--cyan)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          CONTACT
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          Let&apos;s Talk
        </h2>
        <p style={{ color: "var(--text-sec)", marginTop: "1rem" }}>
          Reach me at{" "}
          <a href="mailto:sazanyogi@gmail.com" style={{ color: "var(--cyan)", textDecoration: "none" }}>
            sazanyogi@gmail.com
          </a>
        </p>
      </section>
    </>
  );
}
