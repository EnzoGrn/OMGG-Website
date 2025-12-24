'use server'

import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible";
import { OMGGNewsLetter } from "@/components/OMGG/Section/NewsLetter";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function BlogLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      {children}
      <FadeInWhenVisible>
        <OMGGNewsLetter />
      </FadeInWhenVisible>
    </>
  );
}
