import { Locale                            } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata                     } from "next";
import { dynamicComponentFactory           } from "@/components/OMGG/Section/SectionLoader";
import { fetchDataSearchParams, fetchFromStrapi                   } from "@/lib/strapi";

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
  // const landingPageData = await fetchFromStrapi("landing-page", locale);
  const landingPageData = await fetchDataSearchParams({ path: 'landing-page', forceCache: false, locale: locale});

  setRequestLocale(locale);

  console.log("[Home]: landingPageData -> ", landingPageData)

  return (
    <main className="w-full h-full">
      {dynamicComponentFactory(landingPageData)}
    </main>
  );
}
