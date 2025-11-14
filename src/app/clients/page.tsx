import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, TrendingUp, Users } from 'lucide-react';
import { CLIENT_LOGOS } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export const metadata = {
  title: 'Our Clients | WhiteWhale Software Solutions',
  description: 'Trusted by industry leaders and innovative companies worldwide. See our portfolio of successful client engagements.',
};

export default function ClientsPage() {
  const heroImage = getImage('hero-background');

  // Client testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovators Inc',
      role: 'CTO',
      content: 'WhiteWhale transformed our legacy system into a modern, scalable platform. Their team was professional, dedicated, and delivered on time.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Global Finance Corp',
      role: 'VP Operations',
      content: 'Outstanding service! The DevOps solutions they implemented reduced our infrastructure costs by 40% and improved deployment speed significantly.',
      rating: 5
    },
    {
      name: 'Emma Williams',
      company: 'Healthcare Solutions Ltd',
      role: 'Chief Innovation Officer',
      content: 'Their AI and data analytics team provided valuable insights that improved our patient outcomes. Highly recommended!',
      rating: 5
    },
    {
      name: 'David Martinez',
      company: 'E-Commerce Giants',
      role: 'CEO',
      content: 'Best decision we made was partnering with WhiteWhale. Their mobile app development expertise helped us reach millions of users.',
      rating: 5
    }
  ];

  // Client success metrics
  const metrics = [
    { icon: '🏢', label: 'Global Clients', value: '250+' },
    { icon: '✅', label: 'Projects Delivered', value: '500+' },
    { icon: '😊', label: 'Client Satisfaction', value: '98%' },
    { icon: '⏱️', label: 'On-Time Delivery', value: '99%' }
  ];

  // Industry sectors
  const industries = [
    { name: 'Technology', description: 'Software development and cloud solutions' },
    { name: 'Finance', description: 'Banking systems and fintech applications' },
    { name: 'Healthcare', description: 'Medical platforms and health tech' },
    { name: 'E-Commerce', description: 'Online retail and marketplace solutions' },
    { name: 'Manufacturing', description: 'Industry 4.0 and automation' },
    { name: 'Education', description: 'EdTech and learning platforms' }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Clients"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">
            Trusted by Industry Leaders
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Join hundreds of companies that have transformed their business with WhiteWhale's innovative solutions.
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{metric.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{metric.value}</div>
                <p className="text-gray-100">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 via-purple-50 to-blue-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            Our Valued Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CLIENT_LOGOS.filter(logo => getImage(logo.image)).map((logo) => {
              const logoImage = getImage(logo.image);
              return (
                <div 
                  key={logo.name} 
                  className="group p-6 rounded-xl bg-gradient-to-br from-white via-blue-50 to-white hover:from-blue-100 hover:via-purple-100 hover:to-blue-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-blue-100 hover:border-blue-300 flex items-center justify-center min-h-[140px] cursor-pointer"
                >
                  <div className="w-full flex items-center justify-center">
                    <Image
                      src={logoImage!.imageUrl}
                      alt={logo.name}
                      width={140}
                      height={100}
                      className="object-contain max-w-full h-auto group-hover:drop-shadow-lg transition-all"
                      style={{ maxHeight: '100px' }}
                      data-ai-hint={logoImage!.imageHint}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground">
              With expertise across multiple sectors, we understand the unique challenges and opportunities in your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">
                    {idx === 0 && '💻'}
                    {idx === 1 && '💰'}
                    {idx === 2 && '🏥'}
                    {idx === 3 && '🛒'}
                    {idx === 4 && '🏭'}
                    {idx === 5 && '📚'}
                  </span>
                  {industry.name}
                </h3>
                <p className="text-muted-foreground">{industry.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from our satisfied clients about their experience working with WhiteWhale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">&quot;{testimonial.content}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            Why Clients Choose WhiteWhale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-muted-foreground">
                With 15+ years of experience, we've successfully delivered 500+ projects across multiple industries.
              </p>
            </Card>

            <Card className="p-8">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-muted-foreground">
                Our 150+ skilled professionals bring diverse expertise in technology, design, and project management.
              </p>
            </Card>

            <Card className="p-8">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
              <p className="text-muted-foreground">
                We focus on measurable outcomes that directly impact your business growth and success.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            Featured Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cloud Migration Success',
                description: 'Reduced infrastructure costs by 40% through strategic cloud migration',
                client: 'Global Finance Corp',
                result: '40% Cost Reduction'
              },
              {
                title: 'Mobile App Launch',
                description: 'Developed and launched award-winning mobile app reaching 1M+ downloads',
                client: 'E-Commerce Giants',
                result: '1M+ Downloads'
              },
              {
                title: 'AI Implementation',
                description: 'Built ML models improving operational efficiency and customer satisfaction',
                client: 'Healthcare Solutions',
                result: '35% Efficiency Gain'
              }
            ].map((study, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm"><span className="font-semibold">Client:</span> {study.client}</p>
                    <p className="text-sm"><span className="font-semibold">Result:</span> <span className="text-primary font-bold">{study.result}</span></p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how WhiteWhale can help your business achieve new heights with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
