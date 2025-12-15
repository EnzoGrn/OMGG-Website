'use server';

import { Locale } from 'next-intl';
import PrivacyDocument from '@/components/OMGG/Privacy/PrivacyDocument';
import { setRequestLocale } from 'next-intl/server';
import { fetchDataSearchParams } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export default async function LegalDocumentPage({ params }: { params: Promise<{ slug: string; locale: Locale }> }) {
  const { slug, locale } = await params;

  setRequestLocale(locale);

  // Get the data of the game
  const legalDocumentDataRes = await fetchDataSearchParams({
    path: 'legal-documents/' + slug,
    forceCache: true,
    locale: locale
  });

  if (legalDocumentDataRes === undefined || legalDocumentDataRes?.data === null)
    return notFound();
  return (
    <PrivacyDocument title={legalDocumentDataRes.data.title} updatedAt={legalDocumentDataRes.data.updatedAt} markdown={legalDocumentDataRes.data.markdown} />
  );
}
