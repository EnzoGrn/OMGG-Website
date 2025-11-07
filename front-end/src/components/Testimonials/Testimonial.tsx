import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CarouselItem                        } from "@/components/ui/carousel"
import { TestimonialProps                    } from "@/components/Testimonials/TestimonialInterface";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

const Testimonial = (testimonial: TestimonialProps) => {
  return (
    <CarouselItem>
      <div className="container flex flex-col items-center text-center">

        {/* Avatar */}
        <Avatar className="mb-8 size-24 select-none">
          <AvatarImage src={STRAPI_URL + testimonial.attestant.profilePicture.url} alt={testimonial.attestant.profilePicture.alternativeText} />
          <AvatarFallback>{testimonial.attestant.firstName}</AvatarFallback>
        </Avatar>

        { /* Quote */}
        <p className="mb-8 max-w-4xl font-medium md:px-8 lg:text-3xl">
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>

        {/* Name */}
        <p className="mb-1 text-sm font-medium md:text-lg">
          {testimonial.attestant.firstName + " " + testimonial.attestant.lastName}
        </p>

        {/* Role */}
        <p className="mb-2 text-sm text-muted-foreground md:text-lg">
          {testimonial.attestant.role}
        </p>
      </div>
    </CarouselItem>
  );
}

export { Testimonial }
