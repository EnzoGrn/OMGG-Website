import { TextEnum } from "@/lib/enumerations/TextEnum";

interface Text {
  text: string;
  size: TextEnum;
  className?: string;
};

export interface HeroProps {
  badge?: string;

  text: Text[];

  buttons?: {
    primary?: {
      text: string;
      url: string;
    };

    secondary?: {
      text: string;
      url: string;
    };
  };

  image: {
    src: string;
    alt: string;
    className?: string;
  };

  className?: string;
}
