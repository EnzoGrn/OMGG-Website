'use client'

import { Container } from "@/components/Section/Container"
import { FooterProps, MenuProps } from "@/components/Navigation/FooterProps";
import { DynamicLoadIcon } from "@/components/Utils/ReactIconUtils";
import { getMediaFromUrl } from "@/lib/strapi";
import { useLocale } from "next-intl";
import { NewsletterForm } from "@/components/Newsletter/NewsletterForm";
import Link from "next/link";
import { Toaster } from "../ui/sonner";

const Footer = ({ footerData }: { footerData: FooterProps; }) => {
  const locale = useLocale();

  return (
    <section className="py-8 inset-shadow-xs">
      <Container>
        <footer>
          <div className="flex flex-col items-center lg:items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">

              {/* Logo */}
              {footerData.logo &&
                <div className="flex items-center gap-2 lg:justify-start">
                  <Link href="/">
                    <img src={getMediaFromUrl(footerData.logo.image.url)} alt={footerData.logo.image.alternativeText} className="h-16" />
                  </Link>
                </div>
              }

              {/* Subtitle */}
              <p className="text-sm text-muted-foreground">
                {footerData.subtitle.split('\\n').map((line: string, index: number) => (
                  <span key={index}>
                    {line}
                    {index < footerData.subtitle.split('\\n').length - 1 && <br />}
                  </span>
                ))}
              </p>

              {/* Social Network */}
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {footerData.iconsLink && footerData.iconsLink
                  .filter((iconsLink) => !iconsLink.isDisable)
                  .map((iconLink) => {
                    return (
                      <li className="font-medium hover:text-primary" key={iconLink.id}>
                        <a href={iconLink.url} aria-label={iconLink.text}>
                          {DynamicLoadIcon(iconLink.slugIcon)}
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>

            {/* Menu navigation */}
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {footerData.menu && footerData.menu
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
                                  <a href={`/${locale}${item.url}`} aria-label={item.text}>
                                    {item.text}
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

            {/* Newsletter Subscribe */}
            {footerData.newsletter && (<NewsletterForm variant="footer" />)}
          </div>

          {/* Copyright */}
          <div className="mt-8 lg:mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>{footerData.copyright}</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              {footerData.legal
                .filter((item) => !item.isDisable)
                .map((item) => {
                  return (
                    <li className="hover:text-primary" key={item.id}>
                      <a href={`/${locale}${item.url}`} aria-label={item.text}>
                        {item.text}
                      </a>
                    </li>
                  )
                })}
            </ul>
          </div>
        </footer>
      </Container>
      <Toaster />
    </section>
  );
};

export { Footer };
