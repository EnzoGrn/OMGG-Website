import { Locale, useTranslations } from "next-intl";
import { setRequestLocale        } from "next-intl/server";
import { use                     } from "react";
import { Navbar                  } from "@/components/Navbar/Navbar";

import { Handshake, Sunset, Trees, Zap } from "lucide-react";

const logo = {
  url: "/",
  src: "./OMGG/Logo/Logo_SideText_Big.svg",
  alt: "OMGG Logo"
};

const menu = [
  {
    title: "Our creations",
    url: "#",
    items: [
      {
        title: "Vermines",
        description: "Deck-building card game in the kingdom of the bees!",
        icon: <img src="./OMGG/Games/Logo/Icon_Vermines.png" alt="Vermines" className="w-5 h-4 shrink-0" />,
        url: "/"
      }
    ]
  },
  {
    title: "OMGG",
    url: "/",
    items: [
      {
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

const submit = {
  title: "Soumettre un jeu",
  url: "#"
}

export default function Home({ params }: { params: Promise<{locale: Locale}> })
{
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('NavbarLinks');

  return (
    <main className="w-full h-full">
      <Navbar logo={logo} menu={menu} submit={submit}>
      </Navbar>
    </main>
  );
}
