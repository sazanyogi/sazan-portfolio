"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  status: "want" | "reading" | "read";
  progress: number;
  summary: string;
  cover: string;
  pdf?: string;
};

const GENRE_COLORS: Record<string, string> = {
  Fiction:       "#6c5ce7",
  "Non-Fiction": "#00b894",
  Memoir:        "#fd79a8",
  "Self-Help":   "#fdcb6e",
  History:       "#e17055",
  Science:       "#0984e3",
  Philosophy:    "#a29bfe",
  Business:      "#00cec9",
  Biography:     "#fab1a0",
  Technology:    "#74b9ff",
};

const DUMMY_IDS = new Set(["b1","b2","b3","b4","b5","b6","b7","b8"]);

const SEED: Book[] = [
  { id:"b9", title:"Goodbye, Things",          author:"Fumio Sasaki",      year:2017, genre:"Non-Fiction", status:"want",    progress:0,
    summary:"A Japanese minimalist shares how letting go of possessions transformed his life, and how owning less can lead to more happiness.",
    cover:"https://covers.openlibrary.org/b/isbn/9780393609035-L.jpg",
    pdf:"https://6p0tc95qrt77midy.public.blob.vercel-storage.com/books/Goodbye%2C%20Things_%20On%20Minimalist%20Living.pdf" },
  { id:"b10", title:"Rich Dad Poor Dad",        author:"Robert Kiyosaki",   year:1997, genre:"Business",   status:"want",    progress:0,
    summary:"What the rich teach their kids about money that the poor and middle class do not. A case for financial education and building assets.",
    cover:"https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    pdf:"https://6p0tc95qrt77midy.public.blob.vercel-storage.com/books/Rich%20Dad%2C%20Poor%20Dad.pdf" },
];

function gc(g: string) { return GENRE_COLORS[g] ?? "#718096"; }

const BLANK = { title: "", author: "", year: String(new Date().getFullYear()), genre: "Fiction", summary: "", cover: "" };

export default function BooksPage() {
  const [books, setBooks]             = useState<Book[]>([]);
  const [tab, setTab]                 = useState<"want" | "read">("want");
  const [genre, setGenre]             = useState("All");
  const [showAdd, setShowAdd]         = useState(false);
  const [form, setForm]               = useState(BLANK);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [pdfFile, setPdfFile]         = useState<File | null>(null);
  const [uploading, setUploading]     = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileRef                       = useRef<HTMLInputElement>(null);
  const cardFileRefs                  = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const s = localStorage.getItem("me_books");
    const raw: Book[] = s ? JSON.parse(s) : [];
    // strip old dummy books, backfill pdf on matching SEED entries, add missing SEED books
    const real = raw.filter(b => !DUMMY_IDS.has(b.id));
    const realIds = new Set(real.map(b => b.id));
    const merged = [
      ...real.map(b => {
        const seed = SEED.find(sd => sd.id === b.id);
        return seed?.pdf && !b.pdf ? { ...b, pdf: seed.pdf } : b;
      }),
      ...SEED.filter(sd => !realIds.has(sd.id)),
    ];
    localStorage.setItem("me_books", JSON.stringify(merged));
    setBooks(merged);
  }, []);

  function save(next: Book[]) {
    setBooks(next);
    localStorage.setItem("me_books", JSON.stringify(next));
  }

  async function uploadPdf(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/books/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const { url } = await res.json();
    return url as string;
  }

  async function add() {
    if (!form.title.trim()) return;
    setUploading(true);
    try {
      let pdfUrl: string | undefined;
      if (pdfFile) pdfUrl = await uploadPdf(pdfFile);
      save([...books, {
        id: Date.now().toString(),
        title: form.title.trim(),
        author: form.author.trim(),
        year: parseInt(form.year) || new Date().getFullYear(),
        genre: form.genre,
        status: tab === "read" ? "read" : "want",
        progress: tab === "read" ? 100 : 0,
        summary: form.summary.trim(),
        cover: form.cover.trim(),
        pdf: pdfUrl,
      }]);
      setForm(BLANK);
      setPdfFile(null);
      setShowAdd(false);
    } finally {
      setUploading(false);
    }
  }

  async function attachPdf(bookId: string, file: File) {
    setUploadingId(bookId);
    try {
      const url = await uploadPdf(file);
      save(books.map(b => b.id === bookId ? { ...b, pdf: url } : b));
    } finally {
      setUploadingId(null);
    }
  }

  const currentlyReading = books.filter(b => b.status === "reading");
  const filtered   = books.filter(b => b.status === tab && (genre === "All" || b.genre === genre));
  const usedGenres = [...new Set(books.filter(b => b.status === tab).map(b => b.genre))];

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

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Personal · Tracker</p>
          <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Books</h1>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--text-sec)", letterSpacing: "0.06em", marginTop: "0.4rem" }}>
            {books.filter(b => b.status === "read").length} read · {books.filter(b => b.status === "want").length} to read
            {currentlyReading.length > 0 && ` · ${currentlyReading.length} reading`}
          </p>
        </div>
        <button onClick={() => setShowAdd(v => !v)}
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", background: showAdd ? "var(--border)" : "var(--cyan)", color: showAdd ? "var(--text-sec)" : "#000", border: "none", borderRadius: "999px", padding: "0.5rem 1.25rem", cursor: "none", letterSpacing: "0.08em", fontWeight: 700, transition: "all 0.2s" }}
        >{showAdd ? "Cancel" : "+ Add Book"}</button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Book title *" autoFocus style={{ ...inp, flex: "2 1 180px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author" style={{ ...inp, flex: "1 1 130px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="Year" style={{ ...inp, flex: "0 0 70px" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <select value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} style={{ ...inp, flex: "0 0 130px", cursor: "none" }}>
              {Object.keys(GENRE_COLORS).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <input value={form.cover} onChange={e => setForm({ ...form, cover: e.target.value })} placeholder="Cover image URL (optional)" style={{ ...inp, width: "100%" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <input value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} placeholder="Short summary (1–2 lines)" style={{ ...inp, width: "100%" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />

          {/* PDF upload */}
          <div
            onClick={() => fileRef.current?.click()}
            style={{ border: `1px dashed ${pdfFile ? "var(--cyan)" : "var(--border)"}`, borderRadius: "0.5rem", padding: "0.75rem 1rem", cursor: "none", display: "flex", alignItems: "center", gap: "0.75rem", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = pdfFile ? "var(--cyan)" : "var(--border)")}
          >
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.04em" }}>
              {pdfFile ? `📄 ${pdfFile.name}` : "Attach PDF (optional) — click to choose file"}
            </span>
            {pdfFile && (
              <button onClick={e => { e.stopPropagation(); setPdfFile(null); }} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text-sec)", fontSize: "0.75rem", cursor: "none", padding: 0 }}>✕</button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="application/pdf" style={{ display: "none" }} onChange={e => setPdfFile(e.target.files?.[0] ?? null)} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>
              Adding to: <span style={{ color: "var(--cyan)" }}>{tab === "want" ? "Want to Read" : "Read"}</span>
            </p>
            <button onClick={add} disabled={!form.title.trim() || uploading} style={{ background: form.title.trim() && !uploading ? "var(--cyan)" : "var(--border)", color: form.title.trim() && !uploading ? "#000" : "var(--text-sec)", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", fontWeight: 700, cursor: "none", transition: "all 0.2s" }}>
              {uploading ? "Uploading…" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Currently Reading */}
      {currentlyReading.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Currently Reading</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {currentlyReading.map(b => {
              const color = gc(b.genre);
              return (
                <div key={b.id} style={{ background: "var(--surface)", border: `1px solid ${color}44`, borderRadius: "1rem", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                  <div style={{ width: "52px", height: "78px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: `linear-gradient(160deg, ${color}30, ${color}70)` }}>
                    {b.cover && <img src={b.cover} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <div style={{ flex: "1 1 160px" }}>
                    <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{b.title}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", color: "var(--text-sec)", marginTop: "2px" }}>{b.author}</p>
                    {b.pdf && (
                      <a href={b.pdf} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--cyan)", letterSpacing: "0.06em", textDecoration: "none", display: "inline-block", marginTop: "0.35rem" }}>
                        Read PDF →
                      </a>
                    )}
                  </div>
                  <div style={{ flex: "2 1 200px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>PROGRESS</span>
                      <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color }}>{b.progress}%</span>
                    </div>
                    <div style={{ height: "6px", borderRadius: "3px", background: "var(--chip-bg)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${b.progress}%`, background: color, borderRadius: "3px", transition: "width 0.3s" }} />
                    </div>
                    <input type="range" min={0} max={100} value={b.progress}
                      onChange={e => save(books.map(x => x.id === b.id ? { ...x, progress: parseInt(e.target.value) } : x))}
                      style={{ width: "100%", marginTop: "0.4rem", accentColor: color, cursor: "none" }}
                    />
                  </div>
                  <button
                    onClick={() => save(books.map(x => x.id === b.id ? { ...x, status: "read", progress: 100 } : x))}
                    style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", background: "var(--cyan)", color: "#000", border: "none", borderRadius: "999px", padding: "0.3rem 0.75rem", cursor: "none", letterSpacing: "0.06em", fontWeight: 700, flexShrink: 0 }}
                  >Mark Read</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <button style={tabStyle("want")} onClick={() => { setTab("want"); setGenre("All"); }}>Want to Read ({books.filter(b => b.status === "want").length})</button>
        <button style={tabStyle("read")} onClick={() => { setTab("read"); setGenre("All"); }}>Read ({books.filter(b => b.status === "read").length})</button>
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

      {/* Book grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)" }}>
            {genre !== "All" ? `No ${genre} books here.` : tab === "want" ? "Your reading list is empty." : "No books read yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1.25rem" }}>
          {filtered.map(b => {
            const color = gc(b.genre);
            const flipped = hoveredCard === b.id;
            return (
              <div key={b.id}
                style={{ background: "var(--surface)", border: `1px solid ${flipped ? color + "90" : "var(--border)"}`, borderRadius: "1rem", display: "flex", flexDirection: "column", transition: "border-color 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
                onMouseEnter={() => setHoveredCard(b.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Cover — 3D flip */}
                <div style={{ aspectRatio: "2/3", position: "relative", flexShrink: 0, perspective: "800px" }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}>
                    {/* Front face */}
                    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden", borderRadius: "1rem 1rem 0 0" }}>
                      {b.cover && (
                        <img src={b.cover} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                          }}
                        />
                      )}
                      <div style={{
                        display: b.cover ? "none" : "flex",
                        position: "absolute", inset: 0,
                        background: `linear-gradient(160deg, ${color}30 0%, ${color}70 100%)`,
                        flexDirection: "column", alignItems: "center", justifyContent: "center",
                        padding: "1.25rem", textAlign: "center", gap: "0.5rem",
                      }}>
                        <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color, letterSpacing: "0.14em", opacity: 0.85 }}>{b.genre.toUpperCase()}</span>
                        <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{b.title}</p>
                        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", color: "var(--text-sec)" }}>{b.author}</p>
                      </div>
                      {b.status === "read" && (
                        <span style={{ position: "absolute", top: "0.5rem", left: "0.5rem", fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", letterSpacing: "0.08em", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "#4caf50", borderRadius: "999px", padding: "0.2rem 0.5rem" }}>✓ READ</span>
                      )}
                      {b.pdf && (
                        <span style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem", fontFamily: "var(--font-space-mono)", fontSize: "0.42rem", letterSpacing: "0.06em", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "var(--cyan)", borderRadius: "999px", padding: "0.2rem 0.5rem" }}>PDF</span>
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
                        {b.genre.toUpperCase()}
                      </span>
                      <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        {b.title}
                      </p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                        {b.summary || "No summary yet."}
                      </p>
                      <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginTop: "auto" }}>
                        {b.author} · {b.year}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info below cover */}
                <div style={{ padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.52rem", color: "var(--text-sec)", letterSpacing: "0.04em" }}>{b.author}</p>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{b.title}</p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color, background: color + "20", border: `1px solid ${color}44`, borderRadius: "999px", padding: "0.1rem 0.45rem" }}>
                      {b.genre.toUpperCase()}
                    </span>
                    {b.pdf ? (
                      <a href={b.pdf} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.48rem", color: "#000", background: "var(--cyan)", borderRadius: "999px", padding: "0.2rem 0.6rem", textDecoration: "none", letterSpacing: "0.06em", fontWeight: 700, flexShrink: 0 }}
                      >Read</a>
                    ) : (
                      <>
                        <button
                          onClick={() => cardFileRefs.current[b.id]?.click()}
                          disabled={uploadingId === b.id}
                          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", color: "var(--text-sec)", background: "transparent", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.18rem 0.5rem", cursor: "none", letterSpacing: "0.05em", flexShrink: 0, transition: "all 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
                        >{uploadingId === b.id ? "…" : "+ PDF"}</button>
                        <input
                          type="file" accept="application/pdf" style={{ display: "none" }}
                          ref={el => { cardFileRefs.current[b.id] = el; }}
                          onChange={e => { const f = e.target.files?.[0]; if (f) attachPdf(b.id, f); }}
                        />
                      </>
                    )}
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
