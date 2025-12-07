import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import React from "react";
import { getTranslations } from 'next-intl/server';
import NotFound from '@/components/OMGG/Error/404';

export default async function NotFoundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const t = await getTranslations({ locale: locale, namespace: "NotFound" });

  return (
    <NotFound title={t('title')} description={t('description')} button={
      <Button asChild size="lg" className="rounded-full px-8 text-base">
        <Link href={`/`}>
          {t('backToHome')}
        </Link>
      </Button>
    } />
  );
}
