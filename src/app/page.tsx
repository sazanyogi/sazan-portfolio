"use client";

import Link from "next/link";
import Projects from "@/components/Projects";
import About from "@/components/About";
import PhotoTeaser from "@/components/PhotoTeaser";
import Contact from "@/components/Contact";


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
        }}
      >
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

        <div style={{ maxWidth: "820px", position: "relative" }}>
          {/* Status badge */}
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.7rem",
              color: "#4ade80",
              letterSpacing: "0.12em",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid #4ade80",
              borderRadius: "2rem",
              padding: "0.35rem 0.9rem",
              marginBottom: "2.5rem",
              boxShadow: "0 0 12px rgba(74,222,128,0.25), inset 0 0 12px rgba(74,222,128,0.04)",
            }}
          >
            <span
              className="animate-pulse-dot"
              style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", flexShrink: 0 }}
            />
            Open to work · Stoney Creek, ON
          </div>

          {/* Name — refined size, fixed descender clip */}
          <div
            className="animate-fade-up"
            style={{ marginBottom: "1.5rem", animationDelay: "0.1s" }}
          >
            <h1
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 6.5vw, 6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              Sajan Nath Yogi
              <span style={{ color: "var(--cyan)" }}>.</span>
            </h1>
            <div
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "clamp(0.72rem, 1.4vw, 0.85rem)",
                color: "var(--cyan)",
                letterSpacing: "0.1em",
                marginTop: "0.75rem",
              }}
            >
              Seeking — Data Analyst · Data Engineer · AI Automation
            </div>
          </div>

          {/* One-liner */}
          <p
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              color: "var(--text-sec)",
              lineHeight: 1.75,
              maxWidth: "520px",
              marginBottom: "2.5rem",
              animationDelay: "0.2s",
            }}
          >
            I build AI pipelines, data dashboards, and digital products that actually ship.
            Based in Stoney Creek, Ontario — open to roles across Canada.
          </p>

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
              href="/work"
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
            <Link
              href="/resume"
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "var(--text-sec)",
                background: "transparent",
                border: "none",
                padding: "0.85rem 0.5rem",
                borderRadius: "3rem",
                textDecoration: "none",
                transition: "color 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-sec)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              VIEW RESUME ↗
            </Link>
          </div>

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

      <Projects />
      <About />
      <PhotoTeaser />
      <Contact />
    </>
  );
}
