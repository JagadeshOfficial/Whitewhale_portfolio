import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CLIENT_LOGOS, SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export default function Home() {
  const heroImage = getImage('hero-background');
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container px-4 mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">
            Strategic Investment & Technology Consulting
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 mb-8">
            WhiteWhale partners with visionary companies to build a better future through capital investment and expert software engineering.
          </p>
          <Button size="lg" asChild>
            <Link href="/services/software-development">
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Our Core Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We offer a comprehensive suite of services designed to accelerate growth and drive innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.slice(0, 4).map((service) => {
              const serviceImage = getImage(service.image || '');
              return (
                <Card key={service.title} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {serviceImage && (
                    <div className="relative h-48 w-full">
                       <Image
                        src={serviceImage.imageUrl}
                        alt={serviceImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href={`/services/${service.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight font-headline mb-2">Trusted by Industry Leaders</h2>
          <p className="text-center text-muted-foreground mb-12">We are proud to partner with innovative companies of all sizes.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
            {CLIENT_LOGOS.map((logo) => {
              const logoImage = getImage(logo.image);
              return logoImage ? (
                <div key={logo.name} className="relative h-12 w-32 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={logoImage.imageUrl}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    data-ai-hint={logoImage.imageHint}
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
