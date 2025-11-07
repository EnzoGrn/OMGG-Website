import { ButtonProps } from "../Section/Interface";

interface cardProps {
  title: string;
  description: string;
  callToAction: ButtonProps
}

export interface OffersProps {
  cards: cardProps[];
}