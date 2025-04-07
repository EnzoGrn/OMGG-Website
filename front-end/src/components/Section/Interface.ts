export interface HeroProps {
    badge?: string;

    heading    : string;
    description: string;

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
    };
}
