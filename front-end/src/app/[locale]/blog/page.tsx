import { Container } from "@/components/Section/Container"
import { BlogHero } from "@/components/Blog/BlogHero"
import { BlogGrid } from "@/components/Blog/BlogGrid"
import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Metadata } from "next"
import FadeInWhenVisible from "@/components/Animator/Fade/FadeInWhenVisible"
import { OMGGNewsLetter } from "@/components/OMGG/Section/NewsLetter"

import { getBlogPosts } from "@/lib/blog"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.metadata" });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description')
    },
    twitter: {
      title: t('title'),
      description: t('description')
    }
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const { data: articles } = await getBlogPosts({ page: 1, pageSize: 6, search: "", category: "", startDate: undefined, endDate: undefined, locale: locale });

  return (
    <main className="w-full">
      {articles && articles.length > 0 && (
        <>
          <Container className="pt-8">
            <h1 className="text-7xl font-extrabold text-start uppercase">OMGG NEWS</h1>
          </Container>
          <BlogHero post={articles[0]} />
        </>
      )}

      <FadeInWhenVisible className="relative">
        <BlogGrid
          posts={articles}
          locale={locale}
          translations={{
            searchPlaceholder: t('filters.searchPlaceholder'),
            allCategories: t('filters.allCategories'),
            searchButton: t('filters.searchButton'),
            resetFilters: t('filters.resetFilters'),
            readMore: t('readMore'),
            loadMore: t('loadMore'),
            noResults: {
              title: t('noResults.title'),
              description: t('noResults.description'),
            },
            dateFilter: {
              title: t('filters.dateFilter.title'),
              startDate: t('filters.dateFilter.startDate'),
              endDate: t('filters.dateFilter.endDate'),
              filterButton: t('filters.dateFilter.filterButton'),
              cancel: t('filters.dateFilter.cancel'),
            }
          }}
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <OMGGNewsLetter />
      </FadeInWhenVisible>
    </main>
  );
}
