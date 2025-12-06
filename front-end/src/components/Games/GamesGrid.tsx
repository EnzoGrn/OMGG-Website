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

interface GamesGridProps {
  games: GameProps[];
  locale: string;
  translations: {
    newBadge: string;
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

  // Get the navbar component.
  // It will be used to check the collision with the top of the grid.
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    navbarRef.current = document.getElementById("navbar");
  }, []);

  const [filteredGames, setFilteredGames] = useState<GameProps[]>(games);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isBottomReach, setIsBottomReach] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    genre: "all",
    platform: "all",
    releaseDate: "newest",
    search: "",
  });

  // Refs for scroll calculation
  const gridTopRef = useRef<HTMLDivElement>(null);
  const gridBottomRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Scroll Handler Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!gridTopRef.current || !gridBottomRef.current || !filtersRef.current || !navbarRef.current)
        return;
      const navbarRect = navbarRef.current.getBoundingClientRect();
      const gridTopRect = gridTopRef.current.getBoundingClientRect();
      const gridBottomRect = gridBottomRef.current.getBoundingClientRect();
      const filtersRect = filtersRef.current.getBoundingClientRect();

      const navbarHeight = navbarRect.height;
      const stickyTriggerPoint = navbarHeight + 20;

      if (gridTopRect.top > stickyTriggerPoint) {
        setIsSticky(false);
        setIsBottomReach(false);
        return;
      }

      const availableSpace = gridBottomRect.bottom - stickyTriggerPoint;

      if (availableSpace < filtersRect.height) {
        setIsSticky(false);
        setIsBottomReach(true);
        return;
      }

      setIsSticky(true);
      setIsBottomReach(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [filteredGames]);

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
      if (filters.releaseDate === "newest") {
        filtered.sort((a, b) => {
          return new Date(b.slug).getTime() - new Date(a.slug).getTime();
        });
      } else {
        filtered.sort((a, b) => {
          return new Date(a.slug).getTime() - new Date(b.slug).getTime();
        });
      }

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

        {/* Desktop Filters - Left Column with Dynamic Sticky */}
        <div className="hidden lg:block relative">
          <div ref={gridTopRef} className="h-1" />
          <div
            ref={filtersRef}
            className={`${isBottomReach && currentGames.length > 3 ? 'absolute bottom-0 left-0 right-0' : isSticky && currentGames.length > 3 ? 'fixed top-20' : 'sticky top-24'} max-h-[calc(100vh-8rem)] overflow-y-auto transition-all duration-200 w-[calc((100vw-1280px)/2+1280px/4-2rem)] max-w-xs`}
          >
            <h3 className="text-2xl font-bold mb-6 pt-2">{translations.filters.filterGames}</h3>
            <GamesFilters
              onFilterChange={handleFilterChange}
              genres={uniqueGenres}
              platforms={uniquePlatforms}
              currentFilters={currentFilters}
              translations={translations.filters}
            />
          </div>
        </div>

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
              {currentGames.map((game, index) => (
                <GameCard
                  key={index}
                  game={game}
                  locale={locale}
                  newBadgeText={translations.newBadge}
                  onPlatformClick={handlePlatformClick}
                />
              ))}
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

          <div ref={gridBottomRef} className="h-1" />

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
          <SheetContent side="bottom" className="h-[85vh] p-6">
            <SheetHeader>
              <SheetTitle className="text-2xl">{translations.filters.filterGames}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto max-h-[calc(85vh-8rem)]">
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
