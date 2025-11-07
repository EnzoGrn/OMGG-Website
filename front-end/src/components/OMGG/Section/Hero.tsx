import { HeroSection } from "@/components/Section/Hero";
import { HeroProps   } from "@/components/Section/Interface";

const OMGGHero = ({data}:  {data: HeroProps}) => {

  data.className = "bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] min-h-[660px] lg:min-h-[690px]"

  console.log("[OMGGHero]: HeroSection dump");
  console.log(data);

  return(
    <HeroSection {...data} />
  );
}

export { OMGGHero };
