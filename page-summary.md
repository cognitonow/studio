# Application Page Summary

This document provides a detailed overview of each page in the Beauty Book application, detailing its purpose, key UI components, and user interactions. This serves as a comprehensive guide for understanding the front-end architecture.

---

### 1.  **Landing Page (`/`)**
-   **File:** `src/app/page.tsx`
-   **Purpose:** Serves as the primary marketing and entry point for new or logged-out users. It's designed to introduce the app's value proposition and drive user engagement towards discovery and booking.
-   **Key Components:**
    -   **Hero Section:** A full-width section containing the main headline, a short descriptive paragraph, a prominent "Book Now" button, and a large, aspirational hero image.
    -   **Testimonials Section (`@/components/testimonials.tsx`):** A carousel displaying social proof through client reviews. Each testimonial includes the reviewer's comment, name, and avatar.

---

### 2.  **Discover Page (`/discover`)**
-   **File:** `src/app/discover/page.tsx`
-   **Purpose:** The central hub for clients to find, explore, and interact with service providers. It offers multiple modes of discovery to suit different user intentions.
-   **Key Components:**
    -   **Hero/Search Section:** A large banner image with an embedded search bar for keyword-based searches.
    -   **Tabbed Interface (`Tabs`):** Organizes the three main discovery methods:
        1.  **Explore Tab:** Features a Tinder-style swipeable card stack (`ExploreProviderCard`). Users can swipe through provider profiles. This interface includes large, icon-based buttons for actions like "Save to List" (Like), "View Profile" (opens a `Dialog`), and "Start Chat."
        2.  **Featured Providers Tab:** A horizontally scrolling carousel (`Carousel`) of `ProviderCard` components for providers who are marked as featured. This provides curated recommendations.
        3.  **Find a Service Tab:** An advanced search interface. It includes a unique circular menu for selecting top-level service categories. Upon selection, a "Playlist" of relevant providers is displayed in the `PlaylistResults` component. Additional dropdowns (`Select`, `DropdownMenu`) allow filtering by specific service and location (e.g., Dublin districts).

---

### 3.  **Authentication Page (`/auth`)**
-   **File:** `src/app/auth/page.tsx`
-   **Purpose:** A single, unified page for handling both user sign-up and login, reducing friction for new and returning users.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Allows users to easily switch between the "Sign Up" and "Log In" forms.
    -   **Sign Up Form:** Includes input fields (`Input`) for Full Name, Email, and Password. A `RadioGroup` allows new users to select their role ('Client' or 'Provider'), which determines their dashboard view upon login.
    -   **Log In Form:** A simpler form with fields for Email and Password for returning users.

---

### 4.  **Dashboard (`/dashboard`)**
-   **File:** `src/app/dashboard/page.tsx`
-   **Purpose:** The main hub for logged-in users, displaying a different interface based on the user's role ('client' or 'provider').
-   **Provider View Components:**
    -   A comprehensive tabbed interface for managing their business.
    -   **Shop Management Tab:** Contains forms to edit their public profile (name, bio, specialty), manage portfolio images (including selecting featured images), set weekly availability, and manage the services they offer using the `ServiceManagementCard` component.
    -   **Booking Management Tab:** Displays current and past bookings in sortable tables (`Table`). Includes action buttons to approve, decline, or manage each booking.
    -   **Stats Tab:** Showcases key business analytics in `Card` components (Total Revenue, Bookings, New Clients, Average Rating) and a `MonthlyEarningsChart` for a visual representation of performance.
-   **Client View Components:**
    -   **Analytics Cards (`Card`):** Simple cards displaying "Your Stats" like Total Bookings and Average Spend.
    -   **Active Booking Card:** Highlights the client's next upcoming appointment, showing the provider, date, time, and booked services. Includes pagination if there are multiple active bookings.
    -   **Favorite Provider Card:** A detailed card showcasing the client's top provider, including their portfolio images, bio, and key stats.
    -   **My Lists Card:** A call-to-action card that directs the user to their saved provider lists (`/my-lists`).

---

### 5.  **Provider Detail Page (`/provider/[id]`)**
-   **File:** `src/app/provider/[id]/page.tsx`
-   **Purpose:** Displays the full, detailed public profile for a single service provider, acting as their main landing page within the app.
-   **Key Components:**
    -   **Provider Header:** Contains the provider's `Avatar`, name, location, overall star rating, and a collection of `Badge` components for their achievements.
    -   **Portfolio:** A grid of images showcasing the provider's work.
    -   **Tabbed Section:**
        -   **Verified Reviews:** A list of reviews left by other clients.
        -   **Chat:** A call-to-action to start a conversation with the provider.
        -   **Your History:** A table (`Table`) showing the current user's past bookings with this specific provider.
    -   **Services Accordion (`Accordion`):** A sticky-positioned card on the side of the page that lists all services offered by the provider. Each item can be expanded to show details and a "Book Now" button, which navigates to the booking page.

---

### 6.  **Book Appointment Page (`/book/[providerId]`)**
-   **File:** `src/app/book/[providerId]/page.tsx`
-   **Purpose:** A dedicated page for a client to select a date and time for a specific service with a specific provider, initiating the booking request process.
-   **Key Components:**
    -   **Details Card (`Card`):** Summarizes the selected service and provider details.
    -   **Calendar (`Calendar`):** A visual calendar for date selection. Past dates and booked-out dates are disabled.
    -   **Time Slot Selector (`Select`):** A dropdown menu that dynamically populates with available time slots for the selected date.
    -   **Request to Book Button (`Button`):** Submits the booking request and navigates the user to their "My Bookings" page.

---

### 7.  **Manage Booking Page (`/booking/manage/[bookingId]`)**
-   **File:** `src/app/booking/manage/[bookingId]/page.tsx`
-   **Purpose:** A multi-functional page for viewing and managing the details of a single booking. The available actions and information change dynamically based on the user's role and the current status of the booking.
-   **Provider View:**
    -   Displays a `ClientDetails` card with the client's booking history.
    -   Can add or remove services from the booking.
    -   Can change the date and time.
    -   Can approve, decline, or cancel the booking using prominent action buttons (`Button`).
-   **Client View:**
    -   Displays provider details.
    -   If the booking status is 'Review Order and Pay', a **Payment Form** is displayed to allow the client to enter credit card details and confirm the booking.
    -   Can cancel the booking request if it's still 'Pending'.

---

### 8.  **My Bookings Page (`/bookings`)**
-   **File:** `src/app/bookings/page.tsx`
-   **Purpose:** A dedicated page for clients to view and manage all of their appointments, both upcoming and past.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Separates bookings into "Upcoming" and "Past" lists.
    -   **Bookings Table (`Table`):** Lists bookings with columns for Provider, Service(s), Date, and Status.
    -   **Dynamic Action Buttons:** The button for each booking changes based on its status (e.g., "Make Payment", "Manage", "Leave a Review").
    -   **Review Dialog:** For completed bookings, a "Leave a Review" button opens a `Dialog` with a star rating system and a comment box for submitting feedback.

---

### 9.  **Messages Page (`/messages`)**
-   **File:** `src/app/messages/page.tsx`
-   **Purpose:** The in-app chat interface for direct, real-time communication between clients and providers.
-   **Key Components:**
    -   A two-column layout.
    -   **Left Column (Conversation List):** A scrollable list of all chat threads. Each item shows the other user's name, avatar, the last message sent, and a badge for the unread message count.
    -   **Right Column (Active Chat Window):** Displays the message history for the selected conversation. Messages are styled differently for the current user, the other party, and AI-generated messages. An `Input` form at the bottom allows for sending new messages.

---

### 10. **My Lists Page (`/my-lists`)**
-   **File:** `src/app/my-lists/page.tsx`
-   **Purpose:** A page for clients to organize and view providers they have saved for future consideration.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):**
        1.  **Explore Queue:** Shows providers saved from the swiping interface on the Discover page.
        2.  **My Favourites:** Shows providers that the user has explicitly marked as a "favourite" from their profile page.
    -   **Provider Grid:** Both tabs display a grid of `ProviderCard` components for easy browsing and access.

---

### 11. **Account Page (`/account`)**
-   **File:** `src/app/account/page.tsx`
-   **Purpose:** Allows both clients and providers to manage their personal account settings, separate from their public or shop profiles.
-   **Key Components:**
    -   A tabbed interface for "Profile", "Billing", and "Security".
    -   **Profile Tab:** Forms to change personal info like photo, full name, and email.
    -   **Billing Tab:** A section to manage saved payment methods (e.g., credit cards).
    -   **Security Tab:** A form to change the current password.

---

### 12. **Notifications Page (`/notifications`)**
-   **File:** `src/app/notifications/page.tsx`
-   **Purpose:** Displays a chronological, centralized list of all system-generated notifications for the user, such as booking confirmations, cancellations, or new messages.
-   **Key Components:**
    -   **Notification List:** A list of all notifications, each with a distinct icon representing its type (e.g., new booking, cancellation, message), a title, a description, and a timestamp.
    -   Unread notifications are visually highlighted.
    -   A "Mark all as read" button provides a way to clear all unread indicators.
    -   Notifications are clickable, linking the user to the relevant page (e.g., a booking notification links to the "Manage Booking" page).
