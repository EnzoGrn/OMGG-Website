import { Footer           } from "@/components/Navigation/Footer";
import { useTranslations  } from "next-intl";
import { OMGGFooterValues } from "../Constants/Navigation";

const OMGGFooter = ({ locale } : { locale: string }) => {
  const tN = useTranslations('Navigation');
  const tF = useTranslations('Footer');

  if (OMGGFooterValues.logo)
    OMGGFooterValues.logo.alt = tN('logoAlt');
  OMGGFooterValues.subtitle      = tF('subtitle');
  OMGGFooterValues.copyright     = tF('copyright');
  OMGGFooterValues.terms.title   = tF('terms');
  OMGGFooterValues.privacy.title = tF('privacy');

  if (OMGGFooterValues.menu) {
    OMGGFooterValues.menu[0].title = tN('portfolio');
    OMGGFooterValues.menu[1].title = tN('omgg');
    OMGGFooterValues.menu[2].title = tN('blog');
  }

  return(
    <Footer {...OMGGFooterValues} locale={locale} />
  );
}

export { OMGGFooter }
