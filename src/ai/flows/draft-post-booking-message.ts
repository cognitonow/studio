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
  recipient: z.enum(['client', 'provider']).describe("Who the message is for."),
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

  A booking between provider {{{providerName}}} and client {{{clientName}}} for the "{{{serviceName}}}" service has just been marked as completed by the provider.

  Draft a polite and friendly follow-up message to the {{{recipient}}}.

  If the recipient is the client:
  - Thank them for their visit.
  - Encourage them to book again in the future.

  If the recipient is the provider:
  - Confirm that the booking has been marked as completed.
  - Let them know that a thank you message has been sent to the client on their behalf.

  IMPORTANT RULES:
  - Do not include any links or URLs.
  - Do not identify yourself as a person. You are an AI assistant for Beauty Book.

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
