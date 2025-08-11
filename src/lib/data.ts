
import type { Provider, Service, Review, Playlist, ServiceCategory, DublinDistrict, Booking } from './types';

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
    { id: "1", providerId: "3", provider: "Chloe's Hair Haven", serviceId: "hair-22", service: "Balayage", date: "2024-08-15T14:00:00.000Z", status: "Confirmed" },
    { id: "2", providerId: "2", provider: "Glow & Go Esthetics", serviceId: "facials-1", service: "Signature Facial", date: "2024-07-16T10:00:00.000Z", status: "Completed" },
    { id: "3", providerId: "1", provider: "Olivia's Nail Studio", serviceId: "nails-1", service: "Classic Manicure", date: "2024-08-18T11:00:00.000Z", status: "Confirmed" },
    { id: "4", providerId: "4", provider: "Bridal Beauty Co.", serviceId: "makeup-2", service: "Bridal Makeup", date: "2024-06-01T09:00:00.000Z", status: "Completed" },
    { id: "5", providerId: '3', provider: 'Alex Ray', serviceId: 'hair-1', service: 'Balayage', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending' },
    { id: "6", providerId: '3', provider: 'Taylor Swift', serviceId: 'makeup-2', service: 'Bridal Makeup', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'Cancelled' },

];

export const getBookings = () => {
    const upcoming = bookings
        .filter(b => new Date(b.date) >= new Date() && b.status === 'Confirmed')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const past = bookings
        .filter(b => new Date(b.date) < new Date() || ['Completed', 'Cancelled'].includes(b.status))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
    return { upcoming, past };
};

export const getProviderBookings = () => {
    return bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = status;
    }
};


export const addBooking = (booking: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
        id: String(bookings.length + 1),
        status: 'Pending',
        ...booking,
    };
    bookings.push(newBooking);
    return newBooking;
};


export const getProviderById = (id: string) => providers.find(p => p.id === id);
export const getProvidersByPlaylist = (playlistId: string) => providers.filter(p => p.playlist === playlistId);
export const getFeaturedProviders = () => providers.filter(p => p.isFeatured);

    
