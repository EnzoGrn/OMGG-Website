"use client";

import { Card } from "../ui/card";
import { getMediaFromUrl } from "@/lib/strapi";
import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { DynamicLoadIcon } from "../Utils/ReactIconUtils";
import { GameStatusBadge, getGameStatus } from "./GameStatus";

interface GameCardProps {
  game: GameProps;
  locale: string;
  badgeText: string;
  onPlatformClick?: (platformName: string) => void;
}

const GameCard = ({ game, locale, badgeText, onPlatformClick }: GameCardProps) => {
  const status = getGameStatus(game.releaseDate);

  return (
    <a href={`/${locale}/games/${game.slug}`} className="group block h-full">
      <Card className="relative overflow-hidden h-80 transition-all duration-300 hover:shadow-xl cursor-pointer">
        {/* Background Image */}
        <img
          src={getMediaFromUrl(game.background.url)}
          alt={game.background.alternativeText || game.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Badge */}
          {status !== 'none' && (
            <div className="mb-2">
              <GameStatusBadge status={status}>
                {badgeText}
              </GameStatusBadge>
            </div>
          )}

          {/* Game Title */}
          <h3 className="text-white text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {game.name}
          </h3>

          {/* Genres */}
          <div className="flex flex-wrap gap-1">
            {game.genrers && game.genrers.slice(0, 2).map((genre, idx) => (
              <span
                key={idx}
                className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Platforms */}
          <div className="flex gap-2 mt-2">
            {game.platforms && game.platforms.slice(0, 4).map((platform, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onPlatformClick) {
                    onPlatformClick(platform.icon.text);
                  }
                }}
                className="text-white/70 hover:text-primary transition-colors cursor-pointer hover:scale-110 transform duration-200"
                title={`Filter by ${platform.icon.text}`}
                aria-label={`Filter games by ${platform.icon.text}`}
              >
                {platform.icon.isSlugIcon && platform.icon?.slugIcon &&
                  DynamicLoadIcon(platform.icon.slugIcon)
                }
              </button>
            ))}
          </div>
        </div>
      </Card>
    </a>
  );
};

export { GameCard };
