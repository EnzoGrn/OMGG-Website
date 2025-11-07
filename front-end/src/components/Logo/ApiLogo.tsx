import Link from "next/link";
import { LogoProps } from "./LogoInterface";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

const ApiLogo = ({ logo, cn }: { logo: LogoProps, cn?: string }) => {
  return (
    <Link href={logo?.url} className="flex items-center gap-2">
      <img src={`${STRAPI_URL}${logo?.src}`} className={cn ? cn : "max-h-[43px] w-full"} alt={logo?.alt} />
    </Link>
  );
}

export { ApiLogo };
