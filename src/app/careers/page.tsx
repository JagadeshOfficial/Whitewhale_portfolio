import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { JOB_OPENINGS } from '@/lib/constants';

export const metadata = {
  title: 'Careers | WhiteWhale',
  description: 'Join our team and help us build the future of investment and technology.',
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline">Join Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're looking for passionate and talented individuals to help us build the future of investment and technology. Explore our open positions below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {JOB_OPENINGS.map((job) => (
          <Card key={job.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription className="flex items-center pt-2">
                <MapPin className="h-4 w-4 mr-2" />
                {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/resume-builder">Apply Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 font-headline">Don't see the right fit?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Create a standout resume with our AI-powered Resume Builder and we'll keep you in mind for future opportunities.
        </p>
        <Button size="lg" asChild>
          <Link href="/resume-builder">
            Build Your Resume
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
