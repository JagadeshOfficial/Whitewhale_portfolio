import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export const metadata = {
  title: 'Our Services | WhiteWhale',
  description: 'Comprehensive technology services including software development, IT outsourcing, cloud & DevOps, and AI solutions.',
};

export default function ServicesPage() {
  const serviceDescriptions: Record<string, { longDescription: string; benefits: string[] }> = {
    'software-development': {
      longDescription: 'We deliver end-to-end software development solutions tailored to your business needs. From concept to deployment, our expert team uses the latest technologies and best practices to create robust, scalable applications that drive business value.',
      benefits: [
        'Custom web applications using modern frameworks',
        'Native and cross-platform mobile development',
        'Rapid prototyping and MVP development',
        'Full-stack development expertise',
        'Agile methodology and continuous deployment',
        'Post-launch support and maintenance'
      ]
    },
    'it-outsourcing': {
      longDescription: 'Access our global talent pool of experienced engineers, architects, and specialists. We provide dedicated development teams, staff augmentation, and strategic consulting to help you scale your operations cost-effectively while maintaining quality.',
      benefits: [
        'Dedicated development teams on-demand',
        'Flexible engagement models',
        'Vetted and certified professionals',
        'Cost-effective staffing solutions',
        'Seamless time zone coverage',
        'Quality assurance and project management'
      ]
    },
    'cloud-devops-microservices': {
      longDescription: 'Transform your infrastructure with cloud-native solutions and modern DevOps practices. We architect, deploy, and manage scalable microservices platforms that enable rapid innovation, reduce operational overhead, and improve system reliability.',
      benefits: [
        'Cloud migration and optimization',
        'CI/CD pipeline implementation',
        'Kubernetes and container orchestration',
        'Infrastructure as Code (IaC)',
        '24/7 monitoring and support',
        'Cost optimization strategies'
      ]
    },
    'ai-data-analytics-automation': {
      longDescription: 'Harness the power of AI and machine learning to unlock actionable insights from your data. We build intelligent systems, predictive models, and automation solutions that transform business processes and create competitive advantages.',
      benefits: [
        'Machine learning model development',
        'Predictive analytics and forecasting',
        'Business intelligence and dashboards',
        'Process automation with RPA',
        'Computer vision solutions',
        'Natural language processing applications'
      ]
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="relative z-10 container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">Our Services</h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="space-y-20">
            {SERVICES.slice(0, 4).map((service, index) => {
              const serviceImage = getImage(service.image || '');
              const description = serviceDescriptions[service.slug];
              const isEven = index % 2 === 0;

              return (
                <div key={service.slug} className="scroll-mt-20">
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
                    {/* Image - Display first on mobile, positioned based on isEven on desktop */}
                    {serviceImage && (
                      <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                        <div className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-2xl group">
                          <Image
                            src={serviceImage.imageUrl}
                            alt={service.title}
                            width={500}
                            height={450}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={serviceImage.imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="mb-6">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                          Service #{index + 1}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-6">
                        {description?.longDescription}
                      </p>

                      {/* Benefits List */}
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Key Benefits:</h3>
                        <ul className="space-y-3">
                          {description?.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" asChild>
                          <Link href={`/services/${service.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link href="/contact">Get Started</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Service Features Cards */}
                  {service.features && (
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">Core Capabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.features.slice(0, 4).map((feature) => (
                          <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                                  <Star className="h-6 w-6" />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-semibold mb-2">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  {index < SERVICES.length - 1 && (
                    <div className="mt-16 mb-4 border-t border-secondary" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">Why Choose WhiteWhale?</h2>
            <p className="text-lg text-muted-foreground">
              We combine cutting-edge technology, expert talent, and proven methodologies to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Proven Track Record',
                description: '500+ successful projects delivered across diverse industries and technologies.',
                icon: '✓'
              },
              {
                title: 'Expert Team',
                description: 'Highly skilled engineers with certifications and years of industry experience.',
                icon: '👥'
              },
              {
                title: 'Agile Methodology',
                description: 'Flexible, iterative development approach ensuring rapid delivery and quality.',
                icon: '⚡'
              },
              {
                title: 'Full Stack Solutions',
                description: 'End-to-end services from consultation to deployment and ongoing support.',
                icon: '🏗️'
              },
              {
                title: 'Latest Technologies',
                description: 'We stay current with the latest tools, frameworks, and best practices.',
                icon: '💻'
              },
              {
                title: 'Client-Centric',
                description: 'Your success is our priority - we align with your business goals.',
                icon: '🎯'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">Technology Stack</h2>
            <p className="text-lg text-muted-foreground">
              We leverage the best tools and technologies to build your solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                category: 'Frontend',
                techs: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Angular']
              },
              {
                category: 'Backend',
                techs: ['Node.js', 'Python', 'Java', 'C#/.NET', 'Go', 'Ruby on Rails']
              },
              {
                category: 'Cloud & Infrastructure',
                techs: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform']
              },
              {
                category: 'Databases & Tools',
                techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'GraphQL', 'REST APIs']
              },
              {
                category: 'AI & Data',
                techs: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Apache Spark', 'Tableau', 'Power BI']
              },
              {
                category: 'DevOps & CI/CD',
                techs: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Prometheus', 'ELK Stack', 'Datadog']
              }
            ].map((stack, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="text-lg font-semibold mb-4">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Choose the service that fits your needs and let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
