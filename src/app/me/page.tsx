"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ─── Edit your content here ───────────────────────────────────────────────────

const bookmarks = [
  { label: "YouTube Studio", href: "https://studio.youtube.com" },
  { label: "Google Analytics", href: "https://analytics.google.com" },
  { label: "Notion", href: "https://notion.so" },
  { label: "Lightroom", href: "https://lightroom.adobe.com" },
  { label: "Canva", href: "https://canva.com" },
  { label: "ChatGPT", href: "https://chat.openai.com" },
];

const youtubeIdeas = [
  "Solo camping in Algonquin — overnight timelapse",
  "Big Data tools I actually use day-to-day",
  "Canada vs Nepal — cost of living comparison",
  "My study routine as an international student",
  "Best budget gear for travel filmmaking",
];

const calendar = [
  { date: "May 26", label: "Film camping vlog B-roll" },
  { date: "May 28", label: "Edit + upload YouTube video" },
  { date: "Jun 1",  label: "Post Instagram reel" },
  { date: "Jun 5",  label: "Analytics review" },
  { date: "Jun 10", label: "Shoot next video" },
];

const notes = [
  "Remember to back up Lightroom catalog",
  "Renew student status for summer semester",
  "Check monetization requirements progress",
];

// ─────────────────────────────────────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }}>
      <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function LinkRow({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...props}
      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--text)", textDecoration: "none", padding: "0.45rem 0.75rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", transition: "background 0.15s, color 0.15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--chip-bg)"; e.currentTarget.style.color = "var(--cyan)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text)"; }}
    >
      <span style={{ opacity: 0.35, fontSize: "0.7rem" }}>→</span>
      {label}
    </a>
  );
}

export default function MePage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            {today}
          </p>
          <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Welcome back, Sazan.
          </h1>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", background: "transparent", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.4rem 1rem", cursor: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--pink)"; e.currentTarget.style.color = "var(--pink)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
        >
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>

        {/* Bookmarks */}
        <Card title="Daily Tools">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {bookmarks.map((b) => <LinkRow key={b.label} href={b.href} label={b.label} external />)}
          </div>
        </Card>

        {/* YouTube Ideas */}
        <Card title="YouTube Ideas">
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none" }}>
            {youtubeIdeas.map((idea, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--cyan)", marginTop: "0.2rem", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text-sec)", lineHeight: 1.4 }}>
                  {idea}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Content Calendar */}
        <Card title="Content Calendar">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {calendar.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", background: i === 0 ? "var(--chip-bg)" : "transparent", borderLeft: i === 0 ? "2px solid var(--cyan)" : "2px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: i === 0 ? "var(--cyan)" : "var(--text-sec)", whiteSpace: "nowrap", minWidth: "3.5rem" }}>
                  {item.date}
                </span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: i === 0 ? "var(--text)" : "var(--text-sec)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes & Reminders */}
        <Card title="Reminders">
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem", listStyle: "none" }}>
            {notes.map((note, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--pink)", fontSize: "0.6rem", marginTop: "0.3rem", flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text-sec)", lineHeight: 1.4 }}>
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Stats */}
        <Card title="Stats & Analytics">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a
              href="https://studio.youtube.com/channel/analytics"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "var(--chip-bg)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text)" }}>YouTube Analytics</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>OPEN →</span>
            </a>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "var(--chip-bg)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text)" }}>Google Analytics</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>OPEN →</span>
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "var(--chip-bg)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text)" }}>Search Console</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>OPEN →</span>
            </a>
          </div>
        </Card>

      </div>
    </div>
  );
}
