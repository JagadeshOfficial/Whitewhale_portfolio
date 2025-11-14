import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SERVICES } from '@/lib/constants';
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
            Shaping Tomorrow's Technology Today
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 mb-8">
            Empowering businesses with smart, scalable technology solutions. We shape what's next — today.
          </p>
          <Button size="lg" asChild>
            <Link href="/services/software-development">
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline mb-6">About WhiteWhale</h2>
              <p className="text-lg text-muted-foreground mb-4">
                WhiteWhale Software Solutions is a leading technology company dedicated to transforming businesses through innovative digital solutions. With a team of experienced engineers and strategists, we partner with companies worldwide to solve complex technical challenges.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our mission is to deliver excellence through cutting-edge technology, strategic insights, and unwavering commitment to our clients' success. We believe in building long-term partnerships that drive sustainable growth and innovation.
              </p>
              <Button asChild>
                <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Projects Delivered</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground">Team Members</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <p className="text-muted-foreground">Countries Served</p>
              </Card>
            </div>
          </div>
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

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Why Choose WhiteWhale</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We combine expertise, innovation, and dedication to deliver exceptional results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <div className="mb-4 text-4xl">🚀</div>
              <h3 className="text-xl font-bold mb-2">Innovation First</h3>
              <p className="text-muted-foreground">
                We stay ahead of technological trends and continuously innovate to provide cutting-edge solutions that give your business a competitive edge.
              </p>
            </Card>
            <Card className="p-8">
              <div className="mb-4 text-4xl">👥</div>
              <h3 className="text-xl font-bold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">
                Our talented engineers, architects, and strategists bring decades of combined experience across industries and technologies.
              </p>
            </Card>
            <Card className="p-8">
              <div className="mb-4 text-4xl">✅</div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                We maintain rigorous quality standards and best practices to ensure every project meets and exceeds your expectations.
              </p>
            </Card>
            <Card className="p-8">
              <div className="mb-4 text-4xl">🤝</div>
              <h3 className="text-xl font-bold mb-2">Partnership Approach</h3>
              <p className="text-muted-foreground">
                We view every client as a long-term partner, collaborating closely to understand your goals and deliver tailored solutions.
              </p>
            </Card>
            <Card className="p-8">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Our agile methodologies and streamlined processes ensure rapid delivery without compromising on quality or attention to detail.
              </p>
            </Card>
            <Card className="p-8">
              <div className="mb-4 text-4xl">📈</div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-muted-foreground">
                Our track record speaks for itself with hundreds of successful projects that have transformed businesses and driven growth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's collaborate to build innovative solutions that drive your business forward. Contact our team today to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
