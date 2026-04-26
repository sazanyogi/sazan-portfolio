"use client";

import { useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "job-hunter-bot",
    title: "Job Hunter Bot",
    category: "AI Automation",
    description:
      "Daily AI job scraper that scores 99+ postings against my candidate profile using Claude, logs only 80+ score matches, auto-generates tailored cover letters, and sends an HTML email digest every morning.",
    stack: ["Python", "Claude API", "Modal", "Google Sheets", "Gmail SMTP"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "cyan",
    featured: true,
  },
  {
    id: "click-cast-ga4",
    title: "Click & Cast GA4 Dashboard",
    category: "Data Analytics",
    description:
      "Live marketing analytics dashboard for a real media company. Built GA4 tracking into a Next.js app and created a Looker Studio dashboard tracking sessions, traffic sources, top pages, and time-series trends.",
    stack: ["GA4", "Looker Studio", "Next.js", "Google Analytics"],
    links: { live: "https://clickandcast.com" },
    accent: "purple",
    featured: true,
  },
  {
    id: "sql-portfolio",
    title: "SQL Interview Portfolio",
    category: "Data Engineering",
    description:
      "10 annotated real-world SQL problems covering window functions (DENSE_RANK, LAG, rolling AVG), CTEs, anti-joins, self joins, and retention rate calculations — all with explanations of the why.",
    stack: ["PostgreSQL", "Window Functions", "CTEs", "Analytics"],
    links: { github: "https://github.com/sazanyogi/sql-portfolio" },
    accent: "pink",
    featured: false,
  },
  {
    id: "ai-workflows",
    title: "AI Workflow Automations",
    category: "AI Automation",
    description:
      "Serverless API endpoints for n8n automation workflows — email reply generation, data pipeline processing, and AI-assisted decision making. Deployed on Modal with Bearer token auth.",
    stack: ["Python", "FastAPI", "Modal", "n8n", "Anthropic API"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "cyan",
    featured: false,
  },
  {
    id: "scorecast",
    title: "Scorecast",
    category: "Web App",
    description:
      "Real-time sports scoreboard platform with live score updates, match management, and multi-user support. Built with Firebase Firestore for real-time sync.",
    stack: ["Firebase", "Firestore", "JavaScript", "Real-time"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "purple",
    featured: false,
  },
  {
    id: "yogi-finance",
    title: "Yogi Finance",
    category: "Web App",
    description:
      "Multi-user personal budgeting PWA with Firebase Auth, real-time Firestore sync, and offline support. Tracks income, expenses, and savings goals across devices.",
    stack: ["Firebase Auth", "Firestore", "PWA", "JavaScript"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "pink",
    featured: false,
  },
];

const ACCENT_COLORS: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  pink: "var(--pink)",
};

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const color = ACCENT_COLORS[project.accent];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card-bg)",
        border: `1px solid ${hovered ? color : "var(--border)"}`,
        borderRadius: "16px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        boxShadow: hovered ? `0 0 32px ${color}22` : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: hovered ? `linear-gradient(90deg, transparent, ${color}, transparent)` : "transparent",
          transition: "background 0.3s",
        }}
      />

      {/* Category + featured badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.65rem",
            color: color,
            letterSpacing: "0.12em",
            background: `${color}18`,
            padding: "0.25rem 0.65rem",
            borderRadius: "2rem",
          }}
        >
          {project.category.toUpperCase()}
        </span>
        {project.featured && (
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.6rem",
              color: "var(--text-sec)",
              letterSpacing: "0.1em",
            }}
          >
            FEATURED
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "var(--text)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "0.875rem",
          color: "var(--text-sec)",
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Stack chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: "var(--text-sec)",
              background: "var(--chip-bg)",
              padding: "0.2rem 0.55rem",
              borderRadius: "4px",
              letterSpacing: "0.04em",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.7rem",
              color: hovered ? color : "var(--text-sec)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s",
            }}
          >
            ↗ GITHUB
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.7rem",
              color: hovered ? color : "var(--text-sec)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s",
            }}
          >
            ↗ LIVE
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: "4rem" }}>
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
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Things I&apos;ve Built
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "1rem",
            color: "var(--text-sec)",
            marginTop: "1rem",
            maxWidth: "480px",
            lineHeight: 1.65,
          }}
        >
          From AI automation pipelines to live analytics dashboards — real projects with real impact.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
