import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  return {
    title: `${service.title} | WhiteWhale`,
    description: service.description,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const serviceImage = getImage(service.image || 'service-default');

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">{service.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{service.description}</p>
          
          {service.features && (
            <ul className="space-y-4">
              {service.features.map((feature) => (
                <li key={feature.title} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {service.advantages && (
            <Tabs defaultValue="lps" className="w-full mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lps">For LPs</TabsTrigger>
                <TabsTrigger value="founders">For Founders</TabsTrigger>
                <TabsTrigger value="gps">For GPs</TabsTrigger>
              </TabsList>
              <TabsContent value="lps">
                <Card>
                  <CardHeader>
                    <CardTitle>{service.advantages.lps.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {service.advantages.lps.points.map((point) => (
                      <p key={point} className="text-sm text-muted-foreground list-disc ml-4">{point}</p>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="founders">
                <Card>
                  <CardHeader>
                    <CardTitle>{service.advantages.founders.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {service.advantages.founders.points.map((point) => (
                      <p key={point} className="text-sm text-muted-foreground list-disc ml-4">{point}</p>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="gps">
                <Card>
                  <CardHeader>
                    <CardTitle>{service.advantages.gps.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {service.advantages.gps.points.map((point) => (
                      <p key={point} className="text-sm text-muted-foreground list-disc ml-4">{point}</p>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

        </div>
        <div className="order-1 lg:order-2">
          {serviceImage && (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={serviceImage.imageUrl}
                alt={serviceImage.description}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-ai-hint={serviceImage.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
