"use client";

import { useState } from "react";
import { TEXTE, type Sprache } from "../i18n/texte";

export function WaitlistForm({ sprache = "de" }: { sprache?: Sprache }) {
  const t = TEXTE[sprache].wartelisteForm;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? t.fehler);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t.fehlerVerbindung);
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          border: "1px solid var(--line-strong)",
          padding: "24px 28px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {t.erfolgTitel}
        </p>
        <p style={{ color: "var(--fg-muted)", fontSize: "13px", marginTop: "8px" }}>
          {t.erfolgText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.platzhalter}
          aria-label="E-Mail-Adresse"
          style={{
            flex: "1 1 220px",
            background: "var(--bg-soft)",
            border: "1px solid var(--line)",
            color: "var(--fg)",
            padding: "14px 18px",
            fontSize: "15px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-solid"
          style={{
            background: "#FAFAFA",
            color: "#0A0A0A",
            border: "none",
            padding: "14px 28px",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: status === "loading" ? "wait" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? t.laden : t.knopf}
        </button>
      </div>
      {status === "error" && (
        <p style={{ color: "#F87171", fontSize: "13px", marginTop: "10px" }}>{errorMsg}</p>
      )}
      <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "12px", textAlign: "center" }}>
        {t.hinweis}
      </p>
    </form>
  );
}
