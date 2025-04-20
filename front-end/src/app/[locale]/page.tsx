import { Locale            } from "next-intl";
import { setRequestLocale  } from "next-intl/server";
import { use               } from "react";
import { OMGGTestimonials  } from "@/components/OMGG/Section/Testimonials";
import { OMGGBlog          } from "@/components/OMGG/Section/Blog";
import { OMGGOffers        } from "@/components/OMGG/Section/Offers";
import { OMGGNewsLetter    } from "@/components/OMGG/Section/NewsLetter";
import { OMGGHero          } from "@/components/OMGG/Section/Hero";
import { OMGGAbout         } from "@/components/OMGG/Section/About";
import { OMGGLogos         } from "@/components/OMGG/Section/Logos";

import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";

export default function Home({ params }: { params: Promise<{locale: Locale}> })
{
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <main className="w-full h-full">
      <OMGGHero />

      <FadeInWhenVisible>
        <OMGGAbout />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGOffers />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGLogos />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGTestimonials />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGBlog />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGNewsLetter />
      </FadeInWhenVisible>
    </main>
  );
}
