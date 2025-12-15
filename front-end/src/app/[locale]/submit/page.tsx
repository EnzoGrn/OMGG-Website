import { Locale } from 'next-intl';
import { Container } from '@/components/Section/Container';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SubmitGameForm } from '@/components/Submit/SubmitGameForm';

export default async function SubmitGamesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "SubmitGames" });

  return (
    <main className="w-full overflow-hidden">
      <Container className="pt-8 space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{t("title")}</h1>
        <p className="text-xl md:text-2xl lg:text-3xl tracking-tight text-muted-foreground">{t("description")}</p>
      </Container>

      <SubmitGameForm />
    </main>
  );
}
