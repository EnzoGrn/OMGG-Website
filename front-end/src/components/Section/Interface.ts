import { TextEnum } from "@/lib/enumerations/TextEnum";

export interface Badge {
  title: string;
}

export interface TextProps {
  text: string;
  size: TextEnum;
  isBold: boolean;
  className?: string;
};

export interface ButtonProps {
  title: string;
  url: string;
  variant: string;
  isDisable: boolean;
}

export interface LogoProps {
  url: string;
  alternativeText: string;
  className?: string;
}

export interface HeroProps {
  badge?: Badge;

  title: TextProps;
  subtitle: TextProps;

  buttons?: ButtonProps[];

  logo?: LogoProps;

  className?: string;

  decoration?: React.ReactNode;
}
