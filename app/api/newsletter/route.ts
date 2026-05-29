import { NextResponse } from "next/server";
import { rateLimit, getIP, isValidEmail, sanitizeText } from "@/app/lib/rateLimit";

/* ─── Rate limit: 3 newsletter signups per hour per IP ───────── */
const NL_LIMIT  = 3;
const NL_WINDOW = 60 * 60_000;

export async function POST(req: Request) {
  try {
    // ── Rate limiting ──────────────────────────────────────────
    const ip = getIP(req);
    if (!rateLimit(`newsletter:${ip}`, NL_LIMIT, NL_WINDOW)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    // ── Parse & validate ───────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const raw   = body as Record<string, unknown>;
    const email = sanitizeText(raw.email, 254);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 });
    }

    // ── Send to Mailchimp ──────────────────────────────────────
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_DC      = process.env.MAILCHIMP_DC ?? "us1";

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      console.log("[Newsletter] Mailchimp not configured – email:", email);
      return NextResponse.json({ success: true });
    }

    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          tags: ["nilogik.de"],
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      if (data.title === "Member Exists") {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: data.detail ?? "Fehler" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
