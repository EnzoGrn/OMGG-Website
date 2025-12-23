'use server'
import { fetchDataSearchParams } from "@/lib/strapi";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

interface NonPopulatedArticleProps {
  slug: string;
}

export async function generateStaticParams({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  const articlesRes = await fetchDataSearchParams({
    path: "articles",
    forceCache: true,
    locale: locale
  });

  return articlesRes.data.map((article: NonPopulatedArticleProps) => ({
    slug: article.slug,
    locale: locale
  }))
}

export default async function GameLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string; locale: Locale }> }) {
  // Params contains the game slug
  // If the route is like /blog/omgg_x_festival_oeil_glauque, then params.slug is omgg_x_festival_oeil_glauque
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      {children}
    </>
  );
}