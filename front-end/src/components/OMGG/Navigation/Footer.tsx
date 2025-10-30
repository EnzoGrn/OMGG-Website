import { Footer           } from "@/components/Navigation/Footer";
import { useTranslations  } from "next-intl";
import { OMGGFooterValues } from "../Constants/Navigation";
import { FooterProps } from "@/components/Navigation/FooterProps";
import { Logos } from "@/components/Logo/Logos";
import { LogoProps } from "@/components/Logo/Interface";

const OMGGFooter = ({ locale, global } : { locale: string, global: any }) => {
  const tN = useTranslations('Navigation');
  const tF = useTranslations('Footer');

  if (OMGGFooterValues.logo)
    OMGGFooterValues.logo.alt = tN('logoAlt');
  OMGGFooterValues.subtitle      = tF('subtitle');
  OMGGFooterValues.copyright     = tF('copyright');
  OMGGFooterValues.terms.title   = tF('terms');
  OMGGFooterValues.privacy.title = tF('privacy');

  if (OMGGFooterValues.menu) {
    OMGGFooterValues.menu[0].title = tN('portfolio');
    OMGGFooterValues.menu[1].title = tN('omgg');
    OMGGFooterValues.menu[2].title = tN('blog');
  }

  // Getting data

  const logo: LogoProps = {
    url: global.logo.text,
    src: global.logo.image.url,
    alt: global.logo.image.alternativeText
  }

  const footerData: FooterProps = {
    copyright:  global.copyright,
    subtitle:   global.subtitle,
    iconsLink:  global.iconsLink?.map((iconLink: any) => ({
      id:         iconLink.id,
      url:        iconLink.url,
      variant:    iconLink.variant,

      slugIcon:   iconLink.variant,
      isSlugIcon: iconLink.isSlugIcon,
      isDisable:  iconLink.isDisable,
    })),
    menu:       global.menu?.map((menuItem: any) => ({
      id:         menuItem.id,
      title:      menuItem.title,
      textLinks:  menuItem.textLinks?.map((textLink: any) => ({
        id:         textLink.id,
        title:      textLink.title,
        url:        textLink.url,
        isDisable:  textLink.isDisable
      }))
    })),
    legal:      global.menu?.map((legalItem: any) => ({
      id          : legalItem.id,
      title       : legalItem.text,
      url         : legalItem.url,
      isDisable   : legalItem.isDisable,
    })),
    logo: logo
  }

  console.log("Test -> " + JSON.stringify(global.subtitle));
  console.log("FooterData -> " + JSON.stringify(global));
  console.log("FooterData -> " + JSON.stringify(footerData));

  return(
    <Footer {...footerData} locale={locale} />
  );
}

export { OMGGFooter }
