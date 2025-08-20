# Application Page Summary

This document provides an overview of each page in the Beauty Book application, detailing its purpose, key UI components, and user interactions.

---

### 1.  **Landing Page (`/`)**
-   **File:** `src/app/page.tsx`
-   **Purpose:** Serves as the marketing and entry point for new users.
-   **Key Components:**
    -   Hero section with a headline, a brief description of the app, and a primary "Book Now" call-to-action button that links to the Discover page.
    -   A testimonials section featuring a carousel of user reviews.

---

### 2.  **Discover Page (`/discover`)**
-   **File:** `src/app/discover/page.tsx`
-   **Purpose:** The main hub for clients to find and explore service providers.
-   **Key Components:**
    -   A large hero image with a search bar.
    -   A tabbed interface with three sections:
        1.  **Explore:** A Tinder-style swipeable card stack of providers. Users can swipe, save to a list, view a profile in a dialog, or initiate a chat.
        2.  **Featured Providers:** A horizontally scrolling carousel of `ProviderCard` components for highlighted providers.
        3.  **Find a Service:** An advanced search interface with a circular menu for selecting service categories and dropdowns for specific services and locations. It displays a "Playlist" of providers based on the selected category.

---

### 3.  **Authentication Page (`/auth`)**
-   **File:** `src/app/auth/page.tsx`
-   **Purpose:** A unified page for user sign-up and login.
-   **Key Components:**
    -   A tabbed interface to switch between "Sign Up" and "Log In" forms.
    -   **Sign Up Form:** Fields for Full Name, Email, Password, and a Radio Group to select a role ('Client' or 'Provider').
    -   **Log In Form:** Fields for Email and Password.

---

### 4.  **Dashboard (`/dashboard`)**
-   **File:** `src/app/dashboard/page.tsx`
-   **Purpose:** The main hub for logged-in users, with different views based on user role.
-   **Provider View:**
    -   A tabbed interface for "Shop Management", "Booking Management", and "Stats".
    -   **Shop Management:** Forms to edit profile (name, bio), manage portfolio images, set availability, and manage services offered (`ServiceManagementCard`).
    -   **Booking Management:** Tables for current and past bookings with actions to approve, manage, or view details.
    -   **Stats:** Analytics cards (Total Revenue, Bookings, etc.) and a monthly earnings chart.
-   **Client View:**
    -   Analytics cards for "Your Stats" (Total Bookings, Average Spend).
    -   An "Active Booking" card displaying details of the next upcoming appointment.
    -   A "Favorite Provider" card showcasing the client's top provider.
    -   A link to the "My Lists" page.

---

### 5.  **Provider Detail Page (`/provider/[id]`)**
-   **File:** `src/app/provider/[id]/page.tsx`
-   **Purpose:** Displays the full public profile for a single service provider.
-   **Key Components:**
    -   Provider header with avatar, name, location, rating, and badges.
    -   Provider's biography.
    -   A grid of portfolio images.
    -   A tabbed section for "Verified Reviews", "Chat", and the client's "Booking History" with that provider.
    -   A sticky-positioned card on the right with an accordion list of all services offered. Each service has a "Book Now" button.

---

### 6.  **Book Appointment Page (`/book/[providerId]`)**
-   **File:** `src/app/book/[providerId]/page.tsx`
-   **Purpose:** The page where a client selects a date and time to request a booking for a specific service.
-   **Key Components:**
    -   A card displaying the details of the selected service and provider.
    -   A calendar for date selection (`Calendar` component).
    -   A dropdown select for available time slots.
    -   A "Request to Book" button that submits the booking.

---

### 7.  **Manage Booking Page (`/booking/manage/[bookingId]`)**
-   **File:** `src/app/booking/manage/[bookingId]/page.tsx`
-   **Purpose:** A detailed view for managing a single booking, with different actions available based on user role and booking status.
-   **Key Components:**
    -   **Provider View:** Client details card, ability to add/remove services, change date/time, and approve/decline/cancel the booking.
    -   **Client View:** Provider details card, a payment form (if the booking is awaiting payment), and the ability to cancel the request.
    -   Displays booked services, total cost, and total duration.

---

### 8.  **My Bookings Page (`/bookings`)**
-   **File:** `src/app/bookings/page.tsx`
-   **Purpose:** A page for clients to view all their appointments.
-   **Key Components:**
    -   A tabbed interface for "Upcoming" and "Past" bookings.
    -   A table listing bookings with columns for Provider, Service(s), Date, and Status.
    -   Action buttons for each booking (e.g., "Make Payment", "Manage", "Leave a Review").
    -   A dialog for submitting a new review for completed bookings.

---

### 9.  **Messages Page (`/messages`)**
-   **File:** `src/app/messages/page.tsx`
-   **Purpose:** The in-app chat interface for communication between clients and providers.
-   **Key Components:**
    -   A two-column layout.
    -   **Left Column:** A scrollable list of all conversations, showing the other user's name, avatar, last message, and unread count.
    -   **Right Column:** The active chat window, displaying the message history and an input form at the bottom to send new messages.

---

### 10. **My Lists Page (`/my-lists`)**
-   **File:** `src/app/my-lists/page.tsx`
-   **Purpose:** A page for clients to view providers they have saved.
-   **Key Components:**
    -   A tabbed interface for "Explore Queue" (providers saved from the swiping interface) and "My Favourites".
    -   A grid of `ProviderCard` components for each list.

---

### 11. **Account Page (`/account`)**
-   **File:** `src/app/account/page.tsx`
-   **Purpose:** Allows users to manage their personal account settings.
-   **Key Components:**
    -   A tabbed interface for "Profile", "Billing", and "Security".
    -   **Profile:** Change photo, full name, email, and bio.
    -   **Billing:** Manage saved payment methods.
    -   **Security:** Form to change the current password.

---

### 12. **Notifications Page (`/notifications`)**
-   **File:** `src/app/notifications/page.tsx`
-   **Purpose:** Displays a chronological list of all notifications for the user.
-   **Key Components:**
    -   A list of notifications, each with an icon, title, description, and timestamp.
    -   Unread notifications are highlighted.
    -   A "Mark all as read" button.

