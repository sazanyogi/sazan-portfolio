"use client";

export default function Showreel() {
  return (
    <section
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ marginBottom: "3rem" }}>
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", color: "var(--purple)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
          SHOWREEL
        </div>
        <h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}>
          The Work in Motion
        </h2>
      </div>

      {/* Placeholder reel frame */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          border: "1px dashed var(--border)",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          position: "relative",
          overflow: "hidden",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        {/* Corner accents */}
        <div style={{ position: "absolute", top: "12px", left: "12px", width: "24px", height: "24px", borderTop: "2px solid var(--purple)", borderLeft: "2px solid var(--purple)", borderRadius: "2px 0 0 0" }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", width: "24px", height: "24px", borderTop: "2px solid var(--purple)", borderRight: "2px solid var(--purple)", borderRadius: "0 2px 0 0" }} />
        <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "24px", height: "24px", borderBottom: "2px solid var(--purple)", borderLeft: "2px solid var(--purple)", borderRadius: "0 0 0 2px" }} />
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "24px", height: "24px", borderBottom: "2px solid var(--purple)", borderRight: "2px solid var(--purple)", borderRadius: "0 0 2px 0" }} />

        {/* Play icon */}
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%",
          border: "1.5px solid var(--purple)",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(123,97,255,0.08)",
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M7 4.5L18 11L7 17.5V4.5Z" fill="var(--purple)" />
          </svg>
        </div>

        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.15em" }}>
          REEL COMING SOON
        </div>
      </div>
    </section>
  );
}
