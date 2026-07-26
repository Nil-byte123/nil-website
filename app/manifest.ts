import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIL – KI- & Software-Lösungen",
    short_name: "NIL",
    description:
      "Maßgeschneiderte KI- und Software-Lösungen. Beschreib dein Problem, wir bauen die Lösung.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    orientation: "portrait-primary",
    categories: ["shopping", "lifestyle"],
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
