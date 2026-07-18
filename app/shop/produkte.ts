/* ─── Produktdaten für den ersten NIL Drop ───────────────────────
   Entspricht den bei Printful angelegten Produkten.
   Alle Texte zweisprachig: { de, en } – die Sprache richtet sich
   nach den Geräte-Einstellungen des Besuchers.                   */

export type Farbe = "Schwarz" | "Weiß";

export type Zweisprachig = { de: string; en: string };

export type Produkt = {
  slug: string;
  name: string;
  typ: string;
  preis: string;
  farben: Farbe[];
  groessen: string[];
  /* Wie das Teil produziert wird (Printful) */
  herstellung: Zweisprachig;
  beschreibung: Zweisprachig;
  details: Zweisprachig[];
  /* Statement-Kacheln in der Bildergalerie */
  statements: { titel: Zweisprachig; text: Zweisprachig }[];
  /* Erklärung, warum das Design so reduziert ist */
  philosophie: Zweisprachig;
  /* Maße des liegenden Produkts in cm (Quelle: Printful Size Guide) */
  masse?: {
    spalten: Zweisprachig[];
    zeilen: { groesse: string; werte: string[] }[];
  };
};

export const PRODUKTE: Produkt[] = [
  {
    slug: "hoodie",
    name: "Oversized Heavyweight Hoodie",
    typ: "Hoodie",
    preis: "€50",
    farben: ["Schwarz", "Weiß"],
    groessen: ["S", "M", "L", "XL", "2XL", "3XL"],
    herstellung: { de: "DTG-Druck", en: "DTG printing" },
    beschreibung: {
      de: "Schwerer Oversized-Hoodie mit Kapuze und Drop Shoulders. Dicker, weicher Stoff, klarer Schnitt und das NIL Logo dezent links auf der Brust. Keine großen Prints, kein Lärm.",
      en: "A heavy oversized hoodie with hood and drop shoulders. Thick, soft fabric, a clean cut and the NIL logo subtle on the left chest. No big prints, no noise.",
    },
    details: [
      {
        de: "Schwerer, dichter Stoff, fällt sauber und trägt sich warm",
        en: "Heavy, dense fabric that drapes clean and keeps you warm",
      },
      {
        de: "Oversized Fit mit Drop Shoulders",
        en: "Oversized fit with drop shoulders",
      },
      { de: "Kapuze mit Kordelzug", en: "Hood with drawstring" },
      {
        de: "NIL Logo klein links auf der Brust",
        en: "Small NIL logo on the left chest",
      },
      {
        de: "Rückseite ohne Print, bewusst clean",
        en: "Back left blank, deliberately clean",
      },
      { de: "Größen S bis 3XL", en: "Sizes S to 3XL" },
    ],
    statements: [
      {
        titel: { de: "Kein Print. Kein Lärm.", en: "No print. No noise." },
        text: {
          de: "Die Rückseite bleibt bewusst frei. Ein Logo reicht, der Rest ist Haltung.",
          en: "The back stays blank on purpose. One logo is enough. The rest is attitude.",
        },
      },
      {
        titel: {
          de: "Schwer. Sauber. Oversized.",
          en: "Heavy. Clean. Oversized.",
        },
        text: {
          de: "Dicker Stoff, klare Silhouette. Gemacht, um getragen zu werden. Nicht, um zu schreien.",
          en: "Thick fabric, a clear silhouette. Made to be worn. Not to shout.",
        },
      },
    ],
    philosophie: {
      de: "Die Rückseite bleibt frei, das Logo bleibt klein. Warum? Weil alles Überflüssige ablenkt. Du kaufst keinen Werbebanner. Du kaufst einen Hoodie, der ohne Effekte auskommt und genau deshalb auffällt.",
      en: "The back stays blank, the logo stays small. Why? Because everything unnecessary distracts. You're not buying a billboard. You're buying a hoodie that needs no effects and stands out exactly because of that.",
    },
    masse: {
      spalten: [
        { de: "Breite", en: "Width" },
        { de: "Länge", en: "Length" },
      ],
      zeilen: [
        { groesse: "S", werte: ["55", "71"] },
        { groesse: "M", werte: ["60", "72"] },
        { groesse: "L", werte: ["65", "75"] },
        { groesse: "XL", werte: ["70", "76"] },
        { groesse: "2XL", werte: ["75", "78"] },
        { groesse: "3XL", werte: ["80", "79"] },
      ],
    },
  },
  {
    slug: "t-shirt",
    name: "Organic Oversized High-Neck T-Shirt",
    typ: "T-Shirt",
    preis: "€30",
    farben: ["Schwarz", "Weiß"],
    groessen: ["S", "M", "L", "XL", "2XL"],
    herstellung: { de: "DTG-Druck", en: "DTG printing" },
    beschreibung: {
      de: "Oversized T-Shirt aus Bio-Baumwolle mit High Neck. Fällt locker, liegt nicht am Körper an. Das NIL Logo sitzt klein links auf der Brust.",
      en: "An oversized tee made from organic cotton with a high neck. Falls loose and doesn't cling. The NIL logo sits small on the left chest.",
    },
    details: [
      { de: "Bio-Baumwolle, dickes Jersey", en: "Organic cotton, thick jersey" },
      {
        de: "Oversized Fit mit High Neck",
        en: "Oversized fit with high neck",
      },
      {
        de: "NIL Logo klein links auf der Brust",
        en: "Small NIL logo on the left chest",
      },
      {
        de: "Rückseite ohne Print, bewusst clean",
        en: "Back left blank, deliberately clean",
      },
      { de: "Größen S bis 2XL", en: "Sizes S to 2XL" },
    ],
    statements: [
      {
        titel: {
          de: "Weniger ist das Statement.",
          en: "Less is the statement.",
        },
        text: {
          de: "Kein Druck auf dem Rücken, keine Grafik-Flut. Nur Bio-Baumwolle und ein Logo, das für sich steht.",
          en: "No back print, no graphic overload. Just organic cotton and a logo that stands on its own.",
        },
      },
      {
        titel: {
          de: "Oversized. Nicht beliebig.",
          en: "Oversized. Not random.",
        },
        text: {
          de: "Locker geschnitten, High Neck, dickes Jersey. Basics, die nicht langweilig sind.",
          en: "Loose cut, high neck, thick jersey. Basics that aren't boring.",
        },
      },
    ],
    philosophie: {
      de: "Kein Rückenprint, keine Grafik-Flut. Ein sauberes Shirt mit einem Logo, das für sich steht. Reduziert, damit du im Mittelpunkt bleibst, nicht der Aufdruck.",
      en: "No back print, no graphic overload. A clean shirt with a logo that stands on its own. Reduced, so you stay the focus, not the print.",
    },
    masse: {
      spalten: [
        { de: "Breite", en: "Width" },
        { de: "Länge", en: "Length" },
      ],
      zeilen: [
        { groesse: "S", werte: ["63", "73"] },
        { groesse: "M", werte: ["67", "75"] },
        { groesse: "L", werte: ["71", "77"] },
        { groesse: "XL", werte: ["76", "80"] },
        { groesse: "2XL", werte: ["81", "83"] },
      ],
    },
  },
  {
    slug: "cap",
    name: "Trucker Cap",
    typ: "Cap",
    preis: "€25",
    farben: ["Schwarz", "Weiß"],
    groessen: ["One Size"],
    herstellung: { de: "Stickerei", en: "embroidery" },
    beschreibung: {
      de: "Trucker Cap mit gesticktem NIL Logo vorne. Mesh-Rückseite, verstellbarer Verschluss. One Size, passt fast jedem.",
      en: "A trucker cap with an embroidered NIL logo on the front. Mesh back, adjustable closure. One size, fits almost everyone.",
    },
    details: [
      {
        de: "NIL Logo vorne gestickt (keine Folie, kein Druck)",
        en: "NIL logo embroidered on the front (no foil, no print)",
      },
      { de: "Mesh-Rückseite, atmungsaktiv", en: "Breathable mesh back" },
      {
        de: "Verstellbarer Snapback-Verschluss",
        en: "Adjustable snapback closure",
      },
      { de: "One Size", en: "One size" },
    ],
    statements: [
      {
        titel: { de: "Gestickt. Nicht gedruckt.", en: "Stitched. Not printed." },
        text: {
          de: "Das NIL Logo ist gestickt. Qualität, die man sieht und fühlt. Mehr braucht die Cap nicht.",
          en: "The NIL logo is embroidered. Quality you can see and feel. That's all this cap needs.",
        },
      },
    ],
    philosophie: {
      de: "Nur ein gesticktes Logo, sonst nichts. Stickerei statt Druck heißt: Qualität, die bleibt. Auch nach Jahren.",
      en: "Just one embroidered logo, nothing else. Embroidery instead of print means quality that lasts. For years.",
    },
  },
];

export function findeProdukt(slug: string): Produkt | undefined {
  return PRODUKTE.find((p) => p.slug === slug);
}
