// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import type { MetadataRoute } from "next";

const locales      = ["fr", "en"];
const staticRoutes = ["/"]; // In future, add more static routes here (e.g., "/about", "/contact").

export default function sitemap(): MetadataRoute.Sitemap
{
  const baseUrl = "http://localhost:3000";

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "/" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
