'use server';

/**
 * @fileOverview A skill badge suggestion AI agent.
 *
 * - suggestSkillBadges - A function that suggests relevant skill badges for a provider based on their completed bookings and user ratings.
 * - SuggestSkillBadgesInput - The input type for the suggestSkillBadges function.
 * - SuggestSkillBadgesOutput - The return type for the suggestSkillBadges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillBadgesInputSchema = z.object({
  completedBookingsDescription: z
    .string()
    .describe("A description of the provider's completed bookings, including the types of services provided and any relevant details."),
  userRatingsDescription: z
    .string()
    .describe("A description of the provider's user ratings, including the number of ratings and any common themes or feedback."),
});
export type SuggestSkillBadgesInput = z.infer<typeof SuggestSkillBadgesInputSchema>;

const SuggestSkillBadgesOutputSchema = z.object({
  suggestedBadges: z
    .array(z.string())
    .describe('An array of suggested skill badges for the provider.'),
});
export type SuggestSkillBadgesOutput = z.infer<typeof SuggestSkillBadgesOutputSchema>;

export async function suggestSkillBadges(input: SuggestSkillBadgesInput): Promise<SuggestSkillBadgesOutput> {
  return suggestSkillBadgesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillBadgesPrompt',
  input: {schema: SuggestSkillBadgesInputSchema},
  output: {schema: SuggestSkillBadgesOutputSchema},
  prompt: `You are an expert in skill badge suggestions for service providers.

  Based on the provider's completed bookings and user ratings, suggest relevant skill badges that they can showcase on their profile.

  Completed Bookings Description: {{{completedBookingsDescription}}}
  User Ratings Description: {{{userRatingsDescription}}}

  Suggested Skill Badges:`,
});

const suggestSkillBadgesFlow = ai.defineFlow(
  {
    name: 'suggestSkillBadgesFlow',
    inputSchema: SuggestSkillBadgesInputSchema,
    outputSchema: SuggestSkillBadgesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
