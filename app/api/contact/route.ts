import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit, getIP, escapeHtml, isValidEmail, sanitizeText } from "@/app/lib/rateLimit";

/* ─── Rate limit: 5 contact submissions per 10 minutes per IP ── */
const CONTACT_LIMIT  = 5;
const CONTACT_WINDOW = 10 * 60_000;

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──────────────────────────────────────────
    const ip = getIP(req);
    if (!rateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte warte kurz." },
        { status: 429 }
      );
    }

    // ── Parse body ─────────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const raw = body as Record<string, unknown>;

    // ── Sanitize & validate inputs ─────────────────────────────
    const name    = sanitizeText(raw.name,    100);
    const email   = sanitizeText(raw.email,   254);
    const message = sanitizeText(raw.message, 2000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    // ── Send email ─────────────────────────────────────────────
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpPassword) {
      console.log("Neue Kontaktanfrage:", { name, email, message });
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.strato.de",
      port: 465,
      secure: true,
      auth: {
        user: "info@nilogik.de",
        pass: smtpPassword,
      },
    });

    // Escape all user input before inserting into HTML
    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: `"NIL Website" <info@nilogik.de>`,
      to: "info@nilogik.de",
      replyTo: email,          // raw email is fine as replyTo – not HTML
      subject: `Neue Anfrage von ${safeName}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
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
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Fehler beim Senden. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
