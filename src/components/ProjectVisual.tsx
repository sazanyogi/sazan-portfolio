import Image from "next/image";
import type { ProjectVisualSpec } from "@/data/projects";

const ACCENT_COLORS: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  pink: "var(--pink)",
};

function TerminalChrome() {
  return (
    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.85rem" }}>
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E" }} />
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
    </div>
  );
}

export default function ProjectVisual({
  visual,
  accent,
  title,
}: {
  visual: ProjectVisualSpec;
  accent: "cyan" | "purple" | "pink";
  title: string;
}) {
  const color = ACCENT_COLORS[accent];
  const boxStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: "16 / 10",
    background: "#0A0A0F",
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
  };

  if (visual.type === "image") {
    return (
      <div style={boxStyle}>
        <Image
          src={visual.src}
          alt={`${title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    );
  }

  if (visual.type === "terminal") {
    return (
      <div style={{ ...boxStyle, padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column" }}>
        <TerminalChrome />
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", lineHeight: 1.85, color: "#8FE3B0" }}>
          <div style={{ color: "var(--text-sec)" }}>$ python job_hunter.py</div>
          <div>→ scraping LinkedIn, Remotive, WeWorkRemotely…</div>
          <div>→ scoring postings with Claude…</div>
          <div style={{ color }}>✓ top matches scored 80+</div>
          <div style={{ color }}>✓ cover letters generated</div>
          <div>
            ✓ digest sent<span className="typing-cursor" />
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "workflow") {
    const rows = [
      ["Webhook", "FastAPI"],
      ["Claude API", "n8n"],
    ];
    const node = (n: string) => (
      <div
        key={n}
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.04em",
          color: "var(--text)",
          background: "var(--chip-bg)",
          border: `1px solid color-mix(in srgb, ${color} 33%, transparent)`,
          borderRadius: "8px",
          padding: "0.5rem 0.75rem",
          whiteSpace: "nowrap",
        }}
      >
        {n}
      </div>
    );
    return (
      <div style={{ ...boxStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {node(rows[0][0])}
          <span style={{ color, opacity: 0.7, fontSize: "0.8rem" }}>→</span>
          {node(rows[0][1])}
        </div>
        <span style={{ color, opacity: 0.7, fontSize: "0.8rem" }}>↓</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {node(rows[1][0])}
          <span style={{ color, opacity: 0.7, fontSize: "0.8rem" }}>→</span>
          {node(rows[1][1])}
        </div>
      </div>
    );
  }

  if (visual.type === "code") {
    return (
      <div style={{ ...boxStyle, padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column" }}>
        <TerminalChrome />
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.64rem", lineHeight: 1.75 }}>
          <div style={{ color: "var(--text-sec)" }}>-- Why DENSE_RANK, not ROW_NUMBER?</div>
          <div style={{ color: "var(--text-sec)", marginBottom: "0.4rem" }}>-- Ties should share the same rank.</div>
          <div style={{ color }}>WITH ranked AS (</div>
          <div style={{ color, paddingLeft: "1rem" }}>SELECT *, DENSE_RANK() OVER (</div>
          <div style={{ color, paddingLeft: "2rem" }}>PARTITION BY department</div>
          <div style={{ color, paddingLeft: "2rem" }}>ORDER BY salary DESC</div>
          <div style={{ color, paddingLeft: "1rem" }}>) AS rnk</div>
          <div style={{ color }}>FROM employees)</div>
          <div style={{ color: "var(--text)" }}>SELECT * FROM ranked WHERE rnk &lt;= 3;</div>
        </div>
      </div>
    );
  }

  if (visual.type === "chat") {
    return (
      <div style={{ ...boxStyle, padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "0.5rem" }}>
        <div style={{ alignSelf: "flex-end", maxWidth: "80%", background: "var(--chip-bg)", borderRadius: "12px 12px 2px 12px", padding: "0.5rem 0.75rem" }}>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "var(--text)" }}>what&apos;s the status on Career Dashboard?</span>
        </div>
        <div style={{ alignSelf: "flex-start", maxWidth: "85%", background: `color-mix(in srgb, ${color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`, borderRadius: "12px 12px 12px 2px", padding: "0.5rem 0.75rem" }}>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "var(--text)" }}>Pulled from your vault — 3 open action items, last updated 2 days ago.</span>
        </div>
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.08em", marginTop: "0.2rem" }}>
          via Telegram<span className="typing-cursor" />
        </div>
      </div>
    );
  }

  // chart
  return (
    <div style={{ ...boxStyle, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.9rem" }}>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[
          { label: "SESSIONS", value: "12.4K" },
          { label: "USERS", value: "8.1K" },
          { label: "TOP PAGE", value: "/services" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.05rem", color: "var(--text)" }}>{s.value}</div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "var(--text-sec)", letterSpacing: "0.08em", marginTop: "0.15rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none" style={{ display: "block" }}>
        <polyline points="0,45 30,38 60,42 90,25 120,30 150,12 180,18 200,8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
