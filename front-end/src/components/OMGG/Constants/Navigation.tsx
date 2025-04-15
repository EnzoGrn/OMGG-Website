import { FooterProps, MenuProps, NavbarProps } from "@/components/Navigation/NavigationProps";
import { Handshake, Sunset, Trees, Zap       } from "lucide-react";
import { OMGGFullSideLogo, OMGGSideLogo      } from "./Logo";

export const OMGGNavigation: MenuProps[] = [{
    title: "Nos créations",
    url: "#",
    items: [{
      title: "Vermines",
      description: "Jeu de cartes de deck-building dans le royaume des abeilles !",
      icon: <img src="./OMGG/Games/Logo/Icon_Vermines.png" alt="Vermines" className="w-5 h-4 shrink-0" />,
      url: "/"
    }]
  },
  {
    title: "OMGG",
    url: "/",
    items: [{
        title: "À propos",
        description: "Notre histoire, notre mission et nos valeurs",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/"
      },
      {
        title: "Carrières",
        description: "Découvre nos offres d'emploi et rejoins-nous",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/"
      },
      {
        title: "Partenaires",
        description: "Tu es éditeur ? Découvre notre solution",
        icon: <Handshake className="size-5 shrink-0" />,
        url: "/"
      },
      {
        title: "Support",
        description: "Besoin d'aide ? Contacte notre équipe",
        icon: <Zap className="size-5 shrink-0" />,
        url: "/"
    }]
  },
  {
    title: "Blog",
    url: "#"
}];

export const OMGGNavbarValues: NavbarProps = {
  logo: OMGGSideLogo,
  menu: OMGGNavigation,
  submit: {
    title: "Soumettre un jeu",
    url: "#"
  }
};

export const OMGGFooterValues: FooterProps = {
  logo: OMGGFullSideLogo,
  subtitle: "OMGG - One More Good Game\nDu plateau à l'écran, vivez le jeu autrement.",
  menu: OMGGNavigation,
  copyright: "© 2025 OMGG. Tous droits réservés.",
  terms: {
    title: "Conditions générales",
    url: "#"
  },
  privacy: {
    title: "Politique de confidentialité",
    url: "#"
  }
};
