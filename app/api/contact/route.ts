import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  rateLimit, getIP, escapeHtml, isValidEmail,
  sanitizeText, isValidName, keyFragment, normalizeEmailForKey, sanitizeLog,
  sanitizeForEmailHeader,
} from "@/app/lib/rateLimit";

/* ---- Rate limits --------------------------------------------- */
const CONTACT_LIMIT  = 3;
const CONTACT_WINDOW = 15 * 60_000; // 3 submissions per 15 minutes per IP

export async function POST(req: NextRequest) {
  try {
    // 1. Per-IP rate limit
    const ip = getIP(req);
    if (!rateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte warte kurz." },
        { status: 429 }
      );
    }

    // 2. Parse body — explicit size cap (chunked-transfer bypass fix)
    let body: unknown;
    try {
      const raw = await req.text();
      if (raw.length > 16_000) {
        return NextResponse.json({ error: "Anfrage zu groß." }, { status: 413 });
      }
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const raw = body as Record<string, unknown>;

    // 3. Sanitize & validate inputs
    const name    = sanitizeText(raw.name,    100);
    const email   = sanitizeText(raw.email,   254);
    const message = sanitizeText(raw.message, 2000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    // 4. Name validation — reject HTML / code injection attempts
    if (!isValidName(name)) {
      return NextResponse.json(
        { error: "Bitte gib einen gültigen Namen ein." },
        { status: 400 }
      );
    }

    // 5. Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    // 6. Per-email rate limit (3 per hour regardless of IP)
    //    normalizeEmailForKey() prevents plus-addressing and fullwidth bypasses
    if (!rateLimit(`contact-email:${keyFragment(normalizeEmailForKey(email))}`, 3, 60 * 60_000)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte warte kurz." },
        { status: 429 }
      );
    }

    // 7. Send email
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpPassword) {
      // Dev mode: log only (sanitised to prevent log injection)
      console.log("Neue Kontaktanfrage:", {
        name:    sanitizeLog(name),
        email:   sanitizeLog(email),
        message: sanitizeLog(message),
      });
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host:   "smtp.strato.de",
      port:   465,
      secure: true,
      auth: {
        user: "info@nilogik.de",
        pass: smtpPassword,
      },
    });

    // HTML-escape all user input before inserting into email body
    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from:    '"NIL Website" <info@nilogik.de>',
      to:      "info@nilogik.de",
      replyTo: sanitizeForEmailHeader(email), // CRLF stripped — prevents header injection
      subject: `Neue Anfrage von ${sanitizeForEmailHeader(safeName)}`,
      text:    `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr style="border: 1px solid #E2E8F0; margin: 20px 0;" />
          <p><strong>Nachricht:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", sanitizeLog(String(error)));
    return NextResponse.json(
      { error: "Fehler beim Senden. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
