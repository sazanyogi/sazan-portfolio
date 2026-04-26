"use client";

import { useState } from "react";

const SKILLS = [
  { category: "Data & Analytics", items: ["Python", "SQL", "Pandas", "Power BI", "Looker Studio", "GA4"] },
  { category: "AI & Automation", items: ["Claude API", "OpenAI API", "n8n", "Modal", "Agentic AI", "MCP"] },
  { category: "Cloud & Systems", items: ["AWS", "Firebase", "Firestore", "FastAPI", "Git", "Linux"] },
  { category: "Web & BI", items: ["Next.js", "TypeScript", "React", "Tailwind", "Vercel", "Codex"] },
];

const TIMELINE = [
  { year: "2024", event: "Big Data Analytics — Lambton College", sub: "Postgraduate Certificate" },
  { year: "2024", event: "Click & Cast Inc", sub: "Founder — AI-powered media & automation agency" },
  { year: "2023", event: "AI Workflow Systems", sub: "Built production Claude + n8n pipelines" },
  { year: "2020", event: "B.E. Computer Science — Bangalore", sub: "Bachelor of Engineering" },
];

export default function About() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section
      id="about"
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
          position: "relative",
        }}
        className="about-grid"
      >
        {/* Left — bio + timeline */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.75rem",
              color: "var(--purple)",
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
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            The Builder
            <br />
            Behind the Work
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: "var(--text-sec)",
              lineHeight: 1.8,
              marginBottom: "1rem",
            }}
          >
            Big Data Analytics graduate based in Mississauga, Ontario. I bridge the gap between raw
            data and real decisions — building AI pipelines, analytics dashboards, and automation
            systems that actually ship.
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: "var(--text-sec)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Running Click & Cast Inc while actively targeting Data Analyst and AI Automation roles in
            Canada. When I&apos;m not coding — I&apos;m out with a camera.
          </p>

          {/* Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.7rem",
                    color: "var(--purple)",
                    minWidth: "3rem",
                    paddingTop: "2px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.year}
                </div>
                <div
                  style={{
                    flex: 1,
                    paddingLeft: "1rem",
                    borderLeft: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "var(--text)",
                    }}
                  >
                    {t.event}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.8rem",
                      color: "var(--text-sec)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {t.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — skills grid */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.75rem",
              color: "var(--purple)",
              letterSpacing: "0.15em",
              marginBottom: "2rem",
            }}
          >
            SKILLS & STACK
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {SKILLS.map((group) => (
              <div key={group.category}>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-sec)",
                    letterSpacing: "0.1em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {group.category.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      onMouseEnter={() => setActiveSkill(skill)}
                      onMouseLeave={() => setActiveSkill(null)}
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: "0.75rem",
                        color: activeSkill === skill ? "var(--bg)" : "var(--text)",
                        background: activeSkill === skill ? "var(--purple)" : "var(--chip-bg)",
                        border: "1px solid",
                        borderColor: activeSkill === skill ? "var(--purple)" : "var(--border)",
                        padding: "0.35rem 0.8rem",
                        borderRadius: "6px",
                        transition: "all 0.18s ease",
                        cursor: "default",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Download resume CTA */}
          <a
            href="/resume"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "3rem",
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.75rem",
              color: "var(--purple)",
              border: "1px solid var(--purple)",
              padding: "0.65rem 1.4rem",
              borderRadius: "2rem",
              textDecoration: "none",
              letterSpacing: "0.08em",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--purple)";
              e.currentTarget.style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--purple)";
            }}
          >
            ↗ VIEW RESUME
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
