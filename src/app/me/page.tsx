"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const quickLinks = [
  { label: "YouTube Studio", href: "https://studio.youtube.com" },
  { label: "Google Analytics", href: "https://analytics.google.com" },
  { label: "Notion", href: "https://notion.so" },
  { label: "Lightroom", href: "https://lightroom.adobe.com" },
];

const notes = [
  "Edit this page to add your own private notes, links, and widgets.",
  "Only you can see this — it's password-protected.",
];

export default function MePage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "8rem 1.5rem 4rem",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.65rem",
              color: "var(--cyan)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            Private Dashboard
          </p>
          <h1
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Welcome back, Sazan.
          </h1>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.65rem",
            color: "var(--text-sec)",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            padding: "0.4rem 1rem",
            cursor: "none",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--pink)";
            e.currentTarget.style.color = "var(--pink)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-sec)";
          }}
        >
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {/* Quick Links */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.6rem",
              color: "var(--text-sec)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Quick Links
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  textDecoration: "none",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  transition: "background 0.15s, color 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--chip-bg)";
                  e.currentTarget.style.color = "var(--cyan)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>→</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.6rem",
              color: "var(--text-sec)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Notes
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none" }}>
            {notes.map((note, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.85rem",
                  color: "var(--text-sec)",
                  lineHeight: 1.5,
                  paddingLeft: "1rem",
                  borderLeft: "2px solid var(--border)",
                }}
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Site links */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.6rem",
              color: "var(--text-sec)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Your Site
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["/now", "/work", "/photos", "/camping", "/resume"].map((href) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  textDecoration: "none",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  transition: "background 0.15s, color 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--chip-bg)";
                  e.currentTarget.style.color = "var(--cyan)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>→</span>
                {href}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
