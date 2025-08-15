
import type { BadgeLevel } from './badges';

export type UserRole = 'guest' | 'client' | 'provider';

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

export type ProviderBadge = {
  name: string;
  level: BadgeLevel;
}

export type Provider = {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  dataAiHint?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isFavourite?: boolean;
  bio: string;
  portfolio: { id: string; url: string; dataAiHint: string }[];
  services: Service[];
  reviews: Review[];
  badges: ProviderBadge[];
  location: string;
  playlist: string;
};

export type Service = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
};

export type Review = {
  id:string;
  bookingId: string;
  author: string;
  avatarUrl: string;
  dataAiHint?: string;
  rating: number;
  comment: string;
  title?: string;
};

export type Playlist = {
  id: string;
  title: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
}

export type DublinDistrict = {
    id: string;
    name: string;
}

export type BookingHistory = {
  id: string;
  service: string;
  date: string;
  status: 'Completed' | 'Cancelled';
  price: number;
};

export type Booking = {
    id: string;
    providerId: string;
    providerName: string;
    serviceIds: string[];
    date: string;
    status: 'Pending' | 'Review Order and Pay' | 'Confirmed' | 'Completed' | 'Cancelled';
    clientName?: string; // Optional client name for provider view
    isPaid: boolean;
    reviewId?: string;
};

export type Notification = {
  id: number;
  icon: 'new-booking' | 'cancellation' | 'message' | 'confirmation' | 'payment' | 'review';
  title: string;
  description: string;
  time: string;
  read: boolean;
  bookingId?: string;
  providerId?: string;
};

export type Conversation = {
  id: number;
  providerId: string;
  clientId?: string; // For provider view
  name: string;
  avatar: string;
  dataAiHint?: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export type Message = {
  id: number;
  conversationId: number;
  sender: 'user' | 'provider';
  text: string;
  isAi?: boolean;
  bookingId?: string;
};
