import React from "react";
import { OMGGHero                       } from "@/components/OMGG/Section/Hero";
import { OMGGAbout                      } from "@/components/OMGG/Section/About"
import { OMGGOffers                     } from "@/components/OMGG/Section/Offers"
import { OMGGLogos                      } from "@/components/OMGG/Section/Logos"
import { OMGGTestimonials               } from "@/components/OMGG/Section/Testimonials"
import { OMGGBlog                       } from "@/components/OMGG/Section/Blog"
import { OMGGNewsLetter                 } from "@/components/OMGG/Section/NewsLetter"
import { FadeInWhenVisible              } from "@/components/Animator/Fade/FadeInWhenVisible";
import { HeroProps                      } from "@/components/Section/Interface";
import { TestimonialsProps              } from "@/components/Testimonials/TestimonialInterface";
import { BlogPostsProps                 } from "@/components/Blog/Post/BlogPostInterface";
import { OffersProps                    } from "@/components/Offers/OffersInterface";
import { PartnersProps                  } from "@/components/Logo/LogoInterface"
import { CTASection, GameProps, HeroTrailerSection, HeroTrailerSectionProps } from "@/app/[locale]/games/[slug]/page";
import { GallerySectionProps, MediaGallerySection            } from "@/components/Section/MediaGallery";
import { AboutProps } from "@/components/About/aboutInterface";
import { DownloadCTAProps } from "@/components/CTA/DownloadCTA";

/* Create a custom props with additonal as any type to handle internationalization strapi data
* 
* If A type is not defined then let's not use additionalData, if yes then specify his type
* 
* Adaptation will be usefull in case a component can take mutltiple different additional data in case it can 
* render data from different collection type from strapi
*/
type SectionProps<T, A = undefined> = A extends undefined ? { data: T } : { data: T; additionalData: A };

type ComponentTypeMap = {
  "layout.hero-section":             React.ComponentType<SectionProps<HeroProps>>;
  "layout.about":                    React.ComponentType<SectionProps<AboutProps, GameProps>>;
  "layout.hero-trailer-section":     React.ComponentType<SectionProps<HeroTrailerSectionProps, GameProps>>;
  "layout.offers":                   React.ComponentType<SectionProps<OffersProps>>;
  "layout.partners":                 React.ComponentType<SectionProps<PartnersProps>>;
  "layout.testimonials-section":     React.ComponentType<SectionProps<TestimonialsProps>>;
  "layout.blog-section":             React.ComponentType<SectionProps<BlogPostsProps>>;
  "layout.news-letter-form":         React.ComponentType<SectionProps<any>>;
  "layout.media-gallery-section":    React.ComponentType<SectionProps<GallerySectionProps, GameProps>>;
  "layout.cta-section":              React.ComponentType<SectionProps<DownloadCTAProps, GameProps>>;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  "layout.hero-section":          OMGGHero,
  "layout.about":                 OMGGAbout,
  "layout.hero-trailer-section":  HeroTrailerSection,
  "layout.offers":                OMGGOffers,
  "layout.partners":              OMGGLogos,
  "layout.testimonials-section":  OMGGTestimonials,
  "layout.blog-section":          OMGGBlog,
  "layout.news-letter-form":      OMGGNewsLetter,
  "layout.media-gallery-section": MediaGallerySection,
  "layout.cta-section":           CTASection,
};

// casting the right type of block data depending on the component key
function castBlockData<T extends keyof ComponentTypeMap>(block: any, key: T) : 
  ComponentTypeMap[T] extends React.ComponentType<infer D> ? D : never {
    return block;
}

export function dynamicComponentFactory(dataBlocks: any) {

  return (
    <div>
      {dataBlocks.data.blocks.map((block: any, index: number) => {

        const Component = componentMap[block.__component];
        if (!Component) return null;

        const data = castBlockData(block, block.__component);
        if (!data) return null;

        return block.enableAnimation ? (
          <FadeInWhenVisible key={index}>
            {/* TODO: Cast the type of the data depending of the component */}
            {(dataBlocks.gameData && dataBlocks.gameData.data) ? (
              <Component data={data} additionalData={dataBlocks.gameData.data}/>
            ) : (
              <Component data={data}/>
            )}
            
          </FadeInWhenVisible>
        ) : (
          (dataBlocks.gameData && dataBlocks.gameData.data) ? (
            <Component data={data} additionalData={dataBlocks.gameData.data} key={index}/>
          ) : (
            <Component data={data} key={index}/>
          ) 
        );
      })}
    </div>
  );
}