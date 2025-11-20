"use client";

import { ChevronLeftIcon, ChevronRightIcon       } from "lucide-react";
import { useState, useRef, useEffect, TouchEvent } from "react";
import { Button                                  } from "@/components/ui/button";
import { Container                               } from "@/components/Section/Container";
import { useTranslations                         } from "next-intl";
import { GalleryImagePreview                     } from "../Gallery/GalleryImagePreview";
import { GalleryImageSkeleton                    } from "../Gallery/GalleryImageSkeleton";
import { GalleryProps, GameProps } from "@/app/[locale]/games/[slug]/page";
import { LogoProps } from "./Interface";


// TODO: Remove this one because not really usefull
export interface GalleraySectionProps {
  enableAnimation: boolean
}

const MediaGallerySection = ({data, additionalData} : {data: GalleraySectionProps, additionalData?: GameProps}) => {
  const t = useTranslations('Games.gallery');

  // console.log("RUN MediaGallerySection ON", typeof window === "undefined" ? "SERVER" : "CLIENT");
  // console.log("[MediaGallerySection]: data -> ", data);
  // console.log("[MediaGallerySection]: additionalData -> ", additionalData);

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

  const gallery: GalleryProps | undefined = additionalData?.gallery;

  if (!gallery)
    return;

  // Calculate visible items based on screen size
  const visibleItems = screenSize.isDesktop ? 3 : screenSize.isTablet ? 2 : 1;
  const maxIndex     = Math.max(0, gallery.assets.length - visibleItems);

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
  }, [handlePrevious, handleNext]);

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
        <img src="/OMGG/Illustrations/orange_dots.svg" alt="OMGG's dots illustration" className="invisible lg:visible max-w-96 max-h-48 h-1/3 w-2/3 absolute top-10 right-0 -translate-x-1/2 z-0 select-none" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl max-w-xl font-bold tracking-tight text-secondary-foreground">
            {t('heading')}
          </h2>

          <div className="flex justify-center mt-2 sm:mt-8 gap-8">
            <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentIndex === 0} aria-label="Previous slide">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} disabled={currentIndex === maxIndex} aria-label="Next slide">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
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
                <GalleryImageSkeleton />
                <GalleryImageSkeleton />
                <GalleryImageSkeleton />
                <GalleryImageSkeleton />
              </>
            }
            {!isLoading &&
              <>
                {gallery.assets.map((post: LogoProps, index) => (
                  <GalleryImagePreview key={index} {...post} />
                ))}
              </>
            }
          </div>

          {/* Progress indicators for mobile */}
          <div className="sm:hidden">{renderProgressIndicators()}</div>
        </div>
      </Container>
    </section>
  );
}

export { MediaGallerySection };
