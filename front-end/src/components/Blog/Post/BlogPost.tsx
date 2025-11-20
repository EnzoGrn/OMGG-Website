import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRightIcon, CalendarIcon  } from "lucide-react"
import { BlogPostProps                 } from "@/components/Blog/Post/BlogPostInterface"
import { Badge                         } from "@/components/ui/badge"
import { Button                        } from "@/components/ui/button"
import { Locale, useTranslations               } from "next-intl";
import { getMediaFromUrl               } from "@/lib/strapi"
import Link from "next/link"


const BlogPost = ({post, locale}: {post: BlogPostProps, locale: Locale}) => {
  const t = useTranslations("Blog");
  
  return (
    <div className="carousel-item flex-none w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4 snap-start">
      <Card className="py-0 h-full flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-background">
        
        {/* Image */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-b-none">
          <img src={getMediaFromUrl(post.cover.url)} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          <div className="absolute top-4 left-4 z-10">
            <Badge className="backdrop-blur bg-white/30 text-white shadow-sm px-3 py-1 rounded-full text-xs font-medium">
              {post.category.name}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-grow flex flex-col justify-between">

          {/* Date */}
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>
              {/* TODO: Change the string to the right language */}
              {
                new Date(post.publishedAt).toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
              }
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg sm:text-xl leading-snug mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-2 sm:line-clamp-3">
            {post.description}
          </p>
        </CardContent>

        <CardFooter className="px-5 pb-5 pt-0">
          <Button variant="ghost" size="sm" className="w-full text-sm group justify-start text-primary" asChild aria-label={t('read')}>
            <Link href="#" className="flex items-center" aria-label={t('read')}>
              {t('read')}
              <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { BlogPost }
