"use client";

import Image from "next/image";
import Link from "next/link";

const PREVIEW = [
  "/photos/favourite/2J9A5623.jpg",
  "/photos/favourite/2J9A5477.jpg",
  "/photos/nepal-cup/2J9A7333.jpg",
  "/photos/nepal-cup/2J9A7572.jpg",
  "/photos/favourite/2J9A7876.jpg",
  "/photos/nepal-cup/2J9A8057.jpg",
];

export default function PhotoTeaser() {
  return (
    <section
      id="photos"
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", color: "var(--pink)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
            PHOTOGRAPHY
          </div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Through the Lens
          </h2>
        </div>
        <Link
          href="/photos"
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: "var(--pink)",
            border: "1px solid var(--pink)",
            padding: "0.5rem 1.2rem",
            borderRadius: "2rem",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--pink)"; e.currentTarget.style.color = "var(--bg)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--pink)"; }}
        >
          VIEW ALL 55 →
        </Link>
      </div>

      {/* 6-photo preview grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {PREVIEW.map((src, i) => (
          <Link
            key={src}
            href="/photos"
            style={{ display: "block", borderRadius: "8px", overflow: "hidden" }}
          >
            <div style={{ position: "relative", paddingBottom: "75%", width: "100%" }}>
              <Image
                src={src}
                alt="Sajan Yogi Photography"
                fill
                style={{ objectFit: "cover", transition: "transform 0.4s ease, filter 0.4s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; (e.currentTarget as HTMLImageElement).style.filter = "brightness(1)"; }}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {i === 5 && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.8rem", color: "#fff", letterSpacing: "0.1em" }}>+49 MORE</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
