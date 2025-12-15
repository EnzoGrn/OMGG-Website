"use client";

import { useEffect, useState } from "react";
import { SSection } from "../Section/Section";
import { H1, H2 } from "../Text/Text";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { DynamicLoadIcon } from "../Utils/ReactIconUtils";
import { getMediaFromUrl } from "@/lib/strapi";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Container } from "../Section/Container";
import { useTranslations } from "next-intl";
import { GameStatusBadge, getGameStatus } from "./GameStatus";

interface HeroGamesCarouselProps {
  games: GameProps[];
  viewGameText: string;
  locale: string;
}

const HeroGamesCarousel = ({ games, viewGameText, locale }: HeroGamesCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const t = useTranslations('Games.Badge');

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const count = games.length;
      const nextIndex = (current + 1) % count;
      api.scrollTo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [api, current, games.length]);

  return (
    <div className="w-full">
      <SSection padding="py-0" className="min-h-[660px] lg:min-h-[690px] relative">
        <img src="/OMGG/Illustrations/red_dots.svg" alt="OMGG's dots illustration" className="h-1/3 w-1/3 bottom-10 -right-1/5 absolute -z-10 select-none" />
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {games.map((game, index) => {
              const status = getGameStatus(game.releaseDate);

              return (
                <CarouselItem key={index}>
                  <Card className="relative rounded-2xl overflow-hidden h-[calc(660px-6rem)] lg:h-[calc(690px-6rem)] w-full flex-row">
                    <img
                      src={getMediaFromUrl(game.background.url)}
                      alt={game.background.alternativeText || game.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute bottom-16 md:bottom-4 left-4 p-4 flex flex-col gap-2 max-w-xs">
                      {status !== 'none' && <GameStatusBadge status={status}>{t(status)}</GameStatusBadge>}

                      <H1 className="text-white">{game.name}</H1>

                      {game.genrers && game.genrers.map((genre, idx) => (
                        <H2 key={idx} className="text-white font-semibold">{genre.name}</H2>
                      ))}

                      <div className="flex gap-3 mt-2">
                        {game.platforms && game.platforms.map((platform, idx) => (
                          <div key={idx} className="text-white hover:text-yellow-400 transition-colors" title={platform.icon.text}>
                            {platform.icon.isSlugIcon && platform.icon?.slugIcon &&
                              DynamicLoadIcon(platform.icon.slugIcon)
                            }
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 md:left-auto md:right-4 p-4">
                      <Button asChild variant="default" size="lg" aria-label={`${viewGameText} ${game.name}`}>
                        <a href={`/${locale}/games/${game.slug}`} aria-label={`${viewGameText} ${game.name}`}>
                          {viewGameText}
                          <ArrowUpRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </SSection>

      <Container className="flex justify-center">
        {games.map((game, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index);
            }}
            aria-label={`Go to ${game.name}`}
          >
            <div className={`size-2.5 rounded-full ${index === current ? "bg-primary" : "bg-input"}`} />
          </Button>
        ))}
      </Container>
    </div >
  );
};

export { HeroGamesCarousel };
