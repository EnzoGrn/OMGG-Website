import { Locale, useTranslations } from "next-intl";
import { setRequestLocale        } from "next-intl/server";
import { use                     } from "react";
import { Navbar                  } from "@/components/Navbar/Navbar";
import { Hero                    } from "@/components/Section/Hero";
import { Header                  } from "@/components/Navbar/Constant";

function renderLogo()
{
  const t = useTranslations('NavbarLinks');

  Header.logo.alt      = t('logoAlt');
  Header.menu[0].title = t('portfolio');
  Header.menu[1].title = t('omgg');
  Header.menu[2].title = t('blog');
  Header.submit.title  = t('submit');

  return(
    <header className="sticky top-0 z-50 bg-background shadow-sm w-full">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8">
        <Navbar logo={Header.logo} menu={Header.menu} submit={Header.submit} />
      </div>
    </header>
  );
}

function renderHero()
{
  const t = useTranslations('Hero');

  return(
    <Hero
      heading={t('heading')}
      description={t('description')}
      image={{
        src: "./OMGG/Logo/Logo_SideFullText_Big.svg",
        alt: t('imageAlt'),
      }}
    />
  );
}

export default function Home({ params }: { params: Promise<{locale: Locale}> })
{
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('NavbarLinks');

  return (
    <main className="w-full h-full">
      {renderLogo()}
      {renderHero()}
    </main>
  );
}
