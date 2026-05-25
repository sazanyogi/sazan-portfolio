"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export type EpisodeIdea = { id: string; title: string; notes: string; done: boolean; };

export type YouTubeIdea = {
  id: string;
  title: string;
  tagline: string;
  concept: string;
  status: "brainstorm" | "planning" | "filming" | "editing" | "published";
  color: string;
  episodes: EpisodeIdea[];
  createdAt: string;
};

const COLORS = ["#e74c3c", "#00b894", "#6c5ce7", "#f39c12", "#0984e3", "#fd79a8", "#00cec9"];

export const STATUS_COLORS: Record<string, string> = {
  brainstorm: "#636e72",
  planning:   "#f39c12",
  filming:    "#e74c3c",
  editing:    "#6c5ce7",
  published:  "#00b894",
};

const SEED: YouTubeIdea[] = [
  {
    id: "y1",
    title: "Click & Cast",
    tagline: "Games · Guests · Good Vibes",
    concept: "Bring in 1–2 guests and play fun interactive games — guess the name, trivia, correct-answer challenges. Light, entertaining format that works well for repeat guests and builds a recognisable show structure.",
    status: "brainstorm",
    color: "#e74c3c",
    episodes: [],
    createdAt: "2026-05-25",
  },
  {
    id: "y2",
    title: "Life Log",
    tagline: "Fishing · Camping · Real Life",
    concept: "Personal vlog documenting everyday adventures — fishing trips, overnight camping, and anything else worth capturing. Authentic, unscripted, just life as it happens.",
    status: "brainstorm",
    color: "#00b894",
    episodes: [],
    createdAt: "2026-05-25",
  },
];

const BLANK = { title: "", tagline: "", concept: "", color: COLORS[0] };

const inp: React.CSSProperties = {
  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.5rem",
  padding: "0.6rem 0.85rem", color: "var(--text)", fontFamily: "var(--font-dm-sans)",
  fontSize: "0.875rem", outline: "none", flex: "1 1 180px",
};

export default function YouTubePage() {
  const [ideas, setIdeas]   = useState<YouTubeIdea[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm]     = useState(BLANK);

  useEffect(() => {
    const s = localStorage.getItem("me_youtube");
    if (s) {
      setIdeas(JSON.parse(s));
    } else {
      setIdeas(SEED);
      localStorage.setItem("me_youtube", JSON.stringify(SEED));
    }
  }, []);

  function save(next: YouTubeIdea[]) {
    setIdeas(next);
    localStorage.setItem("me_youtube", JSON.stringify(next));
  }

  function add() {
    if (!form.title.trim()) return;
    save([...ideas, {
      id: Date.now().toString(),
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      concept: form.concept.trim(),
      status: "brainstorm",
      color: form.color,
      episodes: [],
      createdAt: new Date().toISOString().split("T")[0],
    }]);
    setForm(BLANK);
    setShowAdd(false);
  }

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      <Link href="/me"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.25rem", border: "1px solid var(--border)", borderRadius: "999px", transition: "border-color 0.2s, color 0.2s", marginBottom: "2rem" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
      >← Dashboard</Link>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Personal · Creator</p>
          <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>YouTube Ideas</h1>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.4rem" }}>
            {ideas.length} idea{ideas.length !== 1 ? "s" : ""} · {ideas.filter(i => i.status !== "brainstorm").length} in motion
          </p>
        </div>
        <button onClick={() => setShowAdd(v => !v)}
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", background: showAdd ? "var(--border)" : "var(--cyan)", color: showAdd ? "var(--text-sec)" : "#000", border: "none", borderRadius: "999px", padding: "0.5rem 1.25rem", cursor: "none", letterSpacing: "0.08em", fontWeight: 700, transition: "all 0.2s" }}
        >{showAdd ? "Cancel" : "+ New Idea"}</button>
      </div>

      {showAdd && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {COLORS.map(c => (
              <button key={c} onClick={() => setForm({ ...form, color: c })}
                style={{ width: "22px", height: "22px", borderRadius: "50%", background: c, border: form.color === c ? "2px solid var(--text)" : "2px solid transparent", cursor: "none", transition: "border-color 0.15s" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Channel / series title *" autoFocus style={inp}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="Short tagline" style={{ ...inp, flex: "1 1 160px" }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          </div>
          <textarea value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} placeholder="Describe the concept — format, audience, episode ideas..." rows={3}
            style={{ ...inp, flex: "unset", resize: "vertical", lineHeight: 1.5, width: "100%", boxSizing: "border-box" }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={add} disabled={!form.title.trim()}
              style={{ background: form.title.trim() ? "var(--cyan)" : "var(--border)", color: form.title.trim() ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", fontWeight: 700, cursor: "none", transition: "all 0.2s" }}>
              Save Idea
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {ideas.map(idea => (
          <Link key={idea.id} href={`/me/youtube/${idea.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem", cursor: "none", transition: "border-color 0.2s, transform 0.15s", height: "100%", boxSizing: "border-box" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = idea.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: idea.color }} />
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", letterSpacing: "0.1em", color: STATUS_COLORS[idea.status], background: STATUS_COLORS[idea.status] + "20", border: `1px solid ${STATUS_COLORS[idea.status]}44`, borderRadius: "999px", padding: "0.15rem 0.55rem" }}>
                  {idea.status.toUpperCase()}
                </span>
              </div>

              <div>
                <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.35rem", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{idea.title}</p>
                {idea.tagline && <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: idea.color, letterSpacing: "0.08em", marginTop: "0.3rem" }}>{idea.tagline}</p>}
              </div>

              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", color: "var(--text-sec)", lineHeight: 1.55, flex: 1 }}>{idea.concept}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>
                  {idea.episodes.length} episode idea{idea.episodes.length !== 1 ? "s" : ""}
                </span>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--cyan)", letterSpacing: "0.06em" }}>Open →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
