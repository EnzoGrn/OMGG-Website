import { Locale, useTranslations } from "next-intl";
import { setRequestLocale        } from "next-intl/server";
import { use                     } from "react";
import { Navbar                  } from "@/components/Navbar/Navbar";
import { Hero                    } from "@/components/Section/Hero";
import { Header                  } from "@/components/Navbar/Constant";
import { Container               } from "@/components/Section/Container";
import { TextEnum } from "@/lib/enumerations/TextEnum";
import { Testimonial } from "@/components/Testimonials/Testimonials";

function renderNavbar()
{
  const t = useTranslations('NavbarLinks');

  Header.logo.alt      = t('logoAlt');
  Header.menu[0].title = t('portfolio');
  Header.menu[1].title = t('omgg');
  Header.menu[2].title = t('blog');
  Header.submit.title  = t('submit');

  return(
    <header className="sticky top-0 z-50 bg-background shadow-sm w-full">
      <Container>
        <Navbar logo={Header.logo} menu={Header.menu} submit={Header.submit} />
      </Container>
    </header>
  );
}

function renderHero()
{
  const t = useTranslations('Hero');

  return(
    <Hero
      text={[
        { text: t('heading'), size: TextEnum.H2, className: "" },
        { text: t('description'), size: TextEnum.H1, className: "" }
      ]}
      image={{
        src: "./OMGG/Logo/Logo_OMGG.svg",
        alt: t('imageAlt'),
        className: "max-h-96"
      }}
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] min-h-[660px] lg:min-h-[690px]"
    />
  );
}

function renderAbout()
{
  const t = useTranslations('About');

  return(
    <Hero
      text={[
        { text: t('title'), size: TextEnum.H2, className: "mb-6" },
        { text: t('description'), size: TextEnum.P, className: "font-bold max-w-full md:max-w-2/3 lg:max-w-full" },
        { text: t('text'), size: TextEnum.P, className: "my-6 max-w-full md:max-w-2/3 lg:max-w-full" },
      ]}
      image={{
        src: "./OMGG/Illustrations/orange_dots.svg",
        alt: "OMGG's dots illustration",
        className: "max-h-48 items-end justify-end lg:translate-x-0 lg:translate-y-0 translate-x-3/5 -translate-y-1/3"
      }}
      buttons={{
        primary: {
          text: "En savoir plus",
          url: "#",
        }
      }}
      className="h-max-[450px]"
    />
  );
}

export default function Home({ params }: { params: Promise<{locale: Locale}> })
{
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <main className="w-full h-full">
      {renderNavbar()}
      {renderHero()}
      {renderAbout()}
      <Testimonial />
    </main>
  );
}
