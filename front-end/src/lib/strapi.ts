const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const NEXT_PUBLIC_STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export function getMediaFromUrl(url: string) {
  return STRAPI_URL + url;
}

// TODO: use the forceCache that is part of the SSR
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchDataSearchParams({ path, forceCache, searchParams, params, locale }:
  { path: string, forceCache: boolean, searchParams?: string[], params?: string[], locale?: string }) {
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

  if (searchParams && params) {
    searchParams.forEach((element, index) => {
      if (params[index])
        url.searchParams.set(element, params[index]);
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

export async function fetchFromStrapi(path: string, forceCache: boolean, locale?: string,
  paginationSize?: number, paginationPage?: number, populateTarget?: string, populate?: string) {
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

/**
 * Fetch the latest games from Strapi
 * @param locale - The locale to use for fetching
 * @param limit - Number of games to fetch (default: 3)
 * @returns Array of game data or null
 */
export async function fetchLatestGames(locale: string, limit: number = 3) {
  const url = new URL(`${STRAPI_URL}/api/games`);

  // Set locale
  url.searchParams.set("locale", locale);

  // Limit the number of results
  url.searchParams.set("pagination[pageSize]", String(limit));

  // Sort by creation date (descending - newest first)
  url.searchParams.set("sort[0]", "createdAt:desc");

  // Populate necessary fields
  url.searchParams.set("populate[platforms][populate]", "icon");
  url.searchParams.set("populate[genrers][populate]", "localizations");
  url.searchParams.set("populate", "background");

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      // cache: 'force-cache', // TODO: Adjust cache strategy as needed
    });

    if (!res.ok) {
      console.error(`Failed to fetch latest games: ${res.status} ${res.statusText}`);

      return null;
    }

    const { data } = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching latest games:", error);

    return null;
  }
}

/**
 * Fetch all games from Strapi
 * @param locale - The locale to use for fetching
 * @param pageSize - Number of games per page (default: 100)
 * @returns Array of all game data or null
 */
export async function fetchAllGames(locale: string, pageSize: number = 100) {
  const url = new URL(`${STRAPI_URL}/api/games`);

  // Set locale
  url.searchParams.set("locale", locale);

  // Set pagination
  url.searchParams.set("pagination[pageSize]", String(pageSize));

  // Sort by creation date (descending - newest first)
  url.searchParams.set("sort[0]", "createdAt:desc");

  // Populate necessary fields
  url.searchParams.set("populate[platforms][populate]", "icon");
  url.searchParams.set("populate[genrers][populate]", "localizations");
  url.searchParams.set("populate", "background");

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      // cache: 'force-cache', // TODO: Adjust cache strategy as needed
    });

    if (!res.ok) {
      console.error(`Failed to fetch all games: ${res.status} ${res.statusText}`);

      return null;
    }

    const { data } = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching all games:", error);
    return null;
  }
}

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
