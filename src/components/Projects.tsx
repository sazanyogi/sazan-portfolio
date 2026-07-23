"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";

const ACCENT_COLORS: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  pink: "var(--pink)",
};

const FEATURED_PROJECTS = PROJECTS.filter((p) => p.onHomepage);

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const color = ACCENT_COLORS[project.accent];

  const cardInner = (
    <>
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
          zIndex: 1,
        }}
      />

      <ProjectVisual visual={project.visual} accent={project.accent} title={project.title} />

      <div style={{ padding: "1.5rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
        {/* Category + featured badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: color,
              letterSpacing: "0.12em",
              background: `color-mix(in srgb, ${color} 10%, transparent)`,
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
            fontFamily: "var(--font-bricolage)",
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
          {project.slug ? (
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.7rem",
                color: hovered ? color : "var(--text-sec)",
                letterSpacing: "0.08em",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "color 0.2s",
              }}
            >
              VIEW CASE STUDY →
            </span>
          ) : (
            project.links.github && (
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
            )
          )}
        </div>
      </div>
    </>
  );

  const cardStyle: React.CSSProperties = {
    background: "var(--card-bg)",
    border: `1px solid ${hovered ? color : "var(--border)"}`,
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
    boxShadow: hovered ? `0 0 32px color-mix(in srgb, ${color} 13%, transparent)` : "none",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    position: "relative",
    overflow: "hidden",
    textDecoration: "none",
  };

  if (project.slug) {
    return (
      <Link
        href={`/work/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...cardStyle, cursor: "none" }}
      >
        {cardInner}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...cardStyle, cursor: "default" }}
    >
      {cardInner}
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
          TECHNICAL WORK
        </div>
        <h2
          style={{
            fontFamily: "var(--font-bricolage)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Also: I Build Things
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "1rem",
            color: "var(--text-sec)",
            marginTop: "1rem",
            maxWidth: "520px",
            lineHeight: 1.65,
          }}
        >
          Beyond the lens — AI pipelines, analytics dashboards, and web apps. The technical side gives creative work a measurable edge.
        </p>
      </div>

      {/* AI callout strip */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--cyan)",
          borderRadius: "12px",
          padding: "1.25rem 1.75rem",
          marginBottom: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          flexWrap: "wrap",
          boxShadow: "0 0 32px rgba(0,245,255,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <span className="animate-pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>
            CURRENTLY BUILDING WITH AI
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {["Claude API", "n8n", "Modal", "Agentic AI", "MCP", "FastAPI", "Anthropic SDK"].map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.65rem",
                color: "var(--text-sec)",
                background: "rgba(0,245,255,0.06)",
                border: "1px solid rgba(0,245,255,0.15)",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                letterSpacing: "0.04em",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", color: "var(--text-sec)", marginLeft: "auto", whiteSpace: "nowrap" }}>
          For automation &amp; productivity
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
