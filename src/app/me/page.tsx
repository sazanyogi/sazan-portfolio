"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ─── Edit your content here ───────────────────────────────────────────────────

const apps = [
  {
    label: "Calendar",
    href: "https://calendar.google.com",
    bg: "#1a73e8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="1.8"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="8" y="13" width="3" height="3" rx="0.5" fill="white"/>
        <rect x="13" y="13" width="3" height="3" rx="0.5" fill="white"/>
      </svg>
    ),
  },
  {
    label: "YT Studio",
    href: "https://studio.youtube.com",
    bg: "#ff0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M10 8l6 4-6 4V8z"/>
        <path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 4 12 4 12 4s-4.4 0-6.8.3c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8C6.6 18 12 18 12 18s4.4 0 6.8-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 8.8 21.6 7.2 21.6 7.2z" fillOpacity="0.3"/>
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "https://analytics.google.com",
    bg: "#e37400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect x="3" y="12" width="4" height="9" rx="1" fill="white"/>
        <rect x="10" y="7" width="4" height="14" rx="1" fill="white"/>
        <rect x="17" y="3" width="4" height="18" rx="1" fill="white"/>
      </svg>
    ),
  },
  {
    label: "Notion",
    href: "https://notion.so",
    bg: "#191919",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
        <path d="M4.5 3.5h10l5 5v12a.5.5 0 01-.5.5h-14a.5.5 0 01-.5-.5v-17a.5.5 0 01.5-.5z" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
        <path d="M14.5 3.5v5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12h8M8 15h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Lightroom",
    href: "https://lightroom.adobe.com",
    bg: "#001e36",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28">
        <text x="4" y="18" fontSize="14" fontWeight="700" fill="#31a8ff" fontFamily="serif">Lr</text>
      </svg>
    ),
  },
  {
    label: "Canva",
    href: "https://canva.com",
    bg: "#7d2ae8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>
    ),
  },
  {
    label: "ChatGPT",
    href: "https://chat.openai.com",
    bg: "#10a37f",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
        <path d="M12 2a7 7 0 00-6.32 10A7 7 0 1012 22a7 7 0 006.32-10A7 7 0 0012 2zm0 2a5 5 0 110 10A5 5 0 0112 4z" fillOpacity="0.4"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>
    ),
  },
  {
    label: "Search Console",
    href: "https://search.google.com/search-console",
    bg: "#4285f4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="1.8"/>
        <path d="M15.5 15.5L20 20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
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

      {/* App launcher */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Apps
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {apps.map((app) => (
            <a
              key={app.label}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textDecoration: "none", transition: "transform 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ width: "60px", height: "60px", borderRadius: "14px", background: app.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
                {app.icon}
              </div>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.04em", textAlign: "center" }}>
                {app.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>

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

      </div>
    </div>
  );
}
