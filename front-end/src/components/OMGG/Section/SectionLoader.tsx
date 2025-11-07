import React from "react";
import { OMGGHero               } from "@/components/OMGG/Section/Hero";
import { OMGGAbout              } from "@/components/OMGG/Section/About"
import { OMGGOffers             } from "@/components/OMGG/Section/Offers"
import { OMGGLogos              } from "@/components/OMGG/Section/Logos"
import { OMGGTestimonials       } from "@/components/OMGG/Section/Testimonials"
import { OMGGBlog               } from "@/components/OMGG/Section/Blog"
import { OMGGNewsLetter         } from "@/components/OMGG/Section/NewsLetter"
import { FadeInWhenVisible      } from "@/components/Animator/Fade/FadeInWhenVisible";
import { HeroProps              } from "@/components/Section/Interface";
import { TestimonialsProps      } from "@/components/Testimonials/TestimonialInterface";
import { BlogPostsProps         } from "@/components/Blog/Post/BlogPostInterface";
import { OffersProps            } from "@/components/Offers/OffersInterface";
import { PartnersProps          } from "@/components/Logo/LogoInterface"

type ComponentTypeMap = {
  "layout.hero-section":         React.ComponentType<{data: HeroProps}>;
  "layout.about":                React.ComponentType<{data: HeroProps}>;
  "layout.offers":               React.ComponentType<{data: OffersProps}>;
  "layout.partners":             React.ComponentType<{data: PartnersProps}>;
  "layout.testimonials-section": React.ComponentType<{data: TestimonialsProps}>;
  "layout.blog-section":         React.ComponentType<{data: BlogPostsProps}>;
  "layout.news-letter-form":     React.ComponentType<{data: any}>;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  "layout.hero-section":         OMGGHero,
  "layout.about":                OMGGAbout,
  "layout.offers":               OMGGOffers,
  "layout.partners":             OMGGLogos,
  "layout.testimonials-section": OMGGTestimonials,
  "layout.blog-section":         OMGGBlog,
  "layout.news-letter-form":     OMGGNewsLetter,
};

function castBlockData<T extends keyof ComponentTypeMap>(block: any, key: T) : 
  ComponentTypeMap[T] extends React.ComponentType<{data: infer D}> ? D : never {
    return block;
}

export function dynamicComponentFactory(data: any) {
  return (
    <div>
      {data.map((block: any, index: number) => {
        const Component = componentMap[block.__component];
        if (!Component) return null;

        const data = castBlockData(block, block.__component);
        if (!data) return null;

        return block.enableAnimation ? (
          <FadeInWhenVisible key={index}>
            {/* TODO: Cast the type of the data depending of the component */}
            <Component data={data}/>
          </FadeInWhenVisible>
        ) : (
          <Component data={data} key={index}/>
        );
      })}
    </div>
  );
}