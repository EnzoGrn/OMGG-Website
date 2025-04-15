import { Navbar           } from "@/components/Navigation/Navbar";
import { Container        } from "@/components/Section/Container";
import { useTranslations  } from "next-intl";
import { OMGGNavbarValues } from "@/components/OMGG/Constants/Navigation";

const OMGGNavbar = () => {
  const tNavigation = useTranslations('Navigation');
  const tNavbar     = useTranslations('Navbar');

  if (OMGGNavbarValues.logo)
    OMGGNavbarValues.logo.alt = tNavigation('logoAlt');
  if (OMGGNavbarValues.submit)
    OMGGNavbarValues.submit.title = tNavbar('submit');
  if (OMGGNavbarValues.menu) {
    OMGGNavbarValues.menu[0].title = tNavigation('portfolio');
    OMGGNavbarValues.menu[1].title = tNavigation('omgg');
    OMGGNavbarValues.menu[2].title = tNavigation('blog');
  }

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm w-full">
      <Container>
        <Navbar {...OMGGNavbarValues} />
      </Container>
    </header>
  );
}

export { OMGGNavbar }
