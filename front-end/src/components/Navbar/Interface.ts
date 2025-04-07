import { LogoProps } from "@/components/Logo/Interface";

export namespace Header {

    /**
     * Interface for the menu items in the navbar.
     */
    export interface MenuItem {
        title: string; // The title of the menu item
        url  : string; // The URL the menu item links to

        description?: string;          // The description of the menu item
        icon       ?: React.ReactNode; // The icon to display next to the menu item
        items      ?: MenuItem[];      // Submenu items (if any)
    };

    /**
     * Interface for the navbar component.
     */
    export interface NavbarProps {
        logo?: LogoProps;  // The logo object for the navbar
        menu?: MenuItem[]; // An array of menu items for the navbar
        submit?: {
            title: string; // The title for the submit button
            url  : string; // The URL for the submit button
        }
    };
};
