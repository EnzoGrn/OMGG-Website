import { ArrowRight, ArrowUpRight    } from "lucide-react";
import { Badge                       } from "@/components/ui/badge";
import { Button                      } from "@/components/ui/button";
import { HeroProps                   } from "./Interface";
import { H1, H2, H3, P               } from "@/components/Text/Text";
import { cn                          } from "@/lib/utils";
import { TextEnum                    } from "@/lib/enumerations/TextEnum";
import { PSection                    } from "./Section";

const HeroContainer = ({ children, padding, className } : { children: React.ReactNode, padding: string, className?: string }) => {
  return (
    <PSection padding={padding} className={className}>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {children}
      </div>
    </PSection>
  );
}

const HeroSection = ({ badge, text, buttons, image, className }: HeroProps) => {
  return (
    <HeroContainer padding="py-12" className={className}>
      <div className="flex flex-col items-start text-left">
        {badge && (
          <Badge variant="outline">
            {badge}
            <ArrowUpRight className="ml-2 size-4" />
          </Badge>
        )}

        {text && text.map((item, index) => {
          if (item.size === TextEnum.H1)
            return (<H1 key={index} className={item.className}>{item.text}</H1>);
          else if (item.size === TextEnum.H2)
            return (<H2 key={index} className={item.className}>{item.text}</H2>);
          else if (item.size === TextEnum.H3)
            return (<H3 key={index} className={item.className}>{item.text}</H3>);
          else
            return (<P key={index} className={item.className}>{item.text}</P>);
        })}

        {buttons &&
          <div className="flex w-full flex-col gap-2 sm:flex-row justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto max-w-1/2 lg:max-w-full uppercase" aria-label={buttons.primary.text}>
                <a href={buttons.primary.url} aria-label={buttons.primary.text}>
                  {buttons.primary.text}
                </a>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline" className="w-full sm:w-auto max-w-1/2 lg:max-w-full uppercase" aria-label={buttons.secondary.text}>
                <a href={buttons.secondary.url} aria-label={buttons.secondary.text}>
                  {buttons.secondary.text}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        }
      </div>

      {image &&
        <img src={image.src} alt={image.alt} className={cn("w-full rounded-md object-fill select-none", image.className)} />
      }
    </HeroContainer>
  );
};

export { HeroSection, HeroContainer };
