"use client";

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 8.2v5M9.8 17l-1.6-2M14.2 17l1.6-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="6" r="2.2" fill="currentColor" />
      <circle cx="6" cy="18" r="2.2" fill="currentColor" />
      <circle cx="18" cy="18" r="2.2" fill="currentColor" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 5l-2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="12" rx="1" />
      <rect x="16" y="4" width="4" height="17" rx="1" />
    </svg>
  );
}

const SERVICES = [
  {
    icon: <SparkleIcon />,
    title: "GenAI & LLM Engineering",
    items: ["Claude, GPT & Gemini APIs", "Prompt engineering", "RAG pipelines", "Model evaluation"],
  },
  {
    icon: <NetworkIcon />,
    title: "Agentic AI & MCP",
    items: ["Multi-agent workflows", "MCP servers & tools", "n8n orchestration", "Tool-calling & planning"],
  },
  {
    icon: <CodeIcon />,
    title: "Python & APIs",
    items: ["FastAPI microservices", "Serverless (Modal)", "Web scraping & scripting", "REST API design"],
  },
  {
    icon: <BarsIcon />,
    title: "Data & Automation",
    items: ["SQL & data pipelines", "Workflow automation", "Analytics & reporting", "ETL & integrations"],
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
          AI Engineering Capabilities
        </h2>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", color: "var(--text-sec)", marginTop: "1rem", maxWidth: "480px", lineHeight: 1.65 }}>
          From LLM APIs to agentic workflows — here&apos;s the stack I use to design, build, and ship GenAI systems.
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
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--text-sec)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--text-sec), transparent)", opacity: 0.5 }} />

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "11px",
                  background: "var(--chip-bg)",
                  color: "var(--text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1.02rem", color: "var(--text)", lineHeight: 1.2 }}>{s.title}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-sec)",
                    background: "var(--chip-bg)",
                    padding: "0.25rem 0.55rem",
                    borderRadius: "4px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
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
