import { Section                                   } from "@/components/Section/Section";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button                                    } from "@/components/ui/button";
import { useTranslations                           } from "next-intl";
import Link from "next/link";

const Offers = () => {
  const t = useTranslations('About');

  return (
    <Section padding={"pb-12"}>
      <div className="grid items-center gap-8 lg:grid-cols-2 w-full relative">
        <img src="./OMGG/Illustrations/red_dots.svg" alt="OMGG's dots illustration" className="h-2/3 w-2/3 absolute bottom-28 md:-bottom-44 right-2/3 -z-10 select-none" />
        <Card className="h-full w-full flex flex-col gap-8 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-secondary">
          <CardHeader>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary-foreground">
              {t('card1.header')}
            </h2>
          </CardHeader>

          <CardContent className="flex-grow flex flex-col justify-between text-secondary-foreground">
            {t('card1.text')}
          </CardContent>

          <CardFooter className="px-5 pb-5 pt-0">
            <Button asChild size="sm" className="text-sm group justify-start text-primary-foreground max-w-[220px]">
              <Link href="#" className="flex items-center uppercase">
                {t('card1.footer')}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-full w-full flex flex-col gap-8 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-secondary">
          <CardHeader>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary-foreground">
              {t('card2.header')}
            </h2>
          </CardHeader>

          <CardContent className="flex-grow flex flex-col justify-between text-secondary-foreground">
            {t('card2.text')}
          </CardContent>

          <CardFooter className="px-5 pb-5 pt-0">
            <Button asChild size="sm" className="w-full text-sm group justify-center text-primary-foreground max-w-[220px]">
              <Link href="#" className="flex items-center uppercase">
                {t('card2.footer')}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  );
};

export { Offers };
