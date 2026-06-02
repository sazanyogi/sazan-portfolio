"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MOVIES, GENRE_COLORS, type Movie } from "@/data/movies";

type Tab = "watchlist" | "watched" | "favorites";

function gc(g: string) { return GENRE_COLORS[g] ?? "#718096"; }

const BLANK = { title: "", director: "", year: String(new Date().getFullYear()), genre: "Drama", summary: "", poster: "" };

export default function MoviesPage() {
  const [movies, setMovies]           = useState<Movie[]>([]);
  const [tab, setTab]                 = useState<Tab>("watchlist");
  const [genre, setGenre]             = useState("All");
  const [showAdd, setShowAdd]         = useState(false);
  const [form, setForm]               = useState(BLANK);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("me_movies");
    if (raw) {
      const parsed = JSON.parse(raw) as Array<Record<string, unknown>>;
      if (!parsed.length || !("summary" in parsed[0])) {
        localStorage.setItem("me_movies", JSON.stringify(MOVIES));
        setMovies(MOVIES);
      } else {
        const step1 = (parsed as Array<Record<string, unknown>>)
          .filter(m => m.id !== "s9")
          .map(m => {
            const seed = MOVIES.find(s => s.id === (m.id as string));
            const withPoster = seed?.poster && !m.poster ? { ...m, poster: seed.poster } : m;
            const withFav = { favorite: false, ...withPoster };
            if (m.id === "s6" || m.id === "s8") return { ...withFav, status: "watched" as const };
            return withFav;
          }) as Movie[];
        const existingIds = new Set(step1.map(m => m.id));
        const migrated = [...step1, ...MOVIES.filter(s => !existingIds.has(s.id))];
        localStorage.setItem("me_movies", JSON.stringify(migrated));
        setMovies(migrated);
      }
    } else {
      setMovies(MOVIES);
    }
  }, []);

  // Auto-fetch posters for movies that don't have one yet
  useEffect(() => {
    if (!movies.length) return;
    const missing = movies.filter(m => !m.poster).slice(0, 30);
    if (!missing.length) return;
    let cancelled = false;

    async function fetchBatch(batch: Movie[]) {
      const results = await Promise.all(
        batch.map(async m => {
          try {
            const res = await fetch(`/api/poster?title=${encodeURIComponent(m.title)}&year=${m.year}`);
            const { poster } = await res.json() as { poster: string };
            return { id: m.id, poster };
          } catch {
            return { id: m.id, poster: "" };
          }
        })
      );
      if (cancelled) return;
      const updates = results.filter(r => r.poster);
      if (!updates.length) return;
      setMovies(prev => {
        const next = prev.map(m => {
          const u = updates.find(r => r.id === m.id);
          return u ? { ...m, poster: u.poster } : m;
        });
        localStorage.setItem("me_movies", JSON.stringify(next));
        return next;
      });
    }

    fetchBatch(missing);
    return () => { cancelled = true; };
  }, [movies.length]);

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
      status: tab === "favorites" ? "watchlist" : tab,
      favorite: false,
      summary: form.summary.trim(),
      poster: form.poster.trim(),
    }]);
    setForm(BLANK);
    setShowAdd(false);
  }

  function toggleFav(id: string) {
    save(movies.map(m => m.id === id ? { ...m, favorite: !m.favorite } : m));
  }

  function toggleStatus(id: string) {
    save(movies.map(m =>
      m.id === id ? { ...m, status: m.status === "watched" ? "watchlist" as const : "watched" as const } : m
    ));
  }

  const tabMovies = (t: Tab) =>
    t === "favorites" ? movies.filter(m => m.favorite) : movies.filter(m => m.status === t);

  const filtered   = genre === "All" ? tabMovies(tab) : tabMovies(tab).filter(m => m.genre === genre);
  const usedGenres = [...new Set(tabMovies(tab).map(m => m.genre))];

  const inp: React.CSSProperties = {
    background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.5rem",
    padding: "0.6rem 0.85rem", color: "var(--text)", fontFamily: "var(--font-dm-sans)",
    fontSize: "0.875rem", outline: "none",
  };

  const tabStyle = (t: Tab): React.CSSProperties => ({
    fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", letterSpacing: "0.08em",
    padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid", cursor: "none", transition: "all 0.2s",
    background: tab === t ? "var(--cyan)" : "transparent",
    color:      tab === t ? "#000" : "var(--text-sec)",
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
            {movies.filter(m => m.status === "watched").length} watched · {movies.filter(m => m.status === "watchlist").length} in watchlist · {movies.filter(m => m.favorite).length} favorites
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
          <input value={form.poster} onChange={e => setForm({ ...form, poster: e.target.value })} placeholder="Poster image URL (optional)" style={{ ...inp, width: "100%" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <input value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} onKeyDown={e => e.key === "Enter" && add()} placeholder="Short summary (1–2 lines)" style={{ ...inp, width: "100%" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>
              Adding to: <span style={{ color: "var(--cyan)" }}>{tab === "favorites" || tab === "watchlist" ? "Watchlist" : "Watched"}</span>
            </p>
            <button onClick={add} disabled={!form.title.trim()} style={{ background: form.title.trim() ? "var(--cyan)" : "var(--border)", color: form.title.trim() ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", fontWeight: 700, cursor: "none", transition: "all 0.2s" }}>Save</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <button style={tabStyle("watchlist")} onClick={() => { setTab("watchlist"); setGenre("All"); }}>
          Watchlist ({tabMovies("watchlist").length})
        </button>
        <button style={tabStyle("watched")} onClick={() => { setTab("watched"); setGenre("All"); }}>
          Watched ({tabMovies("watched").length})
        </button>
        <button style={tabStyle("favorites")} onClick={() => { setTab("favorites"); setGenre("All"); }}>
          Favorites ({tabMovies("favorites").length})
        </button>
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
            {tab === "favorites"
              ? "No favorites yet — star a movie below."
              : genre !== "All"
              ? `No ${genre} movies here.`
              : tab === "watchlist"
              ? "Your watchlist is empty."
              : "No movies watched yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1.25rem" }}>
          {filtered.map(m => {
            const color   = gc(m.genre);
            const flipped = hoveredCard === m.id;
            return (
              <div key={m.id}
                style={{ background: "var(--surface)", border: `1px solid ${flipped ? color + "90" : "var(--border)"}`, borderRadius: "1rem", display: "flex", flexDirection: "column", transition: "border-color 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
                onMouseEnter={() => setHoveredCard(m.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Poster area — 3D flip */}
                <div style={{ aspectRatio: "2/3", position: "relative", flexShrink: 0, perspective: "800px" }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}>
                    {/* Front face */}
                    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden", borderRadius: "1rem 1rem 0 0" }}>
                      {m.poster ? (
                        <img src={m.poster} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                          }}
                        />
                      ) : null}
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
                      {m.status === "watched" && (
                        <span style={{ position: "absolute", top: "0.5rem", left: "0.5rem", fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", letterSpacing: "0.08em", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "#4caf50", borderRadius: "999px", padding: "0.2rem 0.5rem" }}>✓ WATCHED</span>
                      )}
                      {m.favorite && (
                        <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", fontSize: "0.9rem", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }}>★</span>
                      )}
                    </div>
                    {/* Back face */}
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
                      <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{m.title}</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{m.summary || "No summary yet."}</p>
                      <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginTop: "auto" }}>
                        {[m.director, m.year].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info below poster */}
                <div style={{ padding: "0.75rem 1rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{m.title}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", color: "var(--text-sec)" }}>
                    {[m.director, m.year].filter(Boolean).join(" · ")}
                  </p>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color, background: color + "20", border: `1px solid ${color}44`, borderRadius: "999px", padding: "0.1rem 0.45rem", alignSelf: "flex-start" }}>
                    {m.genre.toUpperCase()}
                  </span>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.25rem" }}>
                    <button
                      onClick={() => toggleStatus(m.id)}
                      title={m.status === "watched" ? "Move to watchlist" : "Mark as watched"}
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", letterSpacing: "0.06em",
                        padding: "0.28rem 0.5rem", borderRadius: "999px", border: "1px solid var(--border)",
                        background: m.status === "watched" ? "rgba(76,175,80,0.12)" : "transparent",
                        color: m.status === "watched" ? "#4caf50" : "var(--text-sec)",
                        cursor: "none", transition: "all 0.2s",
                      }}
                    >
                      {m.status === "watched" ? "✓ Watched" : "+ Watched"}
                    </button>
                    <button
                      onClick={() => toggleFav(m.id)}
                      title={m.favorite ? "Remove favorite" : "Add to favorites"}
                      style={{
                        width: "28px", height: "28px", flexShrink: 0,
                        borderRadius: "50%", border: "1px solid var(--border)",
                        background: m.favorite ? "rgba(255,215,0,0.15)" : "transparent",
                        color: m.favorite ? "#ffd700" : "var(--text-sec)",
                        cursor: "none", transition: "all 0.2s",
                        fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {m.favorite ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
