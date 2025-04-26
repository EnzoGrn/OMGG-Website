import { useTranslations } from "next-intl";
import { HeroSection     } from "@/components/Section/Hero";
import { TextEnum        } from "@/lib/enumerations/TextEnum";
import { OMGGLogo        } from "../Constants/Logo";
import { HeroProps       } from "@/components/Section/Interface";

const OMGGHeroData: HeroProps = {
    text: [
        { text: "", size: TextEnum.H2 },
        { text: "", size: TextEnum.H1 }
    ],
    image: {
        src: OMGGLogo.src,
        alt: OMGGLogo.alt,
        className: "max-h-96"
    },
    className: "bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] min-h-[660px] lg:min-h-[690px]"
};

const OMGGHero = () => {
  const t = useTranslations('Hero');

  OMGGHeroData.text[0].text = t('heading');
  OMGGHeroData.text[1].text = t('description');
  OMGGHeroData.image.alt = t('imageAlt');

  return(
    <HeroSection {...OMGGHeroData} />
  );
}

export { OMGGHero };
