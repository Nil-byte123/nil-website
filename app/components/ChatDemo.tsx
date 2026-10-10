"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Branchen-Chat-Demo ──────────────────────────────────────────
   Echter KI-Assistent (GROQ via /api/chat). Antwortet sinnvoll und
   im Kontext des jeweiligen Betriebs. Fällt auf Skript-Antworten
   zurück, falls die KI gerade nicht erreichbar ist (z.B. kein Key).
   Umschaltbar zwischen Friseur, Handwerk und Restaurant.          */

type Regel = { keys: string[]; antwort: string };
type Branche = {
  id: string;
  tab: string;
  name: string;
  gruss: string;
  schnell: string[];
  regeln: Regel[];
  fallback: string;
  /* Kontext für die echte KI (/api/chat erwartet name/type/services) */
  ctx: { name: string; type: string; services: string[] };
};

const BRANCHEN: Branche[] = [
  {
    id: "friseur",
    tab: "💇 Friseur",
    name: "Salon Nova · Assistent",
    gruss: "Hey! 👋 Ich bin der Assistent von Salon Nova. Ich helfe dir bei Terminen, Preisen und Fragen rund um deinen Besuch.",
    schnell: ["Termin buchen", "Was kostet ein Haarschnitt?", "Öffnungszeiten"],
    regeln: [
      { keys: ["termin", "buchen", "appointment", "wann hättet", "frei"], antwort: "Klar! Für wann hättest du gern einen Termin? Diese Woche hätte ich z.B. Mittwoch 14:00 oder Donnerstag 16:30 frei. 💇" },
      { keys: ["kosten", "preis", "haarschnitt", "schneiden", "was kostet"], antwort: "Ein Haarschnitt startet bei 39 €, Waschen und Föhnen inklusive. Coloration ab 89 €. Möchtest du direkt einen Termin?" },
      { keys: ["färben", "color", "balayage", "strähnen"], antwort: "Coloration gibt's ab 89 €, Balayage ab 129 €. Unsere Color-Spezialisten beraten dich gern, soll ich einen Termin vormerken?" },
      { keys: ["öffnung", "geöffnet", "zeiten", "wann habt"], antwort: "Wir haben Di–Fr 9–19 Uhr und Sa 9–15 Uhr geöffnet. Montag ist Ruhetag. 🕘" },
      { keys: ["wo", "adresse", "anfahrt", "parken"], antwort: "Du findest uns in der Leopoldstraße 44, 80802 München. Parkplätze gibt's direkt gegenüber." },
    ],
    fallback: "Gute Frage! Das kläre ich kurz mit dem Team. Möchtest du, dass wir dich zurückrufen, oder direkt einen Termin buchen?",
    ctx: { name: "Salon Nova", type: "friseur", services: ["Haarschnitt", "Coloration", "Balayage", "Styling", "Pflege-Treatments"] },
  },
  {
    id: "handwerk",
    tab: "🔧 Handwerk",
    name: "Meister Vogt · Assistent",
    gruss: "Hallo! Ich bin der digitale Assistent von Meister Vogt (Sanitär & Heizung). Wie kann ich helfen?",
    schnell: ["Notdienst", "Angebot anfragen", "Welche Leistungen?"],
    regeln: [
      { keys: ["notdienst", "notfall", "dringend", "rohrbruch", "wasser läuft", "verstopf"], antwort: "Kein Problem, wir haben einen 24h-Notdienst. Unter 0821 98765 sind wir sofort erreichbar. Soll ich dir einen Rückruf in den nächsten 15 Minuten organisieren?" },
      { keys: ["angebot", "kosten", "preis", "was kostet", "kostenvoranschlag"], antwort: "Gern erstelle ich ein kostenloses Angebot. Beschreib mir kurz dein Anliegen (z.B. Bad sanieren, Heizung tauschen), dann melden wir uns innerhalb von 24 Std. mit einem Festpreis." },
      { keys: ["leistung", "was macht", "angebot", "bad", "heizung", "sanitär"], antwort: "Wir machen Sanitär, Heizung, Wärmepumpen und komplette Bad-Sanierungen, alles aus einer Hand als Meisterbetrieb." },
      { keys: ["termin", "wann", "kommen"], antwort: "Ich kann dir einen Termin vormerken. Diese Woche hätten wir Donnerstag oder Freitag Kapazität. Vormittags oder nachmittags?" },
    ],
    fallback: "Alles klar! Schildere mir dein Anliegen am besten in einem Satz, dann leite ich das direkt an Meister Vogt weiter.",
    ctx: { name: "Meister Vogt", type: "handwerk", services: ["Sanitär", "Heizung", "Wärmepumpen", "Bad-Sanierung", "24h-Notdienst"] },
  },
  {
    id: "restaurant",
    tab: "🍝 Restaurant",
    name: "Trattoria Bella · Assistent",
    gruss: "Buongiorno! 🍝 Ich bin der Assistent der Trattoria Bella. Ich helfe bei Reservierungen, der Karte und deinen Fragen.",
    schnell: ["Tisch reservieren", "Öffnungszeiten", "Habt ihr vegane Gerichte?"],
    regeln: [
      { keys: ["reservier", "tisch", "platz", "buchen"], antwort: "Sehr gern! Für wie viele Personen und wann? Heute Abend hätte ich um 19:30 noch einen schönen Tisch frei. 🍷" },
      { keys: ["öffnung", "geöffnet", "zeiten", "wann habt"], antwort: "Mo–Do 17–23 Uhr, Fr–Sa 12–24 Uhr, So 12–22 Uhr. Wir freuen uns auf dich!" },
      { keys: ["vegan", "vegetarisch", "glutenfrei", "allergie"], antwort: "Ja! Wir haben mehrere vegane und vegetarische Gerichte sowie glutenfreie Pasta. Unser Personal berät dich gern vor Ort." },
      { keys: ["karte", "speisekarte", "essen", "gericht", "pizza", "pasta"], antwort: "Beliebt sind unsere Tagliatelle al Tartufo (16,90 €) und die Pizza Margherita DOP (11,50 €). Soll ich einen Tisch für dich reservieren?" },
      { keys: ["liefer", "abhol", "to go"], antwort: "Zum Abholen gerne! Ruf uns einfach an unter 0821 123456, wir machen deine Bestellung in ca. 20 Minuten fertig." },
    ],
    fallback: "Gute Frage! Ruf uns gern an oder reservier direkt online, dann klären wir alles persönlich.",
    ctx: { name: "Trattoria Bella", type: "restaurant", services: ["Tischreservierung", "Speisekarte", "Abholung", "vegane & glutenfreie Gerichte"] },
  },
];

type Msg = { role: "user" | "bot"; text: string };

function antwortFinden(b: Branche, eingabe: string): string {
  const t = eingabe.toLowerCase();
  for (const r of b.regeln) {
    if (r.keys.some((k) => t.includes(k))) return r.antwort;
  }
  return b.fallback;
}

export function ChatDemo() {
  const [aktiv, setAktiv] = useState(0);
  const b = BRANCHEN[aktiv];
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: b.gruss }]);
  const [input, setInput] = useState("");
  const [tippt, setTippt] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Branche wechseln → Chat zurücksetzen
  function wechsle(i: number) {
    setAktiv(i);
    setMessages([{ role: "bot", text: BRANCHEN[i].gruss }]);
    setInput("");
    setTippt(false);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, tippt]);

  async function senden(text: string) {
    const t = text.trim();
    if (!t || tippt) return;
    const vorher = messages; // bisheriger Verlauf (vor dieser Nachricht)
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTippt(true);

    let antwort = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: t,
          history: vorher.slice(-8).map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.text,
          })),
          businessContext: b.ctx,
        }),
      });
      const data = await res.json();
      antwort = typeof data?.response === "string" ? data.response.trim() : "";
    } catch {
      antwort = "";
    }

    // Fallback auf Skript, falls KI nicht erreichbar oder leer antwortet
    const schwach =
      !antwort ||
      /nicht erreichbar|serverfehler|ungültige anfrage|zu große anfrage|zu viele anfragen/i.test(antwort);
    if (schwach) antwort = antwortFinden(b, t);

    setMessages((m) => [...m, { role: "bot", text: antwort }]);
    setTippt(false);
  }

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* Branchen-Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        {BRANCHEN.map((br, i) => (
          <button
            key={br.id}
            onClick={() => wechsle(i)}
            style={{
              background: i === aktiv ? "var(--accent)" : "var(--bg-soft)",
              color: i === aktiv ? "var(--accent-fg)" : "var(--fg-muted)",
              border: `1px solid ${i === aktiv ? "var(--accent)" : "var(--line)"}`,
              padding: "9px 16px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {br.tab}
          </button>
        ))}
      </div>

      {/* Chat-Fenster */}
      <div style={{ border: "1px solid var(--line)", background: "var(--bg-soft)", display: "flex", flexDirection: "column", height: "460px", overflow: "hidden" }}>
        {/* Kopf */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
          <span className="live-dot" aria-hidden="true" />
          <span style={{ fontSize: "13px", fontWeight: 700 }}>{b.name}</span>
          <span style={{ marginLeft: "auto", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-2)", border: "1px solid var(--line)", padding: "3px 8px" }}>
            Live Demo
          </span>
        </div>

        {/* Nachrichten */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "82%",
                padding: "11px 15px",
                fontSize: "14px",
                lineHeight: 1.55,
                background: m.role === "user" ? "var(--accent)" : "var(--bg-card)",
                color: m.role === "user" ? "var(--accent-fg)" : "var(--fg)",
                border: m.role === "user" ? "none" : "1px solid var(--line)",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.text}
            </div>
          ))}
          {tippt && (
            <div style={{ alignSelf: "flex-start", padding: "13px 16px", background: "var(--bg-card)", border: "1px solid var(--line)", display: "flex", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="tipp-punkt" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>

        {/* Schnell-Antworten */}
        <div style={{ display: "flex", gap: "8px", padding: "0 16px 12px", flexWrap: "wrap" }}>
          {b.schnell.map((s) => (
            <button
              key={s}
              onClick={() => senden(s)}
              disabled={tippt}
              style={{
                background: "transparent",
                border: "1px solid var(--line-strong)",
                color: "var(--fg-muted)",
                padding: "7px 12px",
                fontSize: "12px",
                cursor: tippt ? "default" : "pointer",
                fontFamily: "inherit",
                opacity: tippt ? 0.5 : 1,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Eingabe */}
        <form onSubmit={(e) => { e.preventDefault(); senden(input); }} style={{ display: "flex", gap: "10px", padding: "16px", borderTop: "1px solid var(--line)" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Schreib eine Nachricht…"
            aria-label="Nachricht an den Demo-Assistenten"
            maxLength={300}
            style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--line)", color: "var(--fg)", padding: "12px 14px", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
          />
          <button
            type="submit"
            disabled={tippt || !input.trim()}
            style={{ background: "var(--accent)", color: "var(--accent-fg)", border: "none", padding: "0 20px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", cursor: tippt || !input.trim() ? "default" : "pointer", opacity: tippt || !input.trim() ? 0.5 : 1 }}
          >
            Senden
          </button>
        </form>
      </div>
      <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "12px", textAlign: "center" }}>
        Echter KI-Assistent (Demo). Deinen eigenen bauen wir individuell für deinen Betrieb, mit deinen Daten und Abläufen.
      </p>
    </div>
  );
}
