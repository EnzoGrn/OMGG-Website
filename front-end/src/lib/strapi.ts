const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export function getMediaFromUrl(url: string)
{
    return STRAPI_URL + url;
}

export async function fetchDataSearchParams( {path, forceCache, searchParams, params, locale} : 
  {path: string, forceCache: boolean, searchParams?: string[], params?: string[], locale?: string})
{
  // Build the url to fetch
  const url = new URL(`${STRAPI_URL}/api/${path}`);

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add Bearer token if available
  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
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
      cache: (forceCache) ? 'force-cache' : 'default',
    });

  if (!res.ok) {
    console.error(`Strapi fetch error for ${path}:`, res.status);
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
    if (STRAPI_API_TOKEN) {
        headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    // Fetch the data
    const res = await fetch(url.toString(), {
        headers,
        // ISR (https://nextjs.org/docs/pages/guides/incremental-static-regeneration)
        // next: { revalidate: false}, // TODO: cache 3s
        cache: (forceCache) ? 'force-cache' : 'default',
    });

    // Check result of the fetch
    if (!res.ok) {
        // Or throw ???
        console.error(`Strapi fetch error for ${path}:`, res.status);
        return null;
    }

    const { data } = await res.json();
    return data || null;
}

