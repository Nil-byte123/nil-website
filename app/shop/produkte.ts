/* ─── Produktdaten für den ersten NIL Drop ───────────────────────
   Entspricht den bei Printful angelegten Produkten.
   Echte Mockup-Fotos kommen später nach /public/produkte/ –
   bis dahin rendert ProduktBild eine saubere Platzhalter-Ansicht. */

export type Farbe = "Schwarz" | "Weiß";

export type Produkt = {
  slug: string;
  name: string;
  typ: string;
  preis: string;
  farben: Farbe[];
  groessen: string[];
  /* Wie das Teil produziert wird (Printful) */
  herstellung: string;
  beschreibung: string;
  details: string[];
};

export const PRODUKTE: Produkt[] = [
  {
    slug: "hoodie",
    name: "Oversized Heavyweight Hoodie",
    typ: "Hoodie",
    preis: "€38",
    farben: ["Schwarz", "Weiß"],
    groessen: ["S", "M", "L", "XL", "2XL", "3XL"],
    herstellung: "DTG-Druck",
    beschreibung:
      "Schwerer Oversized-Hoodie mit Kapuze und Drop Shoulders. Dicker, weicher Stoff, klarer Schnitt – und das NIL Logo dezent links auf der Brust. Keine großen Prints, kein Lärm.",
    details: [
      "Schwerer, dichter Stoff – fällt sauber, trägt sich warm",
      "Oversized Fit mit Drop Shoulders",
      "Kapuze mit Kordelzug",
      "NIL Logo klein links auf der Brust",
      "Größen S bis 3XL",
    ],
  },
  {
    slug: "t-shirt",
    name: "Organic Oversized High-Neck T-Shirt",
    typ: "T-Shirt",
    preis: "€20",
    farben: ["Schwarz", "Weiß"],
    groessen: ["S", "M", "L", "XL", "2XL"],
    herstellung: "DTG-Druck",
    beschreibung:
      "Oversized T-Shirt aus Bio-Baumwolle mit High Neck. Fällt locker, liegt nicht am Körper an – und das NIL Logo sitzt klein links auf der Brust.",
    details: [
      "Bio-Baumwolle, dickes Jersey",
      "Oversized Fit mit High Neck",
      "NIL Logo klein links auf der Brust",
      "Größen S bis 2XL",
    ],
  },
  {
    slug: "cap",
    name: "Trucker Cap",
    typ: "Cap",
    preis: "€18",
    farben: ["Schwarz", "Weiß"],
    groessen: ["One Size"],
    herstellung: "Stickerei",
    beschreibung:
      "Trucker Cap mit gesticktem NIL Logo vorne. Mesh-Rückseite, verstellbarer Verschluss – One Size, passt fast jedem.",
    details: [
      "NIL Logo vorne gestickt (keine Folie, kein Druck)",
      "Mesh-Rückseite, atmungsaktiv",
      "Verstellbarer Snapback-Verschluss",
      "One Size",
    ],
  },
];

export function findeProdukt(slug: string): Produkt | undefined {
  return PRODUKTE.find((p) => p.slug === slug);
}
