"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Branchen-Chat-Demo ──────────────────────────────────────────
   Echter KI-Assistent (GROQ via /api/chat). Antwortet sinnvoll und
   im Kontext des jeweiligen Betriebs. Fällt auf Skript-Antworten
   zurück, falls die KI gerade nicht erreichbar ist (z.B. kein Key).
   Umschaltbar zwischen Friseur, Handwerk und Restaurant.
   Scrollt man hin, tippt die Demo von selbst eine Beispiel-Frage
   vor (rein lokal, ohne KI-Aufruf). Sobald der Besucher selbst
   klickt oder tippt, bricht die Vorführung ab.                     */

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
    tab: "Friseur",
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
    tab: "Handwerk",
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
    tab: "Restaurant",
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

function hatWort(t: string, keys: string[]): boolean {
  return keys.some((k) => t.includes(k));
}

/* Backup-Logik (nur aktiv, wenn die echte KI nicht erreichbar ist).
   Behandelt erst Smalltalk, dann branchenspezifische Fragen.      */
function antwortFinden(b: Branche, eingabe: string): string {
  const t = eingabe.toLowerCase().trim();

  // Begrüßung
  if (hatWort(t, ["hallo", "hallöchen", "hi ", "hey", "moin", "servus", "guten tag", "guten morgen", "guten abend", "grüß"]) || t === "hi") {
    return `Hallo! 😊 Schön, dass du da bist. Wie kann ich dir helfen? Du kannst mich zum Beispiel nach „${b.schnell[0]}" oder „${b.schnell[1]}" fragen.`;
  }
  // Wie geht's
  if (hatWort(t, ["wie geht", "wies läuft", "alles gut"])) {
    return "Mir geht's bestens, danke der Nachfrage! 😊 Und wie kann ich dir weiterhelfen?";
  }
  // Danke
  if (hatWort(t, ["danke", "dankeschön", "vielen dank", "merci", "thx", "thanks"])) {
    return "Sehr gern! 😊 Kann ich sonst noch etwas für dich tun?";
  }
  // Verabschiedung
  if (hatWort(t, ["tschüss", "tschau", "ciao", "bye", "wiedersehen", "bis dann", "bis bald"])) {
    return "Bis bald und einen schönen Tag! 👋";
  }
  // Zustimmung (kurz)
  if (["ja", "gerne", "gern", "ok", "okay", "passt", "klar", "jap", "jo"].includes(t)) {
    return "Super! Sag mir einfach kurz, worum es geht, dann kümmere ich mich direkt darum.";
  }

  // Branchenspezifisch
  for (const r of b.regeln) {
    if (hatWort(t, r.keys)) return r.antwort;
  }
  return b.fallback;
}

/* ─── Icons (schlanke Linien-SVGs statt Emojis) ───── */
function BrancheIcon({ id, size = 16 }: { id: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "friseur") {
    return (
      <svg {...p}>
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  }
  if (id === "handwerk") {
    return (
      <svg {...p}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }
  // restaurant
  return (
    <svg {...p}>
      <path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  );
}

export function ChatDemo() {
  const [aktiv, setAktiv] = useState(0);
  const b = BRANCHEN[aktiv];
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: b.gruss }]);
  const [input, setInput] = useState("");
  const [tippt, setTippt] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const interagiert = useRef(false);
  const autoLaeuft = useRef(false);

  // Besucher übernimmt: Vorführung sofort beenden und aufräumen
  function stoppeAuto() {
    interagiert.current = true;
    if (autoLaeuft.current) {
      autoLaeuft.current = false;
      setTippt(false);
      setInput("");
    }
  }

  // Automatische Vorführung beim ersten Hinscrollen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer: ReturnType<typeof setTimeout>[] = [];
    const nach = (ms: number, fn: () => void) =>
      timer.push(setTimeout(() => { if (!interagiert.current) fn(); }, ms));

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag.isIntersecting || interagiert.current) return;
        beobachter.disconnect();
        autoLaeuft.current = true;
        const br = BRANCHEN[0];
        const frage = br.schnell[0];
        let zeit = 700;
        // Frage Buchstabe für Buchstabe ins Eingabefeld tippen
        for (let i = 1; i <= frage.length; i++) {
          nach(zeit, () => setInput(frage.slice(0, i)));
          zeit += 55;
        }
        zeit += 450;
        nach(zeit, () => {
          setMessages((m) => [...m, { role: "user", text: frage }]);
          setInput("");
          setTippt(true);
        });
        zeit += 1400;
        nach(zeit, () => {
          setMessages((m) => [...m, { role: "bot", text: antwortFinden(br, frage) }]);
          setTippt(false);
          autoLaeuft.current = false;
        });
      },
      { threshold: 0.6 }
    );
    beobachter.observe(el);
    return () => {
      beobachter.disconnect();
      timer.forEach(clearTimeout);
    };
  }, []);

  // Branche wechseln → Chat zurücksetzen
  function wechsle(i: number) {
    stoppeAuto();
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
    const warAuto = autoLaeuft.current;
    stoppeAuto();
    if (!t || (tippt && !warAuto)) return;
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
    <div ref={wrapRef} style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* Branchen-Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {BRANCHEN.map((br, i) => {
          const an = i === aktiv;
          return (
            <button
              key={br.id}
              onClick={() => wechsle(i)}
              className={`chat-tab${an ? " is-active" : ""}`}
              style={{
                background: an ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg-soft)",
                color: an ? "#fff" : "var(--fg-muted)",
                border: `1px solid ${an ? "transparent" : "var(--line)"}`,
                boxShadow: an ? "0 8px 20px -6px rgba(31,109,255,0.6)" : "none",
              }}
            >
              <BrancheIcon id={br.id} />
              {br.tab}
            </button>
          );
        })}
      </div>

      {/* Chat-Fenster */}
      <div className="chat-window">
        {/* Kopf */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", borderBottom: "1px solid var(--line)", background: "rgba(120,170,255,0.03)" }}>
          <span className="chat-avatar" style={{ width: "40px", height: "40px" }}>
            <BrancheIcon id={b.id} size={20} />
          </span>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: "14px", fontWeight: 700 }}>{b.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "var(--fg-muted)" }}>
              <span className="live-dot" aria-hidden="true" />
              Antwortet in Sekunden
            </div>
          </div>
          <span style={{ marginLeft: "auto", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-2)", border: "1px solid var(--line-strong)", borderRadius: "999px", padding: "4px 10px" }}>
            Live Demo
          </span>
        </div>

        {/* Nachrichten */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {messages.map((m, i) => {
            const user = m.role === "user";
            return (
              <div key={i} className="chat-msg" style={{ display: "flex", gap: "8px", alignSelf: user ? "flex-end" : "flex-start", maxWidth: "86%", flexDirection: user ? "row-reverse" : "row" }}>
                {!user && (
                  <span className="chat-avatar" style={{ width: "28px", height: "28px", alignSelf: "flex-end" }}>
                    <BrancheIcon id={b.id} size={14} />
                  </span>
                )}
                <div
                  style={{
                    padding: "11px 15px",
                    fontSize: "14px",
                    lineHeight: 1.55,
                    background: user ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg-card)",
                    color: user ? "#fff" : "var(--fg)",
                    border: user ? "none" : "1px solid var(--line)",
                    borderRadius: user ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    boxShadow: user ? "0 8px 20px -8px rgba(31,109,255,0.5)" : "0 6px 16px -10px rgba(0,0,0,0.6)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          {tippt && (
            <div className="chat-msg" style={{ display: "flex", gap: "8px", alignSelf: "flex-start" }}>
              <span className="chat-avatar" style={{ width: "28px", height: "28px", alignSelf: "flex-end" }}>
                <BrancheIcon id={b.id} size={14} />
              </span>
              <div style={{ padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: "16px 16px 16px 4px", display: "flex", gap: "5px" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="tipp-punkt" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Schnell-Antworten */}
        <div style={{ display: "flex", gap: "8px", padding: "0 18px 14px", flexWrap: "wrap" }}>
          {b.schnell.map((s) => (
            <button key={s} onClick={() => senden(s)} disabled={tippt} className="chat-chip">
              {s}
            </button>
          ))}
        </div>

        {/* Eingabe */}
        <form onSubmit={(e) => { e.preventDefault(); senden(input); }} style={{ padding: "0 16px 16px" }}>
          <div className="chat-inputwrap">
            <input
              value={input}
              onChange={(e) => {
                stoppeAuto();
                setInput(e.target.value);
              }}
              onFocus={stoppeAuto}
              placeholder="Schreib eine Nachricht…"
              aria-label="Nachricht an den Demo-Assistenten"
              maxLength={300}
              style={{ flex: 1, background: "transparent", border: "none", color: "var(--fg)", padding: "8px 0", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
            />
            <button type="submit" disabled={tippt || !input.trim()} className="chat-send" aria-label="Senden">
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
      <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "14px", textAlign: "center", lineHeight: 1.6 }}>
        Echter smarter Assistent (Demo). Deinen eigenen bauen wir individuell für deinen Betrieb, mit deinen Daten und Abläufen.
      </p>
    </div>
  );
}
