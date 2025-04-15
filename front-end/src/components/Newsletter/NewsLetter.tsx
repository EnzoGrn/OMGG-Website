'use client'

import { Section         } from '@/components/Section/Section'
import { Checkbox        } from '@/components/ui/checkbox'
import { Input           } from '@/components/ui/input'
import { Button          } from '@/components/ui/button'
import { Label           } from '@/components/ui/label'
import { useForm         } from 'react-hook-form'
import { zodResolver     } from '@hookform/resolvers/zod'
import { z               } from 'zod'
import { useTranslations } from 'next-intl'

const RequiredMark = () => <span className="text-primary-foreground">*</span>

const NewsLetter = () => {
  const t = useTranslations('Newsletter');

  const formSchema = z.object({
    email: z.string({ required_error: t('error.email.required') }).email(t('error.email.invalid')),
    company: z.array(z.string()).min(1, t('error.company.required')),
    newsLetter: z.array(z.string()).min(1, t('error.newsletter.required')),
  });

  type FormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), mode: 'onChange' });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data)
  }

  const handleCheckboxChange = (field: 'company' | 'newsLetter', value: string, checked: boolean) => {
    const current = watch(field) || []
  
    if (field === 'newsLetter' && value === 'Tout') {
      const allOptions = ["Le blog", "Les devlogs", "Les nouvelles sorties", "Tout"]
      if (checked) {
        setValue(field, allOptions, { shouldValidate: true })
      } else {
        setValue(field, [], { shouldValidate: true })
      }
    } else if (field === 'newsLetter') {
      let newValues = checked ? [...current, value] : current.filter((v) => v !== value)
  
      const allOthers = ["Le blog", "Les devlogs", "Les nouvelles sorties"]
      const hasAll = allOthers.every(opt => newValues.includes(opt))
      if (hasAll && !newValues.includes("Tout")) newValues.push("Tout")
      if (!hasAll) newValues = newValues.filter(opt => opt !== "Tout")
  
      setValue(field, newValues, { shouldValidate: true })
    } else {
      if (checked) {
        setValue(field, [...current, value], { shouldValidate: true })
      } else {
        setValue(field, current.filter((v) => v !== value), { shouldValidate: true })
      }
    }
  }

  return (
    <Section padding='py-8 relative overflow-hidden'>
      <img src="./OMGG/Illustrations/red_dots.svg" alt="OMGG's dots illustration" className="h-1/3 w-1/3 bottom-10 -right-1/5 absolute -z-10 select-none" />
      <div className="w-full flex flex-col gap-8 items-start justify-start">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-start">
          {t('title')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full space-y-8">
          <div className="space-y-2"> 
            <Label>{t('mail.label')}<RequiredMark /></Label>
            <Input placeholder={t('mail.placeholder')} {...register('email')} />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>{t('company.label')}<RequiredMark /></Label>

            {[t('company.placeholder.0'), t('company.placeholder.1'), t('company.placeholder.2')].map((option, i) => {
              const id = `company-${i}`

              return (
                <div key={id} className="flex w-full gap-2">
                  <Checkbox
                    id={id}
                    checked={watch('company')?.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange('company', option, !!checked)}
                  />
                  <Label htmlFor={id}>{option}</Label>
                </div>
              )
            })}

            {errors.company && <p className="text-destructive text-sm">{errors.company.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>{t('newsletter.label')}<RequiredMark /></Label>

            {[t('newsletter.placeholder.0'), t('newsletter.placeholder.1'), t('newsletter.placeholder.2'), t('newsletter.placeholder.3')].map((option, i) => {
              const id = `newsletter-${i}`
              return (
                <div key={id} className="flex w-full gap-2">
                  <Checkbox
                    id={id}
                    checked={watch('newsLetter')?.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange('newsLetter', option, !!checked)}
                  />
                  <Label htmlFor={id}>{option}</Label>
                </div>
              )
            })}

            {errors.newsLetter && <p className="text-destructive text-sm">{errors.newsLetter.message}</p>}
          </div>

          <Button type="submit" disabled={!isValid} className="w-full uppercase max-w-xs">
            {t('submit')}
          </Button>
        </form>
      </div>
    </Section>
  )
}

export { NewsLetter };
