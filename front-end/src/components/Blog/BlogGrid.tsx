"use client";

import { BlogPostProps } from "@/components/Blog/Post/BlogPostInterface"
import { BlogFilters } from "@/components/Blog/BlogFilters"
import { BlogPostSkeleton } from "@/components/Blog/Post/BlogPostSkeleton"
import { Button } from "@/components/ui/button"
import { SearchX, Loader2 } from "lucide-react";
import { Locale } from "next-intl"
import { useState, useMemo, useEffect, useRef } from "react"
import { Container } from "../Section/Container";
import { BlogPost } from "./Post/BlogPost";
import { getBlogPosts } from "@/lib/blog"

interface BlogGridProps {
  posts: BlogPostProps[];
  locale: Locale;
  translations: {
    searchPlaceholder: string;
    allCategories: string;
    searchButton: string;
    resetFilters: string;
    readMore: string;
    loadMore: string;
    noResults: {
      title: string;
      description: string;
    };
    dateFilter: {
      title: string;
      startDate: string;
      endDate: string;
      filterButton: string;
      cancel: string;
    };
  };
}

const PAGE_SIZE = 6;

const BlogGrid = ({ posts, locale, translations }: BlogGridProps) => {
  const [filters, setFilters] = useState<{
    search: string;
    category: string;
    startDate: Date | undefined;
    endDate: Date | undefined
  }>({
    search: "",
    category: "",
    startDate: undefined,
    endDate: undefined
  });

  const [displayedPosts, setDisplayedPosts] = useState<BlogPostProps[]>(posts);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(posts.length >= PAGE_SIZE);

  // Use ref to skip initial fetch on mount since we have props
  const isFirstRender = useRef(true);

  // Extract unique categories from initial posts (or could fetch all categories separately, but this is fine for now)
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(post => post.category.name));
    return Array.from(uniqueCategories);
  }, [posts]);

  // Refetch when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchFilteredPosts = async () => {
      setIsLoading(true);

      const { data, meta } = await getBlogPosts({
        ...filters,
        page: 1,
        pageSize: PAGE_SIZE,
        locale
      });

      setDisplayedPosts(data);
      setCurrentPage(1);
      setHasMore(meta?.pagination ? meta.pagination.page < meta.pagination.pageCount : data.length >= PAGE_SIZE);
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      fetchFilteredPosts();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, locale]);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    const { data, meta } = await getBlogPosts({
      ...filters,
      page: nextPage,
      pageSize: PAGE_SIZE,
      locale
    });

    setDisplayedPosts(prev => [...prev, ...data]);
    setCurrentPage(nextPage);
    setHasMore(meta?.pagination ? meta.pagination.page < meta.pagination.pageCount : data.length >= PAGE_SIZE);
    setIsLoadingMore(false);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "",
      startDate: undefined,
      endDate: undefined
    });
  };

  return (
    <Container className="py-12 relative">
      <div className="space-y-8">
        <BlogFilters
          categories={categories}
          filters={filters}
          onFilter={setFilters}
          translations={{
            searchPlaceholder: translations.searchPlaceholder,
            allCategories: translations.allCategories,
            searchButton: translations.searchButton,
            dateFilter: translations.dateFilter,
          }}
          locale={locale}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogPostSkeleton key={index} />
            ))}
          </div>
        ) : displayedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
              {displayedPosts.map((post, index) => (
                <BlogPost
                  key={`${post.id}-${index}`}
                  post={post}
                  locale={locale}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-8">
                <Button
                  size="lg"
                  variant="default"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="min-w-[200px]"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    translations.loadMore
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-in fade-in zoom-in duration-300 min-h-[400px]">
            <div className="bg-muted p-6 rounded-full">
              <SearchX className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{translations.noResults.title}</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {translations.noResults.description}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleResetFilters}
            >
              {translations.resetFilters}
            </Button>
          </div>
        )}
      </div>

    </Container>
  );
}

export { BlogGrid }
