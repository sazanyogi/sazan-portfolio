"use client";

import Link from "next/link";
import Projects from "@/components/Projects";
import About from "@/components/About";
import PhotoTeaser from "@/components/PhotoTeaser";
import NowTeaser from "@/components/NowTeaser";
import Contact from "@/components/Contact";


const STATS = [
  { value: "5+", label: "Years in Tech" },
  { value: "10+", label: "Projects Built" },
  { value: "3K+", label: "Photos Taken" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "0 clamp(1.5rem, 6vw, 8rem)", position: "relative", overflow: "hidden" }}>

        {/* Background glows */}
        <div style={{ position: "absolute", top: "15%", right: "-5%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Main content — fills available height */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "center", paddingTop: "100px", paddingBottom: "2rem" }} className="hero-grid">

          {/* LEFT — identity */}
          <div>
            <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "#4ade80", letterSpacing: "0.12em", background: "rgba(74,222,128,0.06)", border: "1px solid #4ade80", borderRadius: "2rem", padding: "0.35rem 0.9rem", marginBottom: "2rem", boxShadow: "0 0 12px rgba(74,222,128,0.25)" }}>
              <span className="animate-pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", flexShrink: 0 }} />
              Open to work · Stoney Creek, ON
            </div>

            <div className="animate-fade-up" style={{ marginBottom: "1.5rem", animationDelay: "0.1s" }}>
              <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(3rem, 7vw, 6.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "var(--text)" }}>
                Sajan Nath<br />Yogi<span style={{ color: "var(--cyan)" }}>.</span>
              </h1>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "clamp(0.7rem, 1.3vw, 0.82rem)", color: "var(--cyan)", letterSpacing: "0.1em", marginTop: "1rem" }}>
                Seeking — Data Analyst · Data Engineer · AI Automation
              </div>
            </div>

            <p className="animate-fade-up" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "var(--text-sec)", lineHeight: 1.8, maxWidth: "480px", marginBottom: "2.5rem", animationDelay: "0.2s" }}>
              I build AI pipelines, data dashboards, and digital products that actually ship.
              Based in Stoney Creek, Ontario — open to roles across Canada.
            </p>

            <div className="animate-fade-up" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", animationDelay: "0.3s" }}>
              {[
                { label: "VIEW WORK", href: "/work", primary: true },
                { label: "GET IN TOUCH", href: "#contact", primary: false },
                { label: "VIEW RESUME ↗", href: "/resume", primary: false },
              ].map((btn) => (
                <Link key={btn.label} href={btn.href}
                  style={{
                    fontFamily: "var(--font-space-mono)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em",
                    color: btn.primary ? "var(--bg)" : "var(--text)",
                    background: btn.primary ? "var(--cyan)" : "transparent",
                    border: btn.primary ? "none" : "1px solid var(--border)",
                    padding: "0.8rem 1.75rem",
                    borderRadius: "3rem", textDecoration: "none",
                    transition: "all 0.2s", display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    if (btn.primary) { e.currentTarget.style.opacity = "0.85"; }
                    else { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    if (btn.primary) { e.currentTarget.style.color = "var(--bg)"; }
                    else { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >{btn.label}</Link>
              ))}
            </div>
          </div>

          {/* RIGHT — now card */}
          <div className="hero-now-card animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "1.75rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--cyan), var(--purple), transparent)" }} />

              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.62rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>⚡ RIGHT NOW</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
                {[
                  { text: "Applying to Data Analyst roles daily", tag: "DAILY", color: "var(--cyan)", bg: "rgba(0,245,255,0.1)" },
                  { text: "Sharpening SQL — 2 problems a day", tag: "ONGOING", color: "var(--purple)", bg: "rgba(123,97,255,0.12)" },
                  { text: "Building AI automation pipelines", tag: "IN PROGRESS", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
                  { text: "Growing Click & Cast Inc", tag: "LIVE", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.3rem" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: item.color, display: "inline-block", flexShrink: 0, marginTop: "0.42em" }} />
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                    <div style={{ paddingLeft: "1.1rem" }}>
                      <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", padding: "0.12rem 0.5rem", borderRadius: "2rem", background: item.bg, color: item.color }}>{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.08em", marginTop: "0.25rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/now"
                style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--cyan)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", padding: "0.55rem 1.1rem", borderRadius: "2rem", border: "1px solid var(--cyan)", background: "rgba(0,245,255,0.05)", boxShadow: "0 0 14px rgba(0,245,255,0.15)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,245,255,0.12)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,245,255,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,245,255,0.05)"; e.currentTarget.style.boxShadow = "0 0 14px rgba(0,245,255,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span className="animate-pulse-dot" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--cyan)", display: "inline-block", flexShrink: 0 }} />
                WHAT I&apos;M FOCUSED ON ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar — scroll indicator */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "2rem" }} className="hero-bottom">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.15em" }}>SCROLL</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--cyan), transparent)", animation: "pulse 2s ease infinite" }} />
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 90px !important; }
          .hero-now-card { display: none !important; }
          .hero-bottom { display: none !important; }
        }
      `}</style>

      <Projects />
      <About />
      <PhotoTeaser />
      <NowTeaser />
      <Contact />
    </>
  );
}
