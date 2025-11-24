import { Menu                                                                                                                     } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger                                                             } from "@/components/ui/accordion";
import { Button                                                                                                                   } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger                                                               } from "@/components/ui/sheet";
import { ApiLogo                                                                                                                  } from "@/components/Logo/ApiLogo";
import { DropdownProps, ItemLinksProps, ItemProps, NavbarProps                                                                    } from "./NavigationProps";
import { getMediaFromUrl                                                                                                          } from "@/lib/strapi";

import Link from "next/link";

const Navbar = ({ logo, dropdowns, itemLinks, locale = 'en' }: NavbarProps) => {
  return (
    <section className="py-4">

      {/* Desktop Menu */}
      <nav className="hidden justify-between lg:flex">
        <div className="flex items-center">

          {/* Logo */}
          {logo &&
            <ApiLogo logo={logo} />
          }

        </div>
        <div className="flex gap-10 items-center">
          {dropdowns && itemLinks &&
            <div className="flex gap-10 items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {dropdowns.map((item) => renderDropdownItem(item, locale))}
                    <div className="flex gap-10">
                    {itemLinks.filter((item) => !item.isDisable)
                    .map((item) => (
                      <Button asChild size="sm" aria-label={item.title} key={item.id}
                        variant={item.variant.toLowerCase() as "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"}>
                          <a href={item.url} className="uppercase" aria-label={item.title}>
                            {item.title}
                          </a>
                      </Button>
                    ))}
                    </div>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          }
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">

          {/* Logo */}
          {logo &&
            <a href={logo?.url} className="flex items-center gap-2" aria-label="Home">
              <img src={getMediaFromUrl(logo?.url)} className="max-h-[43px] w-full" alt={logo?.alternativeText} />
            </a>
          }

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  {logo &&
                    <ApiLogo logo={logo} cn="max-h-[43px]" />
                  }
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                {dropdowns && itemLinks &&
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {dropdowns.filter((item: DropdownProps) => !item.isDisable).map((item: DropdownProps) => renderMobileDropdownItem(item, locale))}
                    {itemLinks.filter((item: ItemLinksProps) => !item.isDisable).map((item: ItemLinksProps) => renderMobileItemLink(item))}
                  </Accordion>               
                }
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

const renderDropdownItem = (item: DropdownProps, locale: string) => {
  if (item.items && !item.isDisable) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="transition-colors bg-transparent hover:bg-muted hover:text-accent-foreground uppercase">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <ItemLink item={subItem} locale={locale} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
};

const renderMobileDropdownItem = (item: DropdownProps, locale: string) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline uppercase">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <ItemLink key={subItem.title} item={subItem} locale={locale} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
};

const renderMobileItemLink = (item: ItemLinksProps) => {
  if (item) {
    return (
      item.variant == "ghost" ? 
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <a href={item.url} className="text-md py-0 font-semibold hover:no-underline uppercase" aria-label={item.title}>
            {item.title}
          </a>
        </AccordionItem>
      :
        <Button asChild aria-label={item.title} key={item.id} variant={item.variant.toLowerCase() as "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"}>
          <a href={item.url} className="uppercase" aria-label={item.title}>
            {item.title}
          </a>
        </Button>
    );
  }
}

const ItemLink = ({ item, locale }: { item: ItemProps, locale: string }) => {
  const url = `/${locale}${item.url}`;

  return (
    <Link className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground" href={url} aria-label={item.title}>
      <div className="text-foreground">
        {!item.isSlugIcon && item.urlIcon && (
          <img src={getMediaFromUrl(item.urlIcon)} className="w-5 h-4 shrink-0" alt={item?.alt} />
        )}
      </div>
      <div>
        <div className="text-sm font-semibold">
          {item.title}
        </div>
        {item.shortDescription && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
