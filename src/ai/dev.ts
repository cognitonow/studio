import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-skill-badges.ts';
import '@/ai/flows/draft-chat-response.ts';
import '@/ai/flows/draft-booking-confirmation.ts';
import '@/ai/flows/draft-post-booking-message.ts';
import '@/ai/flows/draft-booking-approval.ts';
import '@/ai/flows/draft-booking-cancellation.ts';
