/* ─── Website-Vorlagen-Demos ──────────────────────────────────────
   Echte Beispiel-Websites, die NIL für verschiedene Branchen baut.
   Jede Vorlage hat eine eigene, in sich stimmige Optik (bewusst
   anders als die dunkle NIL-Seite) und ist unter /vorlagen/<slug>
   komplett anschaubar.                                             */

export type Demo = {
  slug: string;
  name: string; // Beispiel-Firmenname
  branche: string; // Branchen-Label für die Galerie
  beschreibung: string; // Ein-Satz-Beschreibung
  farben: string[]; // 3 Farben für die Vorschau-Kachel
};

export const DEMOS: Demo[] = [
  {
    slug: "restaurant",
    name: "Trattoria Bella",
    branche: "Restaurant & Café",
    beschreibung:
      "Warme, einladende Seite mit Speisekarte, Öffnungszeiten und Tischreservierung.",
    farben: ["#1B3A2F", "#C8622D", "#F3ECE1"],
  },
  {
    slug: "handwerk",
    name: "Meister Vogt",
    branche: "Handwerk & Betrieb",
    beschreibung:
      "Seriöse Seite für Handwerksbetriebe mit Leistungen, Referenzen und Angebots-Anfrage.",
    farben: ["#0F2A5C", "#FF7A00", "#FFFFFF"],
  },
  {
    slug: "salon",
    name: "Salon Nova",
    branche: "Friseur & Beauty",
    beschreibung:
      "Elegante, moderne Seite mit Services, Team und Online-Terminbuchung.",
    farben: ["#15121C", "#C9A24B", "#EDE6DC"],
  },
];

export function findeDemo(slug: string): Demo | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
