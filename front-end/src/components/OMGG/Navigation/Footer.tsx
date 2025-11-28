import { Footer      } from "@/components/Navigation/Footer";
import { FooterProps } from "@/components/Navigation/FooterProps";

const OMGGFooter = ({ locale, global } : { locale: string, global: FooterProps }) => {

  if (!global)
    return;

  return(
    <Footer footerData={global} locale={locale} />
  );
}

export { OMGGFooter }
