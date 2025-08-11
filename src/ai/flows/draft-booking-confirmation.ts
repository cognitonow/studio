'use server';

/**
 * @fileOverview An AI agent for drafting booking confirmation messages.
 *
 * - draftBookingConfirmation - A function that drafts a booking confirmation message.
 * - DraftBookingConfirmationInput - The input type for the draftBookingConfirmation function.
 * - DraftBookingConfirmationOutput - The return type for the draftBookingConfirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftBookingConfirmationInputSchema = z.object({
  clientName: z.string().describe("The client's name."),
  providerName: z.string().describe("The provider's name."),
  serviceName: z.string().describe('The name of the service that has been booked.'),
  bookingDate: z.string().describe('The date and time of the booking.'),
});
export type DraftBookingConfirmationInput = z.infer<typeof DraftBookingConfirmationInputSchema>;

const DraftBookingConfirmationOutputSchema = z.object({
  message: z.string().describe('The drafted booking confirmation message.'),
});
export type DraftBookingConfirmationOutput = z.infer<typeof DraftBookingConfirmationOutputSchema>;

export async function draftBookingConfirmation(input: DraftBookingConfirmationInput): Promise<DraftBookingConfirmationOutput> {
  return draftBookingConfirmationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftBookingConfirmationPrompt',
  input: {schema: DraftBookingConfirmationInputSchema},
  output: {schema: DraftBookingConfirmationOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A service provider named {{{providerName}}} has just confirmed a booking for a client named {{{clientName}}}.

  Draft a polite and clear confirmation message from the provider to the client.

  The booking is for the "{{{serviceName}}}" service on {{{bookingDate}}}.

  The message should be friendly and confirm the details.

  Drafted message:`,
});

const draftBookingConfirmationFlow = ai.defineFlow(
  {
    name: 'draftBookingConfirmationFlow',
    inputSchema: DraftBookingConfirmationInputSchema,
    outputSchema: DraftBookingConfirmationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
