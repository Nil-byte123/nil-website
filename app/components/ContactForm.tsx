"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-soft)",
  border: "1px solid var(--line)",
  color: "var(--fg)",
  padding: "14px 18px",
  fontSize: "15px",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--fg-muted)",
  marginBottom: "8px",
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Etwas ist schiefgelaufen. Versuch es nochmal.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Verbindungsfehler. Versuch es nochmal.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ border: "1px solid var(--line-strong)", padding: "32px", textAlign: "center" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Nachricht gesendet ✓
        </p>
        <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginTop: "10px" }}>
          Danke! Wir melden uns so schnell wie möglich bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          id="name"
          type="text"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dein Name"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>E-Mail</label>
        <input
          id="email"
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="deine@email.de"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Nachricht</label>
        <textarea
          id="message"
          required
          maxLength={2000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Worum geht's?"
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#F87171", fontSize: "13px" }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-solid"
        style={{
          background: "#FAFAFA",
          color: "#0A0A0A",
          border: "none",
          padding: "16px 32px",
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: status === "loading" ? "wait" : "pointer",
          opacity: status === "loading" ? 0.7 : 1,
        }}
      >
        {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
      </button>
    </form>
  );
}
