import { Locale, useTranslations } from "next-intl";
import { setRequestLocale        } from "next-intl/server";
import { use                     } from "react";
import { Hero                    } from "@/components/Section/Hero";
import { TextEnum                } from "@/lib/enumerations/TextEnum";
import { Testimonial             } from "@/components/Testimonials/Testimonials";
import { Logos                   } from "@/components/Logo/Logos";
import { BlogSectionSlider       } from "@/components/Blog/Blog";
import { Offers                  } from "@/components/Section/Offers";
import { NewsLetter              } from "@/components/Newsletter/NewsLetter";

import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";

function renderHero()
{
  const t = useTranslations('Hero');

  return(
    <Hero
      text={[
        { text: t('heading'), size: TextEnum.H2, className: "" },
        { text: t('description'), size: TextEnum.H1, className: "" }
      ]}
      image={{
        src: "./OMGG/Logo/Logo_OMGG.svg",
        alt: t('imageAlt'),
        className: "max-h-96"
      }}
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] min-h-[660px] lg:min-h-[690px]"
    />
  );
}

function renderAbout()
{
  const t = useTranslations('About');

  return(
    <Hero
      text={[
        { text: t('title'), size: TextEnum.H2, className: "mb-6" },
        { text: t('description'), size: TextEnum.P, className: "font-bold max-w-full md:max-w-2/3 lg:max-w-full" },
        { text: t('text'), size: TextEnum.P, className: "my-6 max-w-full md:max-w-2/3 lg:max-w-full" },
      ]}
      image={{
        src: "./OMGG/Illustrations/orange_dots.svg",
        alt: "OMGG's dots illustration",
        className: "max-h-48 items-end justify-end lg:translate-x-0 lg:translate-y-0 translate-x-3/5 -translate-y-1/3"
      }}
      buttons={{
        primary: {
          text: t('more'),
          url: "#",
        }
      }}
      className="h-max-[450px]"
    />
  );
}

function renderLogos()
{
  const t = useTranslations('Logos');

  return(
    <Logos
      heading={t('title')}
      logos={[
        {
          id: "logo-1",
          description: "Logo 1",
          image: "https://shadcnblocks.com/images/block/logos/astro-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-2",
          description: "Logo 2",
          image: "https://shadcnblocks.com/images/block/logos/figma-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-3",
          description: "Logo 3",
          image: "https://shadcnblocks.com/images/block/logos/nextjs-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-4",
          description: "Logo 4",
          image: "https://shadcnblocks.com/images/block/logos/react-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-5",
          description: "Logo 5",
          image: "https://shadcnblocks.com/images/block/logos/shadcn-ui-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-6",
          description: "Logo 6",
          image: "https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-7",
          description: "Logo 7",
          image: "https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg",
          className: "h-4 w-auto",
        },
        {
          id: "logo-8",
          description: "Logo 8",
          image: "https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg",
          className: "h-7 w-auto",
        }
      ]}
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--detail)]"
    />
  );
}

export default function Home({ params }: { params: Promise<{locale: Locale}> })
{
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <main className="w-full h-full">
      {renderHero()}

      <FadeInWhenVisible>
        {renderAbout()}
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <Offers />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        {renderLogos()}
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <Testimonial />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <BlogSectionSlider />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <NewsLetter />
      </FadeInWhenVisible>
    </main>
  );
}
