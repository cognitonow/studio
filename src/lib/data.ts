import type { Provider, Service, Review, Playlist } from './types';

export const services: Service[] = [
  { id: '1', name: 'Classic Manicure', description: 'A classic manicure with nail shaping, cuticle care, and polish.', price: 35, duration: 45 },
  { id: '2', name: 'Gel Pedicure', description: 'A long-lasting gel pedicure with exfoliation and massage.', price: 55, duration: 60 },
  { id: '3', name: 'Signature Facial', description: 'A customized facial to address your specific skin concerns.', price: 85, duration: 60 },
  { id: '4', name: 'Balayage Hair Color', description: 'Hand-painted highlights for a natural, sun-kissed look.', price: 180, duration: 180 },
  { id: '5', name: 'Lash Lift & Tint', description: 'A perm for your lashes that lifts and curls them from the base.', price: 75, duration: 60 },
  { id: '6', name: 'Bridal Makeup', description: 'Full-face makeup application for your special day.', price: 150, duration: 90 },
  { id: '7', name: 'Deep Tissue Massage', description: 'A massage targeting deeper layers of muscle and connective tissue.', price: 100, duration: 60 },
];

export const reviews: Review[] = [
  { id: '1', author: 'Jane D.', title: 'CEO, Acme Inc.', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'woman portrait', rating: 5, comment: 'Olivia is a true artist! My nails have never looked better. The attention to detail and relaxing atmosphere made it a perfect experience.' },
  { id: '2', author: 'Sarah K.', title: 'Marketing Manager', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person smiling', rating: 5, comment: 'The most relaxing facial I have ever had. My skin is glowing! I felt so refreshed and rejuvenated afterwards. Highly recommend!' },
  { id: '3', author: 'Mike P.', title: 'Software Engineer', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'man face', rating: 4, comment: 'Great haircut, very professional and clean salon. The stylist listened to what I wanted and gave me a great new look.' },
  { id: '4', author: 'Emily R.', title: 'Graphic Designer', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'woman face', rating: 5, comment: 'I am so in love with my new hair color. Chloe is a genius! She perfectly captured the look I was going for.' },
];

export const providers: Provider[] = [
  {
    id: '1', name: 'Olivia\'s Nail Studio', specialty: 'Nail Art', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'nail art', rating: 4.9, reviewCount: 124, isFeatured: true,
    bio: 'Award-winning nail artist with 10+ years of experience in creating stunning and unique nail designs. Passionate about nail health and using high-quality, non-toxic products.',
    portfolio: [
      { id: 'p1', url: 'https://placehold.co/600x400.png', dataAiHint: 'manicure nails' },
      { id: 'p2', url: 'https://placehold.co/600x400.png', dataAiHint: 'pedicure design' },
      { id: 'p3', url: 'https://placehold.co/600x400.png', dataAiHint: 'nail salon' },
    ],
    services: [services[0], services[1]],
    reviews: [reviews[0]],
    badges: ['Top Rated', 'Quick Responder', 'Nail Art Pro'],
    location: 'New York, NY',
    playlist: 'top-rated-nails'
  },
  {
    id: '2', name: 'Glow & Go Esthetics', specialty: 'Skincare', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'skincare product', rating: 5.0, reviewCount: 88, isFeatured: true,
    bio: 'Certified esthetician dedicated to helping you achieve your best skin. Specializing in results-driven facials and advanced skincare treatments.',
    portfolio: [
      { id: 'p4', url: 'https://placehold.co/600x400.png', dataAiHint: 'facial treatment' },
      { id: 'p5', url: 'https://placehold.co/600x400.png', dataAiHint: 'woman relaxing' },
      { id: 'p6', url: 'https://placehold.co/600x400.png', dataAiHint: 'beauty clinic' },
    ],
    services: [services[2], services[4]],
    reviews: [reviews[1]],
    badges: ['Skincare Guru', '5-Star Safety', 'Client Favorite'],
    location: 'Miami, FL',
    playlist: 'rejuvenating-facials'
  },
  {
    id: '3', name: 'Chloe\'s Hair Haven', specialty: 'Hair Color', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'hair salon', rating: 4.8, reviewCount: 212,
    bio: 'Master colorist and stylist transforming hair with precision and creativity. From subtle enhancements to bold new looks, your hair is in expert hands.',
    portfolio: [
      { id: 'p7', url: 'https://placehold.co/600x400.png', dataAiHint: 'balayage hair' },
      { id: 'p8', url: 'https://placehold.co/600x400.png', dataAiHint: 'woman haircut' },
    ],
    services: [services[3]],
    reviews: [reviews[3]],
    badges: ['Color Whiz', 'Bridal Expert'],
    location: 'Los Angeles, CA',
    playlist: 'wedding-specialists'
  },
  {
    id: '4', name: 'Bridal Beauty Co.', specialty: 'Wedding Makeup', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'makeup brushes', rating: 5.0, reviewCount: 56,
    bio: 'Creating timeless and elegant bridal looks. My goal is to make you feel like the most beautiful version of yourself on your wedding day.',
    portfolio: [],
    services: [services[5]],
    reviews: [],
    badges: ['Bridal Expert', 'On-Location Pro'],
    location: 'Chicago, IL',
    playlist: 'wedding-specialists'
  },
  {
    id: '5', name: 'The Relaxation Station', specialty: 'Massage Therapy', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'massage oil', rating: 4.9, reviewCount: 301, isFeatured: true,
    bio: 'Licensed massage therapist with a focus on pain relief and relaxation. Each session is tailored to your individual needs.',
    portfolio: [],
    services: [services[6]],
    reviews: [],
    badges: ['Pain Relief Pro', 'Top Rated'],
    location: 'Austin, TX',
    playlist: 'rejuvenating-facials'
  },
];

export const playlists: Playlist[] = [
    { id: 'top-rated-nails', title: 'Top Rated Nail Artists' },
    { id: 'wedding-specialists', title: 'Wedding Specialists' },
    { id: 'rejuvenating-facials', title: 'Rejuvenating Facials' },
];

export const getProviderById = (id: string) => providers.find(p => p.id === id);
export const getProvidersByPlaylist = (playlistId: string) => providers.filter(p => p.playlist === playlistId);
export const getFeaturedProviders = () => providers.filter(p => p.isFeatured);
