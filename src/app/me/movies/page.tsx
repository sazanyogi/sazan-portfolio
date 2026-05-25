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
  rating: number;
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
  { id:"s1",  title:"The Dark Knight",  director:"Christopher Nolan", year:2008, genre:"Thriller",    status:"watched",   rating:5 },
  { id:"s2",  title:"Parasite",         director:"Bong Joon-ho",      year:2019, genre:"Drama",       status:"watched",   rating:5 },
  { id:"s3",  title:"Interstellar",     director:"Christopher Nolan", year:2014, genre:"Sci-Fi",      status:"watched",   rating:5 },
  { id:"s4",  title:"Inception",        director:"Christopher Nolan", year:2010, genre:"Sci-Fi",      status:"watched",   rating:5 },
  { id:"s5",  title:"1917",             director:"Sam Mendes",        year:2019, genre:"War",         status:"watched",   rating:4 },
  { id:"s6",  title:"Oppenheimer",      director:"Christopher Nolan", year:2023, genre:"Drama",       status:"watchlist", rating:0 },
  { id:"s7",  title:"Past Lives",       director:"Celine Song",       year:2023, genre:"Romance",     status:"watchlist", rating:0 },
  { id:"s8",  title:"Dune: Part Two",   director:"Denis Villeneuve",  year:2024, genre:"Sci-Fi",      status:"watchlist", rating:0 },
  { id:"s9",  title:"Poor Things",      director:"Yorgos Lanthimos",  year:2023, genre:"Fantasy",     status:"watchlist", rating:0 },
  { id:"s10", title:"The Brutalist",    director:"Brady Corbet",      year:2024, genre:"Drama",       status:"watchlist", rating:0 },
];

function gc(g: string) { return GENRE_COLORS[g] ?? "#718096"; }

function Stars({ rating, onChange }: { rating: number; onChange?: (n: number) => void }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onClick={() => onChange?.(n === rating ? 0 : n)}
          onMouseEnter={() => onChange && setHov(n)}
          onMouseLeave={() => setHov(0)}
          style={{ fontSize: "0.8rem", color: n <= (hov || rating) ? "#f0c040" : "var(--border)", cursor: onChange ? "none" : "default", transition: "color 0.1s", lineHeight: 1 }}
        >★</span>
      ))}
    </div>
  );
}

export default function MoviesPage() {
  const [movies, setMovies]   = useState<Movie[]>([]);
  const [tab, setTab]         = useState<"watchlist" | "watched">("watchlist");
  const [genre, setGenre]     = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm]       = useState({ title: "", director: "", year: String(new Date().getFullYear()), genre: "Drama" });

  useEffect(() => {
    const s = localStorage.getItem("me_movies");
    setMovies(s ? JSON.parse(s) : SEED);
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
      rating: 0,
    }]);
    setForm({ title: "", director: "", year: String(new Date().getFullYear()), genre: "Drama" });
    setShowAdd(false);
  }

  const filtered    = movies.filter(m => m.status === tab && (genre === "All" || m.genre === genre));
  const usedGenres  = [...new Set(movies.filter(m => m.status === tab).map(m => m.genre))];

  const inp: React.CSSProperties = {
    background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.5rem",
    padding: "0.6rem 0.85rem", color: "var(--text)", fontFamily: "var(--font-dm-sans)",
    fontSize: "0.875rem", outline: "none",
  };

  const tabBtn = (t: "watchlist" | "watched"): React.CSSProperties => ({
    fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", letterSpacing: "0.08em",
    padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid", cursor: "none",
    transition: "all 0.2s",
    background: tab === t ? "var(--cyan)" : "transparent",
    color: tab === t ? "#000" : "var(--text-sec)",
    borderColor: tab === t ? "transparent" : "var(--border)",
  });

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      <Link href="/me"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-sec)")}
      >← Dashboard</Link>

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

      {showAdd && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} onKeyDown={e => e.key === "Enter" && add()} placeholder="Movie title *" autoFocus style={{ ...inp, flex: "2 1 180px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.director} onChange={e => setForm({ ...form, director: e.target.value })} placeholder="Director" style={{ ...inp, flex: "1 1 140px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="Year" style={{ ...inp, flex: "0 0 70px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <select value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} style={{ ...inp, flex: "0 0 130px", cursor: "none" }}>
              {Object.keys(GENRE_COLORS).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>
              Adding to: <span style={{ color: "var(--cyan)" }}>{tab === "watchlist" ? "Watchlist" : "Watched"}</span>
            </p>
            <button onClick={add} disabled={!form.title.trim()} style={{ background: form.title.trim() ? "var(--cyan)" : "var(--border)", color: form.title.trim() ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", fontWeight: 700, cursor: "none", transition: "all 0.2s" }}>Save</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <button style={tabBtn("watchlist")} onClick={() => { setTab("watchlist"); setGenre("All"); }}>Watchlist ({movies.filter(m => m.status === "watchlist").length})</button>
        <button style={tabBtn("watched")} onClick={() => { setTab("watched"); setGenre("All"); }}>Watched ({movies.filter(m => m.status === "watched").length})</button>
      </div>

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

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)" }}>
            {genre !== "All" ? `No ${genre} movies here.` : tab === "watchlist" ? "Your watchlist is empty." : "No movies watched yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {filtered.map(m => (
            <div key={m.id}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 0.2s, transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gc(m.genre) + "80"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ height: "4px", background: gc(m.genre) }} />
              <div style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: gc(m.genre), background: gc(m.genre) + "22", border: `1px solid ${gc(m.genre)}44`, borderRadius: "999px", padding: "0.12rem 0.5rem" }}>
                    {m.genre.toUpperCase()}
                  </span>
                  <button onClick={() => save(movies.filter(x => x.id !== m.id))}
                    style={{ background: "none", border: "none", color: "var(--text-sec)", fontSize: "0.65rem", cursor: "none", padding: "2px 4px", lineHeight: 1, transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--pink)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-sec)")}
                  >✕</button>
                </div>
                <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1rem", color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25, flex: 1 }}>{m.title}</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.76rem", color: "var(--text-sec)" }}>
                  {[m.director, m.year].filter(Boolean).join(" · ")}
                </p>
                {m.status === "watched"
                  ? <Stars rating={m.rating} onChange={r => save(movies.map(x => x.id === m.id ? { ...x, rating: r } : x))} />
                  : <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "var(--text-sec)", letterSpacing: "0.08em" }}>WANT TO WATCH</span>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
