import { headers } from "next/headers";
import type { Sprache } from "./texte";

/* Liest die bevorzugte Sprache aus den Geräte-Einstellungen des
   Besuchers (Accept-Language-Header des Browsers/Handys).
   Deutsch → deutsche Seite, alles andere → englische Seite.     */
export async function ermittleSprache(): Promise<Sprache> {
  const kopf = await headers();
  const akzeptiert = kopf.get("accept-language");
  if (!akzeptiert) return "de";
  const erste = akzeptiert.split(",")[0]?.trim().toLowerCase() ?? "";
  return erste.startsWith("de") ? "de" : "en";
}
