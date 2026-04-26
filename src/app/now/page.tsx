"use client";

import Link from "next/link";

const LAST_UPDATED = "April 2026";

const SPOTLIGHT = {
  label: "MAIN FOCUS",
  icon: "⚡",
  title: "Landing a Data / AI role in Canada",
  description: "Applying daily, running Job Hunter Bot, building portfolio projects, and sharpening SQL — everything points here right now.",
  color: "var(--cyan)",
};

const SECTIONS = [
  {
    label: "WORKING ON",
    icon: "🔨",
    color: "var(--cyan)",
    items: [
      { text: "Rebuilding sazan.com.np in Next.js", tag: "LIVE" },
      { text: "Running Job Hunter Bot — targeting Data Analyst roles", tag: "DAILY" },
      { text: "Growing Click & Cast Inc — AI media & automation agency", tag: "ONGOING" },
      { text: "SQL portfolio on GitHub (10 problems done, 10 more coming)", tag: "IN PROGRESS" },
    ],
  },
  {
    label: "LEARNING",
    icon: "📖",
    color: "var(--purple)",
    items: [
      { text: "SQL — sqlbolt.com → stratascratch.com, 2 problems a day", tag: "DAILY" },
      { text: "Power BI — working toward PL-300 certification", tag: "IN PROGRESS" },
      { text: "Agentic AI & MCP — building smarter automation pipelines", tag: "ONGOING" },
      { text: "dbt — for the Toronto Open Data ETL pipeline", tag: "UPCOMING" },
    ],
  },
  {
    label: "READING / WATCHING",
    icon: "👀",
    color: "var(--pink)",
    items: [
      { text: "Researching Canadian housing market data for a future project", tag: null },
      { text: "Following AI tooling — Claude, Codex, n8n updates", tag: "WEEKLY" },
    ],
  },
  {
    label: "LIFE",
    icon: "🌱",
    color: "var(--cyan)",
    items: [
      { text: "Based in Stoney Creek, Ontario", tag: null },
      { text: "Shooting whenever the light is good", tag: "ONGOING" },
      { text: "Trying to run every morning — inconsistently", tag: null },
    ],
  },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  LIVE:          { bg: "rgba(74,222,128,0.12)",  color: "#4ade80" },
  DAILY:         { bg: "rgba(0,245,255,0.1)",    color: "var(--cyan)" },
  ONGOING:       { bg: "rgba(123,97,255,0.12)",  color: "var(--purple)" },
  "IN PROGRESS": { bg: "rgba(245,158,11,0.1)",   color: "#f59e0b" },
  UPCOMING:      { bg: "rgba(160,163,177,0.12)", color: "var(--text-sec)" },
  WEEKLY:        { bg: "rgba(255,60,172,0.1)",   color: "var(--pink)" },
};

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
      {/* Background glows */}
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "860px" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", color: "var(--text-sec)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "3rem" }}
        >
          ← BACK HOME
        </Link>

        {/* Header */}
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
          /NOW
        </div>
        <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1rem" }}>
          What I&apos;m
          <br />
          Doing Now
        </h1>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text-sec)", marginBottom: "3rem", letterSpacing: "0.02em" }}>
          Last updated: {LAST_UPDATED} · Stoney Creek, ON ·{" "}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>
            what is this?
          </a>
        </p>

        {/* Spotlight card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--cyan)",
            borderRadius: "16px",
            padding: "1.75rem 2rem",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(0,245,255,0.07)",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--cyan), transparent)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1rem" }}>{SPOTLIGHT.icon}</span>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.15em" }}>{SPOTLIGHT.label}</span>
          </div>
          <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--text)", lineHeight: 1.2, marginBottom: "0.6rem" }}>
            {SPOTLIGHT.title}
          </div>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--text-sec)", lineHeight: 1.7, margin: 0 }}>
            {SPOTLIGHT.description}
          </p>
        </div>

        {/* 2-column cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="now-grid">
          {SECTIONS.map((section) => (
            <div
              key={section.label}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1.5rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = section.color;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${section.color}, transparent)` }} />

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1rem" }}>{section.icon}</span>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.62rem", color: section.color, letterSpacing: "0.15em" }}>{section.label}</span>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: item.tag ? "0.3rem" : 0 }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: section.color, display: "inline-block", flexShrink: 0, marginTop: "0.45em" }} />
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.55 }}>
                        {item.text}
                      </span>
                    </div>
                    {item.tag && (
                      <div style={{ paddingLeft: "1.1rem" }}>
                        <span style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.1em",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "2rem",
                          background: TAG_COLORS[item.tag]?.bg ?? "rgba(160,163,177,0.1)",
                          color: TAG_COLORS[item.tag]?.color ?? "var(--text-sec)",
                        }}>
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .now-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
