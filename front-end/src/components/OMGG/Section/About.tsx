import { GameProps, HeroTrailerSectionProps } from "@/app/[locale]/games/[slug]/page";
import { AboutSection } from "@/components/About/About";
import { AboutProps } from "@/components/About/aboutInterface";

const OMGGAbout = ({data, additionalData} : {data: AboutProps, additionalData: GameProps}) => {

  return (
    <>
      {data && additionalData ? (
        <AboutSection
          data={data}
          additionnalData={additionalData as GameProps}
        />
      ) : (
        <AboutSection data={data} />
      )}
    </>
  );
}

export { OMGGAbout };
