'use client'

import { Container } from "@/components/Section/Container"
import { FooterProps, MenuProps } from "@/components/Navigation/FooterProps";
import { DynamicLoadIcon } from "@/components/Utils/ReactIconUtils";
import { getMediaFromUrl } from "@/lib/strapi";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { SendIcon } from "lucide-react";
import { useIsMobile } from "@/lib/hooks/use-mobile";

const Footer = ({ footerData }: { footerData: FooterProps; }) => {
  const locale = useLocale();
  const t = useTranslations('Newsletter');
  const isMobile = useIsMobile();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      toast.error(t('error.email.invalid'));

      return;
    }

    setIsSubmitting(true);

    const loadingToast = toast.loading(t('toast.loading'));

    try {
      const response = await fetch('/api/news-letter-form', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: 'news-letter-subscriptions',
          data: {
            email: email,
            offers: true,
            news: true
          }
        })
      });

      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(t('toast.error.title'), {
          duration: 5000,
        });
        return;
      }

      toast.success(t('toast.success.title'), {
        description: t('toast.success.description'),
        duration: 5000,
      });

      setEmail('');

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error.network.title'), {
        description: t('toast.error.network.description'),
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    if (!iconLink.isDisable)
                      return (
                        <li className="font-medium hover:text-primary" key={iconLink.id}>
                          <a href={iconLink.url} aria-label="X / Twitter">
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
            {footerData.newsletter && (
              <div className="flex flex-col gap-2 text-start">
                <h3 className="mb-4 font-bold">{t('footer.title')}</h3>
                <p className="text-sm text-muted-foreground font-medium">{t('footer.description')}</p>
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="flex w-full max-w-md items-center gap-2">
                    <Input
                      type="email"
                      placeholder={t('mail.placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="flex-1 py-5 lg:py-2"
                      aria-label={t('mail.label')}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="shrink-0 py-5 lg:py-2"
                      aria-label={t('submit')}
                    >
                      {!isMobile && t('submit')}
                      <SendIcon />
                    </Button>
                  </div>
                </form>
                <p className="text-sm text-muted-foreground font-medium">
                  {t('footer.consent')}{' '}
                  <Link className="text-primary hover:underline" href={`/${locale}/privacy`}>
                    {t('disclaimer.privacyLink')}
                  </Link>.
                </p>
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="mt-8 lg:mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>{footerData.copyright}</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              {footerData.legal
                .filter((item) => !item.isDisable)
                .map((item) => {
                  if (!item.isDisable)
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
    </section>
  );
};

export { Footer };
