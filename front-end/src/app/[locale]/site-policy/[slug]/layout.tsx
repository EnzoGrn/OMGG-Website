'use server'

import { fetchDataSearchParams } from "@/lib/strapi";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export async function generateStaticParams({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  const documents = await fetchDataSearchParams({ path: "legal-documents", forceCache: true, locale: locale });

  return documents.data.map((document: { slug: string }) => ({
    slug: document.slug,
    locale: locale
  }))
}

export default async function LegalDocumentLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string; locale: Locale }> }) {
  // Params contains the policy document slug
  // If the route is like /site-policy/privacy, then params.slug is privacy
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      {children}
    </>
  );
}
