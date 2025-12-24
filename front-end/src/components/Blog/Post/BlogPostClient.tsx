"use client";

import { useRouter } from '@/i18n/navigation';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Container } from "@/components/Section/Container";
import { useTranslations, useFormatter } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useMemo } from 'react';
import { getMediaFromUrl } from '@/lib/strapi';
import { BlogPostProps } from './BlogPostInterface';
import { Skeleton } from '@/components/ui/skeleton';

interface ArticleBlock {
  __component: string;
  id: number;
  body?: string;
  [key: string]: any;
}

interface BlogPostClientProps {
  article: BlogPostProps & { blocks?: ArticleBlock[]; content?: string };
  locale: string;
}

export default function BlogPostClient({ article, locale }: BlogPostClientProps) {
  const t = useTranslations('Blog');
  const format = useFormatter();
  const router = useRouter();

  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  const markdownContent = useMemo(() => {
    if (article.content)
      return article.content;
    if (article.blocks && Array.isArray(article.blocks))
      return article.blocks.filter(block => block.__component === 'shared.rich-text' || block.body).map(block => block.body || '').join('\n\n');
    return '';
  }, [article]);

  const readingTime = useMemo(() => {
    const words = markdownContent.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);

    return `${minutes} min`;
  }, [markdownContent]);

  useEffect(() => {
    if (!markdownContent)
      return;
    const lines = markdownContent.split('\n');
    const extractedHeadings: { id: string; text: string; level: number }[] = [];

    lines.forEach(line => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);

      if (match) {
        const level = match[1].length;
        const text = match[2].trim();

        const id = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/\.+/g, '');

        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
  }, [markdownContent]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = -window.innerHeight;

      let current = '';

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (element && element.offsetTop - offset <= scrollY)
          current = heading.id;
      }

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        if (headings.length > 0)
          current = headings[headings.length - 1].id;
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
    <main className="w-full h-full bg-background text-foreground pb-8">
      <section className="bg-muted border-b border-border pb-4">
        <Container className="pt-8 pb-4">
          <div className="flex flex-col space-y-6">
            <Button variant="ghost" className="w-fit pl-0 hover:bg-transparent hover:text-primary group" onClick={() => router.push(`/blog`)}>
              <div className="flex items-center gap-2 text-lg text-primary">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                {t('backToBlog')}
              </div>
            </Button>

            <div className="space-y-2">
              {article.category && (
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium uppercase tracking-wider">
                  {article.category.name}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {article.title}
              </h1>
              <div className="flex items-center text-sm text-muted-foreground gap-1">
                <Calendar className="h-3 w-3" />
                {format.dateTime(new Date(article.publishedAt), { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              {article.author && (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-foreground">{article.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} read
              </div>
            </div>
          </div>
        </Container>
      </section>

      {article.cover && (
        <Container className="py-12 lg:py-20">
          <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl shadow-xl border bg-muted">
            <img
              src={getMediaFromUrl(article.cover.url)}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        </Container>
      )}

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-24 relative items-start">

          <aside className="hidden lg:block sticky top-32">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 mb-6">
                {t('aside')}
              </h4>
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
                        text-left text-sm py-2 px-3 transition-colors duration-200 border-l-2 cursor-pointer
                        ${heading.level === 1 ? 'pl-4 font-bold' : heading.level === 2 ? 'pl-8' : 'pl-12'}
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

          {/* Article Content */}
          <article className="prose prose-lg prose-gray dark:prose-invert 
              max-w-none w-full
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-32
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-li:marker:text-primary
              "
          >
            {markdownContent && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }) => (
                    <img {...props} className="aspect-video max-h-[500px] w-full rounded-xl shadow-md border bg-muted object-cover my-6" />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="my-8 w-full overflow-y-auto rounded-lg border shadow-sm bg-card/50">
                      <table className="w-full caption-bottom text-sm py-0 my-0" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="[&_tr]:border-b bg-muted/50" {...props} />,
                  tbody: ({ node, ...props }) => <tbody className="[&_tr:last-child]:border-0" {...props} />,
                  tr: ({ node, ...props }) => <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props} />,
                  th: ({ node, ...props }) => <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" {...props} />,
                  td: ({ node, ...props }) => <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props} />,
                  h1: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/\.+/g, '');

                    return <h1 id={id} className="scroll-mt-24 text-3xl font-bold mt-10 mb-6 pb-2 border-b">{children}</h1>
                  },
                  h2: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/\.+/g, '');

                    return <h2 id={id} className="scroll-mt-24 text-2xl font-bold mt-8 mb-4">{children}</h2>
                  },
                  h3: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/\.+/g, '');

                    return <h3 id={id} className="scroll-mt-24 text-xl font-semibold mt-6 mb-3">{children}</h3>
                  }
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            )}
          </article>

        </div>
      </Container>
    </main>
  );
}
