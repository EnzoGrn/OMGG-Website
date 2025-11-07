import { Logos                       } from "@/components/Logo/Logos";
import { fetchFromStrapi             } from "@/lib/strapi";
import { getLocale                   } from "@/lib/locale";
import { JSX                         } from "react";
import { PartnerProps, PartnersProps } from "@/components/Logo/LogoInterface";

async function OMGGLogos({data}:  {data: PartnersProps}): Promise<JSX.Element> {
  const locale = await getLocale();
  const logos = await fetchFromStrapi("companies", locale, data.maxPartners, 1, "populate", "icon") as PartnerProps[];

  data.logos = logos;
  data.classname = "bg-gradient-to-br from-[var(--primary)] to-[var(--detail)]" ;

  return(
    <Logos {...data}/>
  );
}

export { OMGGLogos };
