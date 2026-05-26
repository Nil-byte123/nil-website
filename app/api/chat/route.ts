import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Du bist 'NIL', der schlaue, digitale Salon-Assistent. Deine Aufgabe ist es, Kunden von Friseursalons freundlich, charmant und professionell zu beraten.

Da du als Vorführmodell für verschiedene Salons dienst, antwortest du bei spezifischen Fragen zu Preisen, Adressen oder Öffnungszeiten wie folgt:
1. Sei extrem höflich und begrüße den Kunden im Namen des Salons.
2. Sag dem Kunden, dass du allgemeine Fragen zu Services (wie Schneiden, Färben, Stylen) gerne beantwortest.
3. Wenn der Kunde einen Termin vereinbaren möchte oder spezifische Preise/Öffnungszeiten wissen will, sagst du: "Da ich aktuell als digitaler Assistent eingerichtet werde, hinterlassen Sie mir gerne Ihren Namen und Ihre Telefonnummer, damit das Team Sie für die Terminabsprache direkt zurückrufen kann!"

Halte deine Antworten kurz und knackig, maximal 2-3 Sätze, genau wie in einem echten Chat. Verwende passende Emojis (✂️, 💇, ✨).`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json({ response: "Bitte senden Sie eine gültige Nachricht." });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ response: "API-Schlüssel nicht konfiguriert." }, { status: 500 });
    }

    // Build message history (OpenAI-compatible format)
    const messagesForAI = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(Array.isArray(history)
        ? history
            .filter((m: { role: string; content: string }) => m.content?.trim())
            .map((m: { role: string; content: string }) => ({
              role: m.role === "bot" ? "assistant" : m.role,
              content: m.content,
            }))
        : []),
      { role: "user", content: message },
    ];

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
        { response: "Es tut mir leid, ich bin gerade nicht erreichbar. Bitte versuche es gleich nochmal! ✂️" },
        { status: 200 }
      );
    }

    const botReply =
      data?.choices?.[0]?.message?.content ??
      "Hallo! Ich bin NIL, dein digitaler Salon-Assistent. Wie kann ich dir heute helfen? ✂️";

    return NextResponse.json({ response: botReply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { response: "Verbindungsfehler. Bitte versuche es erneut. ✂️" },
      { status: 200 }
    );
  }
}
