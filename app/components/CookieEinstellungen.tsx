"use client";

import { EINSTELLUNGEN_EVENT } from "./einwilligung";

/* Öffnet den Cookie-Banner erneut, damit Besucher ihre Wahl ändern
   oder eine Einwilligung widerrufen können.                        */
export function CookieEinstellungen({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="foot-link"
      onClick={() => window.dispatchEvent(new Event(EINSTELLUNGEN_EVENT))}
      style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer", textAlign: "left" }}
    >
      {label}
    </button>
  );
}
