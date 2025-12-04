import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PSection } from "./Section";
import { RenderText } from "../Utils/TextUtils";
import { HeroProps } from "./Interface";
import { getMediaFromUrl } from "@/lib/strapi";

const HeroContainer = ({ decoration, children, padding, className }: { decoration?: React.ReactNode, children: React.ReactNode, padding: string, className?: string }) => {
  return (
    <PSection padding={padding} className={cn("relative overflow-hidden", className)}>
      {decoration}

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
        {children}
      </div>
    </PSection>
  );
}

const HeroSection = ({ badge, title, subtitle, buttons, logo, className, decoration }: HeroProps) => {
  if (logo)
    logo.className = "max-h-96";
  return (
    <HeroContainer padding="py-12" decoration={decoration} className={className}>
      <div className="flex flex-col items-start text-left">
        {badge && (
          <Badge variant="outline">
            {badge.title}
            <ArrowUpRight className="ml-2 size-4" />
          </Badge>
        )}

        <RenderText text={title} />
        <RenderText text={subtitle} />

        <div className="flex w-full flex-col gap-2 pt-4 sm:flex-row justify-start">
          {buttons && buttons.length > 0 && buttons.filter((buttons) => !buttons.isDisable).map((item, index) => {
            return (
              <Button asChild key={index} variant={item?.variant?.toLowerCase() as "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"} className="w-full sm:w-auto max-w-2/3 md:max-w-1/2 lg:max-w-full uppercase group" aria-label={item.title}>
                <a href={item.url} aria-label={item.title}>
                  {item.title}
                  {item?.variant?.toLowerCase() === "default" && <ArrowRight className="size-4 group-hover:translate-x-2 transition-all duration-300 mr-1" />}
                </a>
              </Button>
            )
          })}
        </div>
      </div>

      {logo &&
        <img src={getMediaFromUrl(logo.url)} alt={logo.alternativeText} className={cn("w-full rounded-md object-fill select-none", logo.className)} />
      }
    </HeroContainer>
  );
};

export { HeroSection, HeroContainer };
