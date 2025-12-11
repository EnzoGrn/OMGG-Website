import Image from 'next/image';
import React from "react";
import { PSection } from '@/components/Section/Section';

type Props = {
  title: string;
  description: string;
  button: React.ReactNode;
};

export default async function NotFound({ title, description, button }: Props) {
  return (
    <main className="w-full min-h-screen overflow-hidden">
      <PSection padding={'py-8'} className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12">
        <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4 drop-shadow-2xl">
            <Image
              src="/OMGG/Illustrations/happy_omgg.webp"
              alt="Happy OMGG Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {description}
          </p>

          {button}
        </div>
      </PSection>
    </main>
  );
}
