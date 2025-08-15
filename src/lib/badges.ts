
'use server';

import { Star, Zap, Brush, ShieldCheck, Heart, Palette, Gem, MapPin, Award, UserPlus, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface BadgeInfo {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  rules: string;
  category: 'Reputation' | 'Service Quality' | 'Specialty';
}

export const allBadges: BadgeInfo[] = [
  {
    id: 'top-rated',
    name: 'Top Rated',
    icon: Star,
    description: 'This provider has consistently received high ratings from clients.',
    rules: 'Maintain an average rating of 4.8 or higher over at least 20 reviews.',
    category: 'Reputation',
  },
  {
    id: 'quick-responder',
    name: 'Quick Responder',
    icon: Zap,
    description: 'This provider is known for their fast response times to inquiries.',
    rules: 'Respond to 90% of first-time messages within 24 hours.',
    category: 'Reputation',
  },
  {
    id: 'client-favorite',
    name: 'Client Favorite',
    icon: Heart,
    description: 'A provider who is frequently booked and highly recommended by clients.',
    rules: 'Receive at least 15 "would book again" recommendations from past clients.',
    category: 'Reputation',
  },
  {
    id: '5-star-safety',
    name: '5-Star Safety',
    icon: ShieldCheck,
    description: 'This provider adheres to the highest standards of safety and hygiene.',
    rules: 'Pass an annual safety and hygiene inspection (mocked).',
    category: 'Service Quality',
  },
  {
    id: 'on-location-pro',
    name: 'On-Location Pro',
    icon: MapPin,
    description: 'This provider offers services at your location for added convenience.',
    rules: 'Successfully complete 10 or more on-location bookings.',
    category: 'Service Quality',
  },
  {
    id: 'nail-art-pro',
    name: 'Nail Art Pro',
    icon: Brush,
    description: 'An expert in creating intricate and beautiful nail art designs.',
    rules: 'Complete 25+ bookings that include a "Nail Art" service.',
    category: 'Specialty',
  },
  {
    id: 'skincare-guru',
    name: 'Skincare Guru',
    icon: Trophy,
    description: 'A specialist in skincare, offering expert advice and treatments.',
    rules: 'Complete 50+ "Facial" or "Medi-Spa" category services.',
    category: 'Specialty',
  },
  {
    id: 'color-whiz',
    name: 'Color Whiz',
    icon: Palette,
    description: 'A master of hair color, from subtle highlights to bold transformations.',
    rules: 'Complete 25+ "Colour, Highlights, Balayage" services.',
    category: 'Specialty',
  },
  {
    id: 'bridal-expert',
    name: 'Bridal Expert',
    icon: Gem,
    description: 'Specializes in creating beautiful looks for weddings and bridal parties.',
    rules: 'Complete 10+ "Bridal Makeup" or "Updo" services.',
    category: 'Specialty',
  },
  {
    id: 'pain-relief-pro',
    name: 'Pain Relief Pro',
    icon: Award,
    description: 'Specializes in therapies and treatments aimed at alleviating pain.',
    rules: 'Complete 20+ "Massage" or "Cupping Therapy" services.',
    category: 'Specialty',
  },
  {
    id: 'new-pro',
    name: 'New Pro',
    icon: UserPlus,
    description: 'A new and promising provider on the Beauty Book platform.',
    rules: 'Automatically assigned to new providers. Replaced by other badges as they are earned.',
    category: 'Reputation',
  },
];

export const getBadgeInfo = (badgeName: string): BadgeInfo | undefined => {
  return allBadges.find(b => b.name === badgeName);
};
