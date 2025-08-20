# Application Page Summary

This document provides a detailed overview of each page in the Beauty Book application, detailing its purpose, key UI components, and user interactions. It has been updated to reflect the different views and functionalities available to the three main user roles: **Guest**, **Client**, and **Provider**.

---

### 1.  **Landing Page (`/`)**
-   **File:** `src/app/page.tsx`
-   **Purpose:** Serves as the primary marketing and entry point for new or logged-out users. It's designed to introduce the app's value proposition and drive user engagement towards discovery and booking.
-   **Key Components:**
    -   **Hero Section:** A full-width section containing the main headline, a short descriptive paragraph, a prominent "Book Now" button, and a large, aspirational hero image.
    -   **Testimonials Section (`@/components/testimonials.tsx`):** A carousel displaying social proof through client reviews. Each testimonial includes the reviewer's comment, name, and avatar.
-   **Role-Based Views:**
    -   **Guest:** This page is primarily designed for guests. All functionality is visible.
    -   **Client / Provider:** Logged-in users are typically redirected to their respective dashboards but can navigate to this page. The experience is the same, but the main header navigation will reflect their logged-in state.

---

### 2.  **Discover Page (`/discover`)**
-   **File:** `src/app/discover/page.tsx`
-   **Purpose:** The central hub for clients to find, explore, and interact with service providers. It offers multiple modes of discovery to suit different user intentions.
-   **Key Components:**
    -   **Hero/Search Section:** A large banner image with an embedded search bar.
    -   **Tabbed Interface (`Tabs`):** Organizes three discovery methods: Explore, Featured Providers, and Find a Service.
    -   **Explore Stack (`ExploreProviderCard`):** A swipeable card interface for browsing providers. Includes action buttons for "Save," "View Profile," and "Chat."
    -   **Featured Carousel (`Carousel`):** A horizontally scrolling list of curated `ProviderCard` components.
    -   **Advanced Search:** Includes a circular category menu and dropdowns for specific services and locations.
-   **Role-Based Views:**
    -   **Guest:** Can view all providers and services. Actions like "Save to List," "View Profile," or "Start Chat" will trigger a login/signup dialog (`AuthDialog`).
    -   **Client:** Has full access. All actions are enabled, allowing them to save providers, start chats, and navigate to booking pages.
    -   **Provider:** While providers can view this page, it is not tailored for them. Their experience is the same as a guest's.

---

### 3.  **Authentication Page (`/auth`)**
-   **File:** `src/app/auth/page.tsx`
-   **Purpose:** A single, unified page for handling both user sign-up and login.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Switches between "Sign Up" and "Log In" forms.
    -   **Sign Up Form:** Inputs for name, email, password, and a `RadioGroup` to select 'Client' or 'Provider' role.
    -   **Log In Form:** Inputs for email and password.
-   **Role-Based Views:**
    -   **Guest:** This is the primary user for this page.
    -   **Client / Provider:** Logged-in users will not see this page. They are redirected to their dashboard if they attempt to access it.

---

### 4.  **Dashboard (`/dashboard`)**
-   **File:** `src/app/dashboard/page.tsx`
-   **Purpose:** The main hub for logged-in users, displaying a completely different interface based on the user's role.
-   **Role-Based Views:**
    -   **Guest:** Cannot access this page. They are redirected to the `/auth` page.
    -   **Provider View:** A comprehensive business management center with a tabbed interface.
        -   **Shop Management Tab:** Forms to edit public profile, manage portfolio images, set weekly availability, and manage services using the `ServiceManagementCard`.
        -   **Booking Management Tab:** Displays current and past bookings in sortable tables (`Table`). Includes action buttons to approve, decline, or manage each booking.
        -   **Stats Tab:** Showcases key business analytics in `Card` components and a `MonthlyEarningsChart`.
    -   **Client View:** A personalized summary of the client's activity.
        -   **Analytics Cards (`Card`):** Simple cards displaying "Your Stats" like Total Bookings and Average Spend.
        -   **Active Booking Card:** Highlights the client's next upcoming appointment.
        -   **Favorite Provider Card:** A detailed card showcasing the client's top provider.
        -   **My Lists Card:** A call-to-action card that directs the user to `/my-lists`.

---

### 5.  **Provider Detail Page (`/provider/[id]`)**
-   **File:** `src/app/provider/[id]/page.tsx`
-   **Purpose:** Displays the full, detailed public profile for a single service provider.
-   **Key Components:**
    -   **Provider Header:** `Avatar`, name, location, rating, and `Badge` components.
    -   **Portfolio:** An image grid of the provider's work.
    -   **Tabbed Section:** For Verified Reviews, Chat, and User's Booking History.
    -   **Services Accordion (`Accordion`):** A sticky-positioned list of all services, each with a "Book Now" button.
-   **Role-Based Views:**
    -   **Guest:** Can view all public information (profile, portfolio, services, reviews). Actions like "Book Now," "Chat," or "Save to Favourites" will trigger the `AuthDialog`.
    -   **Client:** Has full access. All action buttons are enabled. The "Your History" tab will be populated with their specific past bookings with this provider.
    -   **Provider:** Can view their own profile as a guest or client would see it. There are no special editing controls on this page; those are on the dashboard.

---

### 6.  **Book Appointment Page (`/book/[providerId]`)**
-   **File:** `src/app/book/[providerId]/page.tsx`
-   **Purpose:** A dedicated page for a client to select a date and time for a specific service.
-   **Key Components:**
    -   **Details Card (`Card`):** Summarizes the selected service and provider.
    -   **Calendar (`Calendar`):** For date selection.
    -   **Time Slot Selector (`Select`):** Dropdown for available times.
    -   **Request to Book Button (`Button`):** Submits the booking request.
-   **Role-Based Views:**
    -   **Guest:** Cannot access this page directly. They are funneled through the `AuthDialog` from a provider's profile before landing here.
    -   **Client:** This page is designed for clients. All functionality is available.
    -   **Provider:** Cannot access this page. It is exclusively for booking appointments *with* them, not *by* them.

---

### 7.  **Manage Booking Page (`/booking/manage/[bookingId]`)**
-   **File:** `src/app/booking/manage/[bookingId]/page.tsx`
-   **Purpose:** A multi-functional page for viewing and managing a single booking, with actions and information changing based on role and booking status.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Provider View:**
        -   Can view `ClientDetails` and the client's history.
        -   Can add or remove services and change the date/time.
        -   Can approve, decline, or cancel the booking using action buttons (`Button`).
    -   **Client View:**
        -   Can view provider details.
        -   If booking status is 'Review Order and Pay', a **Payment Form** is displayed.
        -   Can cancel a booking request if it's still 'Pending'.

---

### 8.  **My Bookings Page (`/bookings`)**
-   **File:** `src/app/bookings/page.tsx`
-   **Purpose:** A dedicated page for clients to view and manage all of their appointments.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Separates "Upcoming" and "Past" bookings.
    -   **Bookings Table (`Table`):** Lists bookings with details.
    -   **Dynamic Action Buttons:** Buttons change based on booking status (e.g., "Make Payment," "Manage," "Leave a Review").
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** This page is exclusively for clients.
    -   **Provider:** Cannot access. Their booking management is on their dashboard.

---

### 9.  **Messages Page (`/messages`)**
-   **File:** `src/app/messages/page.tsx`
-   **Purpose:** The in-app chat interface for direct communication.
-   **Key Components:**
    -   A two-column layout with a conversation list and an active chat window.
    -   Messages are styled differently based on the sender (`UserMessage`, `ProviderMessage`, `AiMessage`).
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** Sees a list of their conversations with providers. They are the 'user' sender.
    -   **Provider:** Sees a list of their conversations with clients. They are the 'provider' sender.

---

### 10. **My Lists Page (`/my-lists`)**
-   **File:** `src/app/my-lists/page.tsx`
-   **Purpose:** A page for clients to organize and view saved providers.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Separates "Explore Queue" and "My Favourites."
    -   **Provider Grid:** Both tabs display a grid of `ProviderCard` components.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** This page is exclusively for clients.
    -   **Provider:** Cannot access.

---

### 11. **Account Page (`/account`)**
-   **File:** `src/app/account/page.tsx`
-   **Purpose:** Allows logged-in users to manage their personal account settings.
-   **Key Components:**
    -   A tabbed interface for "Profile," "Billing," and "Security."
    -   Forms to change personal info, payment methods, and password.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client / Provider:** Both roles have access to this page to manage their own account settings. The functionality is identical for both.

---

### 12. **Notifications Page (`/notifications`)**
-   **File:** `src/app/notifications/page.tsx`
-   **Purpose:** Displays a centralized list of all system-generated notifications.
-   **Key Components:**
    -   A list of notifications, each with a distinct icon, title, description, and timestamp.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** Sees notifications relevant to their bookings and messages (e.g., "Booking Approved," "New Message from Provider").
    -   **Provider:** Sees notifications relevant to their business (e.g., "New Booking Request," "Client Cancelled," "New Review Received").
