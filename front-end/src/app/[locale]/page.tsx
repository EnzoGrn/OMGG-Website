import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { dynamicComponentFactory } from "@/components/OMGG/Section/SectionLoader";
import { fetchDataSearchParams } from "@/lib/strapi";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const landingPageData = await fetchDataSearchParams({ path: 'landing-page', forceCache: true, locale: locale });

  setRequestLocale(locale);

  return (
    <main className="w-full min-h-screen">
      {dynamicComponentFactory(landingPageData)}
    </main>
  );
}
