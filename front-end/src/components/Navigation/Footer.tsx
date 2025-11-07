import { Container              } from "@/components/Section/Container"
import { FooterProps, MenuProps } from "@/components/Navigation/FooterProps";
import { DynamicLoad            } from "@/components/Utils/ReactIconUtils";
import Link from "next/link";

const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const Footer = ({ logo, subtitle, copyright, iconsLink, menu, legal, locale = 'en' }: FooterProps) => {
  return (
    <section className="py-8 inset-shadow-xs">
      <Container>
        <footer>
          <div className="flex flex-col items-center lg:items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">

              {/* Logo */}
              {logo &&
                <div className="flex items-center gap-2 lg:justify-start">
                  {/* TODO: set an url to logo */}
                  <Link href="/">
                    <img src={`${NEXT_PUBLIC_STRAPI_URL}${logo.src}`} alt={logo.alt} className="h-16" />
                  </Link>
                </div>
              }

              {/* Subtitle */}
              <p className="text-sm text-muted-foreground">
                {subtitle.split('\\n').map((line: string, index: number) => (
                  <span key={index}>
                    {line}
                    {index < subtitle.split('\\n').length - 1 && <br />}
                  </span>
                ))}
              </p>

              {/* Social Network */}
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {iconsLink && iconsLink
                .filter((iconsLink) => !iconsLink.isDisable)
                .map((iconLink) => {
                  if (!iconLink.isDisable)
                    return (
                      <li className="font-medium hover:text-primary" key={iconLink.id}>
                        <a href={iconLink.url} aria-label="X / Twitter">
                          {/* TODO: Get React Icon from slugIcon */}
                          {/* <FaXTwitter className="size-6" /> */}
                          {DynamicLoad(iconLink.slugIcon)}
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
            
            {/* Menu navigation */}
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {menu && menu
                .filter((menuItem: MenuProps) => !menuItem.isDisable)
                .map((menuItem: MenuProps) => (
                  <div key={menuItem.id}>
                    <h3 className="mb-6 font-bold">{menuItem.title}</h3>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                      {menuItem.textLinks && !menuItem.isDisable && (
                        <>
                          {menuItem.textLinks.map((item) => {
                            if (!item.isDisable)
                              return (
                                <li key={item.id} className="font-medium hover:text-primary">
                                  <a href={`/${locale}${item.url}`} aria-label={item.title}>
                                    {item.title}
                                  </a>
                                </li>
                              )
                          })}
                        </>
                      )}
                    </ul>
                  </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 lg:mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>{copyright}</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              {legal
              .filter((item) => !item.isDisable)
              .map((item) => {
                if (!item.isDisable)
                  return (
                    <li className="hover:text-primary" key={item.id}>
                      <a href={`/${locale}${item.url}`} aria-label={item.title}>
                        {item.title}
                      </a>
                    </li>
                  )
              })}
            </ul>
          </div>
        </footer>
      </Container>
    </section>
  );
};

export { Footer };
