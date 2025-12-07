import { getTranslations } from "next-intl/server";
import { SSection } from "./Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Locale } from "next-intl";

export default async function FAQ({ faqsIds, locale }: { faqsIds: string[], locale: Locale }) {

  const t = await getTranslations({ locale, namespace: 'Contact.FAQ' });

  return (
    <SSection padding='py-8'>
      <div className="mx-auto flex flex-col text-left border-b">
        <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
          {t('title')}
        </h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="mx-auto w-full"
      >
        {faqsIds.map((id: string) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
              <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                {t(`items.${id}.question`)}
              </div>
            </AccordionTrigger>
            <AccordionContent className="sm:mb-1 lg:mb-2">
              <div className="text-muted-foreground lg:text-lg">
                {t.rich(`items.${id}.answer`, {
                  important: (chunks) => <strong>{chunks}</strong>,
                  mail: (chunks) => <a href="mailto:omgg.contact@gmail.com" className="font-semibold underline hover:text-primary">{chunks}</a>,
                  submit: (chunks) => <a href="/submit" className="font-semibold underline hover:text-primary">{chunks}</a>,
                  br: () => <br />
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SSection>
  );
}