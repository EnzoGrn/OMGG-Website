"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Container } from "../Section/Container";
import { GamesFilters, FilterState } from "./GamesFilters";
import { GameCard } from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Search, SearchX } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { getGameStatus, TIME_CONSIDERATE_AS_NEW } from "./GameStatus";
import { useTranslations } from "next-intl";

interface GamesGridProps {
  games: GameProps[];
  locale: string;
  translations: {
    filters: {
      genre: string;
      platform: string;
      releaseDate: string;
      filterGames: string;
      allGenres: string;
      allPlatforms: string;
      newest: string;
      oldest: string;
      resetFilters: string;
      noResults: {
        title: string;
        description: string;
      };
      search: string;
      searchPlaceholder: string;
    };
    pagination: {
      page: string;
      of: string;
    };
    mobileFilterButton: string;
  };
}

const ITEMS_PER_PAGE = 12;

const GamesGrid = ({ games, locale, translations }: GamesGridProps) => {

  const t = useTranslations('Games.Badge');

  const [filteredGames, setFilteredGames] = useState<GameProps[]>(games);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    genre: "all",
    platform: "all",
    releaseDate: "newest",
    search: "",
  });

  useEffect(() => {
    handleFilterChange(currentFilters);
  }, []);

  // Extract unique genres and platforms
  const uniqueGenres = Array.from(
    new Set(games.flatMap((game) => game.genrers?.map((g) => g.name) || []))
  );

  const uniquePlatforms = Array.from(
    new Set(
      games.flatMap((game) =>
        game.platforms?.map((p) => p.icon.text) || []
      )
    )
  );

  function getGamePriority(game: GameProps) {
    const today = new Date();

    if (game.releaseDate === null || game.releaseDate === undefined)
      return 1;
    if (new Date(game.releaseDate) > today)
      return 0;
    const release = new Date(game.releaseDate);
    const newLimit = new Date();

    newLimit.setDate(newLimit.getDate() - TIME_CONSIDERATE_AS_NEW);

    if (release >= newLimit && release <= today)
      return 2;
    return 3;
  }

  function sortByRelease(filtered: GameProps[], newest: boolean) {
    filtered.sort((a, b) => {
      const pa = getGamePriority(a);
      const pb = getGamePriority(b);

      if (pa !== pb)
        return newest ? pa - pb : pb - pa;
      const da = a.releaseDate ? new Date(a.releaseDate).getTime() : Infinity;
      const db = b.releaseDate ? new Date(b.releaseDate).getTime() : Infinity;

      return newest ? da - db : db - da;
    });
  }

  const handleFilterChange = (filters: FilterState) => {
    setCurrentFilters(filters);
    setIsLoading(true);

    setTimeout(() => {
      let filtered = [...games];

      // Filter by genre
      if (filters.genre !== "all") {
        filtered = filtered.filter((game) =>
          game.genrers?.some((g) => g.name === filters.genre)
        );
      }

      // Filter by platform
      if (filters.platform !== "all") {
        filtered = filtered.filter((game) =>
          game.platforms?.some((p) => p.icon.text === filters.platform)
        );
      }

      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter((game) =>
          game.name.toLowerCase().includes(searchLower)
        );
      }

      // Sort by release date
      if (filters.releaseDate === "newest")
        sortByRelease(filtered, true);
      else
        sortByRelease(filtered, false);
      setFilteredGames(filtered);
      setCurrentPage(1); // Reset to first page
      setIsFilterSheetOpen(false); // Close mobile sheet
      setIsLoading(false);
    }, 500); // Small delay for better UX
  };

  // Handle platform click from game card
  const handlePlatformClick = (platformName: string) => {
    handleFilterChange({
      genre: "all",
      platform: platformName,
      releaseDate: "newest",
      search: "",
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Desktop Filters - Left Column */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-2xl font-bold mb-6 pt-2">{translations.filters.filterGames}</h3>

            <GamesFilters
              onFilterChange={handleFilterChange}
              genres={uniqueGenres}
              platforms={uniquePlatforms}
              currentFilters={currentFilters}
              translations={translations.filters}
            />
          </div>
        </aside>

        {/* Games Grid - Right Column */}
        <div className="lg:col-span-3 space-y-8">

          {/* Games Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <GameCardSkeleton key={index} />
              ))}
            </div>
          ) : currentGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentGames.map((game, index) => {
                const status = getGameStatus(game.releaseDate);

                return (
                  <GameCard
                    key={index}
                    game={game}
                    locale={locale}
                    badgeText={status !== 'none' ? t(status) : ''}
                    onPlatformClick={handlePlatformClick}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-in fade-in zoom-in duration-300 h-full">
              <div className="bg-muted p-6 rounded-full">
                <SearchX className="size-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{translations.filters.noResults.title}</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {translations.filters.noResults.description}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleFilterChange({
                  genre: "all",
                  platform: "all",
                  releaseDate: "newest",
                  search: "",
                })}
              >
                {translations.filters.resetFilters}
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                {translations.pagination.page} {currentPage} {translations.pagination.of} {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === "..." ? (
                      <span className="px-2 text-muted-foreground">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page as number)}
                        aria-label={`Go to page ${page}`}
                      >
                        {page}
                      </Button>
                    )}
                  </React.Fragment>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Button - Floating with Sheet */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-2xl h-16 w-16 p-0">
              <Search className="h-6 w-6" />
              <span className="sr-only">{translations.mobileFilterButton}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="min-h-[85vh] max-h-full p-6">
            <SheetHeader>
              <SheetTitle className="text-2xl">{translations.filters.filterGames}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <GamesFilters
                onFilterChange={handleFilterChange}
                genres={uniqueGenres}
                platforms={uniquePlatforms}
                currentFilters={currentFilters}
                translations={translations.filters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Container>
  );
};

export { GamesGrid };
