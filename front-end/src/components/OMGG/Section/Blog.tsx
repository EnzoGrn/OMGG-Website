"use client";

import { ChevronLeftIcon, ChevronRightIcon       } from "lucide-react";
import { useState, useRef, useEffect, TouchEvent } from "react";
import { Button                                  } from "@/components/ui/button";
import { Container                               } from "@/components/Section/Container";
import { BlogPostSkeleton                        } from "@/components/Blog/Post/BlogPostSkeleton";
import { BlogPost                                } from "@/components/Blog/Post/BlogPost";
import { BlogPostProps                           } from "@/components/Blog/Post/BlogPostInterface";
import { useTranslations                         } from "next-intl";
import Link  from "next/link";

const blogPosts: BlogPostProps[] = [{
    id: 1,
    title: "How Marketing Analytics is Reshaping Business Strategies",
    category: "Analytics",
    date: "April 18, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    excerpt:
      "Data-driven marketing is changing how companies make decisions. Learn how to leverage analytics for better results.",
  },
  {
    id: 2,
    title: "The Rise of Video Marketing: Why You Can't Ignore It",
    category: "Video",
    date: "April 12, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    excerpt:
      "Video content has become an essential part of modern marketing strategies. Find out why and how to get started.",
  },
  {
    id: 3,
    title: "Building Customer Loyalty Through Content Marketing",
    category: "Content",
    date: "April 5, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    excerpt:
      "Create content that not only attracts but retains customers. Strategies for building long-term relationships through your content.",
  },
  {
    id: 4,
    title: "Social Media Trends That Will Dominate in 2023",
    category: "Social Media",
    date: "March 29, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
    excerpt:
      "Stay ahead of the curve with these emerging social media trends that will shape the digital landscape this year.",
  },
  {
    id: 5,
    title: "Email Marketing Personalization: Going Beyond First Name",
    category: "Email",
    date: "March 22, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    excerpt:
      "Advanced techniques for personalizing your email campaigns that go well beyond simply using a subscriber's name.",
  },
  {
    id: 6,
    title: "Sustainable Marketing: Building Eco-Friendly Campaigns",
    category: "Sustainability",
    date: "March 15, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    excerpt:
      "How to integrate sustainability into your marketing strategy and connect with environmentally conscious consumers.",
}];

const OMGGBlog = () => {
  const t = useTranslations('Blog');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSwiping   , setIsSwiping]    = useState<boolean>(false);
  const [startX      , setStartX]       = useState<number>(0);
  const [screenSize  , setScreenSize]   = useState({ isMobile: false, isTablet: false, isDesktop: false });

  const sliderRef    = useRef<HTMLDivElement>(null);

  // Calculate visible items based on screen size
  const visibleItems = screenSize.isDesktop ? 3 : screenSize.isTablet ? 2 : 1;
  const maxIndex     = Math.max(0, blogPosts.length - visibleItems);

  // Initialize and update screen size
  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;

        setScreenSize({ isMobile: width < 640, isTablet: width >= 640 && width < 1024, isDesktop: width >= 1024 });
      }
    };

    // Initial check
    updateScreenSize();

    // Listen for resize
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Ensure current index is valid when screen size changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [screenSize, maxIndex]);

  // Handle navigation
  function handlePrevious() {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        handlePrevious();
      if (e.key === "ArrowRight")
        handleNext();
    };
  
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Scroll to current index
  useEffect(() => {
    if (sliderRef.current) {
      const scrollToIndex = () => {
        if (sliderRef.current) {
          const cardWidth  = sliderRef.current.querySelector(".carousel-item")?.clientWidth || 0;
          const scrollLeft = cardWidth * currentIndex;

          sliderRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
      };

      // Small delay to ensure the DOM has updated
      const timeoutId = setTimeout(scrollToIndex, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, screenSize]);

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsSwiping(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isSwiping)
      return;

    const currentX = e.touches[0].clientX;
    const diff     = startX - currentX;

    // Prevent default to stop page scrolling during swipe
    if (Math.abs(diff) > 5)
      e.preventDefault();
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isSwiping)
      return;
    const currentX = e.changedTouches[0].clientX;
    const diff = startX - currentX;

    // Determine if swipe is significant
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex)
        handleNext();
      else if (diff < 0 && currentIndex > 0)
        handlePrevious();
    }

    setIsSwiping(false);
  };

  // Progress indicators
  const renderProgressIndicators = () => {
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-8 bg-secondary">
      <Container className="container space-y-6 md:space-y-8 relative overflow-hidden">
        <img src="./OMGG/Illustrations/orange_dots.svg" alt="OMGG's dots illustration" className="invisible lg:visible max-w-96 max-h-48 h-1/3 w-2/3 absolute top-10 right-0 -translate-x-1/2 z-0 select-none" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-4 max-w-xl text-secondary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t('heading')}
            </h2>
            <p className="text-sm md:text-base">
              {t('description')}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            role="region"
            aria-label="Blog post carousel"
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2 pt-1 md:pb-4 touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isLoading &&
              <>
                <BlogPostSkeleton />
                <BlogPostSkeleton />
                <BlogPostSkeleton />
                <BlogPostSkeleton />
              </>
            }
            {!isLoading &&
              <>
                {blogPosts.map((post: BlogPostProps) => (
                  <BlogPost key={post.id} {...post} />
                ))}
              </>
            }
          </div>

          {/* Progress indicators for mobile */}
          <div className="sm:hidden">{renderProgressIndicators()}</div>
        </div>

        <div className="flex justify-center mt-2 sm:mt-8 gap-8">
          <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentIndex === 0} aria-label="Previous slide">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link href="#" className="uppercase">{t('access')}</Link>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} disabled={currentIndex === maxIndex} aria-label="Next slide">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export { OMGGBlog };
