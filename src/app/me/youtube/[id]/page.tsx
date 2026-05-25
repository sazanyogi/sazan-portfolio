"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { YouTubeIdea, EpisodeIdea } from "../page";

const STATUSES: YouTubeIdea["status"][] = ["brainstorm", "planning", "filming", "editing", "published"];

const STATUS_COLORS: Record<string, string> = {
  brainstorm: "#636e72",
  planning:   "#f39c12",
  filming:    "#e74c3c",
  editing:    "#6c5ce7",
  published:  "#00b894",
};

const inp: React.CSSProperties = {
  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "0.5rem",
  padding: "0.6rem 0.85rem", color: "var(--text)", fontFamily: "var(--font-dm-sans)",
  fontSize: "0.875rem", outline: "none", width: "100%", boxSizing: "border-box" as const,
};

export default function IdeaPage() {
  const { id } = useParams<{ id: string }>();

  const [idea, setIdea]             = useState<YouTubeIdea | null>(null);
  const [notFound, setNotFound]     = useState(false);
  const [newEp, setNewEp]           = useState("");
  const [newNotes, setNewNotes]     = useState("");
  const [editConcept, setEditConcept] = useState(false);
  const [conceptDraft, setConceptDraft] = useState("");

  useEffect(() => {
    if (!id) return;
    const s = localStorage.getItem("me_youtube");
    if (!s) { setNotFound(true); return; }
    const ideas: YouTubeIdea[] = JSON.parse(s);
    const found = ideas.find(i => i.id === id);
    if (!found) { setNotFound(true); return; }
    setIdea(found);
    setConceptDraft(found.concept);
  }, [id]);

  function persist(updated: YouTubeIdea) {
    setIdea(updated);
    const s = localStorage.getItem("me_youtube");
    if (!s) return;
    const ideas: YouTubeIdea[] = JSON.parse(s);
    localStorage.setItem("me_youtube", JSON.stringify(ideas.map(i => i.id === updated.id ? updated : i)));
  }

  function setStatus(status: YouTubeIdea["status"]) {
    if (!idea) return;
    persist({ ...idea, status });
  }

  function saveConcept() {
    if (!idea) return;
    persist({ ...idea, concept: conceptDraft });
    setEditConcept(false);
  }

  function addEpisode() {
    if (!idea || !newEp.trim()) return;
    const ep: EpisodeIdea = { id: Date.now().toString(), title: newEp.trim(), notes: newNotes.trim(), done: false };
    persist({ ...idea, episodes: [...idea.episodes, ep] });
    setNewEp("");
    setNewNotes("");
  }

  function toggleEpisode(epId: string) {
    if (!idea) return;
    persist({ ...idea, episodes: idea.episodes.map(ep => ep.id === epId ? { ...ep, done: !ep.done } : ep) });
  }

  function removeEpisode(epId: string) {
    if (!idea) return;
    persist({ ...idea, episodes: idea.episodes.filter(ep => ep.id !== epId) });
  }

  if (notFound) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
      <p style={{ fontFamily: "var(--font-dm-sans)", color: "var(--text-sec)" }}>Idea not found.</p>
      <Link href="/me/youtube" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", textDecoration: "none" }}>← Back to ideas</Link>
    </div>
  );

  if (!idea) return null;

  const done = idea.episodes.filter(e => e.done).length;

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/me/youtube"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-sec)")}
      >← YouTube Ideas</Link>

      {/* Header */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: idea.color, marginTop: "0.65rem", flexShrink: 0 }} />
        <div>
          <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{idea.title}</h1>
          {idea.tagline && (
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: idea.color, letterSpacing: "0.1em", marginTop: "0.4rem" }}>{idea.tagline}</p>
          )}
        </div>
      </div>

      {/* Status stepper */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", marginBottom: "0.85rem" }}>STATUS</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)} style={{
              fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", letterSpacing: "0.08em",
              padding: "0.3rem 0.8rem", borderRadius: "999px", border: "1px solid", cursor: "none", transition: "all 0.2s",
              background: idea.status === s ? STATUS_COLORS[s] : "transparent",
              color:      idea.status === s ? "#fff" : "var(--text-sec)",
              borderColor: idea.status === s ? "transparent" : "var(--border)",
            }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Concept */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em" }}>CONCEPT</p>
          <button onClick={() => { setEditConcept(v => !v); setConceptDraft(idea.concept); }}
            style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--cyan)", background: "transparent", border: "none", cursor: "none", letterSpacing: "0.06em" }}>
            {editConcept ? "Cancel" : "Edit"}
          </button>
        </div>
        {editConcept ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            <textarea value={conceptDraft} onChange={e => setConceptDraft(e.target.value)} rows={5}
              style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={saveConcept} style={{ background: "var(--cyan)", color: "#000", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1rem", fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", fontWeight: 700, cursor: "none" }}>Save</button>
            </div>
          </div>
        ) : (
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "var(--text-sec)", lineHeight: 1.65 }}>
            {idea.concept || "No concept written yet. Click Edit to add one."}
          </p>
        )}
      </div>

      {/* Episode ideas */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", marginBottom: "0.85rem" }}>
          CONTENT IDEAS {idea.episodes.length > 0 && `· ${done} / ${idea.episodes.length} done`}
        </p>

        {/* Add row */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <input value={newEp} onChange={e => setNewEp(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && addEpisode()}
            placeholder="Episode title or content idea" style={inp}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input value={newNotes} onChange={e => setNewNotes(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && addEpisode()}
              placeholder="Notes (optional)" style={{ ...inp, flex: 1 }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <button onClick={addEpisode} disabled={!newEp.trim()}
              style={{ background: newEp.trim() ? "var(--cyan)" : "var(--border)", color: newEp.trim() ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1rem", fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", fontWeight: 700, cursor: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}>
              + Add
            </button>
          </div>
        </div>

        {/* List */}
        {idea.episodes.length === 0 ? (
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", color: "var(--text-sec)" }}>No content ideas yet — add one above.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {idea.episodes.map(ep => (
              <div key={ep.id} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem", borderRadius: "0.5rem", background: ep.done ? "rgba(0,0,0,0.04)" : "transparent", transition: "background 0.2s" }}>
                <button onClick={() => toggleEpisode(ep.id)}
                  style={{ width: "18px", height: "18px", borderRadius: "4px", border: `1.5px solid ${ep.done ? idea.color : "var(--border)"}`, background: ep.done ? idea.color : "transparent", cursor: "none", flexShrink: 0, marginTop: "0.2rem", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {ep.done && <span style={{ color: "#fff", fontSize: "0.55rem", lineHeight: 1 }}>✓</span>}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: ep.done ? "var(--text-sec)" : "var(--text)", textDecoration: ep.done ? "line-through" : "none" }}>{ep.title}</p>
                  {ep.notes && <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", color: "var(--text-sec)", marginTop: "0.2rem", lineHeight: 1.4 }}>{ep.notes}</p>}
                </div>
                <button onClick={() => removeEpisode(ep.id)}
                  style={{ background: "transparent", border: "none", color: "var(--text-sec)", cursor: "none", fontSize: "0.75rem", flexShrink: 0, opacity: 0.4, transition: "opacity 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
