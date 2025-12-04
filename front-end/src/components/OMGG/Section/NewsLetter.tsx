'use client'

import { PSection } from '@/components/Section/Section'
import { CheckboxLabel } from '@/components/Input/Checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RequiredLabel } from '@/components/Text/Label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations, useLocale } from 'next-intl'
import { toast } from 'sonner'
import { useState } from 'react'
import Link from 'next/link'

const OMGGNewsLetter = () => {
  const t = useTranslations('Newsletter');
  const locale = useLocale();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string({ required_error: t('error.email.required') }).email(t('error.email.invalid')),
    companyNews: z.array(z.string()).min(1, t('error.field'))
  });

  type FormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      companyNews: []
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const offersChecked = data.companyNews.includes(t('fields.placeholder.0'));
    const newsChecked = data.companyNews.includes(t('fields.placeholder.1'));

    const payload = {
      email: data.email,
      offers: offersChecked,
      news: newsChecked
    };

    const loadingToast = toast.loading(t('toast.loading'));

    try {
      const response = await fetch('/api/news-letter-form', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: 'news-letter-subscriptions', data: payload })
      });

      toast.dismiss(loadingToast);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `${t('toast.error.title')} (${response.status})`;

        toast.error(t('toast.error.title'), {
          description: errorMessage,
          duration: 5000,
        });
        return;
      }

      toast.success(t('toast.success.title'), {
        description: t('toast.success.description'),
        duration: 5000,
      });

      reset({
        email: '',
        companyNews: []
      });

    } catch (error) {
      toast.dismiss(loadingToast);

      const errorMessage = error instanceof Error ? error.message : '';

      toast.error(t('toast.error.network.title'), {
        description: `${t('toast.error.network.description')} ${errorMessage}`,
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = watch('companyNews') || []

    if (checked)
      setValue('companyNews', [...current, value], { shouldValidate: true })
    else
      setValue('companyNews', current.filter((v) => v !== value), { shouldValidate: true })
  }

  return (
    <PSection padding="py-8" className="relative overflow-hidden">
      <img src="/OMGG/Illustrations/red_dots.svg" alt="OMGG's dots illustration" className="h-1/3 w-1/3 bottom-10 -right-1/5 absolute -z-10 select-none" />
      <div className="w-full flex flex-col gap-8 items-start justify-start">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-start">
          {t('heading')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="max-w-lg w-full space-y-8">
            <div className="space-y-2">
              <RequiredLabel label={t('mail.label')} />
              <Input placeholder={t('mail.placeholder')} {...register('email')} />

              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <RequiredLabel label={t('fields.label')} />

              {[t('fields.placeholder.0'), t('fields.placeholder.1')].map((option, i) => {
                const id = `companyNews-${i}`

                return (<CheckboxLabel key={id} id={id} checked={watch('companyNews')?.includes(option)} onChanged={(checked) => handleCheckboxChange(option, !!checked)} label={option} />);
              })}

              {errors.companyNews && <p className="text-destructive text-sm">{errors.companyNews.message}</p>}
            </div>
          </div>

          <div className="max-w-lg text-sm text-muted-foreground space-y-2">
            <p>
              {t('disclaimer.line1')}{' '}
              <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
                {t('disclaimer.privacyLink')}
              </Link>.
            </p>
            <p>{t('disclaimer.line2')}</p>
          </div>

          <div className="w-full max-w-lg flex items-center justify-center md:justify-start">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              size={'lg'}
              className="uppercase max-w-xs rounded-lg"
              aria-label={t('submit')}
            >
              {isSubmitting ? t('toast.sending') : t('submit')}
            </Button>
          </div>
        </form>
      </div>
    </PSection>
  )
}

export { OMGGNewsLetter };
