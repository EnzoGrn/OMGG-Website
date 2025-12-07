import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";
import { HeroGamesCarousel } from "@/components/Games/HeroGamesCarousel";
import { GamesGrid } from "@/components/Games/GamesGrid";
import { Container } from "@/components/Section/Container";
import { fetchLatestGames, fetchAllGames } from "@/lib/strapi";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CreatorCTA } from "@/components/CTA/CreatorCTA";

export default async function GamesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Games" });

  // Fetch the 3 latest games for hero carousel
  const latestGames = await fetchLatestGames(locale, 3);

  // Fetch all games for the grid
  const allGames = await fetchAllGames(locale);

  return (
    <main className="w-full h-full overflow-hidden">
      {latestGames && latestGames.length > 0 && (
        <>
          <Container className="pt-8">
            <h1 className="text-7xl font-extrabold text-start uppercase">NEW GAMES</h1>
          </Container>
          <HeroGamesCarousel
            games={latestGames}
            newBadgeText={t('hero.badge')}
            viewGameText={t('hero.viewGame')}
            locale={locale}
          />
        </>
      )}

      <FadeInWhenVisible>
        <Container className="pt-16">
          <h1 className="text-7xl font-extrabold text-start uppercase"><span className="text-primary">{t('title.our')}</span> {t('title.games')}</h1>
        </Container>
        <GamesGrid
          games={allGames}
          locale={locale}
          translations={{
            newBadge: t('hero.badge'),
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

