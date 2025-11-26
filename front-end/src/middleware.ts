import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export function middleware(req: NextRequest)
{
    // Get the locale form the url
    const { pathname } = req.nextUrl;
    const locale = routing.locales.find((l) => pathname.startsWith(`/${l}`)) || 'en';
    const res = NextResponse.next();

    // Set cookie if missing or different
    const cookieLocale = req.cookies.get('locale')?.value;
    if (cookieLocale !== locale) {
        res.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    }

    return res;
}

export default createMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "en"
});

export const config = {
    matcher: ["/", "/(fr|en)/:path*"]
};
