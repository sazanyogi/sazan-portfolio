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
  const [book, setBook] = useState<Book | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("me_books");
    if (!s || !id) { setNotFound(true); return; }
    const books: Book[] = JSON.parse(s);
    const found = books.find(b => b.id === id);
    if (!found || !found.pdf) { setNotFound(true); return; }
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--bg)" }}>
      {/* Slim header bar */}
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

        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", marginLeft: "auto", flexShrink: 0, letterSpacing: "0.04em" }}>
          {book.author}
        </p>

        <a
          href={book.pdf}
          download
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.25rem 0.65rem", flexShrink: 0, transition: "border-color 0.2s, color 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
        >Download</a>
      </div>

      {/* PDF viewer */}
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
