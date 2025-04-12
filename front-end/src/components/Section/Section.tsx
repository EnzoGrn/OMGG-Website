import { Container, ContainerContent } from "./Container";
import { cn                          } from "@/lib/utils";

interface SectionProps {
  padding     : string; // Padding for the section (e.g., "py-12", "px-4", etc.)
  background ?: string; // Background color for the section (e.g., "bg-gray-100", "bg-white", etc.)
  className  ?: string; // Additional class names for the section

  children ?: React.ReactNode; // Children elements to be rendered inside the section
};

const Section = ({ padding, background, className, children }: SectionProps) => {
  return (
    <section className={cn("flex justify-center items-center w-full overflow-hidden", className, padding, background)}>
      <Container>
        <ContainerContent>
          {children}
        </ContainerContent>
      </Container>
    </section>
  );
};

export { Section };
