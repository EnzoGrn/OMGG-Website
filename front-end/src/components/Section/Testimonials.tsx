"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Section/Container";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent } from "@/components/ui/carousel";
import { TestimonialSkeleton } from "@/components/Testimonials/TestimonialSkeleton";
import { TestimonialProps, TestimonialsProps } from "@/components/Testimonials/TestimonialInterface";
import { Testimonial } from "@/components/Testimonials/Testimonial";

const TestimonialSection = ({ data }: { data: TestimonialsProps }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api)
      return;
    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (!api)
      return;

    const interval = setInterval(() => {
      const count = data.testimonials.length;
      const nextIndex = (current + 1) % count;

      api.scrollTo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [api, current, data.testimonials.length]);

  if (!isLoading && data.testimonials.length === 0)
    return null;
  return (
    <Container className="pb-16 pt-32 overflow-visible relative">
      <img src="/OMGG/Illustrations/yellow_dots2.svg" alt="OMGG's dots illustration" className="max-w-96 max-h-48 h-1/3 w-2/3 absolute top-10 left-1/2 -translate-x-1/2 z-0 select-none" />
      <Carousel setApi={setApi}>
        <CarouselContent>
          {isLoading ?
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
            :
            <>
              {data.testimonials.map((testimonial: TestimonialProps, index) => (
                <Testimonial key={index} {...testimonial} />
              ))}
            </>
          }
        </CarouselContent>
      </Carousel>
      <div className="container flex justify-center py-16">
        {data.testimonials.map((testimonial: TestimonialProps, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <div className={`size-2.5 rounded-full ${index === current ? "bg-primary" : "bg-input"}`} />
          </Button>
        ))}
      </div>
    </Container>
  );
};

export { TestimonialSection };
