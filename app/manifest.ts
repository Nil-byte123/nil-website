import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIL – KI- & Software-Lösungen",
    short_name: "NIL",
    description:
      "Maßgeschneiderte KI- und Software-Lösungen. Beschreib dein Problem, wir bauen die Lösung.",
    start_url: "/",
    display: "standalone",
    background_color: "#080B14",
    theme_color: "#1F6DFF",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Leistungen",
        url: "/#leistungen",
        description: "Was NIL für dich bauen kann",
      },
      {
        name: "Termin buchen",
        url: "/kontakt",
        description: "Kostenloses Erstgespräch",
      },
    ],
  };
}
