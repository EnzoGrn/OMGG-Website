import { getTranslations } from "next-intl/server";
import { SSection } from "./Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Locale } from "next-intl";
import ReactMarkdown from 'react-markdown';

export default async function FAQ({ faqs, locale }: { faqs: { id: number, question: string, answers: string }[], locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Contact.FAQ' });

  return (
    <SSection padding='py-8'>
      <div className="mx-auto flex flex-col text-left border-b">
        <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
          {t('title')}
        </h2>
      </div>
      <Accordion type="single" collapsible className="mx-auto w-full">
        {faqs.map((faq: { id: number, question: string, answers: string }) => (
          <AccordionItem key={faq.id} value={faq.id.toString()}>
            <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
              <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="sm:mb-1 lg:mb-2">
              <div className="text-muted-foreground lg:text-lg max-w-none">
                <ReactMarkdown
                  components={{
                    a: ({ node, children, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-primary">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {faq.answers}
                </ReactMarkdown>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SSection>
  );
}