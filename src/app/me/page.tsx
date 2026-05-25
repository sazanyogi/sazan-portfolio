"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ─── Edit your content here ───────────────────────────────────────────────────

// Paste your Google Calendar embed URL here.
// How to get it: Google Calendar → Settings (⚙) → your calendar name
// → "Integrate calendar" → copy the URL from the Embed Code src="..."
// Tip: add &mode=WEEK&bgcolor=%230A0A0F to match the dark theme
const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=sazanyogi%40gmail.com&ctz=America%2FToronto&mode=WEEK&bgcolor=%230A0A0F&color=%2300F5FF&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0";

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

const notes = [
  "Remember to back up Lightroom catalog",
  "Renew student status for summer semester",
  "Check monetization requirements progress",
];

// ─────────────────────────────────────────────────────────────────────────────

function Card({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", ...style }}>
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

const isPlaceholder = GOOGLE_CALENDAR_EMBED_URL.includes("YOUR_EMAIL");

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
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>

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

      {/* Google Calendar — full width */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Google Calendar
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href="https://calendar.google.com/calendar/r/eventedit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "#000", background: "var(--cyan)", padding: "0.35rem 0.85rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700, letterSpacing: "0.06em", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              + New Event
            </a>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", background: "transparent", border: "1px solid var(--border)", padding: "0.35rem 0.85rem", borderRadius: "999px", textDecoration: "none", letterSpacing: "0.06em", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
            >
              Open →
            </a>
          </div>
        </div>

        {isPlaceholder ? (
          <div style={{ height: "500px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", background: "var(--bg)", borderRadius: "0.75rem", border: "1px dashed var(--border)" }}>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.8 }}>
              Paste your Google Calendar embed URL into<br />
              <span style={{ color: "var(--cyan)" }}>GOOGLE_CALENDAR_EMBED_URL</span> at the top of<br />
              <span style={{ color: "var(--text)" }}>src/app/me/page.tsx</span>
            </p>
            <a
              href="https://calendar.google.com/calendar/r/settings"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "#000", background: "var(--cyan)", padding: "0.5rem 1.25rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700, letterSpacing: "0.06em" }}
            >
              Get embed URL →
            </a>
          </div>
        ) : (
          <iframe
            src={GOOGLE_CALENDAR_EMBED_URL}
            style={{ width: "100%", height: "600px", border: "none", borderRadius: "0.75rem", filter: "invert(1) hue-rotate(180deg)", colorScheme: "dark" }}
            title="Google Calendar"
          />
        )}
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>

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
            {[
              { label: "YouTube Analytics", href: "https://studio.youtube.com/channel/analytics" },
              { label: "Google Analytics", href: "https://analytics.google.com" },
              { label: "Search Console", href: "https://search.google.com/search-console" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "var(--chip-bg)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text)" }}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>OPEN →</span>
              </a>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
