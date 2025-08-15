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
  recipient: z.enum(['client', 'provider']).describe("Who the message is for."),
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

  A booking between provider {{{providerName}}} and client {{{clientName}}} has just been paid for and confirmed.

  The booking is for the "{{{serviceName}}}" service on {{{bookingDate}}}.

  Draft a polite and clear confirmation message for the {{{recipient}}}.

  If the recipient is the client:
  - The message should be friendly and confirm all the details.
  - Let them know the provider is looking forward to seeing them.

  If the recipient is the provider:
  - Inform them that the client has paid and the booking is now confirmed.
  - Remind them of the appointment details.

  IMPORTANT RULES:
  - Do not include any links or URLs.
  - Do not identify yourself as a person. You are an AI assistant for Beauty Book.

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
