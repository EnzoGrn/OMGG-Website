import { cn } from "@/lib/utils";

const Container = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("container mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1440px]", className)}>
      {children}
    </div>
  );
}

const ContainerContent = ({ children, className } : { children: React.ReactNode, className?: string }) => {
  return(
    <div className={cn("max-w-[690px] p-0 lg:p-12 lg:max-w-full flex justify-center", className)}>
      {children}
    </div>
  );
}

export { Container, ContainerContent };
