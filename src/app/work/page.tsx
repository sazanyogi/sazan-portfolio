"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = ["All", "AI & Automation", "Data Analytics", "Web App", "Data Engineering"];

const PROJECTS = [
  {
    title: "Job Hunter Bot",
    category: "AI & Automation",
    status: "Live",
    year: "2026",
    description: "Daily AI job scraper that scores 99+ postings against my candidate profile using Claude, logs only 80+ score matches, auto-generates tailored cover letters, and sends an HTML email digest every morning at 5am EST.",
    stack: ["Python", "Claude API", "Modal", "Google Sheets API", "Gmail SMTP", "BeautifulSoup"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "var(--cyan)",
  },
  {
    title: "Click & Cast GA4 Dashboard",
    category: "Data Analytics",
    status: "Live",
    year: "2026",
    description: "Live marketing analytics dashboard for a real media company. Deployed GA4 tracking on a Next.js production site, then built a Looker Studio dashboard tracking sessions, users, traffic sources, top pages, and time-series trends.",
    stack: ["Google Analytics GA4", "Looker Studio", "Next.js", "JavaScript"],
    links: { live: "https://clickandcast.com" },
    accent: "var(--purple)",
  },
  {
    title: "SQL Interview Portfolio",
    category: "Data Engineering",
    status: "Live",
    year: "2026",
    description: "10 annotated real-world SQL problems covering window functions (DENSE_RANK, LAG, rolling AVG), CTEs, anti-joins, self joins, and retention rate calculations — all with explanations of the why behind each approach.",
    stack: ["PostgreSQL", "Window Functions", "CTEs", "Aggregations", "Anti-joins"],
    links: { github: "https://github.com/sazanyogi/sql-portfolio" },
    accent: "var(--pink)",
  },
  {
    title: "AI Workflow Automations",
    category: "AI & Automation",
    status: "Live",
    year: "2025",
    description: "Suite of serverless REST API endpoints for n8n workflows — automated email reply generation, client outreach sequencing, and data pipeline processing. Bearer token authenticated, deployed on Modal.",
    stack: ["Python", "FastAPI", "Modal", "n8n", "Anthropic API", "OpenAI API"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "var(--cyan)",
  },
  {
    title: "Scorecast",
    category: "Web App",
    status: "Live",
    year: "2024",
    description: "Real-time sports scoreboard web platform for live sports events. Score tracking, display management, and broadcast over the web with Firebase real-time sync. Used by Click & Cast for live event coverage.",
    stack: ["Firebase", "Firestore", "JavaScript", "HTML", "CSS"],
    links: { live: "https://scorecast.clickandcast.com", github: "https://github.com/sazanyogi" },
    accent: "var(--purple)",
  },
  {
    title: "Yogi Finance",
    category: "Web App",
    status: "Live",
    year: "2024",
    description: "Progressive web app for real-time household budgeting. Multi-user authentication, shared dashboards, and offline support. Syncs instantly across devices using Firestore real-time listeners.",
    stack: ["Firebase Auth", "Firestore", "PWA", "JavaScript", "HTML", "CSS"],
    links: { live: "https://yogi-finance.sazan.com.np" },
    accent: "var(--pink)",
  },
  {
    title: "2nd Brain Bot",
    category: "AI & Automation",
    status: "Live",
    year: "2026",
    description: "Telegram bot connected to my Obsidian vault. Ask it anything about my notes, projects, career plans — it retrieves and summarises from my personal knowledge base using Claude AI.",
    stack: ["Python", "Claude API", "Telegram Bot API", "Obsidian", "Modal"],
    links: { github: "https://github.com/sazanyogi" },
    accent: "var(--cyan)",
  },
  {
    title: "This Portfolio",
    category: "Web App",
    status: "Live",
    year: "2026",
    description: "You're looking at it. Rebuilt from plain HTML to Next.js with a full design system, dark/light mode, custom cursor, masonry photo gallery, contact form, and auto-deploy via Vercel.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Resend", "Vercel", "Bricolage Grotesque"],
    links: { live: "https://sazan-portfolio.vercel.app", github: "https://github.com/sazanyogi/sazan-portfolio" },
    accent: "var(--purple)",
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <section style={{ padding: "6rem clamp(1.5rem, 6vw, 8rem)" }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.72rem",
              color: "var(--text-sec)",
              textDecoration: "none",
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: "2rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
          >
            ← BACK HOME
          </Link>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
            ALL WORK
          </div>
          <h1
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--text)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Things I&apos;ve Built
          </h1>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)", maxWidth: "480px", lineHeight: 1.7 }}>
            A full dump of everything — AI tools, data pipelines, dashboards, web apps, and more.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                padding: "0.4rem 1rem",
                borderRadius: "2rem",
                border: "1px solid",
                borderColor: activeCategory === cat ? "var(--cyan)" : "var(--border)",
                background: activeCategory === cat ? "var(--cyan)" : "transparent",
                color: activeCategory === cat ? "var(--bg)" : "var(--text-sec)",
                cursor: "none",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
          {filtered.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectRow({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: open ? "var(--surface)" : "var(--card-bg)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.2s",
      }}
    >
      {/* Row header */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "grid",
          gridTemplateColumns: "2rem 1fr auto auto auto",
          alignItems: "center",
          gap: "1.5rem",
          padding: "1.25rem 1.5rem",
          cursor: "none",
        }}
      >
        {/* Index */}
        <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>
          {project.title}
        </span>

        {/* Category */}
        <span
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.65rem",
            color: project.accent,
            background: `${project.accent}18`,
            padding: "0.2rem 0.6rem",
            borderRadius: "2rem",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
          className="hide-mobile"
        >
          {project.category}
        </span>

        {/* Year */}
        <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.68rem", color: "var(--text-sec)" }} className="hide-mobile">
          {project.year}
        </span>

        {/* Expand */}
        <span style={{ color: "var(--text-sec)", fontSize: "1rem", transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
      </div>

      {/* Expanded content */}
      {open && (
        <div style={{ padding: "0 1.5rem 1.5rem 5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--text-sec)", lineHeight: 1.7, maxWidth: "640px" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.stack.map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", background: "var(--chip-bg)", padding: "0.2rem 0.55rem", borderRadius: "4px" }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", color: project.accent, textDecoration: "none", letterSpacing: "0.08em" }}>
                ↗ GITHUB
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", color: project.accent, textDecoration: "none", letterSpacing: "0.08em" }}>
                ↗ LIVE SITE
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
