"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

// ─── Edit your content here ───────────────────────────────────────────────────

const apps = [
  { label: "YT Studio",      href: "https://studio.youtube.com",               bg: "#ff0000" },
  { label: "Analytics",      href: "https://analytics.google.com",             bg: "#e37400" },
  { label: "Notion",         href: "https://notion.so",                        bg: "#191919" },
  { label: "Lightroom",      href: "https://lightroom.adobe.com",              bg: "#001e36" },
  { label: "Canva",          href: "https://canva.com",                        bg: "#7d2ae8" },
  { label: "ChatGPT",        href: "https://chat.openai.com",                  bg: "#10a37f" },
  { label: "Search Console", href: "https://search.google.com/search-console", bg: "#4285f4" },
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

function GoogleCalendar() {
  const { theme } = useTheme();
  return (
    <div style={{ borderRadius: "0.75rem", overflow: "hidden", height: "500px" }}>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=sazanyogi%40gmail.com&ctz=America%2FToronto&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=MONTH"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "0.75rem",
          filter: theme === "dark"
            ? "invert(0.88) hue-rotate(180deg) saturate(0.85) brightness(0.96)"
            : "none",
        }}
        title="Google Calendar"
      />
    </div>
  );
}

// ─── Debt snapshot (summary only — full data lives in /me/debt) ───────────────

const debtIOwe = [
  { name: "Ambika Adhikari",   amount: 7500 },
  { name: "Sanu Aunty",        amount: 3000 },
  { name: "Sita Didi",         amount: 2000 },
  { name: "Hari Sir",          amount: 2000 },
  { name: "Tika Nath Yogi",    amount: 1500 },
  { name: "Jitendra N. Yogi",  amount: 1000 },
  { name: "Niroj KC",          amount: 250  },
];
const debtOwedToMe = [
  { name: "Kritika Adhikari", amount: 1000 },
  { name: "Lokendra Shah",    amount: 500  },
];

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function DebtPreview() {
  const totalOwe     = debtIOwe.reduce((s, d) => s + d.amount, 0);
  const totalCollect = debtOwedToMe.reduce((s, d) => s + d.amount, 0);
  const net          = totalCollect - totalOwe;
  const maxAmount    = debtIOwe[0].amount;
  const SHOW         = 4;

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Financial
        </p>
        <Link
          href="/me/debt"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--cyan)", letterSpacing: "0.08em", textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View full tracker →
        </Link>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "0.9rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(1.05rem, 2vw, 1.35rem)", color: "var(--pink)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {fmtMoney(totalOwe)}
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.3rem" }}>
            YOU OWE · {debtIOwe.length} people
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(1.05rem, 2vw, 1.35rem)", color: "var(--cyan)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {fmtMoney(totalCollect)}
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.3rem" }}>
            OWED TO YOU · {debtOwedToMe.length} people
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(1.05rem, 2vw, 1.35rem)", color: net >= 0 ? "var(--cyan)" : "var(--pink)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {fmtMoney(Math.abs(net))}
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.3rem" }}>
            NET · {net >= 0 ? "in your favour" : "you owe more"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "0.8rem" }} />

      {/* Bar list — top debtors */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {debtIOwe.slice(0, SHOW).map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.775rem", color: "var(--text)", width: "148px", flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {d.name}
            </span>
            <div style={{ flex: 1, height: "4px", borderRadius: "3px", background: "var(--chip-bg)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(d.amount / maxAmount) * 100}%`, background: "var(--pink)", borderRadius: "3px" }} />
            </div>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.63rem", color: "var(--pink)", width: "54px", textAlign: "right", flexShrink: 0, letterSpacing: "-0.02em" }}>
              {fmtMoney(d.amount)}
            </span>
          </div>
        ))}
        {debtIOwe.length > SHOW && (
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.1rem" }}>
            +{debtIOwe.length - SHOW} more ·{" "}
            <Link href="/me/debt" style={{ color: "var(--cyan)", textDecoration: "none" }}>see all →</Link>
          </p>
        )}
      </div>
    </div>
  );
}

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

      {/* Google Calendar */}
      <Card title="Calendar">
        <GoogleCalendar />
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

      {/* Debt widget */}
      <DebtPreview />

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

      </div>
    </div>
  );
}
