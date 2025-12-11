import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { LogoProps, TextProps } from "@/components/Section/Interface";
import { dynamicComponentFactory } from "@/components/OMGG/Section/SectionLoader";
import { fetchDataSearchParams, getMediaFromUrl } from "@/lib/strapi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: Locale }> }): Promise<Metadata> {
  const { slug, locale } = await params;

  const gameDataRes = await fetchDataSearchParams({
    path: 'games/' + slug,
    forceCache: true,
    locale: locale
  });

  const seo = gameDataRes.data.SEO;

  let metaData = {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription
    },
    twitter: {
      title: seo.metaTitle,
      description: seo.metaDescription
    },
    icons: [{
      url: getMediaFromUrl(seo.shareImage?.url),
      type: 'image/png',
      sizes: '1200x630'
    }]
  };

  return metaData;
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
  releaseDate?: string;
  background: LogoProps;
  platforms: PlatformProps[];
  genrers: GenrerProps[];
  gallery: GalleryProps;
  download: DownloadProps;
  pngIllustration: LogoProps;
}

export default async function Home({ params }: { params: Promise<{ slug: string; locale: Locale }> }) {
  const { slug, locale } = await params;

  setRequestLocale(locale);

  // Get page data with cache to avoid multi fecth
  const gamePageData = await fetchDataSearchParams({ path: 'games-page', forceCache: true, locale: locale });

  // Get the data of the game
  const gameDataRes = await fetchDataSearchParams({
    path: 'games/' + slug,
    forceCache: true,
    locale: locale
  });

  if (gameDataRes === undefined || gameDataRes?.data === null)
    return notFound();

  gamePageData.gameData = gameDataRes;

  return (
    <main className="w-full min-h-screen overflow-hidden">
      {/* {slug} */}
      {dynamicComponentFactory(gamePageData)}
    </main>
  );
}