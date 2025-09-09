import { Locale                            } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OMGGTestimonials                  } from "@/components/OMGG/Section/Testimonials";
import { OMGGBlog                          } from "@/components/OMGG/Section/Blog";
import { OMGGOffers                        } from "@/components/OMGG/Section/Offers";
import { OMGGNewsLetter                    } from "@/components/OMGG/Section/NewsLetter";
import { OMGGHero                          } from "@/components/OMGG/Section/Hero";
import { OMGGAbout                         } from "@/components/OMGG/Section/About";
import { OMGGLogos                         } from "@/components/OMGG/Section/Logos";
import type { Metadata                     } from "next";

import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t          = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> })
{
  const { locale } = await params;

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
