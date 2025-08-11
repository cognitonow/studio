'use server';

/**
 * @fileOverview An AI agent for drafting post-booking follow-up messages.
 *
 * - draftPostBookingMessage - A function that drafts a follow-up message after a booking is completed.
 * - DraftPostBookingMessageInput - The input type for the draftPostBookingMessage function.
 * - DraftPostBookingMessageOutput - The return type for the draftPostBookingMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftPostBookingMessageInputSchema = z.object({
  clientName: z.string().describe("The client's name."),
  providerName: z.string().describe("The provider's name."),
  serviceName: z.string().describe('The name of the service that was provided.'),
});
export type DraftPostBookingMessageInput = z.infer<typeof DraftPostBookingMessageInputSchema>;

const DraftPostBookingMessageOutputSchema = z.object({
  message: z.string().describe('The drafted post-booking follow-up message.'),
});
export type DraftPostBookingMessageOutput = z.infer<typeof DraftPostBookingMessageOutputSchema>;

export async function draftPostBookingMessage(input: DraftPostBookingMessageInput): Promise<DraftPostBookingMessageOutput> {
  return draftPostBookingMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftPostBookingMessagePrompt',
  input: {schema: DraftPostBookingMessageInputSchema},
  output: {schema: DraftPostBookingMessageOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A service provider named {{{providerName}}} has just completed a booking for a client named {{{clientName}}}.

  The service provided was "{{{serviceName}}}".

  Draft a polite and friendly follow-up message from the provider to the client. The message should thank them for their visit and encourage them to book again in the future.

  Drafted message:`,
});

const draftPostBookingMessageFlow = ai.defineFlow(
  {
    name: 'draftPostBookingMessageFlow',
    inputSchema: DraftPostBookingMessageInputSchema,
    outputSchema: DraftPostBookingMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
