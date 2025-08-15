'use server';

/**
 * @fileOverview An AI agent for drafting booking approval messages.
 *
 * - draftBookingApproval - A function that drafts a booking approval message.
 * - DraftBookingApprovalInput - The input type for the draftBookingApproval function.
 * - DraftBookingApprovalOutput - The return type for the draftBookingApproval function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftBookingApprovalInputSchema = z.object({
  clientName: z.string().describe("The client's name."),
  providerName: z.string().describe("The provider's name."),
  serviceName: z.string().describe('The name of the service that has been booked.'),
  bookingDate: z.string().describe('The date and time of the booking.'),
  recipient: z.enum(['client', 'provider']).describe("Who the message is for."),
});
export type DraftBookingApprovalInput = z.infer<typeof DraftBookingApprovalInputSchema>;

const DraftBookingApprovalOutputSchema = z.object({
  message: z.string().describe('The drafted booking approval message.'),
});
export type DraftBookingApprovalOutput = z.infer<typeof DraftBookingApprovalOutputSchema>;

export async function draftBookingApproval(input: DraftBookingApprovalInput): Promise<DraftBookingApprovalOutput> {
  return draftBookingApprovalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftBookingApprovalPrompt',
  input: {schema: DraftBookingApprovalInputSchema},
  output: {schema: DraftBookingApprovalOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A service provider named {{{providerName}}} has just approved a booking request from a client named {{{clientName}}}.

  The booking is for the "{{{serviceName}}}" service on {{{bookingDate}}}.

  Draft a polite and clear message to the {{{recipient}}}.
  
  If the recipient is the client:
  - Inform them that their request is approved.
  - Instruct them to complete payment to confirm the booking.
  - Tell them to click on the message to review their order and pay.

  If the recipient is the provider:
  - Confirm that they have successfully approved the booking.
  - Inform them that a message has been sent to the client asking for payment.
  - No further action is needed from them at this time.

  IMPORTANT RULES:
  - Do not include any links or URLs.
  - Do not identify yourself as a person (e.g., "This is Chloe"). You are an AI assistant for Beauty Book.

  Drafted message:`,
});

const draftBookingApprovalFlow = ai.defineFlow(
  {
    name: 'draftBookingApprovalFlow',
    inputSchema: DraftBookingApprovalInputSchema,
    outputSchema: DraftBookingApprovalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
