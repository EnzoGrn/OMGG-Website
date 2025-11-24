'use server'
import { fetchDataSearchParams } from "@/lib/strapi";
import { Locale                } from "next-intl";
import { setRequestLocale      } from "next-intl/server";

interface NonPopulatedGameProps {
  slug: string;
}

export async function generateStaticParams({ params }: { params: Promise<{ locale: Locale }> })
{
  const locale = (await params).locale;
  const gamesRes = await fetchDataSearchParams({path: "games", forceCache: true, locale: locale});

  return gamesRes.data.map((game: NonPopulatedGameProps) => ({
    slug:     game.slug,
    locale:       locale
  }))
}

export default async function GameLayout({ children, params }: { children: React.ReactNode, params: Promise<{slug: string; locale: Locale}>})
{
  // Params contains the game slug
  // If the route is like /games/vermines, then params.slug is vermines
  const { locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      {children}
    </>
  );
}