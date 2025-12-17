import { GameProps } from "@/app/[locale]/games/[slug]/page";
import { ButtonProps, LogoProps, TextProps } from "../Section/Interface";
import { CreatorCTA } from "./CreatorCTA";
import { getMediaFromUrl } from "@/lib/strapi";
import { useTranslations } from "next-intl";

export interface DownloadCTAProps {
  title: TextProps;
  description?: TextProps;
  downloadButton: ButtonProps;
  image: LogoProps;
}

const DownloadCTA = ({ data, additionalData }: { data: DownloadCTAProps, additionalData: GameProps }) => {
  const t = useTranslations("DownloadCTA");

  const secondaryButton = additionalData.website ? {
    label: t("buyPhysical"),
    href: additionalData.website,
  } : undefined;

  return (
    <CreatorCTA
      title={t("title", { gameName: additionalData.name })}
      description={t("description", { gameName: additionalData.name })}
      primaryButton={{
        label: t("playNow"),
        href: additionalData.download.url
      }}
      secondaryButton={secondaryButton}
      image={{
        url: getMediaFromUrl(additionalData.pngIllustration ? additionalData.pngIllustration.url : data.image.url),
        alternativeText: data.image.alternativeText
      }}
    />
  );
};

export { DownloadCTA };
