import { Locale } from "next-intl";

export function getBlogPostUrl(slug: string, locale: Locale): string {
  const blogBaseUrl = process.env.NEXT_PUBLIC_BLOG_BASE_URL;

  if (blogBaseUrl)
    return `${blogBaseUrl}/${locale}/${slug}`;
  return `/${locale}/blog/${slug}`;
}

export function getBlogIndexUrl(locale: Locale): string {
  const blogBaseUrl = process.env.NEXT_PUBLIC_BLOG_BASE_URL;

  if (blogBaseUrl)
    return `${blogBaseUrl}/${locale}`;
  return `/${locale}/blog`;
}
