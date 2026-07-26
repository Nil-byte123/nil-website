import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIL – Automatisierung mit Verstand",
    short_name: "NIL",
    description:
      "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0F172A",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Kontakt",
        url: "/#kontakt",
        description: "Direkt Kontakt aufnehmen",
      },
      {
        name: "Preise",
        url: "/preise",
        description: "Unsere Pakete ansehen",
      },
    ],
  };
}
