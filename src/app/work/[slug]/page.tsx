import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";

const ACCENT_COLORS: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  pink: "var(--pink)",
};

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study — Sajan Yogi`,
    description: project.description,
  };
}

export default async function ProjectDetailPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project || !project.overview) notFound();

  const accent = ACCENT_COLORS[project.accent];
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <section style={{ padding: "6rem clamp(1.5rem, 6vw, 8rem) 3rem", maxWidth: "820px", margin: "0 auto" }}>
        <Link href="/work" className="back-link" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", textDecoration: "none", letterSpacing: "0.1em", display: "inline-block", marginBottom: "2rem" }}>
          ← BACK TO WORK
        </Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: accent,
              background: `color-mix(in srgb, ${accent} 10%, transparent)`,
              padding: "0.25rem 0.65rem",
              borderRadius: "2rem",
              letterSpacing: "0.1em",
            }}
          >
            {project.category.toUpperCase()}
          </span>
          <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", letterSpacing: "0.08em" }}>
            {project.status.toUpperCase()} · {project.year}
          </span>
        </div>

        <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2.25rem, 5vw, 3.5rem)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          {project.title}
        </h1>

        {/* Links */}
        <div style={{ display: "flex", gap: "1.25rem", marginBottom: "2.5rem" }}>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="detail-link" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", textDecoration: "none", letterSpacing: "0.08em" }}>
              ↗ GITHUB
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="detail-link" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", textDecoration: "none", letterSpacing: "0.08em" }}>
              ↗ LIVE SITE
            </a>
          )}
        </div>

        {/* Hero visual */}
        <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", marginBottom: "3rem" }}>
          <ProjectVisual visual={project.visual} accent={project.accent} title={project.title} />
        </div>

        {/* Overview */}
        <SectionLabel color={accent}>OVERVIEW</SectionLabel>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.02rem", color: "var(--text-sec)", lineHeight: 1.75, marginBottom: "2.75rem" }}>
          {project.overview}
        </p>

        {/* Architecture */}
        {project.architecture && (
          <>
            <SectionLabel color={accent}>HOW IT WORKS</SectionLabel>
            <ol style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.75rem", paddingLeft: "1.4rem" }}>
              {project.architecture.map((step, i) => (
                <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--text-sec)", lineHeight: 1.7, paddingLeft: "0.4rem" }}>
                  {step}
                </li>
              ))}
            </ol>
          </>
        )}

        {/* Tech Stack */}
        <SectionLabel color={accent}>TECH STACK</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.75rem" }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.72rem",
                color: "var(--text-sec)",
                background: "var(--chip-bg)",
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                letterSpacing: "0.04em",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Key Decisions */}
        {project.keyDecisions && (
          <>
            <SectionLabel color={accent}>KEY DECISIONS</SectionLabel>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.75rem" }}>
              {project.keyDecisions.map((d, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent, flexShrink: 0, marginTop: "0.55rem" }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--text-sec)", lineHeight: 1.7 }}>{d}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Challenges & Lessons */}
        {project.challenges && (
          <>
            <SectionLabel color={accent}>CHALLENGES &amp; LESSONS</SectionLabel>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
              {project.challenges.map((c, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent, flexShrink: 0, marginTop: "0.55rem" }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--text-sec)", lineHeight: 1.7 }}>{c}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Prev/Next footer nav */}
      <section style={{ padding: "3rem clamp(1.5rem, 6vw, 8rem) 6rem", maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="nav-pill" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", letterSpacing: "0.06em", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.25rem", border: "1px solid var(--border)", borderRadius: "999px", maxWidth: "220px", overflow: "hidden" }}>
              <span>←</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/work/${next.slug}`} className="nav-pill" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", letterSpacing: "0.06em", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.25rem", border: "1px solid var(--border)", borderRadius: "999px", maxWidth: "220px", overflow: "hidden" }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{next.title}</span>
              <span>→</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      <style>{`
        .back-link { color: var(--text-sec); transition: color 0.2s; }
        .back-link:hover { color: var(--cyan); }
        .detail-link { color: var(--text-sec); transition: color 0.2s; }
        .detail-link:hover { color: ${accent}; }
        .nav-pill { color: var(--text-sec); transition: border-color 0.2s, color 0.2s; }
        .nav-pill:hover { border-color: ${accent} !important; color: ${accent}; }
      `}</style>
    </main>
  );
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color, letterSpacing: "0.15em", marginBottom: "1rem" }}>
      {children}
    </div>
  );
}
