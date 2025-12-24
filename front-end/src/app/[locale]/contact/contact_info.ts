import { IconType } from "react-icons";
import { FaXTwitter, FaBluesky, FaInstagram, FaTiktok, FaLinkedinIn, FaReddit, FaPaperPlane, FaPhone } from "react-icons/fa6";

type SocialNetwork = {
  id: string;
  text: string;
  Icon: IconType;
  url: string;
};

export const emailContact = {
  "id": "omgg-contact",
  "text": "Email",
  "Icon": FaPaperPlane,
  "url": "mailto:contact@omgg.fr"
} as SocialNetwork;

export const socialNetworks = [
  {
    "id": "omgg-linkedin",
    "text": "LinkedIn",
    "Icon": FaLinkedinIn,
    "url": "https://www.linkedin.com/company/omggfr/"
  },
  {
    "id": "omgg-instagram",
    "text": "Instagram",
    "Icon": FaInstagram,
    "url": "https://www.instagram.com/omgg_fr/"
  },
  {
    "id": "omgg-reddit",
    "text": "Reddit",
    "Icon": FaReddit,
    "url": "https://www.reddit.com/user/omgg_fr/"
  },
  {
    "id": "omgg-x",
    "text": "X",
    "Icon": FaXTwitter,
    "url": "https://x.com/omgg_fr/"
  },
  {
    "id": "omgg-tiktok",
    "text": "Tiktok",
    "Icon": FaTiktok,
    "url": "https://www.tiktok.com/@omgg_fr/"
  },
  {
    "id": "omgg-bluesky",
    "text": "BlueSky",
    "Icon": FaBluesky,
    "url": "https://bsky.app/profile/omggfr.bsky.social/"
  }
] as SocialNetwork[];

export const phoneContact = {
  "id": "omgg-phone",
  "text": 'Disponible du lundi au vendredi de 9h à 18h',
  "Icon": FaPhone,
  "url": "tel:+33782734409"
} as SocialNetwork;
