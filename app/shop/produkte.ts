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
  /* Statement-Kacheln in der Bildergalerie */
  statements: { titel: string; text: string }[];
  /* Erklärung, warum das Design so reduziert ist */
  philosophie: string;
};

export const PRODUKTE: Produkt[] = [
  {
    slug: "hoodie",
    name: "Oversized Heavyweight Hoodie",
    typ: "Hoodie",
    preis: "€49,90",
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
      "Rückseite ohne Print – bewusst clean",
      "Größen S bis 3XL",
    ],
    statements: [
      {
        titel: "Kein Print. Kein Lärm.",
        text: "Die Rückseite bleibt bewusst frei. Ein Logo reicht – der Rest ist Haltung.",
      },
      {
        titel: "Schwer. Sauber. Oversized.",
        text: "Dicker Stoff, klare Silhouette. Gemacht, um getragen zu werden – nicht, um zu schreien.",
      },
    ],
    philosophie:
      "Die Rückseite bleibt frei, das Logo bleibt klein. Warum? Weil alles Überflüssige ablenkt. Du kaufst keinen Werbebanner – du kaufst einen Hoodie, der ohne Effekte auskommt und genau deshalb auffällt.",
  },
  {
    slug: "t-shirt",
    name: "Organic Oversized High-Neck T-Shirt",
    typ: "T-Shirt",
    preis: "€27,90",
    farben: ["Schwarz", "Weiß"],
    groessen: ["S", "M", "L", "XL", "2XL"],
    herstellung: "DTG-Druck",
    beschreibung:
      "Oversized T-Shirt aus Bio-Baumwolle mit High Neck. Fällt locker, liegt nicht am Körper an – und das NIL Logo sitzt klein links auf der Brust.",
    details: [
      "Bio-Baumwolle, dickes Jersey",
      "Oversized Fit mit High Neck",
      "NIL Logo klein links auf der Brust",
      "Rückseite ohne Print – bewusst clean",
      "Größen S bis 2XL",
    ],
    statements: [
      {
        titel: "Weniger ist das Statement.",
        text: "Kein Druck auf dem Rücken, keine Grafik-Flut. Nur Bio-Baumwolle und ein Logo, das für sich steht.",
      },
      {
        titel: "Oversized. Nicht beliebig.",
        text: "Locker geschnitten, High Neck, dickes Jersey – Basics, die nicht langweilig sind.",
      },
    ],
    philosophie:
      "Kein Rückenprint, keine Grafik-Flut. Ein sauberes Shirt mit einem Logo, das für sich steht – reduziert, damit du im Mittelpunkt bleibst, nicht der Aufdruck.",
  },
  {
    slug: "cap",
    name: "Trucker Cap",
    typ: "Cap",
    preis: "€22,90",
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
    statements: [
      {
        titel: "Gestickt. Nicht gedruckt.",
        text: "Das NIL Logo ist gestickt – Qualität, die man sieht und fühlt. Mehr braucht die Cap nicht.",
      },
    ],
    philosophie:
      "Nur ein gesticktes Logo, sonst nichts. Stickerei statt Druck heißt: Qualität, die bleibt – auch nach Jahren.",
  },
];

export function findeProdukt(slug: string): Produkt | undefined {
  return PRODUKTE.find((p) => p.slug === slug);
}
