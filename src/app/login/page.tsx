"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const next = searchParams.get("next") || "/me";
        router.push(next);
      } else {
        const data = await res.json();
        setError(data.error || "Wrong username or password.");
        setPassword("");
        passwordRef.current?.focus();
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    background: "var(--bg)",
    border: `1px solid ${hasError ? "var(--pink)" : "var(--border)"}`,
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    color: "var(--text)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    cursor: "text",
    width: "100%",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-mono)",
    fontSize: "0.65rem",
    color: "var(--text-sec)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="username" style={labelStyle}>Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          autoComplete="username"
          placeholder="sazan"
          style={fieldStyle(!!error)}
          onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "var(--cyan)"; }}
          onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "var(--border)"; }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="password" style={labelStyle}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            ref={passwordRef}
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="••••••••"
            style={{ ...fieldStyle(!!error), paddingRight: "2.75rem" }}
            onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "var(--cyan)"; }}
            onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "var(--border)"; }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "var(--text-sec)",
              cursor: "none",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {error && (
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--pink)", letterSpacing: "0.04em" }}>
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !username || !password}
        style={{
          background: loading || !username || !password ? "var(--border)" : "var(--cyan)",
          color: loading || !username || !password ? "var(--text-sec)" : "#000",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          fontFamily: "var(--font-space-mono)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: loading || !username || !password ? "not-allowed" : "none",
          transition: "background 0.2s, color 0.2s",
        }}
      >
        {loading ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--bg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: "0.35rem",
            }}
          >
            YOGI<span style={{ color: "var(--cyan)" }}>.</span>
          </div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Private Area
          </p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
