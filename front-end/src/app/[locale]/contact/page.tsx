import FadeInWhenVisible from '@/components/Animator/Fade/FadeInWhenVisible';
import FAQ from '@/components/Section/FAQ';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Section/Container';

export default async function LegalDocumentPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <main className="h-full w-full overflow-hidden">
      <Container className="pt-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('title')}</h1>
      </Container>

      <div className="h-96 flex items-center justify-center font-extrabold text-7xl">TODO</div>

      <FadeInWhenVisible>
        <FAQ
          locale={locale}
          faqsIds={['faq-1', 'faq-2', 'faq-3', 'faq-4', 'faq-5', 'faq-6', 'faq-7', 'faq-8']}
        />
      </FadeInWhenVisible>
    </main>
  );
}
