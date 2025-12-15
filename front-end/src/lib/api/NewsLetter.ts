const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const NEXT_PUBLIC_STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const checkExisting = async (email: string) => {
    const url = new URL(`${STRAPI_URL}/api/news-letter-subscriptions`)

    url.searchParams.set("filters[email][$eq]", email);

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();

    return data.data.length > 0 ? data.data[0].documentId : null;
};

export const register = async (email: string, news = true, offers = true) => {
    let url = new URL(`${STRAPI_URL}/api/news-letter-subscriptions`);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (NEXT_PUBLIC_STRAPI_API_TOKEN)
        headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
    const existingDataId = await checkExisting(email);

    let method = 'POST';

    if (existingDataId) {
        method = 'PUT';

        url = new URL(`${STRAPI_URL}/api/news-letter-subscriptions/${existingDataId}`);

        url.searchParams.set("[id]", existingDataId);
    }

    try {
        const response = await fetch(url.toString(), {
            method,
            headers,
            body: JSON.stringify({
                data: {
                    email,
                    news,
                    offers
                }
            })
        });

        return response;
    } catch (error) {
        throw error;
    }
}
