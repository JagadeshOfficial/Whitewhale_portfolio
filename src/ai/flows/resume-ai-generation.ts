'use server';

/**
 * @fileOverview AI-powered resume generation flow.
 *
 * - generateResume - A function that generates a resume based on skills and experience.
 * - ResumeInput - The input type for the generateResume function.
 * - ResumeOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeInputSchema = z.object({
  jobTitle: z.string().describe('The job title to tailor the resume for.'),
  skills: z.string().describe('A comma-separated list of skills.'),
  experience: z.string().describe('A description of the job seeker\'s experience.'),
  education: z.string().describe('A description of the job seeker\'s education.'),
  additionalInfo: z.string().optional().describe('Any additional information to include in the resume.'),
});
export type ResumeInput = z.infer<typeof ResumeInputSchema>;

const ResumeOutputSchema = z.object({
  resume: z.string().describe('The generated resume content.'),
});
export type ResumeOutput = z.infer<typeof ResumeOutputSchema>;

export async function generateResume(input: ResumeInput): Promise<ResumeOutput> {
  return resumeAIGenerationFlow(input);
}

const resumePrompt = ai.definePrompt({
  name: 'resumeAIGenerationPrompt',
  input: {schema: ResumeInputSchema},
  output: {schema: ResumeOutputSchema},
  prompt: `You are an expert resume writer. Create a compelling and tailored resume for a job seeker based on their skills, experience, and the target job title.

  Job Title: {{{jobTitle}}}
  Skills: {{{skills}}}
  Experience: {{{experience}}}
  Education: {{{education}}}
  Additional Information: {{{additionalInfo}}}

  The resume should be optimized for Applicant Tracking Systems (ATS) and highlight the most relevant qualifications for the specified job title.
  Focus on accomplishments and quantifiable results whenever possible.
`,
});

const resumeAIGenerationFlow = ai.defineFlow(
  {
    name: 'resumeAIGenerationFlow',
    inputSchema: ResumeInputSchema,
    outputSchema: ResumeOutputSchema,
  },
  async input => {
    const {output} = await resumePrompt(input);
    return output!;
  }
);
