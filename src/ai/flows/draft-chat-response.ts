'use server';

/**
 * @fileOverview An AI agent for drafting chat messages.
 *
 * - draftChatResponse - A function that drafts a chat message based on a user's prompt.
 * - DraftChatResponseInput - The input type for the draftChatResponse function.
 * - DraftChatResponseOutput - The return type for the draftChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftChatResponseInputSchema = z.object({
  prompt: z.string().describe('The user\'s prompt for the chat message.'),
  providerName: z.string().describe('The name of the service provider.'),
});
export type DraftChatResponseInput = z.infer<typeof DraftChatResponseInputSchema>;

const DraftChatResponseOutputSchema = z.object({
  message: z.string().describe('The drafted chat message.'),
});
export type DraftChatResponseOutput = z.infer<typeof DraftChatResponseOutputSchema>;

export async function draftChatResponse(input: DraftChatResponseInput): Promise<DraftChatResponseOutput> {
  return draftChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftChatResponsePrompt',
  input: {schema: DraftChatResponseInputSchema},
  output: {schema: DraftChatResponseOutputSchema},
  prompt: `You are a helpful assistant for a beauty service booking app.

  A user wants to send a message to a service provider named {{{providerName}}}.

  Draft a polite and clear message based on the user's prompt.

  User's prompt: "{{{prompt}}}"

  Drafted message:`,
});

const draftChatResponseFlow = ai.defineFlow(
  {
    name: 'draftChatResponseFlow',
    inputSchema: DraftChatResponseInputSchema,
    outputSchema: DraftChatResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
