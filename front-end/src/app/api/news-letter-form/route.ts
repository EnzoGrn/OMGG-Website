import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const NEXT_PUBLIC_STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const checkExisting = async (email: string, path: string) => {
    const url = new URL(`${STRAPI_URL}/api/${path}`);

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

export async function POST(req: NextRequest) {
    const body = await req.json();

    let url = new URL(`${STRAPI_URL}/api/${body.path}`);

    const existingDataId = await checkExisting(body.data.email, body.path);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (NEXT_PUBLIC_STRAPI_API_TOKEN)
        headers["Authorization"] = `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`;
    let method = 'POST';

    if (existingDataId != null) {
        method = 'PUT';

        url = new URL(`${STRAPI_URL}/api/${body.path}/${existingDataId}`);

        url.searchParams.set("[id]", existingDataId);
    }

    const response = await fetch(url.toString(), {
        method: method,
        body: JSON.stringify({
            data: body.data
        }),
        headers,
    });

    if (!response.ok)
        return NextResponse.json({ text: await response.text() }, { status: response.status });
    return NextResponse.json({ status: 200 });
}
