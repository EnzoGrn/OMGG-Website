import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale             } from "next-intl/server";
import { notFound                                  } from "next/navigation";
import { routing                                   } from "@/i18n/routing";
import { OMGGNavbar                                } from "@/components/OMGG/Navigation/Navbar";
import { OMGGFooter                                } from "@/components/OMGG/Navigation/Footer";

import "@/app/globals.css";

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

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background">
        <NextIntlClientProvider messages={messages}>
          <OMGGNavbar locale={locale} />
          {children}
          <OMGGFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
