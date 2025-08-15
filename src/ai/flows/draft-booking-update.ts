'use server';

/**
 * @fileOverview An AI agent for drafting booking update messages.
 *
 * - draftBookingUpdate - A function that drafts a booking update message.
 * - DraftBookingUpdateInput - The input type for the draftBookingUpdate function.
 * - DraftBookingUpdateOutput - The return type for the draftBookingUpdate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftBookingUpdateInputSchema = z.object({
  clientName: z.string().describe("The client's name."),
  providerName: z.string().describe("The provider's name."),
  updatedFields: z.array(z.string()).describe("The fields of the booking that were updated."),
  newDate: z.string().describe("The new date and time of the booking."),
  newServices: z.string().describe("The new list of services for the booking."),
  recipient: z.enum(['client', 'provider']).describe("Who the message is for."),
});
export type DraftBookingUpdateInput = z.infer<typeof DraftBookingUpdateInputSchema>;

const DraftBookingUpdateOutputSchema = z.object({
  message: z.string().describe('The drafted booking update message.'),
});
export type DraftBookingUpdateOutput = z.infer<typeof DraftBookingUpdateOutputSchema>;

export async function draftBookingUpdate(input: DraftBookingUpdateInput): Promise<DraftBookingUpdateOutput> {
  return draftBookingUpdateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftBookingUpdatePrompt',
  input: {schema: DraftBookingUpdateInputSchema},
  output: {schema: DraftBookingUpdateOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app. A booking has been updated.

- Client: {{{clientName}}}
- Provider: {{{providerName}}}
- Updated Fields: {{#each updatedFields}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Draft a short, clear message to inform the {{{recipient}}} of this change.

If the recipient is the client, start with "Your booking with {{{providerName}}} has been updated."
If the recipient is the provider, start with "You have successfully updated the booking for {{{clientName}}}."

The new details are:
- Appointment Time: {{{newDate}}}
- Services: {{{newServices}}}

Include the new details in the message. For the client, instruct them to click the message to review the changes.

IMPORTANT RULES:
- Do not include any links or URLs.
- Do not identify yourself as a person. You are an AI assistant for Beauty Book.

Drafted message:`,
});

const draftBookingUpdateFlow = ai.defineFlow(
  {
    name: 'draftBookingUpdateFlow',
    inputSchema: DraftBookingUpdateInputSchema,
    outputSchema: DraftBookingUpdateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
