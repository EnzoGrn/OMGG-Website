import { Handshake, Sunset, Trees, Zap } from "lucide-react";

export namespace Header {

  export const logo = {
    url: "/",
    src: "./OMGG/Logo/Logo_SideText_Big.svg",
    alt: "OMGG Logo"
  };
  
  export const menu = [{
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
          url: "/",
        },
        {
          title: "Carrières",
          description: "Découvre nos offres d'emploi et rejoins-nous",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/",
        },
        {
          title: "Partenaires",
          description: "Tu es éditeur ? Découvre notre solution",
          icon: <Handshake className="size-5 shrink-0" />,
          url: "/",
        },
        {
          title: "Support",
          description: "Besoin d'aide ? Contacte notre équipe",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/",
        }
      ],
    },
    {
      title: "Blog",
      url: "#",
    }
  ];
  
  export const submit = {
    title: "Soumettre un jeu",
    url: "#"
  }
};
