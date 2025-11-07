import { Locale                            } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata                     } from "next";
import { dynamicComponentFactory           } from "@/components/OMGG/Section/SectionLoader";
import { fetchFromStrapi                   } from "@/lib/strapi";

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
  const landingPageData = await fetchFromStrapi("landing-page", locale);

  setRequestLocale(locale);

  console.log("[Home]: landingPageData dump")
  console.log(landingPageData);
  console.log("[Home]: landingPageData locale")
  console.log(locale);

  return (
    <main className="w-full h-full">
      {dynamicComponentFactory(landingPageData.blocks)}
    </main>
  );
}
