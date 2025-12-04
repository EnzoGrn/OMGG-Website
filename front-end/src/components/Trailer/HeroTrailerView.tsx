import { PSection                           } from "../Section/Section";
import { H1, H2                             } from "../Text/Text";
import { Badge                              } from "../ui/badge";
import { Card                               } from "../ui/card";
import { Button                             } from "../ui/button";
import { ArrowUpRight                       } from "lucide-react";
import { GameProps                          } from "@/app/[locale]/games/[slug]/page";
import { DynamicLoadIcon                    } from "../Utils/ReactIconUtils";
import { getMediaFromUrl                    } from "@/lib/strapi";
import { useTranslations                    } from "next-intl";
import { HeroTrailerSectionProps            } from "./HeroTrailerSection";

const HeroTrailerView = ({gameProps, data } : { gameProps: GameProps, data: HeroTrailerSectionProps}) => {

  const t = useTranslations('Games');

  return (
    <PSection padding="py-0" className="min-h-[660px] lg:min-h-[690px]">
      <Card className="relative rounded-2xl overflow-hidden h-[calc(660px-6rem)] lg:h-[calc(690px-6rem)] flex-row">
        <img src={getMediaFromUrl(gameProps.background.url)} alt="Trailer Thumbnail" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute bottom-16 md:bottom-4 left-4 p-4 flex flex-col gap-2 max-w-xs">
          {gameProps.isNew && <Badge>{t('hero.badge')}</Badge>}
          <H1 className="text-white">{gameProps.name}</H1>

          {/* Genre */}
          {gameProps.genrers && gameProps.genrers.map((subgenre, index) => (
            <H2 key={index} className="text-white font-semibold">{subgenre.name}</H2>
          ))}

          {/* Platforms */}
          <div className="flex gap-3 mt-2">
            {gameProps.platforms && gameProps.platforms.map((platform, index) => (
              <div key={index} className="text-white hover:text-yellow-400 transition-colors" title={platform.icon.text}>
                {platform.icon.isSlugIcon && platform.icon?.slugIcon && 
                  DynamicLoadIcon(platform.icon.slugIcon)
                }
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Download bottom right */}
        {data.downloadButton && <div className="absolute bottom-4 left-4 md:left-auto md:right-4 p-4">
          <Button asChild variant="default" size="lg" aria-label={data.downloadButton.title}>
            <a href={gameProps.download.url} download aria-label={data.downloadButton.title}>
              {data.downloadButton.title}
              <ArrowUpRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>}

      </Card>
    </PSection>
  );
};

export { HeroTrailerView };
