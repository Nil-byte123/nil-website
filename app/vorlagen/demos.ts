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
  {
    slug: "fitness",
    name: "PULSE Gym",
    branche: "Fitness & Sport",
    beschreibung:
      "Energiegeladene Seite mit Kursplan, Mitgliedschaften und Probetraining.",
    farben: ["#0C0F10", "#C6FF2E", "#1A1F22"],
  },
  {
    slug: "immobilien",
    name: "Vonberg Immobilien",
    branche: "Immobilien & Makler",
    beschreibung:
      "Hochwertige Seite mit Objekt-Highlights, Bewertung und Kontaktanfrage.",
    farben: ["#0E1C2B", "#B38B4D", "#F4F1EC"],
  },
  {
    slug: "zahnarzt",
    name: "Dental Carré",
    branche: "Praxis & Gesundheit",
    beschreibung:
      "Ruhige, vertrauensvolle Seite mit Leistungen, Team und Online-Termin.",
    farben: ["#0B3A3A", "#4FD1C5", "#F2F8F7"],
  },
];

export function findeDemo(slug: string): Demo | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
