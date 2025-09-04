import { Button } from "@/components/ui/button";
import { Container } from "../Section/Container";
import { ArrowUpRight } from "lucide-react";

export interface DownloadCTAProps {
  heading      : string;
  description ?: string;
  button      ?: {
    text: string;
    url: string;
  };
}

const DownloadCTA = (props : DownloadCTAProps) => {
  return (
    <section className="py-8">
      <Container className="container relative overflow-visible space-y-6 md:space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 p-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] relative overflow-visible">
          <div className="flex-1 flex flex-col gap-4 z-10">
            <h1 className="text-2xl font-bold text-pretty lg:text-4xl">
              {props.heading}
            </h1>
            {props.description && <h3 className="max-w-xl lg:text-lg">{props.description}</h3>}

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              {props.button && (
                <Button asChild className="w-full sm:w-auto max-w-2/3 lg:max-w-full uppercase">
                  <a href={props.button.url} download>
                    {props.button.text}
                    <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Temp Illustration from Vermines Games */}
          <div className="hidden md:block absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-visible">
            <img src="/Vermines/Bard.png"       alt="Bard"       className="select-none absolute top-0 left-1/2 translate-x-8 -translate-y-1/4 w-[12rem] lg:w-[14rem]" />
            <img src="/Vermines/Blacksmith.png" alt="Blacksmith" className="select-none -scale-x-100 absolute top-0 left-1/2 -translate-x-32 -translate-y-1/4 w-[12rem] lg:w-[14rem]" />
            <img src="/Vermines/Queen.png"      alt="Guerrier"   className="select-none absolute top-0 left-1/2 -translate-x-12 -translate-y-10 w-[12rem] lg:w-[14rem]" />
            <img src="/Vermines/Dragoleon.png"  alt="Archer"     className="select-none -scale-x-100 absolute top-0 left-1/2 -translate-x-80 -translate-y-1/4 w-[12rem] lg:w-[14rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export { DownloadCTA };
