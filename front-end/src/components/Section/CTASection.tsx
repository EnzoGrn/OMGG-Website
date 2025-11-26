import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { DownloadCTA, DownloadCTAProps } from "@/components/CTA/DownloadCTA";

const CTASection = ({data, additionalData} : {data: DownloadCTAProps, additionalData: GameProps}) => {
  return (
    <DownloadCTA data={data} additionalData={additionalData}/>
  );
}

export { CTASection };