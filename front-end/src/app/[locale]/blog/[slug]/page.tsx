import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { fetchDataSearchParams } from "@/lib/strapi";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/Blog/Post/BlogPostClient";
import { CreatorCTA } from "@/components/CTA/CreatorCTA";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: Locale }> }): Promise<Metadata> {
  const { slug, locale } = await params;

  const articleDataRes = await fetchDataSearchParams({
    path: 'articles',
    forceCache: true,
    locale: locale,
    searchParams: {
      "filters[slug][$eq]": slug,
      populate: 'SEO'
    }
  });

  if (articleDataRes === undefined || articleDataRes === null || articleDataRes?.data === null || articleDataRes.data.length === 0) {
    const t = await getTranslations({ locale, namespace: "Blog.metadata" });

    return {
      title: t("title"),
      description: t("description"),
      openGraph: {
        title: t("title"),
        description: t("description"),
      },
    };
  }

  const article = articleDataRes.data[0];
  const seo = article.SEO;

  if (seo) {
    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription
      },
      twitter: {
        title: seo.metaTitle,
        description: seo.metaDescription
      }
    };
  } else {
    return {
      title: article.title,
      description: article.description,
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: Locale }> }) {
  const { slug, locale } = await params;

  setRequestLocale(locale);

  const articleDataRes = await fetchDataSearchParams({
    path: `articles`,
    forceCache: true,
    locale: locale,
    searchParams: {
      "filters[slug][$eq]": slug,
      populate: '*'
    }
  });

  if (articleDataRes === undefined || articleDataRes === null || articleDataRes?.data === null || articleDataRes.data.length === 0)
    return notFound();
  const article = articleDataRes.data[0];

  return (
    <BlogPostClient article={article} locale={locale} />
  );
}