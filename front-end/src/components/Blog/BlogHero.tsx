"use client";

import { BlogPostProps } from "@/components/Blog/Post/BlogPostInterface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon, ArrowRightIcon, TagIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { getMediaFromUrl } from "@/lib/strapi"
import { getBlogPostUrl } from "@/lib/blog-url"
import Link from "next/link"
import { SSection } from "../Section/Section";

interface BlogHeroProps {
  post: BlogPostProps;
}

const BlogHero = ({ post }: BlogHeroProps) => {
  const locale = useLocale();
  const t = useTranslations("Blog");

  return (
    <div className="w-full">
      <SSection padding="py-0" className="py-8 relative">
        <Card className="overflow-hidden border-0 p-0 shadow-xl">
          <div className="grid lg:grid-cols-2">
            <CardContent className="w-full p-0 relative">
              <img src={getMediaFromUrl(post.cover.url)} alt={post.title} className="inset-0 w-full h-full object-cover" />
              <Badge variant="default" className="absolute top-4 left-4 px-4">
                {t('headlines')}
              </Badge>
            </CardContent>

            <CardHeader className="p-8 lg:p-12 grid-rows-[auto]">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex flex-wrap items-center gap-2 md:gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserIcon className="size-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TagIcon className="size-4" />
                    {post.category.name}
                  </div>
                </div>

                <div className="space-y-4">
                  <CardTitle className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold">
                    {post.title}
                  </CardTitle>

                  <CardDescription className="text-lg leading-relaxed">
                    {post.description}
                  </CardDescription>
                </div>

                <div>
                  <Button size="lg" className="group" asChild>
                    <Link href={getBlogPostUrl(post.slug, locale)} className="flex items-center gap-2">
                      {t('readMore')}
                      <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </div>
        </Card>

      </SSection>
    </div>

  );
}

export { BlogHero }
