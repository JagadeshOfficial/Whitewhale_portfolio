'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ClipboardCopy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createResumeAction } from '@/app/actions';

const resumeFormSchema = z.object({
  jobTitle: z.string().min(2, {
    message: 'Job title must be at least 2 characters.',
  }),
  skills: z.string().min(5, {
    message: 'Please list some of your skills.',
  }),
  experience: z.string().min(20, {
    message: 'Experience description must be at least 20 characters.',
  }),
  education: z.string().min(10, {
    message: 'Education description must be at least 10 characters.',
  }),
  additionalInfo: z.string().optional(),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export function ResumeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      jobTitle: '',
      skills: '',
      experience: '',
      education: '',
      additionalInfo: '',
    },
  });

  async function onSubmit(data: ResumeFormValues) {
    setIsLoading(true);
    setGeneratedResume(null);

    const result = await createResumeAction(data);

    setIsLoading(false);

    if (result.success && result.data) {
      setGeneratedResume(result.data.resume);
      toast({
        title: 'Success!',
        description: 'Your new resume has been generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.error || 'There was a problem with your request.',
      });
    }
  }

  async function copyToClipboard() {
    if (!generatedResume) return;
    try {
      await navigator.clipboard.writeText(generatedResume);
      toast({
        title: 'Copied to clipboard!',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Failed to copy',
        description: 'Could not copy resume to clipboard.',
      });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Card>
        <CardHeader>
          <CardTitle>Resume Details</CardTitle>
          <CardDescription>
            Provide your information, and our AI will craft a professional resume for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Frontend Developer" {...field} />
                    </FormControl>
                    <FormDescription>The role you are applying for.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., React, TypeScript, Next.js, Team Leadership" {...field} />
                    </FormControl>
                    <FormDescription>Enter your skills, separated by commas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your roles, responsibilities, and achievements."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your degrees, universities, and graduation dates."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any certifications, projects, or other relevant info."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Generating...' : 'Generate Resume'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="relative">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Generated Resume</CardTitle>
            <CardDescription>
              Your AI-generated resume will appear here. Review and copy it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Generating your resume...</p>
              </div>
            )}
            {!isLoading && !generatedResume && (
              <div className="flex flex-col items-center justify-center h-96 text-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Your resume will be displayed here.</p>
              </div>
            )}
            {generatedResume && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={copyToClipboard}
                >
                  <ClipboardCopy className="h-4 w-4" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
                <div className="h-96 overflow-y-auto p-4 border rounded-lg bg-secondary/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm">{generatedResume}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
