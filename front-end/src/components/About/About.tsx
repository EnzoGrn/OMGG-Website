import { Button } from "@/components/ui/button";
import { RenderText } from "../Utils/TextUtils";
import { AboutProps } from "./aboutInterface";
import { PSection } from "../Section/Section";
import { cn } from "@/lib/utils";
import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { LogoProps } from "../Section/Interface";

const AboutContainer = ({ children, padding, className }: { children: React.ReactNode, padding: string, className?: string }) => {
  return (
    <PSection padding={padding} className={className}>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {children}
      </div>
    </PSection>
  );
}

// Apply this to all section component 
const AboutSection = ({ data, additionalData }: { data: AboutProps, additionalData?: GameProps }) => {

  // Data not stored in Strapi
  const classNameData: string = "h-max-[450px]";
  const logo: LogoProps = {
    url: "/OMGG/Illustrations/orange_dots.svg",
    alternativeText: "OMGG's dots illustration",
    className: "max-h-48 items-end justify-end lg:translate-x-0 lg:translate-y-0 translate-x-3/5 -translate-y-1/3",
  };

  const updatedData: AboutProps = {
    ...data,
    className: classNameData,
    logo: logo,
  }

  return (
    <AboutContainer padding="py-12" className={updatedData.className}>
      <div className="flex flex-col items-start text-left">
        <RenderText text={updatedData.title} className="mb-6" />
        <RenderText text={updatedData.description} className="max-w-full md:max-w-2/3 lg:max-w-full" />
        {additionalData?.description ? (
          <RenderText text={additionalData?.description} className="my-6 max-w-full md:max-w-2/3 lg:max-w-full" />
        ) : (
          <RenderText text={updatedData.text} className="my-6 max-w-full md:max-w-2/3 lg:max-w-full" />
        )}

        <div className="flex w-full flex-col gap-2 pt-4 sm:flex-row justify-start">

          {updatedData.callToAction && !updatedData.callToAction.isDisable &&
            <Button asChild variant={updatedData.callToAction?.variant?.toLowerCase() as "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"}
              className="w-full sm:w-auto max-w-1/2 lg:max-w-full uppercase" aria-label={updatedData.callToAction.title}>
              <a href={updatedData.callToAction.url} aria-label={updatedData.callToAction.title}>
                {updatedData.callToAction.title}
                {/* TODO: Add Icon
                    <ArrowRight className="size-4" />
                  */}
              </a>
            </Button>
          }
        </div>
      </div>

      {
        <img src={updatedData.logo.url} alt={updatedData.logo.alternativeText} className={cn("w-full rounded-md object-fill select-none", updatedData.logo.className)} />
      }
    </AboutContainer>
  );
};

export { AboutSection, AboutContainer };
