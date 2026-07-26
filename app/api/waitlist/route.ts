import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  rateLimit, getIP, isValidEmail, isTempEmail,
  sanitizeText, fetchWithTimeout, keyFragment, normalizeEmailForKey, sanitizeLog, escapeHtml, sanitizeForEmailHeader,
} from "@/app/lib/rateLimit";

/* ---- Rate limits --------------------------------------------- */
const WL_LIMIT  = 3;
const WL_WINDOW = 60 * 60_000; // 3 signups per hour per IP

export async function POST(req: Request) {
  try {
    // 1. Per-IP rate limit
    const ip = getIP(req);
    if (!rateLimit(`waitlist:${ip}`, WL_LIMIT, WL_WINDOW)) {
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
    if (!rateLimit(`waitlist-email:${keyFragment(normalizeEmailForKey(email))}`, 3, 24 * 60 * 60_000)) {
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
      console.log("[Waitlist] Mailchimp not configured – email:", sanitizeLog(email));
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
          tags:          ["nil-waitlist"],
        }),
      },
      10_000
    );

    if (!response.ok) {
      const data = await response.json();
      if (data.title === "Member Exists") {
        return NextResponse.json({ success: true });
      }
      console.error("[Waitlist] Mailchimp error:", sanitizeLog(JSON.stringify(data)));
      return NextResponse.json({ error: data.detail ?? "Fehler" }, { status: 500 });
    }

    // 7. Send confirmation email to subscriber
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (smtpPassword) {
      try {
        const transporter = nodemailer.createTransport({
          host:   "smtp.strato.de",
          port:   465,
          secure: true,
          auth: {
            user: "info@nilogik.de",
            pass: smtpPassword,
          },
        });

        const safeEmail = escapeHtml(email);
        await transporter.sendMail({
          from:    '"NIL" <info@nilogik.de>',
          to:      sanitizeForEmailHeader(email),
          subject: "Du bist auf der NIL Warteliste!",
          text:    `Hey,\n\ndanke, dass du dich für NIL interessierst! Du stehst jetzt auf der Warteliste und erfährst als Erste:r, wenn der Drop live geht.\n\nStay tuned,\nNIL`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FAFAFA; padding: 32px;">
              <h1 style="font-weight: 900; letter-spacing: -0.08em; font-style: italic; margin-bottom: 24px;">NIL</h1>
              <h2 style="color: #FAFAFA;">Du bist auf der Warteliste!</h2>
              <p style="color: #A3A3A3; line-height: 1.7;">Hey,</p>
              <p style="color: #A3A3A3; line-height: 1.7;">danke, dass du dich für NIL interessierst! Du stehst jetzt auf der Warteliste und erfährst als Erste:r, wenn der Drop live geht.</p>
              <hr style="border: none; border-top: 1px solid #262626; margin: 24px 0;" />
              <p style="font-size: 12px; color: #6B6B6B;">
                Angemeldet mit: ${safeEmail}
              </p>
              <p style="font-size: 12px; color: #6B6B6B;">
                Stay tuned,<br/>
                <strong style="color: #FAFAFA;">NIL</strong>
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("[Waitlist] Email send failed:", sanitizeLog(String(emailError)));
        // Don't fail the request if email fails — subscription succeeded
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Waitlist] Server error:", sanitizeLog(String(error)));
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
