import { Locale } from "next-intl";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  return (
    <main className="w-full h-full">
      <p>Privacy Policy</p>
    </main>
  );
}
