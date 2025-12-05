import { Button } from "@/components/ui/button";
import { Container } from "../Section/Container";
import { ArrowUpRight } from "lucide-react";
import { ButtonProps, TextProps } from "../Section/Interface";
import { RenderText } from "../Utils/TextUtils";

interface CTAProps {
  title: TextProps;
  description?: TextProps;
  children?: React.ReactNode;
  button: ButtonProps;
};

const CTA = ({ data }: { data: CTAProps }) => {
  return (
    <section className="py-8">
      <Container className="container relative overflow-visible space-y-6 md:space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 p-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--detail)] relative overflow-visible">
          <div className="flex-1 flex flex-col gap-4 z-10">
            <RenderText text={data.title} className="text-2xl font-bold text-pretty lg:text-4xl" />
            {data.description && <RenderText text={data.description} className="max-w-xl lg:text-lg" />}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button asChild className="w-full sm:w-auto md:max-w-2/3 lg:max-w-full uppercase" aria-label={data.button.title}>
                {data.button.download ? (
                  <a href={data.button.url} download aria-label={data.button.title}>
                    {data.button.title}
                    <ArrowUpRight className="ml-2 size-4" />
                  </a>
                ) : (
                  <a href={data.button.url} aria-label={data.button.title}>
                    {data.button.title}
                  </a>
                )}
              </Button>
            </div>
          </div>

          {data.children}
        </div>
      </Container>
    </section>
  );
};

export { CTA };
