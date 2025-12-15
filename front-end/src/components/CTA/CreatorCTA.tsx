import { Check, Plus } from "lucide-react";
import { Container } from "../Section/Container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { getTranslations } from "next-intl/server";

const CreatorCTA = async ({ imageSrc }: { imageSrc?: string }) => {
  const t = await getTranslations("CreatorCTA");

  return (
    <section className="py-8">
      <Container className="container relative overflow-visible space-y-6 md:space-y-8">
        <Card className="bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500/80 p-6 md:p-12">
          <CardContent className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            <div className="md:col-span-6 lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight drop-shadow-sm">
                {t('title')}
              </h1>

              <p className="mt-4 text-neutral-900/90 max-w-xl">
                {t('description')}
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-neutral-900/95 max-w-md">
                <li className="flex items-start gap-3">
                  <Check className="size-5" />
                  <span>{t('features.prototype')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-5" />
                  <span>{t('features.crossPlatform')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-5" />
                  <span>{t('features.monetization')}</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Button asChild variant='default' size='lg'>
                  <a href="submit" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 font-semibold text-neutral-900">
                    <Plus className="size-5" />
                    {t('buttons.submit')}
                  </a>
                </Button>

                <Button asChild variant='outline' size='lg'>
                  <a href="contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors duration-150 text-sm font-medium text-neutral-900">
                    {t('buttons.contact')}
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-neutral-900/80">{t('trusted')}</p>
            </div>

            {imageSrc && <div className="md:col-span-6 lg:col-span-5 flex justify-center md:justify-end select-none">
              <div className="w-full max-w-sm md:max-w-md bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/10">
                <img src={imageSrc} alt="Board game digital mockup" className="rounded-lg max-h-48 md:max-h-64 object-contain items-center w-full" />
              </div>
            </div>}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export { CreatorCTA };

