import { cn } from "@/lib/utils";

const H1 = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("font-extrabold text-4xl text-pretty lg:text-5xl", className)}>
      {children}
    </div>
  );
}

const H2 = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <div className={cn("text-pretty lg:text-2xl font-bold", className)}>
      {children}
    </div>
  );
}

const H3 = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <div className={cn("text-pretty lg:text-xl font-semibold", className)}>
      {children}
    </div>
  );
}

const P = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <div className={cn("text-pretty lg:text-lg font-normal", className)}>
      {children}
    </div>
  );
}

export { H1, H2, H3, P };
