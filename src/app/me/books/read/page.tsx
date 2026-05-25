"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  pdf?: string;
};

function Reader() {
  const params = useSearchParams();
  const id = params.get("id");
  const [book, setBook]       = useState<Book | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!id) return;
    const s = localStorage.getItem("me_books");
    if (!s) { setNotFound(true); return; }
    const books: Book[] = JSON.parse(s);
    const found = books.find(b => b.id === id);
    if (!found || !found.pdf) { setNotFound(true); return; }
    setNotFound(false);
    setBook(found);
  }, [id]);

  if (notFound) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", background: "var(--bg)" }}>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)" }}>No PDF found for this book.</p>
        <Link href="/me/books" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.08em", textDecoration: "none" }}>← Back to Books</Link>
      </div>
    );
  }

  if (!book) return null;

  // Header bar — shared between mobile and desktop
  const header = (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.65rem 1.25rem", background: "var(--surface)", borderBottom: "1px solid var(--border)", flexShrink: 0, zIndex: 10 }}>
      <Link
        href="/me/books"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-sec)")}
      >← Books</Link>

      <div style={{ width: "1px", height: "14px", background: "var(--border)" }} />

      <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {book.title}
      </p>

      <a
        href={book.pdf}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.25rem 0.65rem", flexShrink: 0, marginLeft: "auto", transition: "border-color 0.2s, color 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
      >Open ↗</a>
    </div>
  );

  // Mobile — iframes don't work on iOS/Android; link out to native viewer
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg)" }}>
        {header}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem", gap: "1.5rem", textAlign: "center" }}>
          <div style={{ width: "72px", height: "96px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "2rem" }}>📄</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1.25rem", color: "var(--text)", letterSpacing: "-0.02em" }}>{book.title}</p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text-sec)" }}>{book.author}</p>
          </div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em", maxWidth: "260px", lineHeight: 1.6 }}>
            Mobile browsers can't display PDFs inline. Tap below to open in your phone's PDF viewer.
          </p>
          <a
            href={book.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#000", background: "var(--cyan)", padding: "0.75rem 2rem", borderRadius: "999px", textDecoration: "none" }}
          >Open PDF</a>
        </div>
      </div>
    );
  }

  // Desktop — full iframe reader
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--bg)" }}>
      {header}
      <iframe
        src={book.pdf}
        style={{ flex: 1, border: "none", width: "100%", display: "block" }}
        title={book.title}
      />
    </div>
  );
}

export default function BookReadPage() {
  return (
    <Suspense fallback={null}>
      <Reader />
    </Suspense>
  );
}
