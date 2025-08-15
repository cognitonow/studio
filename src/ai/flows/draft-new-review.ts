'use server';

/**
 * @fileOverview An AI agent for drafting messages related to new reviews.
 *
 * - draftNewReviewMessage - A function that drafts a message about a new review.
 * - DraftNewReviewInput - The input type for the draftNewReviewMessage function.
 * - DraftNewReviewOutput - The return type for the draftNewReviewMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftNewReviewInputSchema = z.object({
  clientName: z.string().describe("The client's name who left the review."),
  providerName: z.string().describe("The provider's name who received the review."),
  rating: z.number().describe('The star rating given in the review.'),
  comment: z.string().describe('The text content of the review.'),
  recipient: z.enum(['client', 'provider']).describe("Who the message is for."),
});
export type DraftNewReviewInput = z.infer<typeof DraftNewReviewInputSchema>;

const DraftNewReviewOutputSchema = z.object({
  message: z.string().describe('The drafted message.'),
});
export type DraftNewReviewOutput = z.infer<typeof DraftNewReviewOutputSchema>;

export async function draftNewReviewMessage(input: DraftNewReviewInput): Promise<DraftNewReviewOutput> {
  return draftNewReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftNewReviewPrompt',
  input: {schema: DraftNewReviewInputSchema},
  output: {schema: DraftNewReviewOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A new review has been submitted.
  - Reviewer: {{{clientName}}}
  - Provider: {{{providerName}}}
  - Rating: {{{rating}}}/5
  - Comment: "{{{comment}}}"

  Draft a polite and clear message for the {{{recipient}}}.

  If the recipient is the provider:
  - Inform them that they have received a new review from {{{clientName}}}.
  - Briefly mention the rating.
  - Encourage them to view the review on their profile.

  If the recipient is the client:
  - Thank them for submitting their review for {{{providerName}}}.
  - Let them know their feedback is valuable to the community.

  IMPORTANT RULES:
  - Do not include any links or URLs.
  - Do not identify yourself as a person. You are an AI assistant for Beauty Book.

  Drafted message:`,
});

const draftNewReviewFlow = ai.defineFlow(
  {
    name: 'draftNewReviewFlow',
    inputSchema: DraftNewReviewInputSchema,
    outputSchema: DraftNewReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
