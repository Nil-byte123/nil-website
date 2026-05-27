import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Ungültige E-Mail" }, { status: 400 });
    }

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_DC = process.env.MAILCHIMP_DC ?? "us1"; // e.g. "us1", "eu1"

    // If Mailchimp is not configured, still return success (dev mode)
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
      // 400 with "Member Exists" is acceptable
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
