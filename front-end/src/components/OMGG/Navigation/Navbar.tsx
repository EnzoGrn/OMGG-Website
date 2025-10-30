import { Navbar                         } from "@/components/Navigation/Navbar";
import { Container                      } from "@/components/Section/Container";
import { LogoProps                      } from "@/components/Logo/Interface";
import { DropdownProps, ItemLinksProps  } from "@/components/Navigation/NavigationProps";

const OMGGNavbar = ({ locale, global } : { locale: string, global: any }) => {

  if (!global)
    return null;

  // Getting data
  const logo : LogoProps = {
    src: global.logo?.image?.url,
    alt: global.logo?.image?.alternativeText,
    url: global.logo?.url || "/"
  }

  const dropdowns : DropdownProps[] = global.dropdowns?.map((button: any) => ({
    id:           button.id,
    title:        button.title,
    isDisable:    button.isDisable,
    variant:      button.variant,
    items:        button.items?.map((item: any) => ({
      id:                 item.id,
      title:              item.title,
      url:                item.url,
      shortDescription:   item.shortDescription,

      // Handle icon of the item
      isSlugIcon  : item.isSlugIcon,
      urlIcon     : item?.icon.url,
      slugIcon    : item.slugIcon, // The slug of the react ui icon
      alt         : item?.icon?.alternativeText || item.slugIcon
    }))
  }));

  console.log("Dropdowns -> " + JSON.stringify(dropdowns));

  const itemLinks: ItemLinksProps[] = global.linkButtons?.map((item: any) => ({
    id:         item.id,
    title:      item.title,
    isDisable:  item.isDisable,
    variant:    item.variant,
    url:        item.url
  }));

  console.log("itemLinks -> " + JSON.stringify(global.linkButtons));


  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm w-full">
      <Container>
        <Navbar logo={logo} dropdowns={dropdowns} itemLinks={itemLinks} locale={locale} />
      </Container>
    </header>
  );
}

export { OMGGNavbar }
