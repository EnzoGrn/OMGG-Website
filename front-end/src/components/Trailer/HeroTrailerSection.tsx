import { GameProps       } from "@/app/[locale]/games/[slug]/page";
import { ButtonProps     } from "../Section/Interface";
import { HeroTrailerView } from "./HeroTrailerView";

export interface HeroTrailerSectionProps {
  downloadButton: ButtonProps;
}

const HeroTrailerSection = ({data, additionalData} : {data: HeroTrailerSectionProps, additionalData: GameProps}) => {

  return(
    <>
      {data && additionalData ? (
        <HeroTrailerView gameProps={additionalData} data={data}/>
      ) : (
        <></>
      )}
    </>
  );
}

export { HeroTrailerSection };