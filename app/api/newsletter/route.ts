import { NextResponse } from "next/server";
import {
  rateLimit, getIP, isValidEmail, isTempEmail,
  sanitizeText, fetchWithTimeout, keyFragment, normalizeEmailForKey, sanitizeLog,
} from "@/app/lib/rateLimit";

/* ---- Rate limits --------------------------------------------- */
const NL_LIMIT  = 3;
const NL_WINDOW = 60 * 60_000; // 3 signups per hour per IP

export async function POST(req: Request) {
  try {
    // 1. Per-IP rate limit
    const ip = getIP(req);
    if (!rateLimit(`newsletter:${ip}`, NL_LIMIT, NL_WINDOW)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    // 2. Parse & validate body — explicit size cap (chunked-transfer bypass fix)
    let body: unknown;
    try {
      const raw = await req.text();
      if (raw.length > 4_000) {
        return NextResponse.json({ error: "Anfrage zu groß." }, { status: 413 });
      }
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const raw   = body as Record<string, unknown>;
    const email = sanitizeText(raw.email, 254);

    // 3. Email format validation
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    // 4. Block throwaway / temp-mail providers
    if (isTempEmail(email)) {
      // Return success so bots don't learn the domain list,
      // but don't actually call Mailchimp
      return NextResponse.json({ success: true });
    }

    // 5. Per-email rate limit (3 per day regardless of IP)
    //    Key uses normalizeEmailForKey() to prevent plus-addressing and
    //    fullwidth-Unicode bypasses (user+1@gmail.com == user@gmail.com here)
    if (!rateLimit(`newsletter-email:${keyFragment(normalizeEmailForKey(email))}`, 3, 24 * 60 * 60_000)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    // 6. Send to Mailchimp
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_DC      = process.env.MAILCHIMP_DC ?? "us1";

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      console.log("[Newsletter] Mailchimp not configured – email:", sanitizeLog(email));
      return NextResponse.json({ success: true });
    }

    const response = await fetchWithTimeout(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method:  "POST",
        headers: {
          Authorization:  `apikey ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status:        "subscribed",
          tags:          ["nilogik.de"],
        }),
      },
      10_000
    );

    if (!response.ok) {
      const data = await response.json();
      if (data.title === "Member Exists") {
        return NextResponse.json({ success: true });
      }
      console.error("[Newsletter] Mailchimp error:", sanitizeLog(JSON.stringify(data)));
      return NextResponse.json({ error: data.detail ?? "Fehler" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Newsletter] Server error:", sanitizeLog(String(error)));
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
