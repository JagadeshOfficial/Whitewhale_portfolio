import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle, Code2, Wrench, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceImage = getImage(service.image || 'service-default');

  // Service-specific tools and technologies
  const serviceTools: Record<string, { tools: string[]; technologies: string[] }> = {
    'software-development': {
      tools: ['VS Code', 'Git/GitHub', 'Docker', 'Jenkins', 'Jira', 'Figma', 'Postman', 'IntelliJ IDEA'],
      technologies: ['React/Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Kubernetes', 'GraphQL']
    },
    'it-outsourcing': {
      tools: ['Slack', 'Zoom', 'Asana', 'Confluence', 'JIRA', 'Azure DevOps', 'GitHub Enterprise', 'Tableau'],
      technologies: ['Java', 'Python', 'C#/.NET', 'Ruby on Rails', 'PHP', 'Cloud Platforms', 'Microservices', 'CI/CD']
    },
    'cloud-devops-microservices': {
      tools: ['Terraform', 'Ansible', 'GitLab CI/CD', 'CloudFormation', 'Helm', 'Prometheus', 'ELK Stack', 'DataDog'],
      technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Istio', 'Consul', 'Vault']
    },
    'ai-data-analytics-automation': {
      tools: ['Jupyter Notebook', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Power BI', 'Tableau', 'Apache Spark', 'Airflow'],
      technologies: ['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'RPA']
    }
  };

  const tools = serviceTools[slug] || { tools: [], technologies: [] };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
        {serviceImage && (
          <Image
            src={serviceImage.imageUrl}
            alt={serviceImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={serviceImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">{service.title}</h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">{service.description}</p>
        </div>
      </section>

      {/* About This Service Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            About {service.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Industry Excellence</h3>
                    <p className="text-sm text-muted-foreground">Recognized expertise and proven track record</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Custom Solutions</h3>
                    <p className="text-sm text-muted-foreground">Tailored to your unique business needs</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Ongoing Support</h3>
                    <p className="text-sm text-muted-foreground">Continuous optimization and improvements</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              {serviceImage && (
                <Image
                  src={serviceImage.imageUrl}
                  alt={serviceImage.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={serviceImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Features */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight mb-8 font-headline">Key Features</h2>
              
              {service.features && (
                <div className="space-y-6 mb-12">
                  {service.features.map((feature, idx) => (
                    <div key={feature.title} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b last:border-b-0 items-start">
                      <div>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white font-bold text-lg">
                              {idx + 1}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block relative aspect-[4/3] rounded-lg overflow-hidden shadow-md bg-muted">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Code2 className="h-12 w-12 text-primary mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">{feature.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tools Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-8 font-headline">Tools & Technologies</h2>
                
                <Tabs defaultValue="tools" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tools" className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Development Tools
                    </TabsTrigger>
                    <TabsTrigger value="tech" className="flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      Technologies
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tools" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tools.tools.map((tool) => (
                        <Card key={tool} className="p-4 hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-3">
                            <Wrench className="h-5 w-5 text-primary" />
                            <span className="font-medium">{tool}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tech" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tools.technologies.map((tech) => (
                        <Card key={tech} className="p-4 hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-3">
                            <Code2 className="h-5 w-5 text-primary" />
                            <span className="font-medium">{tech}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-primary text-white p-8">
                  <h3 className="text-2xl font-bold mb-6">Why Choose This Service?</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <TrendingUp className="h-6 w-6 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Scalable Solutions</p>
                        <p className="text-sm opacity-90">Grow with your business needs</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Shield className="h-6 w-6 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Enterprise Security</p>
                        <p className="text-sm opacity-90">Industry-standard security practices</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Users className="h-6 w-6 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Expert Team</p>
                        <p className="text-sm opacity-90">Certified professionals</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Zap className="h-6 w-6 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">Fast Delivery</p>
                        <p className="text-sm opacity-90">Agile methodology</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-8 bg-white text-primary hover:bg-gray-100">
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            Our Implementation Process
          </h2>
          
          <div className="space-y-12">
            {[
              {
                step: 1,
                title: "Discovery & Planning",
                description: "We start by understanding your business goals, challenges, and requirements. Our team conducts a thorough analysis to create a comprehensive project roadmap tailored to your needs.",
                benefits: ["Detailed requirements gathering", "Risk assessment", "Timeline planning", "Cost estimation"]
              },
              {
                step: 2,
                title: "Design & Strategy",
                description: "Based on our findings, we design a strategic solution architecture that aligns with best practices and your business objectives. We create detailed specifications and design documents.",
                benefits: ["Solution architecture", "Technical specifications", "Design mockups", "Strategy documentation"]
              },
              {
                step: 3,
                title: "Development & Implementation",
                description: "Our experienced team implements the solution using cutting-edge technologies and agile methodologies. Regular sprints ensure transparency and on-time delivery with quality assurance.",
                benefits: ["Agile development", "Regular updates", "Quality assurance", "Continuous integration"]
              },
              {
                step: 4,
                title: "Testing & Deployment",
                description: "Comprehensive testing ensures all features work perfectly. We perform unit testing, integration testing, and user acceptance testing before deployment to production.",
                benefits: ["Comprehensive testing", "Performance optimization", "Security validation", "Smooth deployment"]
              },
              {
                step: 5,
                title: "Support & Optimization",
                description: "After launch, we provide ongoing support, maintenance, and optimization. Our team monitors performance and implements improvements based on user feedback.",
                benefits: ["24/7 monitoring", "Regular maintenance", "Performance tuning", "Continuous improvement"]
              }
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-12 border-b last:border-b-0">
                {idx % 2 === 0 ? (
                  <>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-2xl">
                            {item.step}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.benefits.map((benefit, bidx) => (
                          <div key={bidx} className="flex gap-2 items-start">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-primary/10 to-primary/20">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Code2 className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-semibold text-muted-foreground">Step {item.step}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-primary/10 to-primary/20 order-2 md:order-1">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Code2 className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-semibold text-muted-foreground">Step {item.step}</p>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-2xl">
                            {item.step}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.benefits.map((benefit, bidx) => (
                          <div key={bidx} className="flex gap-2 items-start">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            What You'll Get
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'High Performance',
                description: 'Optimized solutions that deliver exceptional speed and reliability.'
              },
              {
                icon: '🔒',
                title: 'Security First',
                description: 'Comprehensive security measures to protect your data and systems.'
              },
              {
                icon: '📈',
                title: 'Scalability',
                description: 'Solutions that grow with your business and handle increased load.'
              },
              {
                icon: '🤝',
                title: 'Dedicated Support',
                description: 'Round-the-clock support from our expert team members.'
              },
              {
                icon: '📊',
                title: 'Analytics & Insights',
                description: 'Detailed analytics and reporting to track performance metrics.'
              },
              {
                icon: '🚀',
                title: 'Continuous Improvement',
                description: 'Regular updates and optimizations to keep you ahead.'
              },
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals with our {service.title.toLowerCase()} service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
