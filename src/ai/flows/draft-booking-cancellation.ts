'use server';

/**
 * @fileOverview An AI agent for drafting booking cancellation messages.
 *
 * - draftBookingCancellation - A function that drafts a booking cancellation message.
 * - DraftBookingCancellationInput - The input type for the draftBookingCancellation function.
 * - DraftBookingCancellationOutput - The return type for the draftBookingCancellation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftBookingCancellationInputSchema = z.object({
  clientName: z.string().describe("The client's name."),
  providerName: z.string().describe("The provider's name."),
  serviceName: z.string().describe('The name of the service that has been cancelled.'),
  bookingDate: z.string().describe('The date and time of the booking.'),
  cancelledBy: z.enum(['client', 'provider']).describe('Who initiated the cancellation.'),
});
export type DraftBookingCancellationInput = z.infer<typeof DraftBookingCancellationInputSchema>;

const DraftBookingCancellationOutputSchema = z.object({
  message: z.string().describe('The drafted booking cancellation message.'),
});
export type DraftBookingCancellationOutput = z.infer<typeof DraftBookingCancellationOutputSchema>;

export async function draftBookingCancellation(input: DraftBookingCancellationInput): Promise<DraftBookingCancellationOutput> {
  return draftBookingCancellationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftBookingCancellationPrompt',
  input: {schema: DraftBookingCancellationInputSchema},
  output: {schema: DraftBookingCancellationOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A booking has been cancelled.
  - Provider: {{{providerName}}}
  - Client: {{{clientName}}}
  - Service: "{{{serviceName}}}"
  - Date: {{{bookingDate}}}
  - Cancelled by: {{{cancelledBy}}}

  Draft a polite and clear message to be sent from the provider to the client.

  If cancelled by the client, the message should acknowledge the cancellation and express hope to see them in the future.
  If cancelled by the provider, the message should sincerely apologize for the inconvenience and encourage them to rebook.

  IMPORTANT RULES:
  - Do not include any links or URLs.
  - Do not identify yourself as a person (e.g., "This is Chloe"). You are an AI assistant for Beauty Book.

  Drafted message:`,
});

const draftBookingCancellationFlow = ai.defineFlow(
  {
    name: 'draftBookingCancellationFlow',
    inputSchema: DraftBookingCancellationInputSchema,
    outputSchema: DraftBookingCancellationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
