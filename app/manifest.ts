import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIL – Streetwear",
    short_name: "NIL",
    description:
      "NIL Streetwear aus Deutschland. Schwarz, weiß, reduziert. Bald verfügbar.",
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
        name: "Shop",
        url: "/shop",
        description: "Vorschau auf den ersten Drop",
      },
      {
        name: "Warteliste",
        url: "/#warteliste",
        description: "Auf die Warteliste eintragen",
      },
    ],
  };
}
