import { Locale, useTranslations           } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OMGGNewsLetter                    } from "@/components/OMGG/Section/NewsLetter";
import { MediaGallery                      } from "@/components/Section/MediaGallery";
import { HeroTrailerView                   } from "@/components/Trailer/HeroTrailerView";
import { DownloadCTA                       } from "@/components/CTA/DownloadCTA";
import { HeroSection                       } from "@/components/Section/Hero";
import { TextEnum                          } from "@/lib/enumerations/TextEnum";
import type { Metadata                     } from "next";

import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata>
{
  const { locale } = await params;
  const t          = await getTranslations({ locale, namespace: "Games" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description")
    }
  };
}

const HeroTrailerSection = () => {
  const t = useTranslations('Games.hero');

  const genre = t.raw("genre") as string[];

  return(
    <HeroTrailerView 
      title={t('title')}
      badge={t('badge')}
      genre={genre}
      platforms={['Windows']}
      button={{
        title: t('download'),
        url: '/Vermines/VerminesInstaller.exe'
      }}
    />
  );
}

const AboutSection = () => {
  const t = useTranslations('Games.about');

  return(
    <HeroSection
      image={{
        src: "/OMGG/Illustrations/orange_dots.svg",
        alt: "OMGG's dots illustration",
        className: "max-h-48 items-end justify-end lg:translate-x-0 lg:translate-y-0 translate-x-3/5 -translate-y-1/3"
      }}
      className={"h-max-[450px]"}
      text={[
        { text: t('heading'), size: TextEnum.H2, className: "mb-6"},
        { text: t('description'), size: TextEnum.P , className: "my-6 max-w-full md:max-w-2/3 lg:max-w-full"      }
      ]}
    />
  );
}

const CTASection = () => {
  const t = useTranslations('Games.cta');

  return (
    <DownloadCTA
      heading={t('heading')}
      description={t('subtitle')}
      button={{
        text: t('download'),
        url: "/Vermines/VerminesInstaller.exe"
      }} />
  );
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> })
{
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main className="w-full h-full overflow-hidden">
      <HeroTrailerSection />

      <FadeInWhenVisible>
        <MediaGallery />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <AboutSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <CTASection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGNewsLetter />
      </FadeInWhenVisible>
    </main>
  );
}
