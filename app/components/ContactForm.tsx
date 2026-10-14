"use client";

import { useState } from "react";
import { TEXTE, type Sprache } from "../i18n/texte";

export function ContactForm({ sprache = "de" }: { sprache?: Sprache }) {
  const t = TEXTE[sprache].kontaktForm;
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
        setErrorMsg(data.error ?? t.fehler);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t.fehlerVerbindung);
    }
  }

  if (status === "success") {
    return (
      <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
        <p className="h-karte">
          {t.erfolgTitel}
        </p>
        <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginTop: "10px" }}>
          {t.erfolgText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <label htmlFor="name" className="feld-label">{t.nameLabel}</label>
        <input
          id="name"
          type="text"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlatzhalter}
          className="feld"
        />
      </div>

      <div>
        <label htmlFor="email" className="feld-label">{t.emailLabel}</label>
        <input
          id="email"
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlatzhalter}
          className="feld"
        />
      </div>

      <div>
        <label htmlFor="message" className="feld-label">{t.nachrichtLabel}</label>
        <textarea
          id="message"
          required
          maxLength={2000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.nachrichtPlatzhalter}
          className="feld"
          style={{ resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#F87171", fontSize: "13px" }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary"
      >
        {status === "loading" ? t.laden : t.senden}
      </button>
    </form>
  );
}
