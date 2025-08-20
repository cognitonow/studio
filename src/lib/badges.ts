
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
      'New': { name: 'Rising Star', rules: 'Maintain a 4.5+ rating over 5 reviews.' },
      'Intermediate': { name: 'Top Rated', rules: 'Maintain a 4.8+ rating over 10 reviews.' },
      'Pro': { name: 'Five-Star Legend', rules: 'Maintain a 4.9+ rating over 25 reviews.' }
    }
  },
  {
    id: 'quick-responder',
    name: 'Quick Responder',
    icon: Zap,
    description: 'This provider is known for their fast response times to inquiries.',
    category: 'Reputation',
    levels: {
      'New': { name: 'Swift Messenger', rules: 'Respond to 80% of messages within 24 hours.' },
      'Intermediate': { name: 'Quick Responder', rules: 'Respond to 90% of messages within 12 hours.' },
      'Pro': { name: 'Lightning Fast', rules: 'Respond to 95% of messages within 4 hours.' }
    }
  },
  {
    id: 'client-favorite',
    name: 'Client Favorite',
    icon: Heart,
    description: 'A provider who is frequently booked and highly recommended by clients.',
    category: 'Reputation',
    levels: {
      'New': { name: 'Go-To Pro', rules: 'Receive 3 "would book again" recommendations.' },
      'Intermediate': { name: 'Client Favorite', rules: 'Receive 8 "would book again" recommendations.' },
      'Pro': { name: 'Community Pillar', rules: 'Receive 25 "would book again" recommendations.' }
    }
  },
    {
    id: 'new-pro',
    name: 'New Pro',
    icon: UserPlus,
    description: 'A new and promising provider on the Beauty Book platform.',
    category: 'Reputation',
    levels: {
      'New': { name: 'Fresh Talent', rules: 'Automatically assigned to new providers.' },
      'Intermediate': { name: 'Established Pro', rules: 'Complete your first 5 bookings.' },
      'Pro': { name: 'Seasoned Veteran', rules: 'Complete 50 bookings.' }
    }
  },
  {
    id: '5-star-safety',
    name: '5-Star Safety',
    icon: ShieldCheck,
    description: 'This provider adheres to the highest standards of safety and hygiene.',
    category: 'Service Quality',
    levels: {
      'New': { name: 'Safety Savvy', rules: 'Pass initial safety checklist.' },
      'Intermediate': { name: 'Safety Certified', rules: 'Pass an annual safety and hygiene inspection (mocked).'},
      'Pro': { name: 'Safety Champion', rules: 'Pass annual inspection and complete advanced safety course.' }
    }
  },
  {
    id: 'on-location-pro',
    name: 'On-Location Pro',
    icon: MapPin,
    description: 'This provider offers services at your location for added convenience.',
    category: 'Service Quality',
     levels: {
      'New': { name: 'Mobile Maven', rules: 'Successfully complete 1 on-location booking.' },
      'Intermediate': { name: 'On-Location Pro', rules: 'Successfully complete 5 on-location bookings.'},
      'Pro': { name: 'Traveling Pro', rules: 'Complete 13 on-location bookings across multiple districts.' }
    }
  },
  {
    id: 'nail-art-pro',
    name: 'Nail Art Pro',
    icon: Brush,
    description: 'An expert in creating intricate and beautiful nail art designs.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Nail Designer', rules: 'Complete 3+ bookings with "Nail Art".' },
      'Intermediate': { name: 'Nail Art Pro', rules: 'Complete 13+ bookings with "Nail Art".' },
      'Pro': { name: 'Nail Maestro', rules: 'Complete 38+ bookings with "Nail Art".' }
    }
  },
  {
    id: 'skincare-guru',
    name: 'Skincare Guru',
    icon: Trophy,
    description: 'A specialist in skincare, offering expert advice and treatments.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Skin Specialist', rules: 'Complete 8+ "Facial" services.' },
      'Intermediate': { name: 'Skincare Guru', rules: 'Complete 25+ "Facial" or "Medi-Spa" services.' },
      'Pro': { name: 'Skin Sage', rules: 'Complete 50+ "Facial" or "Medi-Spa" services and hold advanced certification.' }
    }
  },
  {
    id: 'color-whiz',
    name: 'Color Whiz',
    icon: Palette,
    description: 'A master of hair color, from subtle highlights to bold new transformations.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Colorist', rules: 'Complete 5+ "Colour" services.' },
      'Intermediate': { name: 'Color Whiz', rules: 'Complete 13+ "Colour, Highlights, Balayage" services.' },
      'Pro': { name: 'Hue Hero', rules: 'Complete 38+ "Colour" services and complete a master colorist course.' }
    }
  },
  {
    id: 'bridal-expert',
    name: 'Bridal Expert',
    icon: Gem,
    description: 'Specializes in creating beautiful looks for weddings and bridal parties.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Bridal Stylist', rules: 'Complete 2+ "Bridal Makeup" or "Updo" services.' },
      'Intermediate': { name: 'Bridal Expert', rules: 'Complete 5+ "Bridal Makeup" or "Updo" services.' },
      'Pro': { name: 'Wedding Wizard', rules: 'Complete 13+ "Bridal Makeup" services and be featured in a publication.' }
    }
  },
   {
    id: 'makeup-virtuoso',
    name: 'Makeup Virtuoso',
    icon: Sparkles,
    description: 'A highly skilled makeup artist, praised for their versatile and flawless application.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Makeup Artist', rules: 'Complete 5+ "Makeup" services.' },
      'Intermediate': { name: 'Makeup Virtuoso', rules: 'Complete 15+ services from the "Makeup" category.' },
      'Pro': { name: 'Lead Artist', rules: 'Complete 38+ "Makeup" services and work on a professional shoot.' }
    }
  },
  {
    id: 'pain-relief-pro',
    name: 'Pain Relief Pro',
    icon: Award,
    description: 'Specializes in therapies and treatments aimed at alleviating pain.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Relief Rookie', rules: 'Complete 5+ "Massage" services.' },
      'Intermediate': { name: 'Pain Relief Pro', rules: 'Complete 13+ "Massage" or "Cupping Therapy" services.' },
      'Pro': { name: 'Zen Master', rules: 'Complete 38+ pain relief services and hold an advanced certification.' }
    }
  },
  {
    id: 'body-wellness-expert',
    name: 'Body Wellness Expert',
    icon: Wind,
    description: 'A professional focused on holistic body treatments that rejuvenate and restore.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Wellness Apprentice', rules: 'Complete 5+ services from the "Body" category.' },
      'Intermediate': { name: 'Body Wellness Expert', rules: 'Complete 13+ services from the "Body" category.' },
      'Pro': { name: 'Wellness Warrior', rules: 'Complete 30+ "Body" services and develop a signature treatment.' }
    }
  },
   {
    id: 'lash-brow-architect',
    name: 'Lash & Brow Architect',
    icon: Eye,
    description: 'A specialist in shaping perfect brows and stunning lash enhancements.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Brow & Lash Tech', rules: 'Complete 5+ services from "Brows & Lashes".' },
      'Intermediate': { name: 'Lash & Brow Architect', rules: 'Complete 15+ services from the "Brows & Lashes" category.' },
      'Pro': { name: 'Arch Angel', rules: 'Complete 50+ "Brows & Lashes" services and win a competition.' }
    }
  },
  {
    id: 'braid-weave-master',
    name: 'Braid & Weave Master',
    icon: Hand,
    description: 'An expert in complex braids, twists, and weave installations.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Braiding Star', rules: 'Complete 3+ complex braid or weave services.' },
      'Intermediate': { name: 'Braid & Weave Master', rules: 'Complete 10+ services like "Box Braids" or "Sew-in Weave".' },
      'Pro': { name: 'Weave Wizard', rules: 'Complete 30+ complex braid/weave services and teach a class.' }
    }
  },
  {
    id: 'smooth-operator',
    name: 'Smooth Operator',
    icon: Scissors,
    description: 'A professional in hair removal techniques for perfectly smooth skin.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Waxing Whiz', rules: 'Complete 8+ "Hair Removal" services.' },
      'Intermediate': { name: 'Smooth Operator', rules: 'Complete 20+ services from the "Hair Removal" category.' },
      'Pro': { name: 'Flawless Finisher', rules: 'Complete 50+ "Hair Removal" services and be certified in laser removal.' }
    }
  },
  {
    id: 'extension-expert',
    name: 'Hair Extension Expert',
    icon: Layers,
    description: 'Skilled in adding length and volume with various extension methods.',
    category: 'Specialty',
    levels: {
      'New': { name: 'Extension Stylist', rules: 'Complete 3+ "Hair Extensions" services.' },
      'Intermediate': { name: 'Extension Expert', rules: 'Complete 8+ "Hair Extensions" or "Sew-in Weave" services.' },
      'Pro': { name: 'Mane Master', rules: 'Complete 25+ extension services and be certified in multiple methods.' }
    }
  },
];

export const getBadgeInfo = (badgeName: string): BadgeInfo | undefined => {
  return allBadges.find(b => b.name === badgeName);
};
