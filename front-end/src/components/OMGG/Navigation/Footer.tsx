import { Footer           } from "@/components/Navigation/Footer";
import { FooterProps } from "@/components/Navigation/FooterProps";
import { LogoProps } from "@/components/Section/Interface";

const OMGGFooter = ({ locale, global } : { locale: string, global: any }) => {

  const logo: LogoProps = {
    url: global.logo.image.url,
    alternativeText: global.logo.image.alternativeText
  }

  const footerData: FooterProps = {
    copyright:  global.copyright,
    subtitle:   global.subtitle,
    iconsLink:  global.iconsLink?.map((iconLink: any) => ({
      id:         iconLink.id,
      url:        iconLink.url,
      variant:    iconLink.variant,

      slugIcon:   iconLink.slugIcon,
      isSlugIcon: iconLink.isSlugIcon,
      isDisable:  iconLink.isDisable,
    })),
    menu:       global.menu?.map((menuItem: any) => ({
      id:         menuItem.id,
      title:      menuItem.title,
      textLinks:  menuItem.textLinks?.map((textLink: any) => ({
        id:         textLink.id,
        title:      textLink.text,
        url:        textLink.url,
        isDisable:  textLink.isDisable
      })),
      isDisable:  menuItem.isDisable
    })),
    legal:      global.legal?.map((legalItem: any) => ({
      id          : legalItem.id,
      title       : legalItem.text,
      url         : legalItem.url,
      isDisable   : legalItem.isDisable,
    })),
    logo: logo
  }

  return(
    <Footer {...footerData} locale={locale} />
  );
}

export { OMGGFooter }
