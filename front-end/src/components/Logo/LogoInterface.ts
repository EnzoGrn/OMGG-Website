import { LogoProps, TextProps } from "../Section/Interface";

export interface PartnerProps {
  slug:  string;
  name: string;
  icon: LogoProps;
}

export interface PartnersProps {
  title: TextProps;
  logos: PartnerProps[];
  classname: string;
  maxPartners: number;
}
