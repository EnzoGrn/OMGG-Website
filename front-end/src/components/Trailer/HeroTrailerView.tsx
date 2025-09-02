import { PSection } from "../Section/Section";
import { H1, H3   } from "../Text/Text";
import { Badge    } from "../ui/badge";
import { Card     } from "../ui/card";
import { RiSwitchFill, RiXboxFill, RiPlaystationFill, RiAppleFill, RiSteamFill, RiWindowsFill } from "react-icons/ri";
import { SiEpicgames, SiAndroid } from "react-icons/si";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

const platformIcons = {
  Switch: <RiSwitchFill className="size-6" />,
  Windows: <RiWindowsFill className="size-6" />,
  Xbox: <RiXboxFill className="size-6" />,
  PlayStation: <RiPlaystationFill className="size-6" />,
  Mobile: <SiAndroid className="size-6" />,
  EpicGames: <SiEpicgames className="size-6" />,
  IOS: <RiAppleFill className="size-6" />,
  Steam: <RiSteamFill className="size-6" />
};

export interface HeroTrailerProps {
  title     : string;
  badge    ?: string;
  genre    ?: string[];
  platforms?: (keyof typeof platformIcons)[];
  button   ?: {
    title: string;
    url  : string;
  }
}

const HeroTrailerView = (props : HeroTrailerProps) => {
  return (
    <PSection padding="py-0" className="min-h-[660px] lg:min-h-[690px]">
      <Card className="relative rounded-2xl overflow-hidden h-[calc(660px-6rem)] lg:h-[calc(690px-6rem)] flex-row">
        <img src="/Vermines/thumbnail.png" alt="Trailer Thumbnail" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute bottom-16 md:bottom-4 left-4 p-4 flex flex-col gap-2 max-w-xs">
          {props.badge && <Badge>{props.badge}</Badge>}
          <H1 className="text-white">{props.title}</H1>

          {/* Genre */}
          {props.genre && props.genre.map((subgenre, index) => (
            <H3 key={index} className="text-white">{subgenre}</H3>
          ))}

          {/* Platforms */}
          <div className="flex gap-3 mt-2">
            {props.platforms && props.platforms.map((platform) => (
              <div key={platform} className="text-white hover:text-yellow-400 transition-colors" title={platform}>
                {platformIcons[platform]}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Download bottom right */}
        {props.button && <div className="absolute bottom-4 left-4 md:left-auto md:right-4 p-4">
          <Button asChild variant="default" size="lg">
            <a href={props.button.url}>
              {props.button.title}
              <ArrowUpRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>}

      </Card>
    </PSection>
  );
};

export { HeroTrailerView };
