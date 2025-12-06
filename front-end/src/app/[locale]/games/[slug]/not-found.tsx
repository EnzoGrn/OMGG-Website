import { Locale, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import React from "react";
import { PSection } from '@/components/Section/Section';
import { getTranslations } from 'next-intl/server';

// Usage:
// Place an image at /public/board-mockup.png or pass `imageSrc` prop.
// <HeroCTA imageSrc="/board-mockup.png" />
function HeroCTA({ imageSrc }: { imageSrc?: string }) {
  return (
    <section className="w-full bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500/80 p-6 md:p-12 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* LEFT: Text + CTA */}
        <div className="md:col-span-6 lg:col-span-7">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight drop-shadow-sm">
            Turn your board game into a premium
            <span className="block text-neutral-900/95">digital experience.</span>
          </h1>

          <p className="mt-4 text-neutral-900/90 max-w-xl">
            OMGG transforms your creation into a faithful, polished and fully playable digital version —
            ready for players worldwide.
          </p>

          <ul className="mt-6 grid gap-2 text-sm text-neutral-900/95 max-w-md">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Fully playable prototype in weeks</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Cross-platform (Web, Mobile, Desktop)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Monetization-ready: subscriptions, cosmetics, tournaments</span>
            </li>
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="#submit"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 font-semibold text-neutral-900"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submit your game
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors duration-150 text-sm font-medium text-neutral-900"
            >
              Contact us
            </a>
          </div>

          <p className="mt-4 text-xs text-neutral-900/80">Trusted by authors & publishers expanding to digital.</p>
        </div>

        {/* RIGHT: Visual mockup */}
        <div className="md:col-span-6 lg:col-span-5 flex justify-center md:justify-end">
          <div className="w-full max-w-sm md:max-w-md bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/10">
            {imageSrc ? (
              // If you have a real image, use an img tag
              <img src={imageSrc} alt="Board game digital mockup" className="rounded-lg w-full h-auto object-cover" />
            ) : (
              // Otherwise a simple illustrative placeholder
              <div className="w-full h-48 md:h-64 flex items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/5">
                <div className="text-center text-neutral-50/90">
                  <svg className="mx-auto mb-2 w-12 h-12 opacity-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-sm">Board / Cards mockup</div>
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-neutral-900/80">Preview: faithful UI, mobile & desktop templates</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function GamesNotFound() {
  const t = await getTranslations("Games.NotFound");

  return (
    <main className="w-full h-full overflow-hidden">
      <PSection padding={'py-8'} className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12">
        <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4 drop-shadow-2xl">
            <Image
              src="/OMGG/Illustrations/happy_omgg.webp"
              alt="Happy OMGG Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t('title')}
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {t('description')}
          </p>

          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="/games">
              {t('backToGames')}
            </Link>
          </Button>
        </div>
      </PSection>
    </main>
  );
}
