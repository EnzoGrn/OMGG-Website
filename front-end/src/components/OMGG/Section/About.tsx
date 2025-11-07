import { AboutProps } from "@/components/About/aboutInterface";
import { AboutSection } from "@/components/About/About";

const OMGGAbout = ({data}:  {data: AboutProps}) => {

  // Data not stored in Strapi
  data.className = "h-max-[450px]";
  data.logo = {
    url: "/OMGG/Illustrations/orange_dots.svg",
    alternativeText: "OMGG's dots illustration",
    className: "max-h-48 items-end justify-end lg:translate-x-0 lg:translate-y-0 translate-x-3/5 -translate-y-1/3",
  };

  return(
    <AboutSection {...data} />
  );
}

export { OMGGAbout };
