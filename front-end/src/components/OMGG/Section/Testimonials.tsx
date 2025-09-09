"use client";

import { useEffect, useState                    } from "react";
import { Container                              } from "@/components/Section/Container";
import { Button                                 } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent } from "@/components/ui/carousel";
import { TestimonialSkeleton                    } from "@/components/Testimonials/TestimonialSkeleton";
import { TestimonialProps                       } from "@/components/Testimonials/TestimonialInterface";
import { Testimonial                            } from "@/components/Testimonials/Testimonial";

const testimonials: TestimonialProps[] = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    name: "Customer Name",
    role: "Position at Company",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    name: "Customer Name",
    role: "Position at Company",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    name: "Customer Name",
    role: "Position at Company",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
  },
];

const OMGGTestimonials = () => {
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
      const count     = testimonials.length;
      const nextIndex = (current + 1) % count;

      api.scrollTo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [api, current]);

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
              {testimonials.map((testimonial: TestimonialProps) => (
                <Testimonial key={testimonial.id} {...testimonial} />
              ))}
            </>
          }
        </CarouselContent>
      </Carousel>
      <div className="container flex justify-center py-16">
        {testimonials.map((testimonial, index) => (
          <Button
            key={isLoading ? index : testimonial.id}
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

export { OMGGTestimonials };
