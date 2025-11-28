import Link from "next/link";
import { LogoProps } from "../Section/Interface";

// TODO: may need to delete it
const Logo = ({ logo, cn }: { logo: LogoProps, cn?: string }) => {
  return (
    <Link href={logo?.url} className="flex items-center gap-2">
      <img src={"/"} className={cn ? cn : "max-h-[43px] w-full"} alt={logo?.alternativeText} />
    </Link>
  );
}

export { Logo };
