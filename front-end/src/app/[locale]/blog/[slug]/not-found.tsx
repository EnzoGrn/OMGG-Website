import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import NotFound from '@/components/OMGG/Error/404';

export default async function BlogNotFound() {
  const t = await getTranslations("Blog.NotFound");

  return (
    <NotFound title={t('title')} description={t('description')} button={
      <Button asChild size="lg" className="rounded-full px-8 text-base">
        <Link href="/blog">
          {t('backToBlog')}
        </Link>
      </Button>
    } />
  );
}
