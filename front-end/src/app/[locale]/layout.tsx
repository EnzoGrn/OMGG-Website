import "@/app/globals.css";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OMGGNavbar } from "@/components/OMGG/Navigation/Navbar";
import { OMGGFooter } from "@/components/OMGG/Navigation/Footer";
import { fetchFromStrapi } from "@/lib/strapi"
import { Metadata } from "next";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale))
    notFound();
  setRequestLocale(locale);

  let messages = {};

  try {
    messages = await getMessages({ locale });
  } catch {
    notFound();
  }

  // Fetch global single type from Strapi
  const global = await fetchFromStrapi("global", true, locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <OMGGNavbar global={global?.navbar} />
          {children}
          <OMGGFooter global={global?.footer} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
