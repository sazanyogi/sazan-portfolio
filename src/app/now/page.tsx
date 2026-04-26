import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now — Sajan Yogi",
  description: "What Sajan Yogi is focused on right now.",
};

const LAST_UPDATED = "April 2026";

const NOW = [
  {
    label: "WORKING ON",
    color: "var(--cyan)",
    items: [
      "Rebuilding sazan.com.np in Next.js — you're looking at it",
      "Running Job Hunter Bot daily — targeting Data Analyst roles in Canada",
      "Growing Click & Cast Inc — AI-powered media & automation agency",
      "Building SQL portfolio on GitHub (10 problems done, 10 more coming)",
    ],
  },
  {
    label: "LEARNING",
    color: "var(--purple)",
    items: [
      "SQL — sqlbolt.com → stratascratch.com, 2 problems a day",
      "Power BI — working toward PL-300 certification",
      "Agentic AI & MCP — building smarter automation pipelines",
      "dbt — for the Toronto Open Data ETL pipeline coming in May",
    ],
  },
  {
    label: "READING / WATCHING",
    color: "var(--pink)",
    items: [
      "Researching Canadian housing market data for a future project",
      "Following AI tooling developments — Claude, Codex, n8n updates",
    ],
  },
  {
    label: "LIFE",
    color: "var(--cyan)",
    items: [
      "Based in Mississauga, Ontario",
      "Shooting whenever the light is good",
      "Trying to run every morning — inconsistently",
    ],
  },
];

export default function NowPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "120px clamp(1.5rem, 6vw, 8rem) 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "680px" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.72rem",
            color: "var(--text-sec)",
            textDecoration: "none",
            letterSpacing: "0.1em",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "3rem",
          }}
        >
          ← BACK HOME
        </Link>

        {/* Header */}
        <div
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            color: "var(--cyan)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          /NOW
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          What I&apos;m
          <br />
          Doing Now
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.85rem",
            color: "var(--text-sec)",
            marginBottom: "4rem",
            letterSpacing: "0.02em",
          }}
        >
          Last updated: {LAST_UPDATED} · Mississauga, ON
        </p>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {NOW.map((section) => (
            <div key={section.label}>
              <div
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.65rem",
                  color: section.color,
                  letterSpacing: "0.15em",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "1px",
                    background: section.color,
                    display: "inline-block",
                  }}
                />
                {section.label}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "1rem",
                      color: "var(--text)",
                      lineHeight: 1.65,
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: section.color,
                        display: "inline-block",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.85rem",
            color: "var(--text-sec)",
            lineHeight: 1.7,
          }}
        >
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cyan)", textDecoration: "none" }}
          >
            /now page
          </a>
          . Inspired by Derek Sivers — a snapshot of what I&apos;m focused on at this point in life.
        </div>
      </div>
    </main>
  );
}
