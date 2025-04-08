"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/Section/Container";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    id: "testimonial-1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    name: "Customer Name",
    role: "Position at Company",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
  },
  {
    id: "testimonial-2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    name: "Customer Name",
    role: "Position at Company",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
  },
  {
    id: "testimonial-3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    name: "Customer Name",
    role: "Position at Company",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
  },
];

const Testimonial = () => {
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
    <Container className="py-8 pb-16 overflow-visible relative">
      <img src="./OMGG/Illustrations/yellow_dots2.svg" alt="OMGG's dots illustration" className="max-w-96 max-h-48 h-1/3 w-2/3 absolute -top-8 lg:-top-16 left-1/2 -translate-x-1/2 z-0 pointer-events-none" />
      <Carousel setApi={setApi}>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <div className="container flex flex-col items-center text-center">
                <Avatar className="mb-8 size-24 select-none">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name}</AvatarFallback>
                </Avatar>
                <p className="mb-8 max-w-4xl font-medium md:px-8 lg:text-3xl">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="mb-1 text-sm font-medium md:text-lg">
                  {testimonial.name}
                </p>
                <p className="mb-2 text-sm text-muted-foreground md:text-lg">
                  {testimonial.role}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="container flex justify-center py-16">
        {testimonials.map((testimonial, index) => (
          <Button
            key={testimonial.id}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index);
            }}
          >
            <div
              className={`size-2.5 rounded-full ${index === current ? "bg-primary" : "bg-input"}`}
            />
          </Button>
        ))}
      </div>
    </Container>
  );
};

export { Testimonial };
