import { LogoProps } from "./Interface";

const Logo = ({ logo, cn }: { logo: LogoProps, cn?: string }) => {
  return (
    <a href={logo?.url} className="flex items-center gap-2">
      <img src={logo?.src} className={cn ? cn : "max-h-[43px] w-full"} alt={logo?.alt} />
    </a>
  );
}

export { Logo };
