import FadeInWhenVisible from '@/components/Animator/Fade/FadeInWhenVisible';
import FAQ from '@/components/Section/FAQ';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Section/Container';
import { fetchFAQ } from '@/lib/strapi';

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Contact" });

  const faqs = await fetchFAQ(locale);

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <Container className="pt-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('title')}</h1>
      </Container>

      <div className="h-96 flex items-center justify-center font-extrabold text-7xl">TODO</div>

      <FadeInWhenVisible>
        <FAQ
          locale={locale}
          faqs={faqs.items}
        />
      </FadeInWhenVisible>
    </main>
  );
}
