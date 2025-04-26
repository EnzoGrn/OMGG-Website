"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SSection                                } from "../Section/Section";

import AutoScroll from "embla-carousel-auto-scroll";

export interface Logo {
  id         : string;
  description: string;
  image      : string;
  className ?: string;
}

export interface LogosProps {
  heading  ?: string;
  logos    ?: Logo[];
  className?: string;
}

const Logos = ({ heading, logos, className } : LogosProps) => {
  return (
    <SSection padding="py-8" className={className}>
      <div className="container flex flex-col items-start text-start">
        <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          {heading}
        </h1>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center w-full">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
            <CarouselContent className="ml-0">
              {logos && logos.map((logo) => (
                <CarouselItem key={logo.id} className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <img src={logo.image} alt={logo.description} className={logo.className} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </SSection>
  );
};

export { Logos };
