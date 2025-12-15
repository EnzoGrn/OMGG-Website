import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { dynamicComponentFactory } from "@/components/OMGG/Section/SectionLoader";
import { fetchDataSearchParams } from "@/lib/strapi";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const landingPageData = await fetchDataSearchParams({ path: 'landing-page', forceCache: true, locale: locale });

  setRequestLocale(locale);

  return (
    <main className="w-full">
      {dynamicComponentFactory(landingPageData)}
    </main>
  );
}
