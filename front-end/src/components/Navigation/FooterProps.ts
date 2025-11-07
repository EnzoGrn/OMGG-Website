import { LogoProps } from "@/components/Logo/LogoInterface";

interface RedirectButtonProps {
    id          : number;
    title       : string;
    url         : string;
    isDisable   : boolean;
}

interface IconLinkProps {
    id      : number; 
    url     : string;
    variant : string;

    isDisable   : boolean;
    newTab      : boolean;
    slugIcon    : string;
    isSlugIcon  : boolean;
}

export interface MenuProps {
    id          : number;
    title       : string;
    textLinks   : RedirectButtonProps[];
    isDisable   : boolean;
}

export interface FooterProps {
    logo        : LogoProps;       // The logo object for the footer.
    subtitle    : string;           // The company description.
    iconsLink   : IconLinkProps[];  // Social networks buttons

    copyright   : string;
    legal       : RedirectButtonProps[];

    menu    ?: MenuProps[]; // An array of menu navigation for the footer.
    locale  ?: string;
}