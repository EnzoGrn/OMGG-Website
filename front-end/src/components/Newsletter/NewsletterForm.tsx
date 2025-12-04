'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { SendIcon } from "lucide-react";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useLocale, useTranslations } from "next-intl";

interface NewsletterFormProps {
  variant?: 'default' | 'footer';
  showTitle?: boolean;
  showDescription?: boolean;
  showConsent?: boolean;
}

const NewsletterForm = ({ variant = 'default', showTitle = true, showDescription = true, showConsent = true }: NewsletterFormProps) => {
  const locale = useLocale();
  const t = useTranslations('Newsletter');
  const isMobile = useIsMobile();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation avec regex email
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

  const isFooterVariant = variant === 'footer';

  return (
    <div className="flex flex-col gap-2 text-start">
      {showTitle && (
        <h3 className="mb-4 font-bold">
          {isFooterVariant ? t('footer.title') : t('heading')}
        </h3>
      )}

      {showDescription && (
        <p className="text-sm text-muted-foreground font-medium">
          {isFooterVariant ? t('footer.description') : t('heading')}
        </p>
      )}

      <form onSubmit={handleNewsletterSubmit}>
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            type="email"
            placeholder={t('mail.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className={isFooterVariant ? "flex-1 py-5 lg:py-2" : "flex-1"}
            aria-label={t('mail.label')}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !email}
            className={isFooterVariant ? "shrink-0 py-5 lg:py-2" : "shrink-0"}
            aria-label={t('submit')}
          >
            {!isMobile && t('submit')}
            <SendIcon />
          </Button>
        </div>
      </form>

      {showConsent && (
        <p className="text-sm text-muted-foreground font-medium">
          {t('footer.consent')}{' '}
          <Link className="text-primary hover:underline" href={`/${locale}/privacy`}>
            {t('disclaimer.privacyLink')}
          </Link>.
        </p>
      )}
    </div>
  );
};

export { NewsletterForm };
