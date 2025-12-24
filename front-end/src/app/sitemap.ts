// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import { fetchDataSearchParams } from "@/lib/strapi";
import type { MetadataRoute } from "next";

const locales = ["fr", "en"];
const staticRoutes = ["/", "/games", "/contact", "/submit", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

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

    const gamesRes = await fetchDataSearchParams({ path: "games", forceCache: true, locale });

    if (gamesRes?.data) {
      for (const game of gamesRes.data) {
        entries.push({
          url: `${baseUrl}/${locale}/games/${game.slug}`,
          lastModified: new Date(game.updatedAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }

    const blogRes = await fetchDataSearchParams({ path: "articles", forceCache: true, locale });

    if (blogRes?.data) {
      for (const blog of blogRes.data) {
        entries.push({
          url: `${baseUrl}/${locale}/blog/${blog.slug}`,
          lastModified: new Date(blog.updatedAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
