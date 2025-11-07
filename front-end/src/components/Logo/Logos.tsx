"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SSection                                } from "../Section/Section";
import { RenderText                              } from "../Utils/TextUtils";
import { PartnersProps                           } from "./LogoInterface";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

const Logos = ({ title, logos, classname } : PartnersProps) => {
  return (
    <SSection padding="py-8" className={classname}>
      <div className="container flex flex-col items-start text-start">
          <RenderText text={title} className="my-6 text-2xl font-bold text-pretty lg:text-4xl"/>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center w-full">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
            <CarouselContent className="ml-0">
              {logos && logos.map((logo, index) => (
                <CarouselItem key={index} className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 gap-2">
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <img src={STRAPI_URL + logo.icon.url} alt={logo.icon.alternativeText} className="h-18 w-auto" />
                  </div>
                </CarouselItem>
              ))}
              {logos && logos.map((logo, index) => (
                <CarouselItem key={index} className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 gap-2">
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <img src={STRAPI_URL + logo.icon.url} alt={logo.icon.alternativeText} className="h-16 w-auto" />
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
