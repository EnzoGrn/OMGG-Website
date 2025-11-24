import { Locale                            } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroTrailerView                   } from "@/components/Trailer/HeroTrailerView";
import type { Metadata                     } from "next";

import { ButtonProps, LogoProps, TextProps } from "@/components/Section/Interface";
import { dynamicComponentFactory           } from "@/components/OMGG/Section/SectionLoader";
import { fetchDataSearchParams             } from "@/lib/strapi";
import { DownloadCTA, DownloadCTAProps     } from "@/components/CTA/DownloadCTA";
import { notFound                          } from "next/navigation";

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

interface IconProps {
  isSlugIcon: boolean;
  url: string;
  text: string;
  slugIcon?: string;
  icon?: LogoProps; // TODO: Rename it mediaProps or imageProps
}

interface PlatformProps {
  icon: IconProps;
}

interface GenrerProps {
  name: string;
}

export interface GalleryProps {
  assets: LogoProps[];
}

interface DownloadProps {
  url: string;
}

export interface GameProps {
  name: string;
  description: TextProps;
  slug: string;
  isNew: boolean;
  background: LogoProps;
  platforms: PlatformProps[];
  genrers: GenrerProps[];
  gallery: GalleryProps;
  download: DownloadProps;
  pngIllustration: LogoProps;
}

export interface HeroTrailerSectionProps {
  downloadButton: ButtonProps;
}

const HeroTrailerSection = ({data, additionalData} : {data: HeroTrailerSectionProps, additionalData: GameProps}) => {

  return(
    <>
      {data && additionalData ? (
        <HeroTrailerView gameProps={additionalData} data={data}/>
      ) : (
        <></>
      )}
    </>
  );
}

const CTASection = ({data, additionalData} : {data: DownloadCTAProps, additionalData: GameProps}) => {

  return (
    <DownloadCTA data={data} additionalData={additionalData}/>
  );
}

export default async function Home({ params }: { params: Promise<{ slug: string; locale: Locale }> })
{
  const { slug, locale } = await params;
  
  setRequestLocale(locale);

  // Get page data with cache to avoid multi fecth
  const gamePageData = await fetchDataSearchParams({ path: 'games-page', forceCache: true, locale: locale});

  // Get the data of the game
  const gameDataRes = await fetchDataSearchParams({
    path:         'games/' + slug,
    forceCache:   true,
    locale:       locale
  });
  
  if (gameDataRes == undefined || gameDataRes?.data == null)
    return notFound();

  gamePageData.gameData = gameDataRes;

  return (
    <main className="w-full h-full overflow-hidden">
      {/* {slug} */}
      {dynamicComponentFactory(gamePageData)}
    </main>
  );
}

export { HeroTrailerSection, HeroTrailerView, CTASection }