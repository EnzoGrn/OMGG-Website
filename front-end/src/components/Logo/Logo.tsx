import Link from "next/link";
import { LogoProps } from "./LogoInterface";

const Logo = ({ logo, cn }: { logo: LogoProps, cn?: string }) => {
  return (
    <Link href={logo?.url} className="flex items-center gap-2">
      <img src={logo?.src} className={cn ? cn : "max-h-[43px] w-full"} alt={logo?.alt} />
    </Link>
  );
}

export { Logo };
