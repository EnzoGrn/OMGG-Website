import { Locale, useTranslations } from "next-intl";
import { setRequestLocale        } from "next-intl/server";
import { use                     } from "react";
import Image                       from "next/image";

export default function Home({ params }: { params: Promise<{locale: Locale}> })
{
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('NavbarLinks');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
        {t('portfolio')}
      </h1>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
        {t('omgg')}
      </h1>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
        {t('blog')}
      </h1>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
        {t('submit')}
      </h1>
    </div>
  );
}
