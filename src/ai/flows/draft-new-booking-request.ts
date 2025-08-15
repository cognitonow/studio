'use server';

/**
 * @fileOverview An AI agent for drafting new booking request messages for providers.
 *
 * - draftNewBookingRequest - A function that drafts a message to a provider about a new booking request.
 * - DraftNewBookingRequestInput - The input type for the draftNewBookingRequest function.
 * - DraftNewBookingRequestOutput - The return type for the draftNewBookingRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftNewBookingRequestInputSchema = z.object({
  clientName: z.string().describe("The client's name."),
  providerName: z.string().describe("The provider's name."),
  serviceName: z.string().describe('The name of the service being requested.'),
  bookingDate: z.string().describe('The date and time of the requested booking.'),
  recipient: z.enum(['client', 'provider']).describe("Who the message is for."),
});
export type DraftNewBookingRequestInput = z.infer<typeof DraftNewBookingRequestInputSchema>;

const DraftNewBookingRequestOutputSchema = z.object({
  message: z.string().describe('The drafted message to the provider.'),
});
export type DraftNewBookingRequestOutput = z.infer<typeof DraftNewBookingRequestOutputSchema>;

export async function draftNewBookingRequest(input: DraftNewBookingRequestInput): Promise<DraftNewBookingRequestOutput> {
  return draftNewBookingRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftNewBookingRequestPrompt',
  input: {schema: DraftNewBookingRequestInputSchema},
  output: {schema: DraftNewBookingRequestOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A client named {{{clientName}}} has submitted a new booking request to a provider named {{{providerName}}}.
  The booking is for the "{{{serviceName}}}" service on {{{bookingDate}}}.

  Draft a short, clear message for the {{{recipient}}}.

  If the recipient is the provider:
  - Inform them of the new request.
  - Encourage them to review the booking details and either approve or decline it.
  - Instruct them to click the message to manage the booking.

  If the recipient is the client:
  - Confirm that their booking request has been successfully sent to {{{providerName}}}.
  - Let them know they will receive another message once the provider has approved it.
  - Mention that they can view the status of their request in "My Bookings".

  IMPORTANT RULES:
  - Do not include any links or URLs.
  - Do not identify yourself as a person. You are an AI assistant for Beauty Book.

  Drafted message:`,
});

const draftNewBookingRequestFlow = ai.defineFlow(
  {
    name: 'draftNewBookingRequestFlow',
    inputSchema: DraftNewBookingRequestInputSchema,
    outputSchema: DraftNewBookingRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
