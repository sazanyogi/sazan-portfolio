"use client";

const SERVICES = [
  {
    icon: "📷",
    title: "Photography",
    color: "var(--cyan)",
    items: ["Events & sports", "Portraits & headshots", "Street & documentary", "Brand & product"],
  },
  {
    icon: "🎬",
    title: "Videography",
    color: "var(--purple)",
    items: ["Reels & short-form", "Brand films & promos", "Event coverage", "Drone / BTS footage"],
  },
  {
    icon: "📱",
    title: "Content Creation",
    color: "var(--pink)",
    items: ["Social media content", "Campaign visuals", "Editing & post-production", "Thumbnails & graphics"],
  },
  {
    icon: "📊",
    title: "Social Media",
    color: "var(--cyan)",
    items: ["Strategy & planning", "Account management", "Analytics & reporting", "Paid campaign support"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "20%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ marginBottom: "4rem" }}>
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
          WHAT I DO
        </div>
        <h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}>
          Creative Services
        </h2>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)", marginTop: "1rem", maxWidth: "480px", lineHeight: 1.65 }}>
          From a single shoot to an ongoing content partnership — here&apos;s how I can help your brand show up visually.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }} className="services-grid">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.75rem",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = s.color;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{s.icon}</div>
            <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", marginBottom: "1.25rem" }}>{s.title}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {s.items.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: s.color, flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text-sec)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
