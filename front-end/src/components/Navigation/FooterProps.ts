import { LogoProps } from "../Section/Interface";

interface RedirectButtonProps {
    id          : number;
    text       : string;
    url         : string;
    isDisable   : boolean;
}

interface IconLinkProps {
    id      : number; 
    text    : string;
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

interface ImageProps {
    text: string,
    image: LogoProps
}

export interface FooterProps {
    logo        : ImageProps;       // The logo object for the footer.
    subtitle    : string;           // The company description.
    iconsLink   : IconLinkProps[];  // Social networks buttons

    copyright   : string;
    legal       : RedirectButtonProps[];

    menu    ?: MenuProps[]; // An array of menu navigation for the footer.
    locale  ?: string;
}