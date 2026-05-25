"use client";

import Link from "next/link";

// ─── Replace with your real debt details ─────────────────────────────────────

const debts = [
  {
    name: "Student Loan",
    lender: "Government of Canada",
    total: 18000,
    remaining: 13400,
    monthlyPayment: 280,
    interestRate: 6.5,
    dueDate: "2029-08-01",
    color: "#7B61FF",
  },
  {
    name: "Credit Card",
    lender: "TD Bank",
    total: 3500,
    remaining: 2100,
    monthlyPayment: 150,
    interestRate: 19.99,
    dueDate: "2025-12-01",
    color: "#FF3CAC",
  },
  {
    name: "Personal Loan",
    lender: "Family",
    total: 5000,
    remaining: 3000,
    monthlyPayment: 200,
    interestRate: 0,
    dueDate: "2027-01-01",
    color: "#00F5FF",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

function monthsLeft(remaining: number, monthly: number) {
  if (monthly <= 0) return "—";
  const m = Math.ceil(remaining / monthly);
  if (m >= 12) return `~${Math.round(m / 12 * 10) / 10} yrs`;
  return `${m} mo`;
}

function payoffDate(remaining: number, monthly: number) {
  if (monthly <= 0) return "—";
  const months = Math.ceil(remaining / monthly);
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-CA", { month: "short", year: "numeric" });
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: "6px", background: "var(--border)", borderRadius: "999px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "999px", transition: "width 0.6s ease" }} />
    </div>
  );
}

export default function DebtPage() {
  const totalDebt      = debts.reduce((s, d) => s + d.total, 0);
  const totalRemaining = debts.reduce((s, d) => s + d.remaining, 0);
  const totalPaid      = totalDebt - totalRemaining;
  const totalMonthly   = debts.reduce((s, d) => s + d.monthlyPayment, 0);
  const overallPct     = Math.round((totalPaid / totalDebt) * 100);

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 1.5rem 4rem", maxWidth: "900px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <Link
          href="/me"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
        >
          ← Dashboard
        </Link>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          Financial Tracker
        </p>
        <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Debt Overview
        </h1>
      </div>

      {/* Summary card */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Total Remaining</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "var(--pink)", letterSpacing: "-0.02em" }}>{fmt(totalRemaining)}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Total Paid Off</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "var(--cyan)", letterSpacing: "-0.02em" }}>{fmt(totalPaid)}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Monthly Payments</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "var(--text)", letterSpacing: "-0.02em" }}>{fmt(totalMonthly)}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Overall Progress</p>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "2rem", color: "var(--text)", letterSpacing: "-0.02em" }}>{overallPct}%</p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.08em" }}>PAID {fmt(totalPaid)}</span>
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.08em" }}>LEFT {fmt(totalRemaining)}</span>
          </div>
          <ProgressBar pct={overallPct} color="var(--cyan)" />
        </div>
      </div>

      {/* Individual debts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {debts.map((debt) => {
          const paid = debt.total - debt.remaining;
          const pct  = Math.round((paid / debt.total) * 100);
          return (
            <div key={debt.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }}>

              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: debt.color, flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>{debt.name}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>{debt.lender}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "1.4rem", color: debt.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{fmt(debt.remaining)}</p>
                  <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>of {fmt(debt.total)} remaining</p>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>{pct}% paid off</span>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "var(--text-sec)", letterSpacing: "0.06em" }}>{fmt(paid)} paid</span>
                </div>
                <ProgressBar pct={pct} color={debt.color} />
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
                {[
                  { label: "Monthly", value: fmt(debt.monthlyPayment) },
                  { label: "Interest", value: debt.interestRate === 0 ? "0% (interest-free)" : `${debt.interestRate}% APR` },
                  { label: "Time Left", value: monthsLeft(debt.remaining, debt.monthlyPayment) },
                  { label: "Payoff By", value: payoffDate(debt.remaining, debt.monthlyPayment) },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.5rem", color: "var(--text-sec)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{stat.label}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem", color: "var(--text)", fontWeight: 500 }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
