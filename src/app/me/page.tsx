"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

// ─── Edit your content here ───────────────────────────────────────────────────

const apps: { label: string; href: string; bg: string; internal?: boolean }[] = [
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

// ─── Debt snapshot ────────────────────────────────────────────────────────────

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

function DebtCard() {
  const totalOwe     = debtIOwe.reduce((s, d) => s + d.amount, 0);
  const totalCollect = debtOwedToMe.reduce((s, d) => s + d.amount, 0);
  const net          = totalCollect - totalOwe;

  return (
    <Link href="/me/debt" style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "1rem", cursor: "none", transition: "border-color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--pink)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Financial</p>

        <div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "var(--pink)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {fmtMoney(totalOwe)}
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.35rem" }}>
            YOU OWE · {debtIOwe.length} people
          </p>
        </div>

        <div style={{ display: "flex", gap: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: "var(--cyan)", letterSpacing: "-0.02em" }}>{fmtMoney(totalCollect)}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.05em", marginTop: "0.2rem" }}>OWED TO YOU</p>
          </div>
          <div style={{ width: "1px", background: "var(--border)" }} />
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: net >= 0 ? "var(--cyan)" : "var(--pink)", letterSpacing: "-0.02em" }}>{fmtMoney(Math.abs(net))}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.05em", marginTop: "0.2rem" }}>{net >= 0 ? "IN YOUR FAVOUR" : "NET OWED"}</p>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
          {debtIOwe.slice(0, 4).map((d) => (
            <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "60%" }}>{d.name}</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.68rem", color: "var(--pink)", letterSpacing: "-0.02em", flexShrink: 0 }}>{fmtMoney(d.amount)}</span>
            </div>
          ))}
          {debtIOwe.length > 4 && (
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--text-sec)", letterSpacing: "0.04em" }}>+{debtIOwe.length - 4} more</p>
          )}
        </div>

        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--cyan)", letterSpacing: "0.06em" }}>Open tracker →</p>
      </div>
    </Link>
  );
}

// ─── Movies card ──────────────────────────────────────────────────────────────

type MovieSnap = { id: string; title: string; genre: string; status: string; poster: string; };

const GENRE_MOVIE_COLORS: Record<string, string> = {
  Action:"#e74c3c", Thriller:"#8e44ad", Drama:"#2980b9", "Sci-Fi":"#00b894",
  Comedy:"#f39c12", Horror:"#c0392b", Romance:"#e91e63", Documentary:"#27ae60",
  Animation:"#6c5ce7", War:"#636e72", Crime:"#fd9644", Fantasy:"#00cec9",
};

function MoviesCard() {
  const [movies, setMovies] = useState<MovieSnap[]>([]);

  useEffect(() => {
    const s = localStorage.getItem("me_movies");
    if (s) setMovies(JSON.parse(s));
  }, []);

  const watched   = movies.filter(m => m.status === "watched");
  const watchlist = movies.filter(m => m.status === "watchlist");
  const recent    = watched.slice(-4).reverse();

  return (
    <Link href="/me/movies" style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "1rem", cursor: "none", transition: "border-color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "#c0392b")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Entertainment</p>

        {/* Big number */}
        <div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "#c0392b", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {watched.length}
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.35rem" }}>
            MOVIES WATCHED
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: "var(--cyan)", letterSpacing: "-0.02em" }}>{watchlist.length}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.05em", marginTop: "0.2rem" }}>IN WATCHLIST</p>
          </div>
          <div style={{ width: "1px", background: "var(--border)" }} />
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: "var(--cyan)", letterSpacing: "-0.02em" }}>{movies.length}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.05em", marginTop: "0.2rem" }}>TOTAL TRACKED</p>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)" }} />

        {/* Recent watched — poster strip + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
          {recent.length === 0 && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)" }}>No movies watched yet.</p>
          )}
          {recent.map(m => {
            const color = GENRE_MOVIE_COLORS[m.genre] ?? "#718096";
            return (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                {/* Mini poster */}
                <div style={{ width: "28px", height: "42px", borderRadius: "4px", flexShrink: 0, overflow: "hidden", background: `linear-gradient(160deg, ${color}40, ${color}80)` }}>
                  {m.poster && <img src={m.poster} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.title}</p>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.42rem", letterSpacing: "0.08em", color, opacity: 0.9 }}>{m.genre.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--cyan)", letterSpacing: "0.06em" }}>Open tracker →</p>
      </div>
    </Link>
  );
}

// ─── Books card ───────────────────────────────────────────────────────────────

type BookSnap = { id: string; title: string; author: string; genre: string; status: string; progress: number; cover: string; };

const GENRE_BOOK_COLORS: Record<string, string> = {
  Fiction:"#6c5ce7", "Non-Fiction":"#00b894", Memoir:"#fd79a8", "Self-Help":"#fdcb6e",
  History:"#e17055", Science:"#0984e3", Philosophy:"#a29bfe", Business:"#00cec9",
  Biography:"#fab1a0", Technology:"#74b9ff",
};

function BooksCard() {
  const [books, setBooks] = useState<BookSnap[]>([]);

  useEffect(() => {
    const s = localStorage.getItem("me_books");
    if (s) setBooks(JSON.parse(s));
  }, []);

  const read      = books.filter(b => b.status === "read");
  const want      = books.filter(b => b.status === "want");
  const reading   = books.filter(b => b.status === "reading");
  const current   = reading[0] ?? null;
  const recentRead = read.slice(-3).reverse();

  return (
    <Link href="/me/books" style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "1rem", cursor: "none", transition: "border-color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "#6c5ce7")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Reading</p>

        {/* Big number */}
        <div>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "#6c5ce7", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {read.length}
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.35rem" }}>
            BOOKS READ
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: "var(--cyan)", letterSpacing: "-0.02em" }}>{want.length}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.05em", marginTop: "0.2rem" }}>WANT TO READ</p>
          </div>
          <div style={{ width: "1px", background: "var(--border)" }} />
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: reading.length > 0 ? "#fdcb6e" : "var(--cyan)", letterSpacing: "-0.02em" }}>{reading.length}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.05em", marginTop: "0.2rem" }}>READING NOW</p>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)" }} />

        {/* Currently reading with progress */}
        {current && (
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <div style={{ width: "28px", height: "42px", borderRadius: "4px", flexShrink: 0, overflow: "hidden", background: `linear-gradient(160deg, ${GENRE_BOOK_COLORS[current.genre] ?? "#718096"}40, ${GENRE_BOOK_COLORS[current.genre] ?? "#718096"}80)` }}>
              {current.cover && <img src={current.cover} alt={current.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{current.title}</p>
              <div style={{ height: "4px", borderRadius: "2px", background: "var(--chip-bg)", marginTop: "0.35rem", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${current.progress}%`, background: "#fdcb6e", borderRadius: "2px", transition: "width 0.3s" }} />
              </div>
              <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.42rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.25rem" }}>{current.progress}% COMPLETE</p>
            </div>
          </div>
        )}

        {/* Recent read list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
          {recentRead.length === 0 && !current && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)" }}>No books read yet.</p>
          )}
          {recentRead.map(b => {
            const color = GENRE_BOOK_COLORS[b.genre] ?? "#718096";
            return (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div style={{ width: "28px", height: "42px", borderRadius: "4px", flexShrink: 0, overflow: "hidden", background: `linear-gradient(160deg, ${color}40, ${color}80)` }}>
                  {b.cover && <img src={b.cover} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</p>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.42rem", letterSpacing: "0.08em", color, opacity: 0.9 }}>{b.genre.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--cyan)", letterSpacing: "0.06em" }}>Open tracker →</p>
      </div>
    </Link>
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
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{today}</p>
          <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Welcome back, Sazan.
          </h1>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", background: "transparent", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.4rem 1rem", cursor: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--pink)"; e.currentTarget.style.color = "var(--pink)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
        >{loggingOut ? "Signing out..." : "Sign out"}</button>
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
            <a key={app.label} href={app.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textDecoration: "none", transition: "transform 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
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

        <DebtCard />
        <MoviesCard />
        <BooksCard />

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
