import { Locale } from "next-intl";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <main className="w-full h-full">
      <p>Privacy Policy {locale}</p>
    </main>
  );
}
