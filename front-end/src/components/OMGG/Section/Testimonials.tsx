import { JSX               } from "react";
import { TestimonialProps, TestimonialsProps    } from "@/components/Testimonials/TestimonialInterface";
import { fetchFromStrapi                        } from "@/lib/strapi";
import { getLocale } from "next-intl/server";
import { TestimonialSection } from "@/components/Section/Testimonials";

async function OMGGTestimonials({data}:  {data: TestimonialsProps}): Promise<JSX.Element> {
  const locale = await getLocale();
  const testimonials = await fetchFromStrapi("testimonials", locale, data.maxTestimonials, 1, "populate[attestant][populate]", "*") as TestimonialProps[];

  data.testimonials = testimonials;

  return (
    <TestimonialSection data={data}/>
  );
};

export { OMGGTestimonials };
