import { ButtonProps, TextProps } from "../Section/Interface";

export interface AboutProps {
  title:       TextProps;
  description: TextProps;
  text:        TextProps;

  callToAction?:  ButtonProps;

  logo: {
    url: string;
    alternativeText: string;
    className?: string;
  };

  className?: string; // Used in frontend not in strapi
}