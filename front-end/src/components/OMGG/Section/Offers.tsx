import { PSection } from "@/components/Section/Section";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OffersProps } from "@/components/Offers/OffersInterface";

import Link from "next/link";
import { useLocale } from "next-intl";

const OMGGOffers = ({ data }: { data: OffersProps }) => {
  const locale = useLocale();

  return (
    <PSection padding={"pb-12"}>
      <div className="grid items-center gap-8 lg:grid-cols-2 w-full relative">
        <img src="/OMGG/Illustrations/red_dots.svg" alt="OMGG's dots illustration" className="h-2/3 w-2/3 absolute bottom-28 md:-bottom-44 right-2/3 -z-10 select-none" />

        {data.cards && data.cards.map((card, index) => (
          <Card className="h-full w-full flex flex-col gap-8 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-secondary" key={index}>
            <CardHeader>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary-foreground">
                {card.title}
              </h2>
            </CardHeader>

            <CardContent className="grow flex flex-col justify-between text-secondary-foreground">
              {card.description}
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <Button asChild size="sm" className="text-sm group justify-start text-primary-foreground max-w-[220px]" aria-label={card.callToAction.title}>
                <Link href={`${locale}${card.callToAction.url}`} className="flex items-center uppercase" aria-label={card.callToAction.title}>
                  {card.callToAction.title}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PSection>
  );
};

export { OMGGOffers };
