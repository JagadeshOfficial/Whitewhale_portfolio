import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Zap, TrendingUp, Heart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export const metadata = {
  title: 'About WhiteWhale | Software Solutions',
  description: 'Learn about WhiteWhale Software Solutions - our mission, vision, and commitment to delivering excellence.',
};

export default function AboutPage() {
  const aboutImage = getImage('hero-background');
  const teamImage = getImage('service-it-outsourcing');
  const techImage = getImage('service-software-development');
  const aiImage = getImage('service-ai-data');

  const coreValues = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality solutions that exceed expectations.'
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Innovation',
      description: 'Continuous innovation and staying ahead of technology trends to benefit our clients.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Collaboration',
      description: 'Strong partnerships with our clients, treating them as true collaborators in success.'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Efficiency',
      description: 'Delivering solutions rapidly without compromising on quality or security standards.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Growth',
      description: 'Focused on sustainable growth and long-term success for our clients and team.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical practices in all business dealings.'
    },
  ];

  const achievements = [
    {
      number: '500+',
      label: 'Projects Delivered',
      description: 'Successful projects across diverse industries and technologies'
    },
    {
      number: '150+',
      label: 'Team Members',
      description: 'Skilled professionals dedicated to excellence'
    },
    {
      number: '15+',
      label: 'Years Experience',
      description: 'Proven track record of success and innovation'
    },
    {
      number: '25+',
      label: 'Countries Served',
      description: 'Global presence with local expertise'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable infrastructure and support'
    },
    {
      number: '100%',
      label: 'Client Satisfaction',
      description: 'Committed to exceeding client expectations'
    },
  ];

  const teamRoles = [
    {
      role: 'Senior Software Engineers',
      count: '45+',
      description: 'Expert developers with 10+ years experience'
    },
    {
      role: 'Full Stack Developers',
      count: '60+',
      description: 'Proficient in modern web and mobile technologies'
    },
    {
      role: 'DevOps & Cloud Architects',
      count: '25+',
      description: 'Infrastructure experts for scalable solutions'
    },
    {
      role: 'Data Scientists & AI Specialists',
      count: '20+',
      description: 'ML and AI implementation experts'
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
        {aboutImage && (
          <Image
            src={aboutImage.imageUrl}
            alt="About WhiteWhale"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">
            About WhiteWhale
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Engineering Digital Excellence Since 2009
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 font-headline">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                WhiteWhale Software Solutions was founded with a simple vision: to transform businesses through innovative technology solutions. What started as a small team of passionate engineers has grown into a global powerhouse trusted by industry leaders.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Over the past 15 years, we've delivered over 500 successful projects across diverse industries including fintech, healthcare, e-commerce, and enterprise software. Our success is built on a foundation of technical excellence, customer-centric approach, and unwavering commitment to quality.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Today, with a team of 150+ talented professionals spread across 25 countries, we continue to push the boundaries of what's possible in technology, helping our clients achieve their most ambitious goals.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Start Your Journey With Us</Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              {teamImage && (
                <Image
                  src={teamImage.imageUrl}
                  alt="Our talented team collaborating"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower businesses worldwide by delivering innovative, scalable, and reliable technology solutions that drive growth, enhance efficiency, and create lasting value. We are committed to being trusted partners in our clients' digital transformation journey.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the globally recognized leader in software solutions and digital transformation, known for innovation, quality, and customer success. We envision a future where technology seamlessly transforms how businesses operate and serve their customers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do and define our culture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
              By The Numbers
            </h2>
            <p className="text-lg text-gray-100">
              Our impact measured by success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold mb-2">{achievement.number}</div>
                <div className="text-xl font-semibold mb-2">{achievement.label}</div>
                <p className="text-gray-200">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
              Our Talented Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Diverse expertise across all technology domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamRoles.map((role, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">{role.count}</div>
                <h3 className="text-xl font-bold mb-2">{role.role}</h3>
                <p className="text-muted-foreground">{role.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-headline">
              Why Choose WhiteWhale
            </h2>
            <p className="text-lg text-muted-foreground">
              What sets us apart from the competition
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              {techImage && (
                <Image
                  src={techImage.imageUrl}
                  alt="Cutting-edge technology solutions"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🏆',
                  title: 'Proven Track Record',
                  description: 'Hundreds of successful projects and satisfied clients globally'
                },
                {
                  icon: '💡',
                  title: 'Innovation Leaders',
                  description: 'Always at the forefront of technology trends and best practices'
                },
                {
                  icon: '🤝',
                  title: 'True Partnership',
                  description: 'We invest in understanding your business and long-term success'
                },
                {
                  icon: '⚡',
                  title: 'Fast Execution',
                  description: 'Agile methodologies ensure rapid delivery without quality compromise'
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🔒',
                  title: 'Security First',
                  description: 'Enterprise-grade security and compliance standards'
                },
                {
                  icon: '📈',
                  title: 'Scalable Solutions',
                  description: 'Technology that grows with your business needs'
                },
                {
                  icon: '🌍',
                  title: 'Global Reach',
                  description: 'Serving clients across 25+ countries worldwide'
                },
                {
                  icon: '💼',
                  title: 'Expert Team',
                  description: 'Specialists with 100+ years combined experience'
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              {aiImage && (
                <Image
                  src={aiImage.imageUrl}
                  alt="AI and advanced analytics"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how WhiteWhale can help you achieve your goals with cutting-edge technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get In Touch</Link>
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
