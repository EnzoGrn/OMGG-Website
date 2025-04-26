import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CarouselItem                        } from "@/components/ui/carousel"
import { TestimonialProps                    } from "@/components/Testimonials/TestimonialInterface";

const Testimonial = (testimonial: TestimonialProps) => {
  return (
    <CarouselItem key={testimonial.id}>
      <div className="container flex flex-col items-center text-center">

        {/* Avatar */}
        <Avatar className="mb-8 size-24 select-none">
          <AvatarImage src={testimonial.avatar} />
          <AvatarFallback>{testimonial.name}</AvatarFallback>
        </Avatar>

        { /* Quote */}
        <p className="mb-8 max-w-4xl font-medium md:px-8 lg:text-3xl">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Name */}
        <p className="mb-1 text-sm font-medium md:text-lg">
          {testimonial.name}
        </p>

        {/* Role */}
        <p className="mb-2 text-sm text-muted-foreground md:text-lg">
          {testimonial.role}
        </p>
      </div>
    </CarouselItem>
  );
}

export { Testimonial }
