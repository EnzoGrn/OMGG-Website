import { Container, ContainerContent } from "./Container";
import { cn                          } from "@/lib/utils";

interface SectionProps {
  padding     : string; // Padding for the section (e.g., "py-12", "px-4", etc.)
  className  ?: string; // Additional class names for the section

  children ?: React.ReactNode; // Children elements to be rendered inside the section
};

// Primary Section Component
// This section is bigger than the secondary section on 'lg' viewports.
const PSection = ({ padding, className, children }: SectionProps) => {
  return (
    <section className={cn("flex justify-center items-center w-full overflow-hidden", padding, className)}>
      <Container>
        <ContainerContent>
          {children}
        </ContainerContent>
      </Container>
    </section>
  );
};

// Secondary Section Component
// Here the secondary section is a bit lighter than the primary on 'lg' viewports.
const SSection = ({ padding, className, children }: SectionProps) => {
  return (
    <section className={cn("flex justify-center items-center w-full overflow-hidden", padding, className)}>
      <Container>
        {children}
      </Container>
    </section>
  );
};


export { PSection, SSection };
