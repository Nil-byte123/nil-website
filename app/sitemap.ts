import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.nilogik.de",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.nilogik.de/shop",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.nilogik.de/ueber-uns",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.nilogik.de/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.nilogik.de/kontakt",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.nilogik.de/impressum",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.nilogik.de/datenschutz",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
