import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich." }, { status: 400 });
    }

    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpPassword) {
      // Fallback: log to console if SMTP not configured
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

    await transporter.sendMail({
      from: `"NIL Website" <info@nilogik.de>`,
      to: "info@nilogik.de",
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 1px solid #E2E8F0; margin: 20px 0;" />
          <p><strong>Nachricht:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Fehler beim Senden. Bitte versuche es erneut." }, { status: 500 });
  }
}
