"use client";

import { useState, useEffect } from "react";
import { MOVIES, GENRE_COLORS, type Movie } from "@/data/movies";

type Tab = "watchlist" | "watched" | "favorites"; // watched | queued | starred

function gc(g: string) { return GENRE_COLORS[g] ?? "#718096"; }

export default function MoviesPage() {
  const [movies, setMovies]   = useState<Movie[]>([]);
  const [tab, setTab]         = useState<Tab>("watchlist");
  const [genre, setGenre]     = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("me_movies");
    let list: Movie[];
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Array<Record<string, unknown>>;
        const withFav = parsed.map(m => ({ favorite: false, ...m })) as Movie[];
        const ids = new Set(withFav.map(m => m.id));
        list = [...withFav, ...MOVIES.filter(s => !ids.has(s.id))];
      } catch {
        list = MOVIES;
      }
    } else {
      list = MOVIES;
    }
    localStorage.setItem("me_movies", JSON.stringify(list));
    setMovies(list);
    setMounted(true);
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

  function toggleStatus(id: string) {
    save(movies.map(m =>
      m.id === id ? { ...m, status: m.status === "watched" ? "watchlist" as const : "watched" as const } : m
    ));
  }

  function toggleFav(id: string) {
    save(movies.map(m => m.id === id ? { ...m, favorite: !m.favorite } : m));
  }

  const tabMovies = (t: Tab) =>
    t === "favorites" ? movies.filter(m => m.favorite) : movies.filter(m => m.status === t);

  const visible   = genre === "All" ? tabMovies(tab) : tabMovies(tab).filter(m => m.genre === genre);
  const usedGenres = [...new Set(tabMovies(tab).map(m => m.genre))];

  const tabStyle = (t: Tab): React.CSSProperties => ({
    fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", letterSpacing: "0.08em",
    padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid", cursor: "none", transition: "all 0.2s",
    background: tab === t ? "var(--cyan)" : "transparent",
    color:      tab === t ? "#000" : "var(--text-sec)",
    borderColor: tab === t ? "transparent" : "var(--border)",
  });

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          Sazan · Film Log
        </p>
        <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.5rem" }}>
          Movies
        </h1>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>
          {movies.filter(m => m.status === "watched").length} watched
          {" · "}
          {movies.filter(m => m.status === "watchlist").length} in queue
          {" · "}
          {movies.filter(m => m.favorite).length} favorites
        </p>
      </div>

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

      {/* Genre filter */}
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

      {/* Grid */}
      {visible.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", color: "var(--text-sec)" }}>
            {tab === "favorites"
              ? "No favorites yet — star a movie to add it here."
              : genre !== "All"
              ? `No ${genre} movies here.`
              : tab === "watchlist"
              ? "Watchlist is empty."
              : "Nothing watched yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1.25rem" }}>
          {visible.map(m => {
            const color   = gc(m.genre);
            const flipped = hovered === m.id;
            return (
              <div key={m.id}
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${flipped ? color + "90" : "var(--border)"}`,
                  borderRadius: "1rem", display: "flex", flexDirection: "column",
                  transition: "border-color 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Poster area — 3D flip */}
                <div style={{ aspectRatio: "2/3", position: "relative", flexShrink: 0, perspective: "800px" }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}>
                    {/* Front */}
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
                      {m.favorite && (
                        <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", fontSize: "0.9rem", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }}>★</span>
                      )}
                    </div>
                    {/* Back */}
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

                {/* Card footer */}
                <div style={{ padding: "0.75rem 1rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
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
