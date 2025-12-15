import { HeroSection } from "@/components/Section/Hero";
import { HeroProps } from "@/components/Section/Interface";

const OMGGHero = ({ data }: { data: HeroProps }) => {

  data.className = "min-h-[660px] lg:min-h-[690px]"

  return (
    <HeroSection {...data}
      decoration={
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/OMGG/Illustrations/Hero.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] opacity-[0.92]" />
        </div>
      }
    />
  );
}

export { OMGGHero };
