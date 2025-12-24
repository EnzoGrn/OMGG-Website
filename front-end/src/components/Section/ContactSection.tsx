"use client"

import { InputGroup, InputGroupInput } from '@/components/ui/input-group';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Container } from '@/components/Section/Container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { emailContact, phoneContact, socialNetworks } from '@/app/[locale]/contact/contact_info';
import { FaRegFilePdf } from 'react-icons/fa6';
import { COUNTRIES } from '../Utils/Phone';

const ContactCard = ({ title, description, Icon, children }: { title: string, description: string, Icon: IconType, children: React.ReactNode }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-4 space-y-4 relative">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Icon className="w-6 h-6" />
          </div>
          <div className="z-10">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

const SocialNetwork = ({ id, text, Icon, url }: { id: string, text: string, Icon: IconType, url: string }) => {
  return (
    <Button variant="outline" size="sm" asChild key={id}>
      <Link href={url} className="gap-2" target="_blank" rel="noopener noreferrer">
        <Icon /> {text}
      </Link>
    </Button>
  )
}

export function ContactSection() {
  const t = useTranslations('Contact');

  const services = ['fullAdaptation', 'mobileApp', 'interactivePrototype', 'other'] as const;

  const [countryCode, setCountryCode] = useState("+33");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    object: '',
    message: '',
    services: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper to validate a single field
  const getFieldError = (name: keyof typeof formData, value: string, currentCountryCode: string = countryCode) => {
    let error: string | null = null;

    if (name === 'firstname' || name === 'lastname' || name === 'object' || name === 'message')
      if (!value) error = t('Form.validation.required');
    if (name === 'email') {
      if (!value)
        error = t('Form.validation.required');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = t('Form.validation.email');
    }

    if (name === 'phone') {
      if (!value)
        error = t('Form.validation.required');
      else {
        const country = COUNTRIES.find(c => c.code === currentCountryCode);
        const phoneClean = value.replace(/\s/g, '');

        if (country) {
          if (!country.regex.test(phoneClean))
            error = t('Form.validation.phone');
        }
        else {
          if (!/^\d+$/.test(phoneClean))
            error = t('Form.validation.phone');
        }
      }
    }

    return error;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Validate all fields
    (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
      if (key === 'services')
        return;
      const error = getFieldError(key, formData[key] as string);

      if (error)
        newErrors[key] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // If there is an existing error for this field, check if it's resolved
    if (errors[field]) {
      const error = getFieldError(field, value);

      if (!error) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const handleCountryChange = (value: string) => {
    setCountryCode(value);

    // Re-validate phone if error exists
    if (errors.phone) {
      const error = getFieldError('phone', formData.phone, value);

      if (!error) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.phone;
          return newErrors;
        });
      }
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate())
      return;
    setIsSubmitting(true);

    const loadingToast = toast.loading(t('Toast.loading'));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: `${countryCode} ${formData.phone}`
        })
      });

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success(t('Toast.success.title'), {
          description: t('Toast.success.description'),
          duration: 5000
        });

        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          object: '',
          message: '',
          services: []
        });

        setCountryCode("+33");
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('Toast.error.title'), {
        description: t('Toast.error.description'),
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
          <Card className="space-y-8 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">{t('Form.submit')}</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">{t('Form.firstname')} <span className="text-destructive">*</span></Label>
                    <Input
                      id="firstname"
                      placeholder={t('Form.firstname')}
                      value={formData.firstname}
                      onChange={(e) => handleInputChange('firstname', e.target.value)}
                      className={errors.firstname ? "border-destructive" : ""}
                    />
                    {errors.firstname && <p className="text-destructive text-xs">{errors.firstname}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">{t('Form.lastname')} <span className="text-destructive">*</span></Label>
                    <Input
                      id="lastname"
                      placeholder={t('Form.lastname')}
                      value={formData.lastname}
                      onChange={(e) => handleInputChange('lastname', e.target.value)}
                      className={errors.lastname ? "border-destructive" : ""}
                    />
                    {errors.lastname && <p className="text-destructive text-xs">{errors.lastname}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('Form.email')} <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('Form.phone')} <span className="text-destructive">*</span></Label>
                  <div className="flex gap-2">
                    <InputGroup className={errors.phone ? "border-destructive" : ""}>
                      <Select value={countryCode} onValueChange={handleCountryChange}>
                        <SelectTrigger className="w-[100px] border-0 bg-transparent shadow-none focus:ring-0 gap-1 px-3">
                          <span>{COUNTRIES.find(c => c.code === countryCode)?.flag}</span>
                          <span className="text-muted-foreground">{countryCode}</span>
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.flag} {country.label} ({country.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="h-4 w-px bg-border my-auto" />
                      <InputGroupInput
                        id="phone"
                        type="tel"
                        placeholder={COUNTRIES.find(c => c.code === countryCode)?.placeholder || "12 34 56 78"}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="object">{t('Form.object')} <span className="text-destructive">*</span></Label>
                  <Input
                    id="object"
                    placeholder={t('Form.object')}
                    value={formData.object}
                    onChange={(e) => handleInputChange('object', e.target.value)}
                    className={errors.object ? "border-destructive" : ""}
                  />
                  {errors.object && <p className="text-destructive text-xs">{errors.object}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('Form.message')} <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="message"
                    className={`${errors.message ? "border-destructive" : ""} min-h-[150px]`}
                    placeholder={t('Form.message')}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                  {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{t('Form.services.label')}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, services: [...formData.services, service] });
                            } else {
                              setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
                            }
                          }}
                        />
                        <Label htmlFor={service} className="font-normal cursor-pointer text-sm">
                          {t(`Form.services.${service}`)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting}>
                  {isSubmitting ? t('Toast.loading') : t('Form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 lg:col-span-2">
            <ContactCard title={t('Chat.title')} description={t('Chat.speak')} Icon={MessageCircle}>
              <div className="flex flex-wrap gap-4 pt-2">
                <SocialNetwork {...emailContact} />
                {socialNetworks.map((network) => (
                  <SocialNetwork key={network.id} {...network} />
                ))}
              </div>
            </ContactCard>

            <ContactCard title={t('Chat.call')} description={t('Chat.callDesc')} Icon={Phone}>
              <div className="relative pt-2">
                <SocialNetwork {...phoneContact} text={t('Chat.callTime')} />
              </div>
            </ContactCard>

            <ContactCard title={t('CTA.title')} description={t('CTA.description')} Icon={FaRegFilePdf}>
              <div className="relative pt-2">
                <Button asChild variant="default" size="sm">
                  <Link href="submit">{t('CTA.button')}</Link>
                </Button>
                <div className="hidden lg:block absolute -bottom-10/10 -right-1/10 select-none z-0">
                  <img src="/OMGG/Illustrations/happy_omgg.webp" alt="Happy OMGG" className="object-contain size-32" />
                </div>
              </div>
            </ContactCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
