import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { ButtonProps, LogoProps, TextProps } from "../Section/Interface";
import { getMediaFromUrl } from "@/lib/strapi";
import { CTA } from "./CTA";

export interface DownloadCTAProps {
  title: TextProps;
  description?: TextProps;
  downloadButton: ButtonProps;
  image: LogoProps;
}

const DownloadCTA = ({ data, additionalData }: { data: DownloadCTAProps, additionalData: GameProps }) => {
  const dataUpdated: DownloadCTAProps = {
    ...data,
    title: {
      ...data.title,
      text: data.title.text + ' ' + additionalData.name
    },
  };

  if (dataUpdated.description && additionalData.name)
    dataUpdated.description.text += ' ' + additionalData.name;
  dataUpdated.downloadButton.download = true;

  return (
    <CTA
      data={{
        title: dataUpdated.title,
        description: dataUpdated.description,
        button: dataUpdated.downloadButton
      }}
    >
      <div className="hidden lg:block absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-visible">
        {additionalData.pngIllustration ? (
          // For better look 1280 x 720 is prefered
          <img src={getMediaFromUrl(additionalData.pngIllustration.url)} alt={dataUpdated.image.alternativeText} className="select-none w-full h-full object-cover overflow-visible scale-120" />
        ) : (
          <img src={getMediaFromUrl(data.image.url)} alt={dataUpdated.image.alternativeText} className="select-none w-48" />
        )}
      </div>
    </CTA>
  );
};

export { DownloadCTA };
