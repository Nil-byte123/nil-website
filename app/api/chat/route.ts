import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIP, sanitizeText } from "@/app/lib/rateLimit";

/* ─── Rate limit config ──────────────────────────────────────── */
const CHAT_LIMIT    = 20;          // max requests per window
const CHAT_WINDOW   = 60_000;      // 1 minute
const MAX_MSG_LEN   = 600;         // max chars per user message
const MAX_HISTORY   = 20;          // max history messages forwarded to AI

/* ─── Knowledge per business type ───────────────────────────── */
const TYPE_KNOWLEDGE: Record<string, string> = {
  handwerk: `
BETRIEBSTYP: Handwerksbetrieb
TYPISCHE SERVICES: Sanitär, Heizung, Elektrik, Malerarbeiten, Bodenbeläge, Renovierungen, Reparaturen
TYPISCHE PREISE: Stundenlohn 65–120 €/Std., Anfahrtspauschale 20–40 €, Kostenvoranschläge meist kostenlos
BUCHUNGSPROZESS: Kunde beschreibt Problem → du nimmst Name und Telefonnummer auf → Team meldet sich zur Terminvereinbarung
HÄUFIGE FRAGEN: Notfalleinsatz, Kostenvoranschlag, Reaktionszeit, Materialkosten, Garantie auf Arbeit
VERHALTEN: Professionell, zuverlässig, technisch kompetent. Frag kurz nach dem Problem, dem Ort und ob es dringend ist.
EMOJIS: 🔧 🏠 🛠️ ⚡`,

  restaurant: `
BETRIEBSTYP: Restaurant / Gastronomie
TYPISCHE SERVICES: Tischreservierungen, Take-away, Catering für Events, Geburtstagsfeierlichkeiten, Mittagsmenü
TYPISCHE PREISE: Mittagsmenü 12–18 €, Abendessen Hauptspeise 18–32 €, Flasche Wein ab 22 €, Kindergerichte 7–12 €
RESERVIERUNGSPROZESS: Name, Datum, Uhrzeit, Personenanzahl aufnehmen – für Gruppen ab 8 Personen bitte frühzeitig anfragen
HÄUFIGE FRAGEN: Tischverfügbarkeit, Allergie-/Unverträglichkeitshinweise, Parkplätze, Speisekarte, private Events
VERHALTEN: Herzlich, einladend, gastfreundlich. Bestätige Reservierungswünsche direkt und leite sie weiter.
EMOJIS: 🍽️ 🍷 👨‍🍳 🥂`,

  friseur: `
BETRIEBSTYP: Friseursalon
TYPISCHE SERVICES & PREISE: Herrenhaarschnitt 25–40 €, Damenhaarschnitt 35–65 €, Färben (komplett) 65–120 €, Strähnen 80–160 €, Waschen & Föhnen 30–50 €, Haarbehandlung/Kur 35–70 €, Kinderhaarschnitt 18–28 €
TERMINPLANUNG: Termine dauern 30–90 Min. je nach Service, Online-Buchung oder telefonisch
BUCHUNGSPROZESS: Name, gewünschter Service, bevorzugter Termin aufnehmen
HÄUFIGE FRAGEN: Terminverfügbarkeit, Welcher Stylist, ob Färbung oder Schnitt bei nassen Haaren, Parken
VERHALTEN: Freundlich, modisch, ästhetisch bewusst. Berate bei Frisurstilen und Farben gerne kurz.
EMOJIS: ✂️ 💇 ✨ 💆`,

  kosmetik: `
BETRIEBSTYP: Kosmetikstudio / Beauty Salon
TYPISCHE SERVICES & PREISE: Klassische Gesichtsbehandlung 55–90 €, Mikrodermabrasion 80–120 €, Wimpernverlängerung 90–160 €, Maniküre 30–55 €, Pediküre 40–65 €, Ganzkörpermassage 60–95 €, Augenbrauen Shaping 25–40 €, Waxing (Beine) 35–60 €
TERMINPLANUNG: Behandlungen dauern 45–120 Min., Buchung über Telefon, Instagram DM oder direkt
BUCHUNGSPROZESS: Name, gewünschte Behandlung, Datum & Wunschuhrzeit aufnehmen
HÄUFIGE FRAGEN: Welche Behandlung bei Hautproblemen, Ersttermin, Kontraindikationen, Nachsorge, Geschenkgutscheine
VERHALTEN: Einfühlsam, professionell, ästhetisch orientiert. Empfehle passende Behandlungen je nach Kundenwunsch.
EMOJIS: 💄 💅 ✨ 🌸`,

  physio: `
BETRIEBSTYP: Physiotherapiepraxis
TYPISCHE SERVICES: Krankengymnastik (KG), Manuelle Therapie, Sportphysio, Massage, Lymphdrainage, Elektrotherapie, Hausbesuche, Rückenschule, Präventionskurse
PREISE: Kassenpatient mit ärztlicher Verordnung = Zuzahlung 10 % pro Einheit (i.d.R. 7–14 €), Privatpatient / Selbstzahler 65–120 € pro Einheit (45–60 Min.)
BUCHUNGSPROZESS: Erst fragen: Kassenpatient oder Privatpatient? Verordnung vorhanden? Dann Name, Telefon und gewünschten Termin aufnehmen.
HÄUFIGE FRAGEN: Wartezeit auf Termin, welche Beschwerden behandelt werden, Krankenkassenabrechnung, Parken, Hausbesuche möglich?
VERHALTEN: Fürsorglich, medizinisch kompetent, empathisch. Gib allgemeine Hinweise zu Beschwerden, aber rate immer zum Arztbesuch bei Unsicherheit.
EMOJIS: 💪 🩺 🏃 🧘`,

  dienstleistung: `
BETRIEBSTYP: Dienstleistungs- & Beratungsunternehmen
TYPISCHE SERVICES: Beratung, Planung, Konzepterstellung, Projektdurchführung je nach Fachbereich
PREISE: Erstgespräch (30 Min.) kostenlos, danach Stundenhonorar oder Projektpauschale nach individueller Absprache
BUCHUNGSPROZESS: Kostenloses Erstgespräch anbieten. Name, Telefon/E-Mail und kurze Beschreibung des Anliegens aufnehmen. Team meldet sich innerhalb von 24 h.
HÄUFIGE FRAGEN: Was kostet eine Erstberatung?, Wie läuft ein Projekt ab?, Wie lange dauert es?, Referenzen?
VERHALTEN: Professionell, lösungsorientiert, vertrauenswürdig. Qualifiziere Anfragen, zeige Kompetenz und leite weiter.
EMOJIS: 💼 📋 🤝 🎯`,
};

/* ─── Dynamic system prompt ──────────────────────────────────── */
interface BusinessContext {
  name: string;
  type: string;
  services?: string;
}

function buildSystemPrompt(ctx: BusinessContext): string {
  const knowledge = TYPE_KNOWLEDGE[ctx.type] ?? TYPE_KNOWLEDGE.dienstleistung;
  const servicesLine = ctx.services?.trim()
    ? `\nZUSÄTZLICHE INFOS VOM BETRIEB: ${ctx.services.trim()}`
    : "";

  return `Du bist der digitale KI-Assistent von "${ctx.name}". Du berätst Kunden freundlich, kurz und kompetent.

${knowledge}${servicesLine}

PFLICHTREGELN:
1. Antworte IMMER auf Deutsch, maximal 2–3 kurze Sätze – wie in einem echten Chat.
2. Beziehe dich immer auf "${ctx.name}" – du bist NICHT ein allgemeiner Assistent.
3. Bei Terminwünschen oder wenn Kontaktdaten nötig sind: frage nach Name und Telefonnummer, das Team meldet sich zurück.
4. Bei Preisfragen: nenne Richtwerte, weise kurz darauf hin dass der finale Preis je nach Aufwand variiert.
5. Nutze passende Emojis sparsam (1–2 pro Antwort) – nie übertreiben.
6. Sei direkt hilfreich. Kein Verweisen auf externe Quellen oder Google.
7. Wenn du etwas nicht weißt: "Das beantworte ich gerne direkt – hinterlasse mir kurz deinen Namen und deine Nummer, dann meldet sich jemand vom Team! 😊"`;
}

const FALLBACK_PROMPT = `Du bist ein freundlicher digitaler Assistent. Antworte kurz und hilfreich auf Deutsch. Maximal 2–3 Sätze pro Antwort.`;

/* ─── POST handler ───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──────────────────────────────────────────
    const ip = getIP(req);
    if (!rateLimit(`chat:${ip}`, CHAT_LIMIT, CHAT_WINDOW)) {
      return NextResponse.json(
        { response: "Zu viele Anfragen. Bitte warte kurz und versuche es erneut." },
        { status: 429 }
      );
    }

    // ── Parse & validate body ──────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ response: "Ungültige Anfrage." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ response: "Ungültige Anfrage." }, { status: 400 });
    }

    const { message, history, businessContext } = body as Record<string, unknown>;

    const cleanMessage = sanitizeText(message, MAX_MSG_LEN);
    if (!cleanMessage) {
      return NextResponse.json({ response: "Bitte senden Sie eine gültige Nachricht." }, { status: 400 });
    }

    // ── Validate & sanitize history ────────────────────────────
    const cleanHistory = Array.isArray(history)
      ? history
          .slice(-MAX_HISTORY)
          .filter((m): m is { role: string; content: string } =>
            m && typeof m === "object" && typeof m.role === "string" && typeof m.content === "string"
          )
          .map(m => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: sanitizeText(m.content, MAX_MSG_LEN),
          }))
          .filter(m => m.content.length > 0)
      : [];

    // ── Validate business context ──────────────────────────────
    const ctx = businessContext && typeof businessContext === "object"
      ? (businessContext as Record<string, unknown>)
      : null;

    const cleanCtx: BusinessContext | null =
      ctx && typeof ctx.name === "string" && typeof ctx.type === "string"
        ? {
            name:     sanitizeText(ctx.name,     80),
            type:     sanitizeText(ctx.type,     40),
            services: sanitizeText(ctx.services, 300),
          }
        : null;

    // ── API key check ──────────────────────────────────────────
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ response: "Ich bin gerade nicht erreichbar." });
    }

    const systemPrompt =
      cleanCtx?.name && cleanCtx?.type
        ? buildSystemPrompt(cleanCtx)
        : FALLBACK_PROMPT;

    const messagesForAI = [
      { role: "system", content: systemPrompt },
      ...cleanHistory,
      { role: "user", content: cleanMessage },
    ];

    // ── Call GROQ ──────────────────────────────────────────────
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
        messages: messagesForAI,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GROQ API error:", data);
      return NextResponse.json(
        { response: "Ich bin gerade nicht erreichbar. Bitte versuche es gleich nochmal!" },
        { status: 200 }
      );
    }

    const botReply =
      data?.choices?.[0]?.message?.content ??
      "Hallo! Ich bin dein digitaler Assistent. Wie kann ich dir heute helfen?";

    return NextResponse.json({ response: botReply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { response: "Verbindungsfehler. Bitte versuche es erneut." },
      { status: 200 }
    );
  }
}
