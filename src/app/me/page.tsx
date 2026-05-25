"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Edit your content here ───────────────────────────────────────────────────

const apps = [
  { label: "YT Studio",      href: "https://studio.youtube.com",                    bg: "#ff0000" },
  { label: "Analytics",      href: "https://analytics.google.com",                  bg: "#e37400" },
  { label: "Notion",         href: "https://notion.so",                             bg: "#191919" },
  { label: "Lightroom",      href: "https://lightroom.adobe.com",                   bg: "#001e36" },
  { label: "Canva",          href: "https://canva.com",                             bg: "#7d2ae8" },
  { label: "ChatGPT",        href: "https://chat.openai.com",                       bg: "#10a37f" },
  { label: "Search Console", href: "https://search.google.com/search-console",      bg: "#4285f4" },
];

const youtubeIdeas = [
  "Solo camping in Algonquin — overnight timelapse",
  "Big Data tools I actually use day-to-day",
  "Canada vs Nepal — cost of living comparison",
  "My study routine as an international student",
  "Best budget gear for travel filmmaking",
];

const reminders = [
  "Remember to back up Lightroom catalog",
  "Renew student status for summer semester",
  "Check monetization requirements progress",
];

// ─────────────────────────────────────────────────────────────────────────────

type Events = Record<string, string[]>;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function Calendar() {
  const now = new Date();
  const [year, setYear]     = useState(now.getFullYear());
  const [month, setMonth]   = useState(now.getMonth());
  const [events, setEvents] = useState<Events>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [input, setInput]   = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("me_calendar_events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  function save(next: Events) {
    setEvents(next);
    localStorage.setItem("me_calendar_events", JSON.stringify(next));
  }

  function addEvent() {
    if (!selected || !input.trim()) return;
    const next = { ...events, [selected]: [...(events[selected] ?? []), input.trim()] };
    save(next);
    setInput("");
  }

  function deleteEvent(key: string, i: number) {
    const list = [...(events[key] ?? [])];
    list.splice(i, 1);
    const next = { ...events, [key]: list };
    if (!list.length) delete next[key];
    save(next);
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey  = toKey(now.getFullYear(), now.getMonth(), now.getDate());
  const cells     = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const selectedEvents = selected ? (events[selected] ?? []) : [];

  return (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>

      {/* Month grid */}
      <div style={{ flex: "1 1 320px" }}>
        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <button onClick={prevMonth} style={navBtn}>‹</button>
          <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} style={navBtn}>›</button>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
          {DAYS.map(d => (
            <div key={d} style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", textAlign: "center", padding: "0.25rem 0", letterSpacing: "0.04em" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const key  = toKey(year, month, day);
            const isToday    = key === todayKey;
            const isSelected = key === selected;
            const hasEvents  = (events[key]?.length ?? 0) > 0;
            return (
              <button
                key={key}
                onClick={() => setSelected(isSelected ? null : key)}
                style={{
                  aspectRatio: "1",
                  borderRadius: "0.4rem",
                  border: isSelected ? "1px solid var(--cyan)" : "1px solid transparent",
                  background: isToday ? "rgba(0,245,255,0.12)" : isSelected ? "rgba(0,245,255,0.06)" : "transparent",
                  color: isToday ? "var(--cyan)" : "var(--text)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.8rem",
                  fontWeight: isToday ? 700 : 400,
                  cursor: "none",
                  position: "relative",
                  transition: "background 0.15s, border-color 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  padding: "4px 2px",
                }}
                onMouseEnter={(e) => { if (!isSelected && !isToday) e.currentTarget.style.background = "var(--chip-bg)"; }}
                onMouseLeave={(e) => { if (!isSelected && !isToday) e.currentTarget.style.background = "transparent"; }}
              >
                {day}
                {hasEvents && (
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--cyan)", display: "block" }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event panel */}
      <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {selected ? (
          <>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {new Date(selected + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </p>

            {selectedEvents.length === 0 && (
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)" }}>No events.</p>
            )}

            {selectedEvents.map((ev, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", background: "var(--chip-bg)", borderRadius: "0.5rem" }}>
                <span style={{ flex: 1, fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text)" }}>{ev}</span>
                <button
                  onClick={() => deleteEvent(selected, i)}
                  style={{ background: "none", border: "none", color: "var(--text-sec)", fontSize: "0.75rem", cursor: "none", lineHeight: 1, padding: "2px 4px", borderRadius: "4px", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
                >✕</button>
              </div>
            ))}

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEvent()}
                placeholder="Add event…"
                style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", outline: "none", cursor: "text" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button
                onClick={addEvent}
                disabled={!input.trim()}
                style={{ background: input.trim() ? "var(--cyan)" : "var(--border)", color: input.trim() ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.5rem 0.85rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", fontWeight: 700, cursor: "none", transition: "background 0.15s" }}
              >
                Add
              </button>
            </div>
          </>
        ) : (
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text-sec)", marginTop: "2rem" }}>
            Click a day to view or add events.
          </p>
        )}
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  background: "var(--chip-bg)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  borderRadius: "0.4rem",
  width: "28px",
  height: "28px",
  fontSize: "1rem",
  cursor: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
};

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

      {/* Calendar */}
      <Card title="Calendar">
        <Calendar />
      </Card>

      <div style={{ height: "1.25rem" }} />

      {/* Apps */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Apps</p>
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
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: app.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
                <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "0.7rem", color: "white", letterSpacing: "0.02em", textAlign: "center", padding: "0 4px" }}>{app.label}</span>
              </div>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.04em", textAlign: "center" }}>{app.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>

        <Card title="YouTube Ideas">
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none" }}>
            {youtubeIdeas.map((idea, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--cyan)", marginTop: "0.2rem", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text-sec)", lineHeight: 1.4 }}>{idea}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Reminders">
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem", listStyle: "none" }}>
            {reminders.map((note, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--pink)", fontSize: "0.6rem", marginTop: "0.3rem", flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text-sec)", lineHeight: 1.4 }}>{note}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Link href="/me/debt" style={{ textDecoration: "none" }}>
          <div
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", height: "100%", cursor: "none", transition: "border-color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Financial</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Debt Tracker</p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text-sec)", lineHeight: 1.5 }}>
              Track what you owe, progress paid off, monthly payments and payoff dates.
            </p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--cyan)", letterSpacing: "0.08em", marginTop: "1.25rem" }}>Open →</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
