import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';

export const metadata = {
  title: 'Our Work | Projects',
  description: 'Explore WhiteWhale project highlights and case studies.'
};

export default function ProjectsPage() {
  const projects = projectsData;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Our Work / Projects</h1>
        <p className="text-muted-foreground mt-3">Selected case studies and client projects showcasing our capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p: any) => {
          const imgSrc = p.heroImage || (p.gallery && p.gallery[0]);
          return (
            <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                {imgSrc ? (
                  <Image src={imgSrc} alt={p.title} fill className="object-cover" />
                ) : (
                  <div className="h-48 w-full bg-gray-100" />
                )}
              </div>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">{p.client}</div>
                  <Button asChild>
                    <Link href={`/projects/${p.slug}`}>View Case Study</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
