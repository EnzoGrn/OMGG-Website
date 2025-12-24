// region Utils

import { TIME_CONSIDERATE_AS_NEW } from "@/components/Games/GameStatus";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const NEXT_PUBLIC_STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

function getStrapiHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  return headers;
}

export function getMediaFromUrl(url: string) {
  return STRAPI_URL + url;
}

// endregion

// TODO: use the forceCache that is part of the SSR
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchDataSearchParams({ path, forceCache, searchParams, locale }: { path: string, forceCache: boolean, searchParams?: Record<string, string>, locale?: string }) {
  // Build the url to fetch
  const url = new URL(`${STRAPI_URL}/api/${path}`);

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add Bearer token if available
  if (NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  if (locale)
    url.searchParams.set("locale", locale);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    headers,
    // ISR (https://nextjs.org/docs/pages/guides/incremental-static-regeneration)
    // next: { revalidate: false}, // TODO: cache 3s
    // cache: (forceCache) ? 'force-cache' : 'default',
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data || null;
}

export async function fetchFromStrapi(path: string, forceCache: boolean, locale?: string, paginationSize?: number, paginationPage?: number, populateTarget?: string, populate?: string) {
  // Construct the url
  const url = new URL(`${STRAPI_URL}/api/${path}`);

  // Get the data with localization
  if (locale)
    url.searchParams.set("locale", locale);

  if (paginationSize)
    url.searchParams.set("pagination[pageSize]", String(paginationSize));

  if (paginationPage)
    url.searchParams.set("pagination[page]", String(paginationPage));

  if (populateTarget && populate)
    url.searchParams.set(populateTarget, populate);

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add Bearer token if available
  if (NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  // Fetch the data
  const res = await fetch(url.toString(), {
    headers,
    // ISR (https://nextjs.org/docs/pages/guides/incremental-static-regeneration)
    // next: { revalidate: false}, // TODO: cache 3s
    // cache: (forceCache) ? 'force-cache' : 'default',
  });

  // Check result of the fetch
  if (!res.ok) {
    // Or throw ???
    return null;
  }

  const { data } = await res.json();

  return data || null;
}

// region Games

/**
 * Fetch games from Strapi
 * @param locale - The locale to use for fetching
 * @param params - The parameters to use for fetching
 * @returns Array of game data (empty in case of error)
 */
export async function fetchGames(locale: string, params: Record<string, string>) {
  const url = new URL(`${STRAPI_URL}/api/games`);

  // Set locale
  url.searchParams.set("locale", locale);

  // Set populate params
  url.searchParams.set("populate[platforms][populate]", "icon");
  url.searchParams.set("populate[genrers][populate]", "localizations");
  url.searchParams.set("populate", "background");

  // Set params
  for (const [key, value] of Object.entries(params))
    url.searchParams.set(key, value);
  try {
    const res = await fetch(url.toString(), {
      headers: getStrapiHeaders()
    });

    if (!res.ok) {
      console.error(`Failed to fetch games: ${res.status} ${res.statusText}`);

      return [];
    }

    const { data } = await res.json();

    console.log(data);

    return data || [];
  } catch (error) {
    console.error("Error fetching games:", error);

    return [];
  }
}

/**
 * Fetch the latest games from Strapi
 * - Try new games first
 * - Then try coming soon games
 * - Then try old games
 * @param locale - The locale to use for fetching
 * @param limit - Number of games to fetch (default: 3)
 * @returns Array of game data (empty in case of error)
 */
export async function fetchLatestGames(locale: string, limit: number = 3) {
  const today = new Date();
  const newLimit = new Date();

  newLimit.setDate(today.getDate() - TIME_CONSIDERATE_AS_NEW);

  const todayStr = today.toISOString().split("T")[0];
  const newLimitStr = newLimit.toISOString().split("T")[0];

  const results: any[] = [];

  const newGames = await fetchGames(locale, {
    "filters[releaseDate][$gte]": newLimitStr,
    "filters[releaseDate][$lte]": todayStr,
    "pagination[pageSize]": String(limit),
    "sort[0]": "releaseDate:desc",
  });

  results.push(...newGames);

  if (results.length < limit) {
    const comingSoonGames = await fetchGames(locale, {
      "filters[releaseDate][$gt]": todayStr,
      "pagination[pageSize]": String(limit - results.length),
      "sort[0]": "releaseDate:asc",
    });

    const comingSoonNullGames = await fetchGames(locale, {
      "filters[releaseDate][$null]": "true",
      "pagination[pageSize]": String(limit - results.length),
      "sort[0]": "releaseDate:asc",
    });

    const comingAll = [...comingSoonGames, ...comingSoonNullGames];

    results.push(...comingAll.filter((game: any) => !results.find((result) => result.id === game.id)));
  }

  if (results.length < limit) {
    const oldGames = await fetchGames(locale, {
      "filters[releaseDate][$lt]": newLimitStr,
      "pagination[pageSize]": String(limit - results.length),
      "sort[0]": "releaseDate:desc",
    });

    results.push(...oldGames.filter((game: any) => !results.find((result) => result.id === game.id)));
  }

  return results.slice(0, limit);
}

/**
 * Fetch all games from Strapi
 * @param locale - The locale to use for fetching
 * @param pageSize - Number of games per page (default: 100)
 * @returns Array of all game data (empty in case of error)
 */
export async function fetchAllGames(locale: string, pageSize: number = 100) {
  const games = await fetchGames(locale, {
    "pagination[pageSize]": String(pageSize),
    "sort[0]": "createdAt:desc"
  });

  return games;
}

// endregion

// region FAQ

export async function fetchFAQ(locale: string) {
  const url = new URL(`${STRAPI_URL}/api/faq`);

  url.searchParams.set("locale", locale);
  url.searchParams.set("populate", "items");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (NEXT_PUBLIC_STRAPI_API_TOKEN)
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  try {
    const res = await fetch(url.toString(), {
      headers,
      // cache: 'force-cache', // TODO: Adjust cache strategy as needed
    });

    if (!res.ok) {
      console.error(`Failed to fetch FAQ: ${res.status} ${res.statusText}`);

      return null;
    }

    const { data } = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return null;
  }
}

// endregion
