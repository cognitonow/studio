

import { Star, Zap, Brush, ShieldCheck, Heart, Palette, Gem, MapPin, Award, UserPlus, Trophy, Scissors, Eye, Hand, Layers, Sparkles, Wind } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type BadgeLevel = 'New' | 'Intermediate' | 'Pro';

export interface BadgeInfo {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  category: 'Reputation' | 'Service Quality' | 'Specialty';
  levels: {
    [key in BadgeLevel]: {
      name: string;
      rules: string;
    };
  };
}

export const allBadges: BadgeInfo[] = [
  {
    id: 'top-rated',
    name: 'Top Rated',
    icon: Star,
    description: 'This provider has consistently received high ratings from clients.',
    category: 'Reputation',
    levels: {
      'New': { name: 'Rising Star', rules: 'Maintain a 4.5+ rating over 10 reviews.' },
      'Intermediate': { name: 'Top Rated', rules: 'Maintain a 4.8+ rating over 20 reviews.' },
      'Pro': { name: 'Elite Rated', rules: 'Maintain a 4.9+ rating over 50 reviews.' }
    }
  },
  {
    id: 'quick-responder',
    name: 'Quick Responder',
    icon: Zap,
    description: 'This provider is known for their fast response times to inquiries.',
    category: 'Reputation',
    levels: {
      'New': { name: 'Responsive', rules: 'Respond to 80% of messages within 24 hours.' },
      'Intermediate': { name: 'Quick Responder', rules: 'Respond to 90% of messages within 12 hours.' },
      'Pro': { name: 'Instant Responder', rules: 'Respond to 95% of messages within 4 hours.' }
    }
  },
  {
    id: 'client-favorite',
    name: 'Client Favorite',
    icon: Heart,
    description: 'A provider who is frequently booked and highly recommended by clients.',
    category: 'Reputation',
    levels: {
      'New': { name: 'Reliable', rules: 'Receive 5 "would book again" recommendations.' },
      'Intermediate': { name: 'Client Favorite', rules: 'Receive 15 "would book again" recommendations.' },
      'Pro': { name: 'Community Pillar', rules: 'Receive 50 "would book again" recommendations.' }
    }
  },
    {
    id: 'new-pro',
    name: 'New Pro',
    icon: UserPlus,
    description: 'A new and promising provider on the Beauty Book platform.',
    category: 'Reputation',
    levels: {
      'New': { name: 'New Pro', rules: 'Automatically assigned to new providers.' },
      'Intermediate': { name: 'Established Pro', rules: 'Complete your first 10 bookings.' },
      'Pro': { name: 'Veteran Pro', rules: 'Complete 100 bookings.' }
    }
  },
  {
    id: '5-star-safety',
    name: '5-Star Safety',
    icon: ShieldCheck,
    description: 'This provider adheres to the highest standards of safety and hygiene.',
    category: 'Service Quality',
    levels: {
      'New': { name: 'Safety Aware', rules: 'Pass initial safety checklist.' },
      'Intermediate': { name: 'Safety Certified', rules: 'Pass an annual safety and hygiene inspection (mocked).'},
      'Pro': { name: 'Safety Leader', rules: 'Pass annual inspection and complete advanced safety course.' }
    }
  },
  {
    id: 'on-location-pro',
    name: 'On-Location Pro',
    icon: MapPin,
    description: 'This provider offers services at your location for added convenience.',
    category: 'Service Quality',
     levels: {
      'New': { name: 'Mobile Services', rules: 'Successfully complete 1 on-location booking.' },
      'Intermediate': { name: 'On-Location Pro', rules: 'Successfully complete 10 on-location bookings.'},
      'Pro': { name: 'Travel Pro', rules: 'Complete 25 on-location bookings across multiple districts.' }
    }
  },
  {
    id: 'nail-art-pro',
    name: 'Nail Art Pro',
    icon: Brush,
    description: 'An expert in creating intricate and beautiful nail art designs.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Nail Artist', rules: 'Complete 5+ bookings with "Nail Art".' },
      'Intermediate': { name: 'Nail Art Pro', rules: 'Complete 25+ bookings with "Nail Art".' },
      'Pro': { name: 'Nail Art Master', rules: 'Complete 75+ bookings with "Nail Art".' }
    }
  },
  {
    id: 'skincare-guru',
    name: 'Skincare Guru',
    icon: Trophy,
    description: 'A specialist in skincare, offering expert advice and treatments.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Skincare Specialist', rules: 'Complete 15+ "Facial" services.' },
      'Intermediate': { name: 'Skincare Guru', rules: 'Complete 50+ "Facial" or "Medi-Spa" services.' },
      'Pro': { name: 'Master Esthetician', rules: 'Complete 100+ "Facial" or "Medi-Spa" services and hold advanced certification.' }
    }
  },
  {
    id: 'color-whiz',
    name: 'Color Whiz',
    icon: Palette,
    description: 'A master of hair color, from subtle highlights to bold transformations.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Colorist', rules: 'Complete 10+ "Colour" services.' },
      'Intermediate': { name: 'Color Whiz', rules: 'Complete 25+ "Colour, Highlights, Balayage" services.' },
      'Pro': { name: 'Master Colorist', rules: 'Complete 75+ "Colour" services and complete a master colorist course.' }
    }
  },
  {
    id: 'bridal-expert',
    name: 'Bridal Expert',
    icon: Gem,
    description: 'Specializes in creating beautiful looks for weddings and bridal parties.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Bridal Stylist', rules: 'Complete 3+ "Bridal Makeup" or "Updo" services.' },
      'Intermediate': { name: 'Bridal Expert', rules: 'Complete 10+ "Bridal Makeup" or "Updo" services.' },
      'Pro': { name: 'Elite Bridal Expert', rules: 'Complete 25+ "Bridal Makeup" services and be featured in a publication.' }
    }
  },
   {
    id: 'makeup-virtuoso',
    name: 'Makeup Virtuoso',
    icon: Sparkles,
    description: 'A highly skilled makeup artist, praised for their versatile and flawless application.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Makeup Artist', rules: 'Complete 10+ "Makeup" services.' },
      'Intermediate': { name: 'Makeup Virtuoso', rules: 'Complete 30+ services from the "Makeup" category.' },
      'Pro': { name: 'Lead Makeup Artist', rules: 'Complete 75+ "Makeup" services and work on a professional shoot.' }
    }
  },
  {
    id: 'pain-relief-pro',
    name: 'Pain Relief Pro',
    icon: Award,
    description: 'Specializes in therapies and treatments aimed at alleviating pain.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Massage Therapist', rules: 'Complete 10+ "Massage" services.' },
      'Intermediate': { name: 'Pain Relief Pro', rules: 'Complete 25+ "Massage" or "Cupping Therapy" services.' },
      'Pro': { name: 'Master Therapist', rules: 'Complete 75+ pain relief services and hold an advanced certification.' }
    }
  },
  {
    id: 'body-wellness-expert',
    name: 'Body Wellness Expert',
    icon: Wind,
    description: 'A professional focused on holistic body treatments that rejuvenate and restore.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Body Treatment Tech', rules: 'Complete 10+ services from the "Body" category.' },
      'Intermediate': { name: 'Body Wellness Expert', rules: 'Complete 25+ services from the "Body" category.' },
      'Pro': { name: 'Holistic Body Specialist', rules: 'Complete 60+ "Body" services and develop a signature treatment.' }
    }
  },
   {
    id: 'lash-brow-architect',
    name: 'Lash & Brow Architect',
    icon: Eye,
    description: 'A specialist in shaping perfect brows and stunning lash enhancements.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Lash & Brow Tech', rules: 'Complete 10+ services from "Brows & Lashes".' },
      'Intermediate': { name: 'Lash & Brow Architect', rules: 'Complete 30+ services from the "Brows & Lashes" category.' },
      'Pro': { name: 'Master Lash & Brow Artist', rules: 'Complete 100+ "Brows & Lashes" services and win a competition.' }
    }
  },
  {
    id: 'braid-weave-master',
    name: 'Braid & Weave Master',
    icon: Hand,
    description: 'An expert in complex braids, twists, and weave installations.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Braider', rules: 'Complete 5+ complex braid or weave services.' },
      'Intermediate': { name: 'Braid & Weave Master', rules: 'Complete 20+ services like "Box Braids" or "Sew-in Weave".' },
      'Pro': { name: 'Master Braider', rules: 'Complete 60+ complex braid/weave services and teach a class.' }
    }
  },
  {
    id: 'smooth-operator',
    name: 'Smooth Operator',
    icon: Scissors,
    description: 'A professional in hair removal techniques for perfectly smooth skin.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Wax Technician', rules: 'Complete 15+ "Hair Removal" services.' },
      'Intermediate': { name: 'Smooth Operator', rules: 'Complete 40+ services from the "Hair Removal" category.' },
      'Pro': { name: 'Lead Esthetician (Hair Removal)', rules: 'Complete 100+ "Hair Removal" services and be certified in laser removal.' }
    }
  },
  {
    id: 'extension-expert',
    name: 'Hair Extension Expert',
    icon: Layers,
    description: 'Skilled in adding length and volume with various extension methods.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Extension Stylist', rules: 'Complete 5+ "Hair Extensions" services.' },
      'Intermediate': { name: 'Hair Extension Expert', rules: 'Complete 15+ "Hair Extensions" or "Sew-in Weave" services.' },
      'Pro': { name: 'Master Extensionist', rules: 'Complete 50+ extension services and be certified in multiple methods.' }
    }
  },
];

export const getBadgeInfo = (badgeName: string): BadgeInfo | undefined => {
  return allBadges.find(b => b.name === badgeName);
};
