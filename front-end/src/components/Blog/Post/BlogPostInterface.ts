import { LogoProps } from "@/components/Section/Interface";

export interface AuthorProps {
    name: string;
}

export interface Category {
    name: string
}

export interface BlogPostProps {
    title:       string;
    description: string;
    publishedAt: string;
    author:      AuthorProps;
    category:    Category;
    cover:       LogoProps;
    excerpt:     string;
}

export interface BlogPostsProps {
    title:         string;
    description:   string;
    maxBlog:       number;
    BlogPost: BlogPostProps[];
}
