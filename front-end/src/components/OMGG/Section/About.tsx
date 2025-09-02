import { useTranslations } from "next-intl";
import { HeroSection     } from "@/components/Section/Hero";
import { TextEnum        } from "@/lib/enumerations/TextEnum";
import { HeroProps       } from "@/components/Section/Interface";

const OMGGAboutData: HeroProps = {
    text: [
        { text: "", size: TextEnum.H2, className: "mb-6"                                            },
        { text: "", size: TextEnum.P , className: "font-bold max-w-full md:max-w-2/3 lg:max-w-full" },
        { text: "", size: TextEnum.P , className: "my-6 max-w-full md:max-w-2/3 lg:max-w-full"      }
    ],
    image: {
        src: "/OMGG/Illustrations/orange_dots.svg",
        alt: "OMGG's dots illustration",
        className: "max-h-48 items-end justify-end lg:translate-x-0 lg:translate-y-0 translate-x-3/5 -translate-y-1/3"
    },
    buttons: {
        primary: {
            text: "",
            url: "#",
        }
    },
    className: "h-max-[450px]"
};

const OMGGAbout = () => {
  const t = useTranslations('About');

  OMGGAboutData.text[0].text         = t('heading');
  OMGGAboutData.text[1].text         = t('description');
  OMGGAboutData.text[2].text         = t('text');

  if (OMGGAboutData.buttons?.primary)
    OMGGAboutData.buttons.primary.text = t('more');

  return(
    <HeroSection {...OMGGAboutData} />
  );
}

export { OMGGAbout };
