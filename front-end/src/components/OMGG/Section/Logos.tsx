import { useTranslations } from "next-intl";
import { Logos } from "@/components/Logo/Logos";

const OMGGLogosData = {
    heading: "",
    logos: [{
        id: "logo-1",
        description: "Logo 1",
        image: "https://shadcnblocks.com/images/block/logos/astro-wordmark.svg",
        className: "h-7 w-auto",
      },
      {
        id: "logo-2",
        description: "Logo 2",
        image: "https://shadcnblocks.com/images/block/logos/figma-wordmark.svg",
        className: "h-7 w-auto",
      },
      {
        id: "logo-3",
        description: "Logo 3",
        image: "https://shadcnblocks.com/images/block/logos/nextjs-wordmark.svg",
        className: "h-7 w-auto",
      },
      {
        id: "logo-4",
        description: "Logo 4",
        image: "https://shadcnblocks.com/images/block/logos/react-wordmark.svg",
        className: "h-7 w-auto",
      },
      {
        id: "logo-5",
        description: "Logo 5",
        image: "https://shadcnblocks.com/images/block/logos/shadcn-ui-wordmark.svg",
        className: "h-7 w-auto",
      },
      {
        id: "logo-6",
        description: "Logo 6",
        image: "https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg",
        className: "h-7 w-auto",
      },
      {
        id: "logo-7",
        description: "Logo 7",
        image: "https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg",
        className: "h-4 w-auto",
      },
      {
        id: "logo-8",
        description: "Logo 8",
        image: "https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg",
        className: "h-7 w-auto",
    }]
};

const OMGGLogos = () => {
  const t = useTranslations('Logos');

  OMGGLogosData.heading = t('heading');

  return(
    <Logos {...OMGGLogosData} className="bg-gradient-to-br from-[var(--primary)] to-[var(--detail)]" />
  );
}

export { OMGGLogos };
