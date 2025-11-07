import { JSX               } from "react";
import { TestimonialProps, TestimonialsProps    } from "@/components/Testimonials/TestimonialInterface";
import { fetchFromStrapi                        } from "@/lib/strapi";
import { getLocale } from "next-intl/server";
import { TestimonialSection } from "@/components/Section/Testimonials";

// const testimonials: TestimonialProps[] = [
//   {
//     id: 1,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
//     name: "Customer Name",
//     role: "Position at Company",
//     avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
//   },
//   {
//     id: 2,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
//     name: "Customer Name",
//     role: "Position at Company",
//     avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
//   },
//   {
//     id: 3,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
//     name: "Customer Name",
//     role: "Position at Company",
//     avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
//   },
// ];

async function OMGGTestimonials({data}:  {data: TestimonialsProps}): Promise<JSX.Element> {
  // Fetching Data
  const locale = await getLocale();
  const testimonials = await fetchFromStrapi("testimonials", locale, data.maxTestimonials, 1, "populate[attestant][populate]", "*") as TestimonialProps[];

  console.log("[OMGGTestimonials]: testimonials dump");
  console.log(testimonials);

  data.testimonials = testimonials;
  console.log(data.testimonials)

  return (
    <TestimonialSection data={data}/>
  );
};

export { OMGGTestimonials };
