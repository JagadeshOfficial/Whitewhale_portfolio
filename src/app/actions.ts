'use server';

import { generateResume, type ResumeInput } from '@/ai/flows/resume-ai-generation';

export async function createResumeAction(input: ResumeInput) {
  try {
    const result = await generateResume(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate resume. Please try again.' };
  }
}
