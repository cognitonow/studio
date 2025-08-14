

import type { Provider, Service, Review, Playlist, ServiceCategory, DublinDistrict, Booking, Notification, Conversation, Message } from './types';
import { format, formatDistanceToNow, isSameDay, startOfDay } from 'date-fns';
import { draftBookingConfirmation } from '@/ai/flows/draft-booking-confirmation';
import { draftPostBookingMessage } from '@/ai/flows/draft-post-booking-message';
import { draftBookingApproval } from '@/ai/flows/draft-booking-approval';

export const serviceCategories: ServiceCategory[] = [
    { id: 'hair', name: 'Hair' },
    { id: 'facials', name: 'Facials' },
    { id: 'nails', name: 'Nails' },
    { id: 'brows-lashes', name: 'Brows & Lashes' },
    { id: 'hair-removal', name: 'Hair Removal' },
    { id: 'body', name: 'Body' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'medi-spa', name: 'Aesthetic / Medi-Spa' },
];

export const dublinDistricts: DublinDistrict[] = [
    { id: 'd1', name: 'Dublin 1' },
    { id: 'd2', name: 'Dublin 2' },
    { id: 'd3', name: 'Dublin 3' },
    { id: 'd4', name: 'Dublin 4' },
    { id: 'd5', name: 'Dublin 5' },
    { id: 'd6', name: 'Dublin 6' },
    { id: 'd6w', name: 'Dublin 6W' },
    { id: 'd7', name: 'Dublin 7' },
    { id: 'd8', name: 'Dublin 8' },
    { id: 'd9', name: 'Dublin 9' },
    { id: 'd10', name: 'Dublin 10' },
    { id: 'd11', name: 'Dublin 11' },
    { id: 'd12', name: 'Dublin 12' },
    { id: 'd13', name: 'Dublin 13' },
    { id: 'd14', name: 'Dublin 14' },
    { id: 'd15', name: 'Dublin 15' },
    { id: 'd16', name: 'Dublin 16' },
    { id: 'd17', name: 'Dublin 17' },
    { id: 'd18', name: 'Dublin 18' },
    { id: 'd20', name: 'Dublin 20' },
    { id: 'd22', name: 'Dublin 22' },
    { id: 'd24', name: 'Dublin 24' },
];

export const services: Service[] = [
  // Hair
  { id: 'hair-1', categoryId: 'hair', name: 'Haircut', description: 'Professional haircut service.', price: 50, duration: 45 },
  { id: 'hair-2', categoryId: 'hair', name: 'Blowout', description: 'Professional blowout service.', price: 40, duration: 30 },
  { id: 'hair-3', categoryId: 'hair', name: 'Updo', description: 'Elegant updo for special occasions.', price: 75, duration: 60 },
  { id: 'hair-4', categoryId: 'hair', name: 'Silk Press', description: 'Straightening treatment for curly or textured hair.', price: 80, duration: 90 },
  { id: 'hair-5', categoryId: 'hair', name: 'Wash and Go / Coil Definition', description: 'Defining natural coils.', price: 60, duration: 60 },
  { id: 'hair-6', categoryId: 'hair', name: 'Twist Out / Braid Out', description: 'Styling for natural hair.', price: 65, duration: 75 },
  { id: 'hair-7', categoryId: 'hair', name: 'Deep Conditioning / Protein Treatment', description: 'Nourishing hair treatment.', price: 45, duration: 45 },
  { id: 'hair-8', categoryId: 'hair', name: 'Box Braids', description: 'Protective hairstyle with box braids.', price: 150, duration: 240 },
  { id: 'hair-9', categoryId: 'hair', name: 'Knotless Braids', description: 'Lighter and more flexible braids.', price: 180, duration: 260 },
  { id: 'hair-10', categoryId: 'hair', name: 'Cornrows', description: 'Traditional cornrow styling.', price: 70, duration: 90 },
  { id: 'hair-11', categoryId: 'hair', name: 'Goddess / Fulani Braids', description: 'Stylish and intricate braiding.', price: 160, duration: 240 },
  { id: 'hair-12', categoryId: 'hair', name: 'Senegalese / Marley / Passion Twists', description: 'Variety of twist styles.', price: 170, duration: 240 },
  { id: 'hair-13', categoryId: 'hair', name: 'Crochet Braids / Styles', description: 'Versatile crochet styling.', price: 120, duration: 150 },
  { id: 'hair-14', categoryId: 'hair', name: 'Braid Takedown', description: 'Safe removal of braids.', price: 50, duration: 60 },
  { id: 'hair-15', categoryId: 'hair', name: 'Starter Locs', description: 'Beginning the journey to locs.', price: 85, duration: 120 },
  { id: 'hair-16', categoryId: 'hair', name: 'Loc Retwist / Maintenance', description: 'Maintenance for existing locs.', price: 65, duration: 90 },
  { id: 'hair-17', categoryId: 'hair', name: 'Loc Styling', description: 'Creative styling for locs.', price: 45, duration: 45 },
  { id: 'hair-18', categoryId: 'hair', name: 'Faux Locs / Butterfly Locs', description: 'Temporary loc styles.', price: 200, duration: 300 },
  { id: 'hair-19', categoryId: 'hair', name: 'Sew-in Weave', description: 'Adding length and volume with a weave.', price: 250, duration: 180 },
  { id: 'hair-20', categoryId: 'hair', name: 'Wig Installation & Styling', description: 'Professional wig fitting and styling.', price: 150, duration: 120 },
  { id: 'hair-21', categoryId: 'hair', name: 'Hair Extensions (Tape-in, Micro-link)', description: 'Adding length and volume with extensions.', price: 300, duration: 180 },
  { id: 'hair-22', categoryId: 'hair', name: 'Colour, Highlights, Balayage', description: 'Hair coloring services.', price: 180, duration: 180 },
  { id: 'hair-23', categoryId: 'hair', name: 'Relaxer', description: 'Chemical straightening treatment.', price: 90, duration: 90 },
  { id: 'hair-24', categoryId: 'hair', name: 'Perm / Texturizer', description: 'Adding curls or waves to hair.', price: 100, duration: 120 },

  // Facials
  { id: 'facials-1', categoryId: 'facials', name: 'Classic Facial', description: 'A relaxing and cleansing facial.', price: 80, duration: 60 },
  { id: 'facials-2', categoryId: 'facials', name: 'Chemical Peel', description: 'Exfoliating treatment for smoother skin.', price: 120, duration: 60 },
  { id: 'facials-3', categoryId: 'facials', name: 'Microdermabrasion', description: 'Mechanical exfoliation for skin renewal.', price: 110, duration: 60 },
  { id: 'facials-4', categoryId: 'facials', name: 'Dermaplaning', description: 'Removes dead skin and peach fuzz.', price: 90, duration: 45 },
  { id: 'facials-5', categoryId: 'facials', name: 'Microneedling', description: 'Collagen-inducing therapy.', price: 250, duration: 75 },
  { id: 'facials-6', categoryId: 'facials', name: 'LED Therapy', description: 'Light therapy for various skin concerns.', price: 60, duration: 30 },
  { id: 'facials-7', categoryId: 'facials', name: 'Lymphatic Drainage', description: 'Facial massage to reduce puffiness.', price: 70, duration: 45 },
  { id: 'facials-8', categoryId: 'facials', name: 'Gua Sha Facial', description: 'Toning and sculpting facial massage.', price: 75, duration: 50 },

  // Nails
  { id: 'nails-1', categoryId: 'nails', name: 'Manicure', description: 'Classic manicure service.', price: 30, duration: 45 },
  { id: 'nails-2', categoryId: 'nails', name: 'Pedicure', description: 'Classic pedicure service.', price: 45, duration: 60 },
  { id: 'nails-3', categoryId: 'nails', name: 'Gel / Shellac', description: 'Long-lasting gel polish.', price: 45, duration: 60 },
  { id: 'nails-4', categoryId: 'nails', name: 'Builder Gel (BIAB)', description: 'Strengthening gel for natural nails.', price: 55, duration: 75 },
  { id: 'nails-5', categoryId: 'nails', name: 'Dip Powder / SNS', description: 'Durable dip powder nails.', price: 50, duration: 60 },
  { id: 'nails-6', categoryId: 'nails', name: 'Acrylics / Hard Gel', description: 'Nail extensions with acrylic or hard gel.', price: 65, duration: 90 },
  { id: 'nails-7', categoryId: 'nails', name: 'Apres Gel-X / Soft Gel Extensions', description: 'Pre-shaped soft gel extensions.', price: 70, duration: 90 },
  { id: 'nails-8', categoryId: 'nails', name: 'Nail Art', description: 'Custom nail art designs.', price: 20, duration: 30 },

  // Brows & Lashes
  { id: 'brows-1', categoryId: 'brows-lashes', name: 'Brow Shaping, Tinting, Lamination', description: 'Complete brow makeover.', price: 60, duration: 45 },
  { id: 'brows-2', categoryId: 'brows-lashes', name: 'Microblading / Microshading', description: 'Semi-permanent eyebrow tattooing.', price: 450, duration: 180 },
  { id: 'brows-3', categoryId: 'brows-lashes', name: 'Lash Lift, Tinting', description: 'Curl and color your natural lashes.', price: 75, duration: 60 },
  { id: 'brows-4', categoryId: 'brows-lashes', name: 'Eyelash Extensions (Classic, Hybrid, Volume)', description: 'Adding length and volume to lashes.', price: 150, duration: 120 },

  // Hair Removal
  { id: 'removal-1', categoryId: 'hair-removal', name: 'Waxing', description: 'Body and facial waxing.', price: 50, duration: 30 },
  { id: 'removal-2', categoryId: 'hair-removal', name: 'Threading', description: 'Facial hair removal with thread.', price: 25, duration: 20 },
  { id: 'removal-3', categoryId: 'hair-removal', name: 'Sugaring', description: 'Natural hair removal paste.', price: 60, duration: 30 },
  { id: 'removal-4', categoryId: 'hair-removal', name: 'Laser Hair Removal', description: 'Permanent hair reduction.', price: 200, duration: 30 },
  { id: 'removal-5', categoryId: 'hair-removal', name: 'Vajacial', description: 'A facial for the bikini area.', price: 70, duration: 45 },

  // Body
  { id: 'body-1', categoryId: 'body', name: 'Body Scrub / Polish', description: 'Exfoliating body treatment.', price: 80, duration: 60 },
  { id: 'body-2', categoryId: 'body', name: 'Body Wrap', description: 'Detoxifying and hydrating body wrap.', price: 100, duration: 75 },
  { id: 'body-3', categoryId: 'body', name: 'Spray Tan', description: 'Sunless tanning application.', price: 40, duration: 20 },
  { id: 'body-4', categoryId: 'body', name: 'Massage (Swedish, Deep Tissue)', description: 'Relaxing or therapeutic massage.', price: 90, duration: 60 },
  { id: 'body-5', categoryId: 'body', name: 'Cupping Therapy', description: 'Alternative therapy for pain relief.', price: 60, duration: 45 },

  // Makeup
  { id: 'makeup-1', categoryId: 'makeup', name: 'Makeup Application', description: 'Professional makeup for any occasion.', price: 85, duration: 60 },
  { id: 'makeup-2', categoryId: 'makeup', name: 'Bridal Makeup', description: 'Specialized makeup for brides.', price: 200, duration: 120 },
  { id: 'makeup-3', categoryId: 'makeup', name: 'Makeup Lessons', description: 'Learn makeup application techniques.', price: 150, duration: 90 },
  { id: 'makeup-4', categoryId: 'makeup', name: 'False Lash Application', description: 'Application of strip or individual lashes.', price: 25, duration: 15 },
  
  // Aesthetic / Medi-Spa
  { id: 'medi-1', categoryId: 'medi-spa', name: 'Botox®, Fillers', description: 'Injectable cosmetic treatments.', price: 500, duration: 45 },
  { id: 'medi-2', categoryId: 'medi-spa', name: 'Laser Resurfacing', description: 'Skin resurfacing with laser.', price: 600, duration: 60 },
  { id: 'medi-3', categoryId: 'medi-spa', name: 'IPL / Photofacial', description: 'Light therapy for skin rejuvenation.', price: 350, duration: 45 },
  { id: 'medi-4', categoryId: 'medi-spa', name: 'Body Contouring', description: 'Non-invasive fat reduction.', price: 400, duration: 60 },
  { id: 'medi-5', categoryId: 'medi-spa', name: 'Vampire Facial (PRP)', description: 'Facial using your own plasma.', price: 750, duration: 90 },
  { id: 'medi-6', categoryId: 'medi-spa', name: 'IV Vitamin Drips', description: 'Intravenous vitamin therapy.', price: 250, duration: 60 },
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
    services: services.filter(s => s.categoryId === 'nails'),
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
    services: services.filter(s => s.categoryId === 'facials' || s.categoryId === 'medi-spa'),
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
    services: services.filter(s => s.categoryId === 'hair'),
    reviews: [reviews[3]],
    badges: ['Color Whiz', 'Bridal Expert'],
    location: 'Los Angeles, CA',
    playlist: 'wedding-specialists'
  },
  {
    id: '4', name: 'Bridal Beauty Co.', specialty: 'Wedding Makeup', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'makeup brushes', rating: 5.0, reviewCount: 56,
    bio: 'Creating timeless and elegant bridal looks. My goal is to make you feel like the most beautiful version of yourself on your wedding day.',
    portfolio: [],
    services: services.filter(s => s.categoryId === 'makeup'),
    reviews: [],
    badges: ['Bridal Expert', 'On-Location Pro'],
    location: 'Chicago, IL',
    playlist: 'wedding-specialists'
  },
  {
    id: '5', name: 'The Relaxation Station', specialty: 'Massage Therapy', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'massage oil', rating: 4.9, reviewCount: 301, isFeatured: true,
    bio: 'Licensed massage therapist with a focus on pain relief and relaxation. Each session is tailored to your individual needs.',
    portfolio: [],
    services: services.filter(s => s.categoryId === 'body'),
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

let bookings: Booking[] = [
    { id: "1", providerId: "3", providerName: "Chloe's Hair Haven", serviceIds: ["hair-22"], date: "2024-08-15T14:00:00.000Z", status: "Confirmed", clientName: 'Emily R.', isPaid: true },
    { id: "2", providerId: "2", providerName: "Glow & Go Esthetics", serviceIds: ["facials-1"], date: "2024-07-16T10:00:00.000Z", status: "Completed", clientName: 'Sarah K.', isPaid: true },
    { id: "3", providerId: "1", providerName: "Olivia's Nail Studio", serviceIds: ["nails-1", "nails-8"], date: "2024-08-18T11:00:00.000Z", status: "Review Order and Pay", clientName: 'Jane D.', isPaid: false },
    { id: "4", providerId: "4", providerName: "Bridal Beauty Co.", serviceIds: ["makeup-2"], date: "2024-06-01T09:00:00.000Z", status: "Completed", clientName: 'Someone Bridey', isPaid: true },
    { id: "5", providerId: '3', providerName: 'Chloe\'s Hair Haven', serviceIds: ['hair-1'], clientName: 'Alex Ray', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', isPaid: false },
    { id: "6", providerId: '3', providerName: 'Chloe\'s Hair Haven', serviceIds: ['makeup-2'], clientName: 'Taylor Swift', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'Cancelled', isPaid: false },
];

export let providerServices: Service[] = providers[2].services;

let conversations: Conversation[] = [
  { id: 1, providerId: '1', name: "Olivia's Nail Studio", avatar: "https://placehold.co/100x100.png", dataAiHint: "woman face", lastMessage: "Perfect, see you then!", time: "10m", unread: 0 },
  { id: 2, providerId: '3', name: "Chloe's Hair Haven", avatar: "https://placehold.co/100x100.png", dataAiHint: "person smiling", lastMessage: "Yes, I have availability on Friday.", time: "2h", unread: 2 },
  { id: 3, providerId: '2', name: "Glow & Go Esthetics", avatar: "https://placehold.co/100x100.png", dataAiHint: "skincare product", lastMessage: "You're welcome! Glad I could help.", time: "1d", unread: 0 },
  { id: 4, providerId: '4', name: "Bridal Beauty Co.", avatar: "https://placehold.co/100x100.png", dataAiHint: "makeup brushes", lastMessage: "Let's schedule a trial run.", time: "3d", unread: 0 },
]

let messages: Message[] = [
    { id: 1, conversationId: 2, sender: 'provider', text: 'Hi there! Just confirming your appointment for the Balayage service tomorrow at 2 PM.', isAi: true, bookingId: '1' },
    { id: 2, conversationId: 2, sender: 'user', text: 'Hi Chloe! Yes, that sounds right. I was wondering if it would be possible to also get a quick trim?' },
    { id: 3, conversationId: 2, sender: 'provider', text: "Of course! A trim shouldn't add too much time. I've updated the appointment for you." },
    { id: 4, conversationId: 2, sender: 'user', text: "That's fantastic, thank you so much! "},
    { id: 5, conversationId: 2, sender: 'provider', text: "You're very welcome. Looking forward to seeing you tomorrow!" },
]

let notifications: Notification[] = [
    {
      id: 1,
      icon: 'new-booking',
      title: "New Booking!",
      description: "Alex Ray has booked a Haircut for August 15, 2024 at 2:00 PM.",
      time: "1 hour ago",
      read: false,
      bookingId: '5'
    },
    {
      id: 2,
      icon: 'message',
      title: "New Message",
      description: "Kate Winslet sent you a message about her upcoming Classic Facial.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      icon: 'cancellation',
      title: "Booking Cancelled",
      description: "Taylor Swift has cancelled her Bridal Makeup booking for September 1, 2024.",
      time: "2 days ago",
      read: true,
      bookingId: '6'
    },
    {
        id: 4,
        icon: 'confirmation',
        title: "Booking Confirmed!",
        description: "Jordan Peele's booking for a Classic Manicure is confirmed for August 18, 2024 at 10:00 AM.",
        time: "3 days ago",
        read: true,
        bookingId: '3'
    }
  ];

export const getBookings = () => {
    const today = startOfDay(new Date());
    const upcoming = bookings
        .filter(b => new Date(b.date) >= today && (b.status === 'Pending' || b.status === 'Confirmed' || b.status === 'Review Order and Pay'))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const past = bookings
        .filter(b => new Date(b.date) < today || b.status === 'Completed' || b.status === 'Cancelled')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
    return { upcoming, past };
};

export const getProviderBookings = (providerId: string) => {
    return [...bookings]
        .filter(b => b.providerId === providerId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
        id: notifications.length + 1,
        time: formatDistanceToNow(new Date(), { addSuffix: true }),
        read: false,
        ...notification
    };
    notifications.unshift(newNotification);
};

const sendAutomatedMessage = async (booking: Booking, messageGenerator: (input: any) => Promise<{ message: string }>) => {
    const serviceNames = getServicesByIds(booking.serviceIds).map(s => s.name).join(', ');
    const bookingDateTime = format(new Date(booking.date), "PPP p");

    try {
        const response = await messageGenerator({
            clientName: booking.clientName || 'Valued Client',
            providerName: booking.providerName,
            serviceName: serviceNames,
            bookingDate: bookingDateTime,
        });

        const conversation = conversations.find(c => c.name === booking.providerName);

        if (conversation) {
             messages.push({
                id: messages.length + 1,
                conversationId: conversation.id,
                sender: 'provider',
                text: response.message,
                isAi: true,
                bookingId: booking.id,
            });
            conversation.lastMessage = response.message;
            conversation.time = 'Just now';
            conversation.unread = (conversation.unread || 0) + 1;
        }
    } catch (e) {
        console.error("Failed to draft automated message:", e);
    }
}

export const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        const booking = bookings[bookingIndex];
        if (booking.status !== status) {
            booking.status = status;

            // In a real app, this would target a specific user.
            // For now, we add all notifications to the global notifications array.
            const clientNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => addNotification(notification);
            const providerNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => addNotification(notification);


            if (status === 'Cancelled') {
                providerNotification({
                    icon: 'cancellation',
                    title: 'Booking Cancelled by Client',
                    description: `${booking.clientName} has cancelled their booking for ${new Date(booking.date).toLocaleDateString()}.`,
                    bookingId: booking.id
                });
            } else if (status === 'Review Order and Pay') {
                providerNotification({
                    icon: 'confirmation',
                    title: 'Booking Approved!',
                    description: `You approved ${booking.clientName}'s booking for ${new Date(booking.date).toLocaleDateString()}. Waiting for payment.`,
                    bookingId: booking.id
                });
                clientNotification({
                    icon: 'payment',
                    title: 'Action Required - Review & Pay',
                    description: `${booking.providerName} has approved your booking! Please review and complete payment to confirm your spot.`,
                    bookingId: booking.id
                });
                await sendAutomatedMessage(booking, draftBookingApproval);
            } else if (status === 'Confirmed') {
                clientNotification({
                    icon: 'confirmation',
                    title: 'Booking Confirmed!',
                    description: `Your booking with ${booking.providerName} for ${new Date(booking.date).toLocaleDateString()} is confirmed.`,
                    bookingId: booking.id
                });
                providerNotification({
                    icon: 'confirmation',
                    title: 'Booking Confirmed!',
                    description: `${booking.clientName}'s booking for ${new Date(booking.date).toLocaleDateString()} is now confirmed.`,
                    bookingId: booking.id
                });
                await sendAutomatedMessage(booking, draftBookingConfirmation);
            } else if (status === 'Completed') {
                booking.isPaid = true; // For simplicity, assume payment is captured on completion
                providerNotification({
                    icon: 'new-booking', // Using this for completed as well for provider feed
                    title: 'Booking Completed!',
                    description: `You've marked ${booking.clientName}'s booking on ${new Date(booking.date).toLocaleDateString()} as completed.`,
                    bookingId: booking.id
                });
                clientNotification({
                    icon: 'confirmation',
                    title: 'Service Complete!',
                    description: `Your appointment with ${booking.providerName} is complete. We hope you enjoyed your service!`,
                    bookingId: booking.id,
                });
                await sendAutomatedMessage(booking, draftPostBookingMessage);
            }
        }
    }
};

export const updateBooking = (bookingId: string, updatedDetails: Partial<Booking>) => {
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        const originalBooking = { ...bookings[bookingIndex] };
        bookings[bookingIndex] = { ...bookings[bookingIndex], ...updatedDetails };
        
        // If payment was made and status changes from Review to Confirmed
        if (updatedDetails.isPaid && originalBooking.status === 'Review Order and Pay') {
            updateBookingStatus(bookingId, 'Confirmed');
        }
    }
};

export const addBooking = (booking: Omit<Booking, 'id' | 'status' | 'clientName'>) => {
    const newBooking: Booking = {
        id: String(bookings.length + 1),
        status: 'Pending',
        clientName: 'Jane Doe', // Placeholder name for client
        ...booking,
    };
    bookings.push(newBooking);

    // This is a provider notification
    addNotification({
        icon: 'new-booking',
        title: 'New Booking Request!',
        description: `${newBooking.clientName} has requested a booking for ${new Date(newBooking.date).toLocaleDateString()}.`,
        bookingId: newBooking.id
    });
};


export const getNotifications = () => {
    // Return a new array to ensure React state updates trigger re-renders
    return [...notifications];
}

export const markNotificationAsRead = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
    }
}

export const markAllNotificationsAsRead = () => {
    notifications.forEach(n => n.read = true);
}

export const getConversations = () => [...conversations];
export const getMessages = () => [...messages];

export const getUnreadMessageCount = () => {
    return conversations.reduce((count, convo) => count + (convo.unread || 0), 0);
};

export const markAllMessagesAsRead = (conversationId?: number) => {
    // console.log(`markAllMessagesAsRead called for conversationId: ${conversationId}`);
    if (conversationId) {
        const convo = conversations.find(c => c.id === conversationId);
        if (convo) {
            convo.unread = 0;
        }
    } else {
        conversations.forEach(convo => convo.unread = 0);
    }
};

export const getBookedTimes = (providerId: string, date: Date): string[] => {
    return bookings
        .filter(b => b.providerId === providerId && isSameDay(new Date(b.date), date) && b.status !== 'Cancelled')
        .map(b => format(new Date(b.date), 'HH:mm'));
};

export const getActiveBooking = (): (Booking & { services: Service[] }) | undefined => {
    const upcomingBookings = bookings
        .filter(b => (b.status === 'Confirmed' || b.status === 'Pending' || b.status === 'Review Order and Pay') && new Date(b.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (upcomingBookings.length > 0) {
        const nextBooking = upcomingBookings[0];
        const bookingServices = getServicesByIds(nextBooking.serviceIds);
        return {
            ...nextBooking,
            services: bookingServices,
        }
    }
    return undefined;
}


export const getClientDashboardData = () => {
    const completedBookings = bookings.filter(b => b.status === 'Completed');
    const totalSpend = completedBookings.reduce((acc, booking) => {
        const bookingServices = getServicesByIds(booking.serviceIds);
        const bookingTotal = bookingServices.reduce((total, service) => total + service.price, 0);
        return acc + bookingTotal;
    }, 0);
    
    const totalBookings = bookings.length;
    const averageSpend = totalBookings > 0 ? totalSpend / completedBookings.length : 0;

    const previousBookings = bookings
        .filter(b => b.status === 'Completed' || b.status === 'Cancelled')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Mock logic for favorite and suggested providers
    const favoriteProvider = providers[0];
    const suggestedProvider = providers[1];
    const activeBooking = getActiveBooking();

    return {
        totalBookings,
        averageSpend,
        previousBookings,
        favoriteProvider,
        suggestedProvider,
        activeBooking,
    };
}


export const getProviderById = (id: string) => providers.find(p => p.id === id);
export const getBookingById = (id: string) => bookings.find(b => b.id === id);
export const getProvidersByPlaylist = (playlistId: string) => providers.filter(p => p.playlist === playlistId);
export const getFeaturedProviders = () => providers.filter(p => p.isFeatured);
export const getServicesByIds = (ids: string[]) => services.filter(s => ids.includes(s.id));
export const getExploreQueueProviders = () => providers.slice(0, 2);
    

