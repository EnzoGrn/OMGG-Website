import Link from "next/link";
import { getMediaFromUrl } from "@/lib/strapi";
import { LogoProps       } from "../Section/Interface";

const ApiLogo = ({ logo, cn }: { logo: LogoProps, cn?: string }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img src={getMediaFromUrl(logo?.url)} className={cn ? cn : "max-h-[43px] w-full"} alt={logo?.alternativeText} />
    </Link>
  );
}

export { ApiLogo };
