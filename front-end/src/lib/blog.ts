"use server";

import { BlogPostProps } from "@/components/Blog/Post/BlogPostInterface";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface FetchBlogParams {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
    locale: string;
}

export async function getBlogPosts({ page = 1, pageSize = 6, search, category, startDate, endDate, locale }: FetchBlogParams) {
    const url = new URL(`${STRAPI_URL}/api/articles`);

    url.searchParams.set("locale", locale);
    url.searchParams.set("pagination[page]", page.toString());
    url.searchParams.set("pagination[pageSize]", pageSize.toString());
    url.searchParams.set("populate", "*");
    url.searchParams.set("sort[0]", "publishedAt:desc");

    // Search filter
    if (search) {
        // Strapi doesn't support OR clean in query params easily for deep filtering, 
        // but usually we want to search in title OR description.
        // For simplicity with standard Strapi filters:
        // filters[$or][0][title][$containsi]=search
        // filters[$or][1][description][$containsi]=search
        url.searchParams.set("filters[$or][0][title][$containsi]", search);
        url.searchParams.set("filters[$or][1][description][$containsi]", search);
    }

    // Category filter
    if (category && category !== "all")
        url.searchParams.set("filters[category][name][$eq]", category);

    // Date filters
    if (startDate)
        url.searchParams.set("filters[publishedAt][$gte]", startDate.toISOString());

    if (endDate) {
        // Set end date to end of day if only date part is provided/logic
        // But here we receive Date objects which are likely set correctly if coming from the UI filter
        // Just in case, ensure we cover the whole end day if needed, but ISO string is exact.
        url.searchParams.set("filters[publishedAt][$lte]", endDate.toISOString());
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (STRAPI_TOKEN)
        headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    try {
        const res = await fetch(url.toString(), {
            headers,
            cache: 'no-store' // Ensure dynamic fetching
        });

        if (!res.ok)
            throw new Error(`Failed to fetch articles: ${res.status}`);
        const json = await res.json();

        return {
            data: json.data as BlogPostProps[],
            meta: json.meta
        };
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return { data: [], meta: null };
    }
}
