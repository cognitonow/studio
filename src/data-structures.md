# Application Data Structures

This document outlines the core data structures used throughout the application, from the mock database in `src/lib/data.ts` to the front-end components. All type definitions can be found in `src/lib/types.ts`.

---

### `UserRole`
The role of the current user, which controls what parts of the application they can see and what actions they can perform.

```typescript
export type UserRole = 'guest' | 'client' | 'provider';
```

---

### `Provider`
Represents a service provider (e.g., a salon, spa, or individual stylist). This is one of the main data models in the app.

```typescript
export type Provider = {
  id: string;
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
  badges: string[];
  location: string;
  playlist: string;
};
```

---

### `Service`
Represents a single service offered by a provider.

```typescript
export type Service = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
};
```

---

### `Booking`
Represents an appointment made by a client with a provider. This is the central transactional data model.

```typescript
export type Booking = {
    id: string;
    providerId: string;
    providerName: string;
    serviceIds: string[];
    date: string; // ISO 8601 format
    status: 'Pending' | 'Review Order and Pay' | 'Confirmed' | 'Completed' | 'Cancelled';
    clientName?: string; // Optional client name for provider view
    isPaid: boolean;
};
```

---

### `Conversation`
Represents a chat thread between a client and a provider.

```typescript
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
```

---

### `Message`
Represents a single message within a `Conversation`.

```typescript
export type Message = {
  id: number;
  conversationId: number;
  sender: 'user' | 'provider';
  text: string;
  isAi?: boolean;
  bookingId?: string;
};
```

---

### `Notification`
Represents a system notification for a user, typically triggered by a booking status change or a new message.

```typescript
export type Notification = {
  id: number;
  icon: 'new-booking' | 'cancellation' | 'message' | 'confirmation' | 'payment';
  title: string;
  description: string;
  time: string;
  read: boolean;
  bookingId?: string;
};
```

---

### `Review`
Represents a review left by a client for a provider.

```typescript
export type Review = {
  id:string;
  author: string;
  avatarUrl: string;
  dataAiHint?: string;
  rating: number;
  comment: string;
  title?: string;
};
```

---

### `ServiceCategory`
A category for grouping `Service` types (e.g., Hair, Nails).

```typescript
export type ServiceCategory = {
  id: string;
  name: string;
}
```
