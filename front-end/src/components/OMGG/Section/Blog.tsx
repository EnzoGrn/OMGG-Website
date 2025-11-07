import { BlogPostProps, BlogPostsProps } from "@/components/Blog/Post/BlogPostInterface";
import { BlogSection } from "@/components/Section/Blog";
import { getLocale                     } from "@/lib/locale";
import { fetchFromStrapi               } from "@/lib/strapi";
import { JSX                           } from "react";

async function OMGGBlog({data}:  {data: BlogPostsProps}): Promise<JSX.Element> {
  const locale = await getLocale();
  const blogs = await fetchFromStrapi("articles", locale, data.maxBlog, 1, "populate", "*") as BlogPostProps[];

  data.BlogPost = blogs; 

  return (
    <BlogSection data={data} />
  );
}

export { OMGGBlog };
