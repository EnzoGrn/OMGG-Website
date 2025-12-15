'use client';

import { useRouter } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Container } from "@/components/Section/Container";
import { useTranslations, useFormatter } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from 'react';

type PrivacyProps = {
  title: string;
  updatedAt: string;
  markdown: string;
};

export default function PrivacyDocument({ title, updatedAt, markdown }: PrivacyProps) {
  const t = useTranslations('Privacy');
  const format = useFormatter();
  const router = useRouter();

  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Parse markdown to extract headings
    const lines = markdown.split('\n');
    const extractedHeadings: { id: string; text: string; level: number }[] = [];

    lines.forEach(line => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);

      if (match) {
        const level = match[1].length;
        const text = match[2];

        // Create ID from text: "1. Introduction" -> "1-introduction"
        const id = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-')         // Replace spaces with hyphens
          .replace(/\.+/g, '');         // Remove dots

        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
  }, [markdown]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 100;

      let current = '';

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (element && element.offsetTop - offset <= scrollY)
          current = heading.id;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="w-full h-full bg-background text-foreground">
      <section className="bg-muted border-b border-border pb-4">
        <Container className="pt-8 pb-4">
          <div className="flex flex-col space-y-6">
            <Button
              variant="ghost"
              className="w-fit pl-0 hover:bg-transparent hover:text-primary group"
              onClick={() => router.back()}
            >
              <div className="flex items-center gap-2 text-lg text-primary">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                {t('back')}
              </div>
            </Button>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('lastUpdated')} <span className="font-medium text-foreground">{format.dateTime(new Date(updatedAt), { year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-16 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 lg:gap-24 relative">
          <aside className="hidden md:block">
            <div className="sticky top-32 space-y-4">
              <nav className="flex flex-col space-y-1">
                {headings.length === 0 ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`py-2 ${i % 3 === 0 ? 'pl-4' : 'pl-8'}`}>
                      <Skeleton className="h-4 w-full max-w-[180px]" />
                    </div>
                  ))
                ) : (
                  headings.map((heading) => (
                    <div
                      key={heading.id}
                      onClick={() => scrollToSection(heading.id)}
                      className={`
                          text-sm font-medium transition-colors py-2 
                          border-l-2 cursor-pointer
                          ${heading.level === 1 ? 'pl-4 font-bold' : 'pl-8'}
                          ${activeSection === heading.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/50'}
                        `}
                    >
                      {heading.text}
                    </div>
                  ))
                )}
              </nav>
            </div>
          </aside>

          <article className="prose prose-lg prose-neutral dark:prose-invert 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-h1:text-3xl prose-h2:text-2xl 
              prose-p:text-muted-foreground prose-p:leading-7
              prose-li:text-muted-foreground
              max-w-none"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => {
                  const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/\.+/g, '');

                  return <h1 id={id} className="scroll-mt-24">{children}</h1>
                },
                h2: ({ children }) => {
                  const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/\.+/g, '');

                  return <h2 id={id} className="scroll-mt-24">{children}</h2>
                }
              }}
            >
              {markdown}
            </ReactMarkdown>
          </article>
        </div>
      </Container>
    </main>
  );
}
