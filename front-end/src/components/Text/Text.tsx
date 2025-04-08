import { cn } from "@/lib/utils";

const H1 = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return (
    <h1 className={cn("font-extrabold text-4xl text-pretty lg:text-5xl", className)}>
      {children}
    </h1>
  );
}

const H2 = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <h2 className={cn("text-pretty text-xl lg:text-2xl font-bold", className)}>
      {children}
    </h2>
  );
}

const H3 = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <h3 className={cn("text-pretty text-lg lg:text-xl font-semibold", className)}>
      {children}
    </h3>
  );
}

const P = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <p className={cn("text-pretty lg:text-lg font-normal", className)}>
      {children}
    </p>
  );
}

export { H1, H2, H3, P };
