export type Provider = {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  dataAiHint?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  bio: string;
  portfolio: { id: string; url: string; dataAiHint: string }[];
  services: Service[];
  reviews: Review[];
  badges: string[];
  location: string;
  playlist: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
};

export type Review = {
  id:string;
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
