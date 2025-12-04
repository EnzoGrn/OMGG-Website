import { Logos                       } from "@/components/Logo/Logos";
import { fetchFromStrapi             } from "@/lib/strapi";
import { getLocale                   } from "@/lib/locale";
import { JSX                         } from "react";
import { PartnerProps, PartnersProps } from "@/components/Logo/LogoInterface";

async function OMGGLogos({data}:  {data: PartnersProps}): Promise<JSX.Element> {
  const locale = await getLocale();
  const logos = await fetchFromStrapi("companies", true, locale, data.maxPartners, 1, "populate", "icon") as PartnerProps[];

  const classname: string = "bg-gradient-to-br from-[var(--primary)] to-[var(--detail)]";

  const updatedData: PartnersProps = {
    ...data,
    logos: logos,
    classname: classname
  };

  return(
    <Logos {...updatedData}/>
  );
}

export { OMGGLogos };
