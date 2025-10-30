import { Navbar           } from "@/components/Navigation/Navbar";
import { Container        } from "@/components/Section/Container";
import { useTranslations  } from "next-intl";
import { OMGGNavbarValues } from "@/components/OMGG/Constants/Navigation";
import { LogoProps } from "@/components/Logo/Interface";
import { DropdownProps, ItemLinksProps, ItemProps } from "@/components/Navigation/NavigationProps";

const OMGGNavbar = ({ locale, global } : { locale: string, global: any }) => {

  if (!global)
    return null;

  // const tNavigation = useTranslations('Navigation');
  // const tNavbar     = useTranslations('Navbar');

  // if (OMGGNavbarValues.logo)
  //   OMGGNavbarValues.logo.alt = tNavigation('logoAlt');
  // if (OMGGNavbarValues.submit)
  //   OMGGNavbarValues.submit.title = tNavbar('submit');
  // if (OMGGNavbarValues.menu) {
  //   OMGGNavbarValues.menu[0].title = tNavigation('portfolio');
  //   OMGGNavbarValues.menu[1].title = tNavigation('omgg');
  //   OMGGNavbarValues.menu[2].title = tNavigation('blog');
  // }

  // Getting data
  const logo : LogoProps = {
    src: global.logo?.image?.url,
    alt: global.logo?.image?.alternativeText,
    url: global.logo?.url || "#"
  }

  const dropdowns : DropdownProps[] = global.dropdowns?.map((button: any) => ({
    id:           button.id,
    title:        button.text,
    isDisable:    button.isDisable,
    variant:      button.variant,
    items:        button.items?.map((item: any) => ({
      id:                 item.id,
      title:              item.text,
      url:                item.url,
      shortDescription:   item.shortDescription
    }))
  }));

  const itemLinks: ItemLinksProps[] = global.linkButtons?.map((item: any) => ({
    id:         item.id,
    title :       item.text,
    isDisable:  item.isDisable,
    variant:    item.variant
  }));

  const str = JSON.stringify(itemLinks);
  console.log("itemLinks data: " + str);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm w-full">
      <Container>
        <Navbar logo={logo} dropdowns={dropdowns} itemLinks={itemLinks} locale={locale} />
      </Container>
    </header>
  );
}

export { OMGGNavbar }
