import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge                    } from "@/components/ui/badge";
import { Button                   } from "@/components/ui/button";
import { HeroProps                } from "./Interface";

const Hero = ({ badge, heading, description, buttons, image }: HeroProps) => {
  return (
    <section className="py-32 bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] flex justify-center items-center min-h-[660px] lg:min-h-[690px] w-full">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-start text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h2 className="mt-6 max-w-xl text-pretty lg:text-2xl font-bold">
              {heading}
            </h2>
            <h1 className="mb-6 text-4xl font-bold text-pretty lg:text-6xl">
              {description}
            </h1>
            {buttons &&
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                {buttons.primary && (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={buttons.primary.url}>{buttons.primary.text}</a>
                  </Button>
                )}
                {buttons.secondary && (
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={buttons.secondary.url}>
                      {buttons.secondary.text}
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            }
          </div>
          {image &&
            <img src={image.src} alt={image.alt} className="max-h-96 w-full rounded-md object-cover" />
          }
        </div>
      </div>
    </section>
  );
};

export { Hero };
