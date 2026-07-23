"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS, type Project } from "@/data/projects";

const ACCENT_COLORS: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  pink: "var(--pink)",
};

const CATEGORIES = ["All", "AI & Automation", "Data Analytics", "Web App", "Data Engineering"];

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
            A full dump of everything — AI tools, data pipelines, dashboards, web apps, and more. Click into any project for the full case study.
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

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = ACCENT_COLORS[project.accent];

  const rowHeader = (
    <div
      onClick={project.slug ? undefined : () => setOpen(!open)}
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
          color: accent,
          background: `color-mix(in srgb, ${accent} 10%, transparent)`,
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

      {/* Expand / navigate indicator */}
      <span style={{ color: "var(--text-sec)", fontSize: "1rem", transition: "transform 0.2s", transform: !project.slug && open ? "rotate(45deg)" : "rotate(0deg)" }}>
        {project.slug ? "→" : "+"}
      </span>
    </div>
  );

  if (project.slug) {
    return (
      <div style={{ background: "var(--card-bg)", borderBottom: "1px solid var(--border)" }}>
        <Link href={`/work/${project.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          {rowHeader}
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: open ? "var(--surface)" : "var(--card-bg)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.2s",
      }}
    >
      {rowHeader}

      {/* Expanded content (only projects without a dedicated case-study page) */}
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
                style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", color: accent, textDecoration: "none", letterSpacing: "0.08em" }}>
                ↗ GITHUB
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", color: accent, textDecoration: "none", letterSpacing: "0.08em" }}>
                ↗ LIVE SITE
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
