import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/* Vorschau-Bild beim Teilen (WhatsApp, Instagram, X, ...):
   NIL Logo auf Schwarz mit Coming-Soon-Zeile. */

export const runtime = "nodejs";
export const alt = "NIL – KI- und Software-Lösungen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), "public", "nil-logo-weiss.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080B14",
          gap: 48,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={268} alt="" />
        <div
          style={{
            color: "#5BB8FF",
            fontSize: 30,
            letterSpacing: 12,
            display: "flex",
          }}
        >
KI- & SOFTWARE-LÖSUNGEN
        </div>
      </div>
    ),
    size
  );
}
