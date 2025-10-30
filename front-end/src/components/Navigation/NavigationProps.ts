import { LogoProps } from "@/components/Logo/Interface";

export interface ItemProps {
    id:                 number,
    title:              string;
    url:                string;
    shortDescription:   string;

    // Handle icon of the item
    isSlugIcon  : boolean;
    urlIcon     ?: string; // The url of the icon (isSlugIcon false)
    slugIcon    ?: string; // The slug of the react ui icon
    alt         ?: string;
}

export interface DropdownProps {
    id:         number,
    title:      string;     // The title of the menu.
    isDisable:  boolean;    // Is the button is disable
    variant:    string;    // Variant of the button

    items       ?: ItemProps[]; // Items in the dropdown button
}

export interface ItemLinksProps {
    id:         number,
    title:      string;
    url:        string;
    newtab:     boolean;
    isDisable:  boolean;
    variant:    string;
}

export interface NavbarProps {
    logo        ?: LogoProps;           // The logo object for the navbar.
    dropdowns   ?: DropdownProps[];     // An array of dropdown menu navigation for the navbar.
    itemLinks   ?: ItemLinksProps[];    // An array of button menu navigation for the navbar.
    locale      ?: string;              // The current locale/language of the application.
}

export interface MenuProps {
    title: string; // The title of the menu.
    url  : string; // The URL the menu is link to.

    description  ?: string;          // The description of the menu.
    icon         ?: React.ReactNode; // The icon for the menu.
    items        ?: MenuProps[];     // Submenu (if any).
}


