import { Footer } from "@/components/Navigation/Footer";
import { FooterProps } from "@/components/Navigation/FooterProps";

const OMGGFooter = ({ global }: { global: FooterProps }) => {
  if (!global)
    return null;
  return (
    <Footer footerData={global} />
  );
}

export { OMGGFooter }
