"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  director: string;
  year: number;
  genre: string;
  status: "watchlist" | "watched";
  summary: string;
  poster: string;
};

const GENRE_COLORS: Record<string, string> = {
  Action:      "#e74c3c",
  Thriller:    "#8e44ad",
  Drama:       "#2980b9",
  "Sci-Fi":    "#00b894",
  Comedy:      "#f39c12",
  Horror:      "#c0392b",
  Romance:     "#e91e63",
  Documentary: "#27ae60",
  Animation:   "#6c5ce7",
  War:         "#636e72",
  Crime:       "#fd9644",
  Fantasy:     "#00cec9",
};

const SEED: Movie[] = [
  { id:"s1",  title:"The Dark Knight",  director:"Christopher Nolan", year:2008, genre:"Thriller", status:"watched",
    summary:"Batman faces his greatest test as the Joker unleashes calculated chaos on Gotham City.",
    poster:"https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id:"s2",  title:"Parasite",         director:"Bong Joon-ho",      year:2019, genre:"Drama",    status:"watched",
    summary:"A poor family schemes their way into a wealthy household, triggering an unexpected and deadly chain of events.",
    poster:"https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id:"s3",  title:"Interstellar",     director:"Christopher Nolan", year:2014, genre:"Sci-Fi",   status:"watched",
    summary:"A team of astronauts travels through a wormhole near Saturn in search of a new home for humanity.",
    poster:"https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id:"s4",  title:"Inception",        director:"Christopher Nolan", year:2010, genre:"Sci-Fi",   status:"watched",
    summary:"A thief who enters dreamscapes to steal secrets is offered one final job — to plant an idea.",
    poster:"https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id:"s5",  title:"1917",             director:"Sam Mendes",        year:2019, genre:"War",       status:"watched",
    summary:"Two British soldiers must cross enemy territory to deliver a message that could save 1,600 lives.",
    poster:"https://image.tmdb.org/t/p/w342/iZf0KyrE25z1sage4SYQLhzjCUu.jpg" },
  { id:"s6",  title:"Oppenheimer",      director:"Christopher Nolan", year:2023, genre:"Drama",     status:"watched",
    summary:"The story of J. Robert Oppenheimer, the physicist who led the Manhattan Project to develop the atomic bomb.",
    poster:"https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id:"s7",  title:"Past Lives",       director:"Celine Song",       year:2023, genre:"Romance",   status:"watchlist",
    summary:"Two childhood sweethearts reconnect over decades, questioning love, identity, and the lives not lived.",
    poster:"https://image.tmdb.org/t/p/w342/k3waqVXkpFfXsBHFCaHRfnkNHNq.jpg" },
  { id:"s8",  title:"Dune: Part Two",   director:"Denis Villeneuve",  year:2024, genre:"Sci-Fi",    status:"watched",
    summary:"Paul Atreides unites with the Fremen to wage war against the conspirators who destroyed his family.",
    poster:"https://image.tmdb.org/t/p/w342/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg" },
  { id:"s10", title:"The Brutalist",    director:"Brady Corbet",      year:2024, genre:"Drama",     status:"watchlist",
    summary:"A Hungarian-Jewish architect flees post-war Europe to rebuild his life and legacy in America.",
    poster:"" },
];

function gc(g: string) { return GENRE_COLORS[g] ?? "#718096"; }

const BLANK = { title: "", director: "", year: String(new Date().getFullYear()), genre: "Drama", summary: "", poster: "" };

export default function MoviesPage() {
  const [movies, setMovies]       = useState<Movie[]>([]);
  const [tab, setTab]             = useState<"watchlist" | "watched">("watchlist");
  const [genre, setGenre]         = useState("All");
  const [showAdd, setShowAdd]     = useState(false);
  const [form, setForm]           = useState(BLANK);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const s = localStorage.getItem("me_movies");
    if (s) {
      const parsed: Movie[] = JSON.parse(s);
      if (!parsed.length || !("summary" in parsed[0])) {
        localStorage.setItem("me_movies", JSON.stringify(SEED));
        setMovies(SEED);
      } else {
        // Migrate: remove Poor Things, mark Oppenheimer + Dune: Part Two as watched
        const migrated = parsed
          .filter(m => m.id !== "s9")
          .map(m => {
            if (m.id === "s6" || m.id === "s8") return { ...m, status: "watched" as const };
            return m;
          });
        localStorage.setItem("me_movies", JSON.stringify(migrated));
        setMovies(migrated);
      }
    } else {
      setMovies(SEED);
    }
  }, []);

  function save(next: Movie[]) {
    setMovies(next);
    localStorage.setItem("me_movies", JSON.stringify(next));
  }

  function add() {
    if (!form.title.trim()) return;
    save([...movies, {
      id: Date.now().toString(),
      title: form.title.trim(),
      director: form.director.trim(),
      year: parseInt(form.year) || new Date().getFullYear(),
      genre: form.genre,
      status: tab,
      summary: form.summary.trim(),
      poster: form.poster.trim(),
    }]);
    setForm(BLANK);
    setShowAdd(false);
  }

  const filtered   = movies.filter(m => m.status === tab && (genre === "All" || m.genre === genre));
  const usedGenres = [...new Set(movies.filter(m => m.status === tab).map(m => m.genre))];

  const inp: React.CSSProperties = {
    background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.5rem",
    padding: "0.6rem 0.85rem", color: "var(--text)", fontFamily: "var(--font-dm-sans)",
    fontSize: "0.875rem", outline: "none",
  };

  const tabStyle = (t: typeof tab): React.CSSProperties => ({
    fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", letterSpacing: "0.08em",
    padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid", cursor: "none", transition: "all 0.2s",
    background: tab === t ? "var(--cyan)" : "transparent",
    color: tab === t ? "#000" : "var(--text-sec)",
    borderColor: tab === t ? "transparent" : "var(--border)",
  });

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      <Link href="/me"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.25rem", border: "1px solid var(--border)", borderRadius: "999px", transition: "border-color 0.2s, color 0.2s", marginBottom: "2rem" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
      >← Dashboard</Link>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Personal · Tracker</p>
          <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Movies</h1>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.4rem" }}>
            {movies.filter(m => m.status === "watched").length} watched · {movies.filter(m => m.status === "watchlist").length} in watchlist
          </p>
        </div>
        <button onClick={() => setShowAdd(v => !v)}
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", background: showAdd ? "var(--border)" : "var(--cyan)", color: showAdd ? "var(--text-sec)" : "#000", border: "none", borderRadius: "999px", padding: "0.5rem 1.25rem", cursor: "none", letterSpacing: "0.08em", fontWeight: 700, transition: "all 0.2s" }}
        >{showAdd ? "Cancel" : "+ Add Movie"}</button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Movie title *" autoFocus style={{ ...inp, flex: "2 1 180px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.director} onChange={e => setForm({ ...form, director: e.target.value })} placeholder="Director" style={{ ...inp, flex: "1 1 130px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="Year" style={{ ...inp, flex: "0 0 70px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <select value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} style={{ ...inp, flex: "0 0 130px", cursor: "none" }}>
              {Object.keys(GENRE_COLORS).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <input value={form.poster} onChange={e => setForm({ ...form, poster: e.target.value })} placeholder="Poster image URL (optional — paste from TMDB or any image URL)" style={{ ...inp, width: "100%" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <input value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} onKeyDown={e => e.key === "Enter" && add()} placeholder="Short summary (1–2 lines)" style={{ ...inp, width: "100%" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>
              Adding to: <span style={{ color: "var(--cyan)" }}>{tab === "watchlist" ? "Watchlist" : "Watched"}</span>
            </p>
            <button onClick={add} disabled={!form.title.trim()} style={{ background: form.title.trim() ? "var(--cyan)" : "var(--border)", color: form.title.trim() ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", fontWeight: 700, cursor: "none", transition: "all 0.2s" }}>Save</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <button style={tabStyle("watchlist")} onClick={() => { setTab("watchlist"); setGenre("All"); }}>Watchlist ({movies.filter(m => m.status === "watchlist").length})</button>
        <button style={tabStyle("watched")} onClick={() => { setTab("watched"); setGenre("All"); }}>Watched ({movies.filter(m => m.status === "watched").length})</button>
      </div>

      {/* Genre filters */}
      {usedGenres.length > 1 && (
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
          {["All", ...usedGenres].map(g => (
            <button key={g} onClick={() => setGenre(g)} style={{
              fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", letterSpacing: "0.06em",
              padding: "0.22rem 0.65rem", borderRadius: "999px", border: "1px solid", cursor: "none", transition: "all 0.2s",
              background: genre === g ? (g === "All" ? "var(--text)" : gc(g)) : "transparent",
              color: genre === g ? (g === "All" ? "var(--bg)" : "#fff") : "var(--text-sec)",
              borderColor: genre === g ? "transparent" : "var(--border)",
            }}>{g}</button>
          ))}
        </div>
      )}

      {/* Movie grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)" }}>
            {genre !== "All" ? `No ${genre} movies here.` : tab === "watchlist" ? "Your watchlist is empty." : "No movies watched yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1.25rem" }}>
          {filtered.map(m => {
            const color = gc(m.genre);
            const flipped = hoveredCard === m.id;
            return (
              <div key={m.id}
                style={{ background: "var(--surface)", border: `1px solid ${flipped ? color + "90" : "var(--border)"}`, borderRadius: "1rem", display: "flex", flexDirection: "column", transition: "border-color 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
                onMouseEnter={() => setHoveredCard(m.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Poster area — 3D flip */}
                <div style={{ aspectRatio: "2/3", position: "relative", flexShrink: 0, perspective: "800px" }}>
                  {/* Flipper */}
                  <div style={{
                    position: "absolute", inset: 0,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}>
                    {/* Front face — poster; overflow+radius here to clip image without breaking preserve-3d */}
                    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden", borderRadius: "1rem 1rem 0 0" }}>
                      {m.poster ? (
                        <img
                          src={m.poster}
                          alt={m.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                          }}
                        />
                      ) : null}
                      {/* Fallback gradient */}
                      <div style={{
                        display: m.poster ? "none" : "flex",
                        position: "absolute", inset: 0,
                        background: `linear-gradient(160deg, ${color}30 0%, ${color}70 100%)`,
                        flexDirection: "column", alignItems: "center", justifyContent: "center",
                        padding: "1.25rem", textAlign: "center", gap: "0.5rem",
                      }}>
                        <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color, letterSpacing: "0.14em", opacity: 0.85 }}>{m.genre.toUpperCase()}</span>
                        <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.15rem", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{m.title}</p>
                        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "var(--text-sec)" }}>{m.year}</p>
                      </div>

                      {/* Watched badge */}
                      {m.status === "watched" && (
                        <span style={{ position: "absolute", top: "0.5rem", left: "0.5rem", fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", letterSpacing: "0.08em", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "#4caf50", borderRadius: "999px", padding: "0.2rem 0.5rem" }}>✓ WATCHED</span>
                      )}
                    </div>

                    {/* Back face — summary */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: "1rem 1rem 0 0",
                      background: `linear-gradient(160deg, #0a0a0f 0%, ${color}25 100%)`,
                      display: "flex", flexDirection: "column", justifyContent: "center",
                      padding: "1.25rem", gap: "0.75rem",
                    }}>
                      <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", letterSpacing: "0.12em", color, background: color + "20", border: `1px solid ${color}44`, borderRadius: "999px", padding: "0.15rem 0.5rem", alignSelf: "flex-start" }}>
                        {m.genre.toUpperCase()}
                      </span>
                      <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        {m.title}
                      </p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                        {m.summary || "No summary yet."}
                      </p>
                      <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginTop: "auto" }}>
                        {[m.director, m.year].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info below poster */}
                <div style={{ padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{m.title}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", color: "var(--text-sec)" }}>
                    {[m.director, m.year].filter(Boolean).join(" · ")}
                  </p>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color, background: color + "20", border: `1px solid ${color}44`, borderRadius: "999px", padding: "0.1rem 0.45rem", alignSelf: "flex-start", marginTop: "auto" }}>
                    {m.genre.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
