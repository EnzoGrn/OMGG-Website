import "@/app/globals.css";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale             } from "next-intl/server";
import { notFound                                  } from "next/navigation";
import { routing                                   } from "@/i18n/routing";
import { OMGGNavbar                                } from "@/components/OMGG/Navigation/Navbar";
import { OMGGFooter                                } from "@/components/OMGG/Navigation/Footer";
import { fetchFromStrapi                           } from "@/lib/strapi"

export function generateStaticParams()
{
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{locale: Locale}>}>) {
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
  const global = await fetchFromStrapi("global", locale);
  
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background">
        <NextIntlClientProvider messages={messages}>
          <OMGGNavbar locale={locale} global={global?.navbar} />
          {children}
          <OMGGFooter locale={locale} global={global?.footer}/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
