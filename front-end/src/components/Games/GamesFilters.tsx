"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

interface GamesFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  genres: string[];
  platforms: string[];
  currentFilters: FilterState;
  translations: {
    genre: string;
    platform: string;
    releaseDate: string;
    filterGames: string;
    allGenres: string;
    allPlatforms: string;
    newest: string;
    oldest: string;
    resetFilters: string;
  };
}

export interface FilterState {
  genre: string;
  platform: string;
  releaseDate: string;
}

const GamesFilters = ({ onFilterChange, genres, platforms, currentFilters, translations }: GamesFiltersProps) => {
  const [filters, setFilters] = React.useState<FilterState>(currentFilters);

  // Update internal state when currentFilters prop changes
  React.useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      genre: "all",
      platform: "all",
      releaseDate: "newest",
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-6 overflow-x-visible">
      {/* Genre Filter */}
      <div className="space-y-2 px-1">
        <Label htmlFor="genre-filter" className="text-sm font-semibold">
          {translations.genre}
        </Label>
        <Select
          value={filters.genre}
          onValueChange={(value) => handleFilterChange("genre", value)}
        >
          <SelectTrigger id="genre-filter">
            <SelectValue placeholder={translations.allGenres} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.allGenres}</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Platform Filter */}
      <div className="space-y-2 px-1">
        <Label htmlFor="platform-filter" className="text-sm font-semibold">
          {translations.platform}
        </Label>
        <Select
          value={filters.platform}
          onValueChange={(value) => handleFilterChange("platform", value)}
        >
          <SelectTrigger id="platform-filter">
            <SelectValue placeholder={translations.allPlatforms} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.allPlatforms}</SelectItem>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Release Date Filter */}
      <div className="space-y-2 px-1">
        <Label htmlFor="date-filter" className="text-sm font-semibold">
          {translations.releaseDate}
        </Label>
        <Select
          value={filters.releaseDate}
          onValueChange={(value) => handleFilterChange("releaseDate", value)}
        >
          <SelectTrigger id="date-filter">
            <SelectValue placeholder={translations.newest} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{translations.newest}</SelectItem>
            <SelectItem value="oldest">{translations.oldest}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 px-1">
        <Button onClick={handleApplyFilters} className="w-full" size="lg">
          {translations.filterGames}
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="w-full"
          size="sm"
        >
          {translations.resetFilters}
        </Button>
      </div>
    </div>
  );
};

export { GamesFilters };
