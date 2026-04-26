"use client";

import { useState } from "react";

const SOCIALS = [
  { label: "GitHub", handle: "@sazanyogi", href: "https://github.com/sazanyogi" },
  { label: "LinkedIn", handle: "Sajan Yogi", href: "https://linkedin.com/in/sazanyogi" },
  { label: "Email", handle: "sazanyogi@gmail.com", href: "mailto:sazanyogi@gmail.com" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--chip-bg)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "0.85rem 1rem",
    color: "var(--text)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,60,172,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
          position: "relative",
        }}
        className="contact-grid"
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.75rem",
              color: "var(--pink)",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
            }}
          >
            CONTACT
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Let&apos;s Build
            <br />
            Something
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: "var(--text-sec)",
              lineHeight: 1.75,
              marginBottom: "3rem",
              maxWidth: "380px",
            }}
          >
            Open to Data Analyst and AI Automation roles in Canada. Also happy to chat about
            freelance projects, dashboards, or AI tooling.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                  color: "var(--text)",
                  transition: "color 0.2s",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
              >
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-sec)",
                    letterSpacing: "0.1em",
                    minWidth: "4.5rem",
                  }}
                >
                  {s.label.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {s.handle}
                </span>
                <span style={{ fontSize: "0.8rem" }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--pink)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--pink)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <textarea
            placeholder="What's on your mind?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={6}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--pink)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: status === "sent" ? "var(--bg)" : "var(--bg)",
              background:
                status === "sent"
                  ? "var(--purple)"
                  : status === "error"
                  ? "#cc3333"
                  : "var(--pink)",
              border: "none",
              padding: "0.95rem 2rem",
              borderRadius: "3rem",
              cursor: status === "sending" || status === "sent" ? "default" : "none",
              transition: "opacity 0.2s, transform 0.2s",
              alignSelf: "flex-start",
              opacity: status === "sending" ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (status === "idle") e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {status === "idle" && "SEND MESSAGE"}
            {status === "sending" && "SENDING..."}
            {status === "sent" && "MESSAGE SENT ✓"}
            {status === "error" && "FAILED — TRY EMAIL"}
          </button>
        </form>
      </div>

      {/* Footer line */}
      <div
        style={{
          marginTop: "6rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.7rem",
            color: "var(--text-sec)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} SAJAN YOGI — MISSISSAUGA, ON
        </span>
        <span
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.7rem",
            color: "var(--text-sec)",
            letterSpacing: "0.06em",
          }}
        >
          BUILT WITH NEXT.JS + VERCEL
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
