import { LogoProps } from "@/components/Logo/Interface";

interface RedirectButtonProps {
  title: string;
  url  : string;
}

export interface MenuProps {
    title: string; // The title of the menu.
    url  : string; // The URL the menu is link to.

    description  ?: string;          // The description of the menu.
    icon         ?: React.ReactNode; // The icon for the menu.
    items        ?: MenuProps[];     // Submenu (if any).
}

export interface NavbarProps {
    logo  ?: LogoProps;           // The logo object for the navbar.
    menu  ?: MenuProps[];         // An array of menu navigation for the navbar.
    submit?: RedirectButtonProps; // A important button to redirect the user.
    locale?: string;              // The current locale/language of the application.
}

export interface FooterProps {
    logo   ?: LogoProps;   // The logo object for the footer.
    subtitle: string;      // The company description.
    menu   ?: MenuProps[]; // An array of menu navigation for the footer.

    copyright: string;

    terms  : RedirectButtonProps;
    privacy: RedirectButtonProps;
}
