import { Logos } from "@/components/Logo/Logos";
import { fetchDataSearchParams } from "@/lib/strapi";
import { JSX } from "react";
import { PartnersProps } from "@/components/Logo/LogoInterface";

async function OMGGLogos({ data }: { data: PartnersProps }): Promise<JSX.Element> {
  const logos = await fetchDataSearchParams({
    path: "companies",
    forceCache: true,
    locale: undefined,
    searchParams: {
      "populate": "icon",
      "filters[isPartner][$eq]": "true"
    }
  });

  if (logos.data.length === 0)
    return <></>;
  const classname: string = "bg-gradient-to-br from-[var(--primary)] to-[var(--detail)]";

  const updatedData: PartnersProps = {
    ...data,
    logos: logos.data,
    classname: classname
  };

  return (
    <Logos {...updatedData} />
  );
}

export { OMGGLogos };
