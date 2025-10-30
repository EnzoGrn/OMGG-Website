const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchFromStrapi(path: string, locale?: string) {
    // Construct the url
    const url = new URL(`${STRAPI_URL}/api/${path}`);

    // Get the data with localization
    if (locale)
        url.searchParams.set("locale", locale);

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
        next: { revalidate: 3}, // TODO: cache 60s
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