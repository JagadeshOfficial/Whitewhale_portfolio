import Image from "next/image";
import { ResumeForm } from "@/components/resume-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata = {
  title: 'AI Resume Builder | WhiteWhale',
  description: 'Create a professional, ATS-friendly resume in minutes with our AI-powered tool.',
};

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export default function ResumeBuilderPage() {
  const heroImage = getImage('resume-builder-hero');

  return (
    <div>
      <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">
            AI-Powered Resume Builder
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200">
            Create a professional, ATS-friendly resume in minutes. Let our AI help you stand out.
          </p>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <ResumeForm />
      </section>
    </div>
  );
}
