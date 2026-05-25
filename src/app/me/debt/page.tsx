"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Your debt data ───────────────────────────────────────────────────────────

const iOwe = [
  {
    name: "Ambika Adhikari",
    amount: 7500,
    note: "Bihe + Canada help",
    color: "#FF3CAC",
    transactions: [
      { label: "Kartik 2/3 - jagga kinda", date: "2025-10-20", amount: -2500 },
      { label: "Bihe + Canada",            date: "2023-03-05", amount: -5000 },
    ],
  },
  {
    name: "Sanu Aunty",
    amount: 3000,
    note: "Pay anytime but need to pay full",
    color: "#FF3CAC",
    transactions: [
      { label: "Kartik 3/4 - Chaurko Jaga Kinda", date: "2025-10-20", amount: -3000 },
    ],
  },
  {
    name: "Jitendra Nath Yogi",
    amount: 2500,
    note: "Canada visa + land purchase help",
    color: "#FF3CAC",
    transactions: [
      { label: "Paid by daddy",              date: "2026-03-11", amount: 1000 },
      { label: "Paid by daddy",              date: "2026-03-11", amount: 1000 },
      { label: "Paid by daddy",              date: "2026-01-05", amount: 2000 },
      { label: "Kartik 3/4 - Chau ko Jagga", date: "2025-10-20", amount: -5000 },
      { label: "Canadako Visa lauda",         date: "2023-01-05", amount: -1500 },
    ],
  },
  {
    name: "Sita Didi",
    amount: 2500,
    note: "When she comes back to Nepal",
    color: "#FF3CAC",
    transactions: [
      { label: "Ded Lakh Tiryo - Japan jane process", date: "2026-04-05", amount: 1500 },
      { label: "Bihe ma Leko",                        date: "2023-03-01", amount: -4000 },
    ],
  },
  {
    name: "Hari Sir",
    amount: 2000,
    note: "Max 1 year",
    color: "#FF3CAC",
    transactions: [
      { label: "Kartik 3/4 - Chaur ko Jaga Kinda", date: "2024-10-20", amount: -2000 },
    ],
  },
  {
    name: "Tika Nath Yogi",
    amount: 1500,
    note: "Canada aauda leko",
    color: "#FF3CAC",
    transactions: [
      { label: "Canada aauda leko", date: "2023-07-05", amount: -1500 },
    ],
  },
  {
    name: "Niroj KC",
    amount: 250,
    note: "Help",
    color: "#FF3CAC",
    transactions: [
      { label: "Help", date: "2025-08-13", amount: -250 },
    ],
  },
];

const owedToMe = [
  {
    name: "Kritika Adhikari",
    amount: 1000,
    note: "College fee tirna",
    color: "#00F5FF",
    transactions: [
      { label: "College fee tirna", date: "2026-03-28", amount: 1000 },
    ],
  },
  {
    name: "Lokendra Shah",
    amount: 500,
    note: "",
    color: "#00F5FF",
    transactions: [
      { label: "I gave", date: "2026-02-16", amount: 500 },
    ],
  },
];

const settled = [
  {
    name: "Sita Aunty",
    note: "$300 per month repayment",
    gave: 2000,
    received: 2000,
    transactions: [
      { label: "Loan Paid Cash",               date: "2026-04-05", amount: 2000 },
      { label: "Kartik 2/3 Chaurko Jagga",     date: "2025-10-20", amount: -2000 },
    ],
  },
  {
    name: "Samuha",
    note: "Interest 1000 per month",
    gave: 1000,
    received: 1000,
    transactions: [
      { label: "Byaj Sahit - 6 Hajar", date: "2026-04-05", amount: 1000 },
      { label: "Kartik 3/4 - Chaurko Jagga ko lagi", date: "2025-10-20", amount: -1000 },
    ],
  },
  {
    name: "Deepak Giri",
    note: "",
    gave: 200,
    received: 200,
    transactions: [
      { label: "I gave",     date: "2026-02-16", amount: 200 },
      { label: "I received", date: "2026-01-05", amount: -200 },
    ],
  },
  {
    name: "Prabin Giri",
    note: "",
    gave: 0,
    received: 0,
    transactions: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

type Tab = "owe" | "collect" | "settled";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.abs(n));

function PersonCard({
  name, amount, note, color, transactions,
}: {
  name: string; amount: number; note?: string; color: string;
  transactions: { label: string; date: string; amount: number }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--surface)", border: `1px solid var(--border)`, borderRadius: "1rem", overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color + "55")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div
        style={{ padding: "1.25rem 1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: color + "22", border: `1px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "0.75rem", color }}>{name[0]}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1rem", color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</p>
            {note && <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", color: "var(--text-sec)", marginTop: "1px" }}>{note}</p>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.2rem", color, letterSpacing: "-0.02em" }}>{fmt(amount)}</p>
          <span style={{ color: "var(--text-sec)", fontSize: "0.75rem", transition: "transform 0.2s", display: "block", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
        </div>
      </div>

      {open && transactions.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "0.75rem 1.5rem 1.25rem" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Transactions</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {transactions.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.45rem 0.75rem", borderRadius: "0.5rem", background: "var(--bg)" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.825rem", color: "var(--text)" }}>{t.label}</p>
                  <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.04em", marginTop: "1px" }}>{t.date}</p>
                </div>
                <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.8rem", fontWeight: 700, color: t.amount > 0 ? "#00F5FF" : "#FF3CAC", flexShrink: 0 }}>
                  {t.amount > 0 ? "+" : "−"}{fmt(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SettledCard({ name, note, gave, received, transactions }: { name: string; note: string; gave: number; received: number; transactions: { label: string; date: string; amount: number }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", overflow: "hidden", opacity: 0.7 }}>
      <div style={{ padding: "1.25rem 1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }} onClick={() => setOpen(o => !o)}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--chip-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "0.75rem", color: "var(--text-sec)" }}>{name[0]}</span>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{name}</p>
            {note && <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", color: "var(--text-sec)" }}>{note}</p>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "#4caf50", background: "#4caf5022", border: "1px solid #4caf5055", borderRadius: "999px", padding: "0.2rem 0.6rem", letterSpacing: "0.06em" }}>SETTLED</span>
          <span style={{ color: "var(--text-sec)", fontSize: "0.75rem", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "block", transition: "transform 0.2s" }}>▾</span>
        </div>
      </div>
      {open && transactions.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "0.75rem 1.5rem 1.25rem" }}>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "0.75rem" }}>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "#00F5FF", letterSpacing: "0.06em" }}>Gave: {fmt(gave)}</span>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "#FF3CAC", letterSpacing: "0.06em" }}>Received: {fmt(received)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {transactions.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.45rem 0.75rem", borderRadius: "0.5rem", background: "var(--bg)" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.825rem", color: "var(--text)" }}>{t.label}</p>
                  <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", marginTop: "1px" }}>{t.date}</p>
                </div>
                <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.8rem", fontWeight: 700, color: t.amount > 0 ? "#00F5FF" : "#FF3CAC", flexShrink: 0 }}>
                  {t.amount > 0 ? "+" : "−"}{fmt(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DebtPage() {
  const [tab, setTab] = useState<Tab>("owe");

  const totalOwe     = iOwe.reduce((s, d) => s + d.amount, 0);
  const totalCollect = owedToMe.reduce((s, d) => s + d.amount, 0);
  const net          = totalCollect - totalOwe;

  const tabStyle = (t: Tab): React.CSSProperties => ({
    fontFamily: "var(--font-space-mono)",
    fontSize: "0.65rem",
    letterSpacing: "0.08em",
    padding: "0.4rem 1rem",
    borderRadius: "999px",
    border: "1px solid",
    cursor: "none",
    transition: "all 0.2s",
    background: tab === t ? (t === "owe" ? "var(--pink)" : t === "collect" ? "var(--cyan)" : "var(--border)") : "transparent",
    color: tab === t ? (t === "settled" ? "var(--text)" : "#000") : "var(--text-sec)",
    borderColor: tab === t ? "transparent" : "var(--border)",
  });

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "820px", margin: "0 auto" }}>

      {/* Back */}
      <Link href="/me" style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
      >← Dashboard</Link>

      {/* Header */}
      <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Financial Tracker</p>
      <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "2.5rem" }}>Debt Overview</h1>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "You Owe",       value: fmt(totalOwe),     color: "#FF3CAC", sub: `${iOwe.length} people` },
          { label: "Owed to You",   value: fmt(totalCollect), color: "#00F5FF", sub: `${owedToMe.length} people` },
          { label: "Net Position",  value: fmt(Math.abs(net)), color: net >= 0 ? "#00F5FF" : "#FF3CAC", sub: net >= 0 ? "in your favour" : "you owe more" },
          { label: "Settled",       value: `${settled.length}`, color: "#4caf50", sub: "all cleared" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.25rem 1.5rem" }}>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{s.label}</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.6rem", color: s.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", marginTop: "0.3rem", letterSpacing: "0.04em" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <button style={tabStyle("owe")}     onClick={() => setTab("owe")}>I Owe ({iOwe.length})</button>
        <button style={tabStyle("collect")} onClick={() => setTab("collect")}>Owed to Me ({owedToMe.length})</button>
        <button style={tabStyle("settled")} onClick={() => setTab("settled")}>Settled ({settled.length})</button>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {tab === "owe" && iOwe.map((d) => <PersonCard key={d.name} {...d} />)}
        {tab === "collect" && owedToMe.map((d) => <PersonCard key={d.name} {...d} />)}
        {tab === "settled" && settled.map((d) => <SettledCard key={d.name} {...d} />)}
      </div>
    </div>
  );
}
