import React from "react";
import { OMGGHero } from "@/components/OMGG/Section/Hero";
import { OMGGAbout } from "@/components/OMGG/Section/About"
import { OMGGOffers } from "@/components/OMGG/Section/Offers"
import { OMGGLogos } from "@/components/OMGG/Section/Logos"
import { OMGGTestimonials } from "@/components/OMGG/Section/Testimonials"
import { OMGGBlog } from "@/components/OMGG/Section/Blog"
import { OMGGNewsLetter } from "@/components/OMGG/Section/NewsLetter"
import { FadeInWhenVisible } from "@/components/Animator/Fade/FadeInWhenVisible";
import { HeroProps } from "@/components/Section/Interface";
import { TestimonialsProps } from "@/components/Testimonials/TestimonialInterface";
import { BlogPostsProps } from "@/components/Blog/Post/BlogPostInterface";
import { OffersProps } from "@/components/Offers/OffersInterface";
import { PartnersProps } from "@/components/Logo/LogoInterface"
import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { GallerySectionProps, MediaGallerySection } from "@/components/Section/MediaGallery";
import { AboutProps } from "@/components/About/aboutInterface";
import { DownloadCTAProps } from "@/components/CTA/DownloadCTA";
import { HeroTrailerSection, HeroTrailerSectionProps } from "@/components/Trailer/HeroTrailerSection";
import { CTASection } from "@/components/Section/CTASection";

/* Generic Conditionnal Type
* T represents the type of the main data for the component.
* A represents optional additional data, and defaults to undefined.
*
* In case no additional data type (A) is defined then the type Generic Type will be { data: T }
* Otherwise it is { data: T; additionalData: A }
* 
* Example:
* type L = SectionProps<HeroProps>
* -> { data: HeroProps }
* type M = SectionProps<AboutProps, GameProps>
* -> { data: AboutProps; additionalData: GameProps }
*/
type SectionProps<T, A = undefined> = A extends undefined ? { data: T } : { data: T; additionalData: A };

/*
* This is basically a map that associate a specifc key to a corresponding React Component Type
*
* Example:
* If the block key is "layout.hero-section" then the corresponding React component must accept props:
* { data: HeroProps }
* If the block key is "layout.hero-trailer-section" then the corresponding React component must accept props:
* { data: HeroTrailerSectionProps; additionalData: GameProps }
*/
type ComponentTypeMap = {
  "layout.hero-section": React.ComponentType<SectionProps<HeroProps>>;
  "layout.about": React.ComponentType<SectionProps<AboutProps, GameProps>>;
  "layout.hero-trailer-section": React.ComponentType<SectionProps<HeroTrailerSectionProps, GameProps>>;
  "layout.offers": React.ComponentType<SectionProps<OffersProps>>;
  "layout.partners": React.ComponentType<SectionProps<PartnersProps>>;
  "layout.testimonials-section": React.ComponentType<SectionProps<TestimonialsProps>>;
  "layout.blog-section": React.ComponentType<SectionProps<BlogPostsProps>>;
  "layout.news-letter-form": React.ComponentType<SectionProps<BlockProps>>;
  "layout.media-gallery-section": React.ComponentType<SectionProps<GallerySectionProps, GameProps>>;
  "layout.cta-section": React.ComponentType<SectionProps<DownloadCTAProps, GameProps>>;
}

// This is basically a map that associate a specifc key to a corresponding Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {
  "layout.hero-section": OMGGHero,
  "layout.about": OMGGAbout,
  "layout.hero-trailer-section": HeroTrailerSection,
  "layout.offers": OMGGOffers,
  "layout.partners": OMGGLogos,
  "layout.testimonials-section": OMGGTestimonials,
  "layout.blog-section": OMGGBlog,
  "layout.news-letter-form": OMGGNewsLetter,
  "layout.media-gallery-section": MediaGallerySection,
  "layout.cta-section": CTASection,
};

/*
* Because we have a React Component Type Map,
* we want to extract the props Type P from the component associated with Key T
* 
* ComponentTypeMap[T] gives the component type
* 
* Example:
* ComponentTypeMap["layout.about"]
* -> React.ComponentType<SectionProps<AboutProps, GameProps>>
* 
* React.ComponentType<SectionProps<AboutProps, GameProps>> extends React.ComponentType<infer P> ? P : never
* Yes: SectionProps<AboutProps, GameProps>
* 
*/
type BlockCast<T extends keyof ComponentTypeMap> =
  ComponentTypeMap[T] extends React.ComponentType<infer P> ? P : never;

/*
* Wa want to cast the data to the correct component props type.
* Thanks to this function we can return the data with the right data type
*
* We don't use key as it's value but as it's type thanks to the component type map
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function castBlockData<T extends keyof ComponentTypeMap>(block: unknown, _key: T): BlockCast<T> {
  return block as BlockCast<T>;
}


interface BlockProps {
  __component: string;
  enableAnimation: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dynamicComponentFactory(dataBlocks: any) {

  return (
    <div>
      {dataBlocks.data.blocks && dataBlocks.data.blocks.map((block: BlockProps, index: number) => {

        const Component = componentMap[block.__component];
        if (!Component) return null;

        const data = castBlockData(block, block.__component as keyof ComponentTypeMap);
        if (!data) return null;

        return block.enableAnimation ? (
          <FadeInWhenVisible key={index}>
            {/* TODO: Cast the type of the data depending of the component */}
            {(dataBlocks.gameData && dataBlocks.gameData.data) ? (
              <Component data={data} additionalData={dataBlocks.gameData.data} />
            ) : (
              <Component data={data} />
            )}

          </FadeInWhenVisible>
        ) : (
          (dataBlocks.gameData && dataBlocks.gameData.data) ? (
            <Component data={data} additionalData={dataBlocks.gameData.data} key={index} />
          ) : (
            <Component data={data} key={index} />
          )
        );
      })}
    </div>
  );
}