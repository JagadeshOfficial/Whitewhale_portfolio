import Image from 'next/image';
import projectsData from '@/data/projects.json';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Layers, Calendar, Code, Globe } from 'lucide-react';

type Props = { params: { slug: string } };

export default async function ProjectDetail({ params }: Props) {
  const { slug } = params;
  const project = (projectsData as any[]).find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <p className="mt-4">We couldn't find the project you're looking for.</p>
        <Link href="/projects">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 items-start">
        <main>
          {/* Hero */}
          <div className="relative h-[420px] w-full mb-6 rounded overflow-hidden shadow-lg">
            {((project.heroImage || project.imageUrl || (project.gallery && project.gallery[0])) as string) ? (
              <Image
                src={project.heroImage || project.imageUrl || (project.gallery && project.gallery[0])}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-gray-100 to-gray-200" />
            )}

            <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6 z-10 text-white w-[calc(100%-3rem)]">
                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                <p className="mt-2 text-sm md:text-base max-w-xl">{project.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-3 items-center">
                  <span className="inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded">
                    <Award className="h-4 w-4" /> {project.client}
                  </span>
                  {project.services && (
                    <span className="inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded">
                      <Layers className="h-4 w-4" /> {project.services.join(' • ')}
                    </span>
                  )}
                  {project.year && (
                    <span className="inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded">
                      <Calendar className="h-4 w-4" /> {project.year}
                    </span>
                  )}
                </div>
              </div>
          </div>

          {/* Icon row (prominent project icons/metadata) */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Client</div>
                <div className="text-sm font-semibold">{project.client}</div>
              </div>
            </div>

            {project.services && (
              <div className="inline-flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded">
                <Layers className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Services</div>
                  <div className="text-sm font-semibold">{project.services.join(', ')}</div>
                </div>
              </div>
            )}

            {project.technologies && (
              <div className="inline-flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded">
                <Code className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Tech</div>
                  <div className="text-sm font-semibold">{project.technologies.slice(0,4).join(', ')}{project.technologies.length>4 ? '…' : ''}</div>
                </div>
              </div>
            )}

            {project.year && (
              <div className="inline-flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Year</div>
                  <div className="text-sm font-semibold">{project.year}</div>
                </div>
              </div>
            )}

            {project.teamSize && (
              <div className="inline-flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Team</div>
                  <div className="text-sm font-semibold">{project.teamSize}</div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none space-y-10 mt-8">
            {/* Parse Challenge / Solution / Outcome into separate sections when available */}
            {(() => {
              const content: string = project.content || '';
              const sections: Array<{ title: string; body: string }> = [];
              const regex = /^(Challenge|Solution|Outcome):\s*([\s\S]*?)(?=(?:\n\n(?:Challenge|Solution|Outcome):)|$)/gim;
              let m: RegExpExecArray | null;
              while ((m = regex.exec(content))) {
                sections.push({ title: m[1].trim(), body: m[2].trim() });
              }
              // Fallback: split by double-newline into paragraphs
              if (sections.length === 0 && content.trim()) {
                const parts = content.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
                parts.forEach((p, i) => sections.push({ title: i === 0 ? 'Overview' : `Section ${i + 1}`, body: p }));
              }

              // Helper: truncate a block of text to a maximum number of lines
              const truncateToLines = (text: string, maxLines = 5) => {
                if (!text) return '';
                // split into non-empty lines
                const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
                if (lines.length <= maxLines) return lines.join('\n\n');
                const taken = lines.slice(0, maxLines);
                return taken.join('\n\n') + '\n\n…';
              };

              return sections.map((sec) => {
                const truncated = truncateToLines(sec.body, 5);
                return (
                  <section key={sec.title} className="pt-2">
                    <h3 className="text-2xl font-semibold mb-3">{sec.title}</h3>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{truncated}</p>
                  </section>
                );
              });
            })()}

            {/* Inline metadata row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.duration && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Duration</div>
                    <div className="text-xs text-muted-foreground">{project.duration}</div>
                  </div>
                </div>
              )}

              {project.teamSize && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Team</div>
                    <div className="text-xs text-muted-foreground">{project.teamSize} engineers</div>
                  </div>
                </div>
              )}

              {project.technologies && (
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Tech</div>
                    <div className="text-xs text-muted-foreground">{project.technologies.slice(0,3).join(', ')}{project.technologies.length>3 ? '…' : ''}</div>
                  </div>
                </div>
              )}

              {project.result && (
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Impact</div>
                    <div className="text-xs text-muted-foreground">{project.result}</div>
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {project.gallery.map((g: string, i: number) => (
                <div key={i} className="relative h-48 w-full rounded overflow-hidden shadow-sm">
                  <Image src={g} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Result / CTA */}
          <div className="mb-6 mt-12">
            <h3 className="font-semibold mb-2">Result</h3>
            <p className="text-primary font-bold text-lg">{project.result}</p>

            {/* Testimonial */}
            {project.testimonial && (
              <blockquote className="mt-6 p-4 border-l-4 border-primary bg-gradient-to-r from-white/50 to-white/30 rounded">
                <p className="italic">“{project.testimonial.quote}”</p>
                <cite className="block mt-3 font-semibold">— {project.testimonial.author}</cite>
              </blockquote>
            )}

            {/* CTA, downloads and share buttons removed per request */}
          </div>
        </main>
      </div>

      {/* Related projects */}
      <section className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Related Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {((projectsData as any[]) || []).filter((rp) => rp.slug !== project.slug).slice(0,3).map((rp) => (
            <Card key={rp.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                {rp.heroImage ? (
                  <Image src={rp.heroImage} alt={rp.title} fill className="object-cover" />
                ) : (
                  <div className="h-40 w-full bg-gray-100" />
                )}
              </div>
              <CardContent>
                <h4 className="font-semibold">{rp.title}</h4>
                <p className="text-sm text-muted-foreground">{rp.shortDescription}</p>
                <div className="mt-3">
                  <Button asChild>
                    <Link href={`/projects/${rp.slug}`}>View Case Study</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
