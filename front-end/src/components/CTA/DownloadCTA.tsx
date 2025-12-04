import { Button } from "@/components/ui/button";
import { Container } from "../Section/Container";
import { ArrowUpRight } from "lucide-react";
import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { useTranslations } from "next-intl";
import { ButtonProps, LogoProps, TextProps } from "../Section/Interface";
import { RenderText } from "../Utils/TextUtils";
import { getMediaFromUrl } from "@/lib/strapi";

export interface DownloadCTAProps {
  title           : TextProps;
  description    ?: TextProps;
  downloadButton ?: ButtonProps;
  image           : LogoProps;
}

const DownloadCTA = ({data, additionalData} : {data: DownloadCTAProps, additionalData: GameProps}) => {

  const t = useTranslations('Games.cta');
  
  const dataUpdated: DownloadCTAProps = {
    ...data,
    title: {
      ...data.title,
      text: data.title.text + ' ' + additionalData.name
    },
  };

  if (dataUpdated.description && additionalData.name)
    dataUpdated.description.text += ' ' + additionalData.name;

  return (
    <section className="py-8">
      <Container className="container relative overflow-visible space-y-6 md:space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 p-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] relative overflow-visible">
          <div className="flex-1 flex flex-col gap-4 z-10">
            <RenderText text={dataUpdated.title} className="text-2xl font-bold text-pretty lg:text-4xl"/>
            {dataUpdated.description && <RenderText text={dataUpdated.description} className="max-w-xl lg:text-lg"/>}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button asChild className="w-full sm:w-auto max-w-2/3 lg:max-w-full uppercase" aria-label={t('download') + ' ' + additionalData.name}>
                  {additionalData.download.url ? (
                    <a href={additionalData.download.url} download aria-label={dataUpdated.downloadButton?.title}>
                    {dataUpdated.downloadButton?.title}
                    <ArrowUpRight className="ml-2 size-4" />
                  </a>
                  ) : (
                    <a href={dataUpdated.downloadButton?.url} download aria-label={dataUpdated.downloadButton?.title}>
                      {dataUpdated.downloadButton?.title}
                      <ArrowUpRight className="ml-2 size-4" />
                    </a>
                  )}
                </Button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-visible">
            {additionalData.pngIllustration ? (
              // For better look 1280 x 720 is prefered
              <img src={getMediaFromUrl(additionalData.pngIllustration.url)} alt={dataUpdated.image.alternativeText} className="select-none w-full h-full object-cover overflow-visible scale-120" />
            ) : (
              <img src={getMediaFromUrl(data.image.url)} alt={dataUpdated.image.alternativeText} className="select-none w-48" />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export { DownloadCTA };
