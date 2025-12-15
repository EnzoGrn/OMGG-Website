import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";
import { HeroGamesCarousel } from "@/components/Games/HeroGamesCarousel";
import { GamesGrid } from "@/components/Games/GamesGrid";
import { Container } from "@/components/Section/Container";
import { fetchLatestGames, fetchAllGames } from "@/lib/strapi";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CreatorCTA } from "@/components/CTA/CreatorCTA";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Games.metadata" });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description')
    },
    twitter: {
      title: t('title'),
      description: t('description')
    }
  };
}

export default async function GamesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Games" });

  // Fetch the 3 latest games for hero carousel
  const latestGames = await fetchLatestGames(locale, 3);

  // Fetch all games for the grid
  const allGames = await fetchAllGames(locale);

  return (
    <main className="w-full">
      {latestGames && latestGames.length > 0 && (
        <>
          <Container className="pt-8">
            <h1 className="text-7xl font-extrabold text-start uppercase">{t('title.new_games')}</h1>
          </Container>
          <HeroGamesCarousel
            games={latestGames}
            viewGameText={t('hero.viewGame')}
            locale={locale}
          />
        </>
      )}

      <FadeInWhenVisible className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/OMGG/Illustrations/yellow_dots.svg"
            className="h-1/4 w-1/4 top-2/5 -right-1/10 absolute -z-10"
          />
        </div>

        <Container className="pt-16">
          <h1 className="text-7xl font-extrabold text-start uppercase"><span className="text-primary">{t('title.our')}</span> {t('title.games')}</h1>
        </Container>
        <GamesGrid
          games={allGames}
          locale={locale}
          translations={{
            filters: {
              genre: t('filters.genre'),
              platform: t('filters.platform'),
              releaseDate: t('filters.releaseDate'),
              filterGames: t('filters.filterGames'),
              allGenres: t('filters.allGenres'),
              allPlatforms: t('filters.allPlatforms'),
              newest: t('filters.newest'),
              oldest: t('filters.oldest'),
              resetFilters: t('filters.resetFilters'),
              noResults: {
                title: t('filters.noResults.title'),
                description: t('filters.noResults.description'),
              },
              search: t('filters.search'),
              searchPlaceholder: t('filters.searchPlaceholder'),
            },
            pagination: {
              page: t('pagination.page'),
              of: t('pagination.of'),
            },
            mobileFilterButton: t('mobileFilterButton'),
          }}
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <CreatorCTA imageSrc={'/OMGG/Illustrations/happy_omgg.webp'} />
      </FadeInWhenVisible>
    </main>
  );
}

