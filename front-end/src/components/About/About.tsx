import { Button     } from "@/components/ui/button";
import { RenderText } from "../Utils/TextUtils";
import { AboutProps } from "./aboutInterface";
import { PSection   } from "../Section/Section";
import { cn } from "@/lib/utils";

const AboutContainer = ({ children, padding, className } : { children: React.ReactNode, padding: string, className?: string }) => {
  return (
    <PSection padding={padding} className={className}>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {children}
      </div>
    </PSection>
  );
}

const AboutSection = ({ title, description, text, callToAction, logo, className}: AboutProps) => {

  return (
    <AboutContainer padding="py-12" className={className}>
      <div className="flex flex-col items-start text-left">
        <RenderText text={title} className="mb-6" />
        <RenderText text={description} className="max-w-full md:max-w-2/3 lg:max-w-full" />
        <RenderText text={text} className="my-6 max-w-full md:max-w-2/3 lg:max-w-full" />

        <div className="flex w-full flex-col gap-2 pt-4 sm:flex-row justify-start">
        
        {callToAction && !callToAction.isDisable && 
              <Button asChild variant={callToAction?.variant?.toLowerCase() as "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"}
                className="w-full sm:w-auto max-w-1/2 lg:max-w-full uppercase" aria-label={callToAction.title}>
                <a href={callToAction.url} aria-label={callToAction.title}>
                  {callToAction.title}
                  {/* TODO: Add Icon
                    <ArrowRight className="size-4" />
                  */}
                </a>
              </Button>
        }
        </div>
      </div>

      {
        <img src={logo.url} alt={logo.alternativeText} className={cn("w-full rounded-md object-fill select-none", logo.className)} />
      }
    </AboutContainer>
  );
};

export { AboutSection, AboutContainer };
