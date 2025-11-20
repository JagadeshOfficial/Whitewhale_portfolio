"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Briefcase, Users, Trophy, Heart, Code2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplyForm } from '@/components/apply-form';
import { JOB_OPENINGS } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState(JOB_OPENINGS);
  const heroImage = getImage('hero-background');

  useEffect(() => {
    let mounted = true;
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length) setJobs(data);
      })
      .catch(() => {
        // keep fallback constants
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
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
        <div className="relative z-10 container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">
            Build Your Career With Us
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Join WhiteWhale and be part of a team that's transforming the technology industry. We're looking for talented individuals who share our passion for innovation.
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Why Join WhiteWhale?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe in creating an environment where talented professionals can thrive and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-bold mb-2">Career Growth</h3>
              <p className="text-muted-foreground text-sm">
                Continuous learning opportunities, mentorship, and clear career progression paths.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-bold mb-2">Global Team</h3>
              <p className="text-muted-foreground text-sm">
                Collaborate with talented professionals from around the world.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold mb-2">Competitive Compensation</h3>
              <p className="text-muted-foreground text-sm">
                Industry-leading salaries, benefits, and performance bonuses.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold mb-2">Work-Life Balance</h3>
              <p className="text-muted-foreground text-sm">
                Flexible working arrangements and wellness programs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Open Positions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Check out our current job openings and find the perfect fit for your career.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {jobs.map((job: any) => (
              <Card key={job.id || job.title} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center pt-3 text-base">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        {job.location}{job.remote ? ' • Remote' : ''}
                      </CardDescription>
                      <div className="text-sm text-muted-foreground mt-1">{job.department} • {job.employmentType} • {job.experienceLevel}{job.salary ? ` • ${job.salary}` : ''}</div>
                    </div>
                    <Briefcase className="h-8 w-8 text-primary opacity-20" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>

                  {job.responsibilities && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-sm mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {String(job.responsibilities).split('\n').map((r: string, i: number) => (
                          <li key={i}>✓ {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.requirements && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-sm mb-3">What We're Looking For:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {String(job.requirements).split('\n').map((r: string, i: number) => (
                          <li key={i}>✓ {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedJob(job.title)}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* More Positions Coming Soon */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">More Positions Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                We're constantly looking for talented individuals. Check back soon for more opportunities or reach out to us directly.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline mb-12 text-center">Our Culture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Heart className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">People First</h3>
                    <p className="text-muted-foreground">
                      We prioritize the wellbeing and development of every team member. Your success is our success.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Code2 className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Innovation & Excellence</h3>
                    <p className="text-muted-foreground">
                      We foster a culture of continuous innovation and push the boundaries of what's possible.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Collaboration</h3>
                    <p className="text-muted-foreground">
                      We believe in the power of teamwork and cross-functional collaboration to achieve greatness.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Trophy className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Excellence in Execution</h3>
                    <p className="text-muted-foreground">
                      We maintain high standards in everything we do and take pride in our work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt="Team Culture"
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline mb-12 text-center">Benefits & Perks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive medical, dental, and vision coverage' },
              { icon: '📚', title: 'Learning & Development', desc: 'Access to courses, certifications, and conferences' },
              { icon: '🏠', title: 'Remote Work', desc: 'Flexible work-from-home options' },
              { icon: '⏰', title: 'Flexible Hours', desc: 'Work at your own pace and schedule' },
              { icon: '🎉', title: 'Team Events', desc: 'Regular team outings and celebrations' },
              { icon: '🎯', title: 'Performance Bonus', desc: 'Competitive bonus structure based on performance' },
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Join Us?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Don't see a perfect fit? Send us your resume and let us know what you're looking for. We're always interested in talented individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link href="/">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {selectedJob && (
        <ApplyForm jobTitle={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
