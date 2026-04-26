"use client";

import Link from "next/link";

const ITEMS = [
  { text: "Running Job Hunter Bot — targeting Data Analyst roles", tag: "DAILY", color: "var(--cyan)", tagBg: "rgba(0,245,255,0.1)" },
  { text: "Power BI — working toward PL-300 certification", tag: "IN PROGRESS", color: "#f59e0b", tagBg: "rgba(245,158,11,0.1)" },
  { text: "Growing Click & Cast Inc — AI media & automation agency", tag: "ONGOING", color: "var(--purple)", tagBg: "rgba(123,97,255,0.12)" },
];

export default function NowTeaser() {
  return (
    <section
      style={{
        padding: "6rem clamp(1.5rem, 6vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--cyan), var(--purple), transparent)" }} />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "0.6rem" }}>
              ⚡ WHAT I&apos;M DOING NOW
            </div>
            <h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Landing a Data / AI role in Canada
            </h2>
          </div>
          <Link
            href="/now"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.72rem",
              color: "var(--cyan)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              border: "1px solid var(--cyan)",
              padding: "0.45rem 1rem",
              borderRadius: "2rem",
              whiteSpace: "nowrap",
              transition: "background 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--cyan)";
              e.currentTarget.style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--cyan)";
            }}
          >
            SEE FULL /NOW ↗
          </Link>
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem 1rem",
                background: "var(--chip-bg)",
                borderRadius: "10px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--text)", flex: 1 }}>
                {item.text}
              </span>
              <span style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                padding: "0.15rem 0.55rem",
                borderRadius: "2rem",
                background: item.tagBg,
                color: item.color,
                flexShrink: 0,
              }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "1.5rem", fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", letterSpacing: "0.08em" }}>
          LAST UPDATED — APRIL 2026
        </div>
      </div>
    </section>
  );
}
