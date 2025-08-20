# Application Guide

This document provides a comprehensive overview of the Beauty Book application, detailing its page structure, user roles, core principles, and AI-driven workflows. 

---

## Page Summary

This section provides a detailed overview of each page in the Beauty Book application, detailing its purpose, key UI components, and user interactions. It has been updated to reflect the different views and functionalities available to the three main user roles: **Guest**, **Client**, and **Provider**.

---

### 1.  **Landing Page (`/`)**
-   **File:** `src/app/page.tsx`
-   **Purpose:** Serves as the primary marketing and entry point for new or logged-out users. It's designed to introduce the app's value proposition and drive user engagement towards discovery and booking.
-   **Key Components:**
    -   **Hero Section:** A full-width section containing the main headline, a short descriptive paragraph, a prominent "Book Now" button, and a large, an aspirational hero image.
    -   **Testimonials Section (`@/components/testimonials.tsx`):** A carousel displaying social proof through client reviews. Each testimonial is presented in a `Card` that includes the reviewer's comment, name, and avatar.
-   **Data Functions:** None. This is a static marketing page.
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
    -   **Explore Stack (`ExploreProviderCard`):** A swipeable card interface for browsing providers. Each card is a large, detailed profile summary showing a multi-image header, provider name, specialty, bio, rating, location, and badges. It includes action buttons for "Save," "View Profile," and "Chat."
    -   **Featured Carousel (`Carousel`):** A horizontally scrolling list of curated `ProviderCard` components. The `ProviderCard` is a compact summary showing the provider's main image, name, specialty, and rating, designed for quick browsing in grids and carousels.
    -   **Advanced Search:** Includes a circular category menu and dropdowns for specific services and locations.
-   **Data Functions:**
    -   `getFeaturedProviders()`: Used for the main carousel.
    -   `providers`: The entire list is used for the "Explore" stack.
    -   `serviceCategories`, `services`: Used to populate the "Find a Service" advanced search filters.
    -   `dublinDistricts`: Used for the location filter dropdown.
    -   `getProvidersByPlaylist()`: Used to dynamically update the "Your Playlist" section based on category selection.
-   **Role-Based Views:**
    -   **Guest:** Can view all providers and services. Actions like "Save to List," "View Profile," or "Start Chat" will trigger a login/signup dialog (`AuthDialog`).
    -   **Client:** Has full access. All actions are enabled, allowing them to save providers, start chats, and navigate to booking pages.
    -   **Provider:** While providers can view this page, it is not tailored for them. Their experience is the same as a guest's.

---

### 3.  **Authentication Page (`/auth`)**
-   **File:** `src/app/auth/page.tsx`
-   **Purpose:** A single, unified page for handling both user sign-up and login.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Switches between "Sign Up" and "Log In" forms, which are contained within a parent `Card` component for styling.
    -   **Sign Up Form:** Inputs for name, email, password, and a `RadioGroup` to select 'Client' or 'Provider' role.
    -   **Log In Form:** Inputs for email and password.
-   **Data Functions:**
    -   This page collects user input (name, email, password, role) and sends it to the `signUp` or `signIn` function in `src/lib/auth.ts`.
-   **Role-Based Views:**
    -   **Guest:** This is the primary user for this page.
    -   **Client / Provider:** Logged-in users will not see this page. They are redirected to their dashboard if they attempt to access it.

---

### 4.  **Dashboard (`/dashboard`)**
-   **File:** `src/app/dashboard/page.tsx`
-   **Purpose:** The main hub for logged-in users, displaying a completely different interface based on the user's role.
-   **Data Functions (Client):**
    - `getClientDashboardData()`: A comprehensive function that fetches:
        - `totalBookings`, `averageSpend`
        - `previousBookings`: A list of past bookings.
        - `favoriteProvider`: The complete `Provider` object for the user's favorite.
        - `activeBooking`: The next upcoming `Booking` with its associated `Service` details.
-   **Data Functions (Provider):**
    - `getProviderBookings(providerId)`: Fetches all bookings associated with the provider.
    - `providerServices`: The list of services the provider currently offers.
    - The provider's own `Provider` profile data for editing (name, bio, portfolio, etc.).
-   **Role-Based Views:**
    -   **Guest:** Cannot access this page. They are redirected to the `/auth` page.
    -   **Provider View:** A comprehensive business management center with a tabbed interface.
        -   **Shop Management Tab:** Contains multiple cards for business settings. The **Shop Profile Card** has form inputs to edit the public profile. The **Portfolio Card** allows for uploading and managing images. The **Availability Card** sets working hours. The **Service Management Card** allows a provider to add, edit, and remove the services they offer using a table and an "Add Service" dialog.
        -   **Booking Management Tab:** Displays current and past bookings in sortable tables (`Table`) within a `Card`. Includes action buttons to approve, decline, or manage each booking.
        -   **Stats Tab:** Showcases key business analytics. Four top-level `Card` components display headline stats (Total Revenue, Bookings, New Clients, Avg. Rating), and a larger `Card` contains the `MonthlyEarningsChart`.
    -   **Client View:** A personalized summary of the client's activity.
        -   **Your Stats Card (`Card`):** A single card displaying the client's key stats: total bookings and average spend, along with their recent booking history in a small table.
        -   **Active Booking Card:** A prominent `Card` that highlights the client's next upcoming appointment. It shows the provider name, date, time, status, services booked, and total cost, with a primary button to "Manage Booking." If there are multiple active bookings, it allows the user to cycle through them.
        -   **Favorite Provider Card:** A detailed `Card` showcasing the client's top provider. It features a multi-image header, the provider's name, specialty, rating, location, bio, and top badges, with a button to view their full profile.
        -   **My Lists Card:** A call-to-action `Card` that directs the user to the `/my-lists` page to view their saved providers.

---

### 5.  **Provider Detail Page (`/provider/[id]`)**
-   **File:** `src/app/provider/[id]/page.tsx`
-   **Purpose:** Displays the full, detailed public profile for a single service provider.
-   **Key Components:**
    -   **Provider Header:** `Avatar`, name, location, rating, and `Badge` components.
    -   **Portfolio:** An image grid of the provider's work.
    -   **Tabbed Section:** Contains `Card`s for each tab. The **Verified Reviews Card** lists individual reviews, each with an avatar, author, rating, and comment. The **Chat Card** provides a button to initiate a conversation. The **Your History Card** shows a table of past bookings with this provider.
    -   **Services Accordion (`Accordion`):** A sticky-positioned `Card` containing a list of all services offered by the provider. Each service can be expanded to show details and a "Book Now" button.
-   **Data Functions:**
    -   `getProviderById(id)`: Fetches the complete profile for the displayed provider.
    -   `getBookingHistoryForProvider(id)`: Fetches past bookings for the "Booking History" tab.
-   **Role-Based Views:**
    -   **Guest:** Can view all public information (profile, portfolio, services, reviews). Actions like "Book Now," "Chat," or "Save to Favourites" will trigger the `AuthDialog`.
    -   **Client:** Has full access. All action buttons are enabled. The "Your History" tab will be populated with their specific past bookings with this provider.
    -   **Provider:** Can view their own profile as a guest or client would see it. There are no special editing controls on this page; those are on the dashboard.

---

### 6.  **Book Appointment Page (`/book/[providerId]`)**
-   **File:** `src/app/book/[providerId]/page.tsx`
-   **Purpose:** A dedicated page for a client to select a date and time for a specific service.
-   **Key Components:**
    -   **Details Card (`Card`):** Summarizes the selected service and provider. It displays the service name, provider name (with avatar), price, and duration.
    -   **Calendar Card (`Card`):** Contains the main `Calendar` component for date selection and a `Select` dropdown for choosing an available time slot.
    -   **Request to Book Button (`Button`):** Submits the booking request.
-   **Data Functions:**
    - `getProviderById(providerId)`: To display provider info.
    - `services`: To find the selected service details.
    - `getBookedTimes(providerId, date)`: To determine available time slots in the calendar.
    - `addBooking()`: The function called to create a new booking record.
-   **Role-Based Views:**
    -   **Guest:** Cannot access this page directly. They are funneled through the `AuthDialog` from a provider's profile before landing here.
    -   **Client:** This page is designed for clients. All functionality is available.
    -   **Provider:** Cannot access this page. It is exclusively for booking appointments *with* them, not *by* them.

---

### 7.  **Manage Booking Page (`/booking/manage/[bookingId]`)**
-   **File:** `src/app/booking/manage/[bookingId]/page.tsx`
-   **Purpose:** A multi-functional page for viewing and managing a single booking, with actions and information changing based on role and booking status.
-   **Key Components & Cards:**
    -   **Client Details Card (Provider View):** A `Card` that shows a snapshot of the client's history, including total bookings, average spend, and recent appointments.
    -   **Provider Details Card (Client View):** A simple `Card` showing the provider's name and avatar with a link to their profile.
    -   **Booked Services Card:** A `Card` that lists all services included in the appointment. The provider can add or remove services. It also displays the total cost and duration.
    -   **Amend Date & Time Card:** A `Card` containing the `Calendar` and time `Select` components, allowing the provider to modify the appointment time.
    -   **Payment Form Card (Client View):** When a booking is in the 'Review Order and Pay' status, a `Card` containing a payment form is displayed for the client to enter their credit card details.
-   **Data Functions:**
    - `getBookingById(bookingId)`: Fetches all details for the specific booking.
    - `getServicesByIds()`: To display details of the services included in the booking.
    - `getClientHistoryByName()`: *(Provider View)* Fetches stats about the client associated with the booking.
    - `updateBooking()`: Function called when changes are saved.
    - `updateBookingStatus()`: Function called for approvals, cancellations, etc.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Provider View:**
        -   Can view the `ClientDetails` card.
        -   Can modify the `Booked Services` and `Amend Date & Time` cards.
        -   Can approve, decline, or cancel the booking using action buttons (`Button`).
    -   **Client View:**
        -   Can view the `Provider Details` card.
        -   If booking status is 'Review Order and Pay', the **Payment Form Card** is displayed.
        -   Can cancel a booking request if it's still 'Pending'.

---

### 8.  **My Bookings Page (`/bookings`)**
-   **File:** `src/app/bookings/page.tsx`
-   **Purpose:** A dedicated page for clients to view and manage all of their appointments.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Separates "Upcoming" and "Past" bookings, each within its own `Card`.
    -   **Bookings Table (`Table`):** Lists bookings with details (provider, services, date, status).
    -   **Dynamic Action Buttons:** Buttons change based on booking status (e.g., "Make Payment," "Manage," "Leave a Review").
-   **Data Functions:**
    - `getBookings()`: Fetches all bookings for the current client, separated into `upcoming` and `past`.
    - `getServicesByIds()`: To display service names.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** This page is exclusively for clients.
    -   **Provider:** Cannot access. Their booking management is on their dashboard.

---

### 9.  **Messages Page (`/messages`)**
-   **File:** `src/app/messages/page.tsx`
-   **Purpose:** The in-app chat interface for direct communication.
-   **Key Components:**
    -   A two-column layout where each column is a `Card`.
    -   **Conversations List Card:** The left card displays a scrollable list of all active conversations.
    -   **Active Chat Card:** The right card displays the full message history for the selected conversation and an input field to send a new message.
    -   Messages are styled differently based on the sender (`UserMessage`, `ProviderMessage`, `AiMessage`).
-   **Data Functions:**
    - `getConversations()` / `getProviderConversations()`: Fetches the list of all chat threads for the user.
    - `getMessagesForConversation()` / `getProviderMessagesForConversation()`: Fetches the message history for the active chat.
    - `addMessage()`: Function to send a new message.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** Sees a list of their conversations with providers. They are the 'user' sender.
    -   **Provider:** Sees a list of their conversations with clients. They are the 'provider' sender.

---

### 10. **My Lists Page (`/my-lists`)**
-   **File:** `src/app/my-lists/page.tsx`
-   **Purpose:** A page for clients to organize and view saved providers.
-   **Key Components:**
    -   **Tabbed Interface (`Tabs`):** Separates "Explore Queue" and "My Favourites," each within its own `Card`.
    -   **Provider Grid:** Both tabs display a grid of `ProviderCard` components.
-   **Data Functions:**
    - `getExploreQueueProviders()`: Fetches providers the user has saved from the "Explore" stack.
    - `getFavouriteProviders()`: Fetches providers the user has explicitly marked as a favorite.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** This page is exclusively for clients.
    -   **Provider:** Cannot access.

---

### 11. **Account Page (`/account`)**
-   **File:** `src/app/account/page.tsx`
-   **Purpose:** Allows logged-in users to manage their personal account settings.
-   **Key Components:**
    -   A tabbed interface where each tab's content is wrapped in a `Card`.
    -   **Profile Settings Card:** Contains form inputs for changing name, email, and bio.
    -   **Billing Information Card:** Shows saved payment methods and a button to add a new one.
    -   **Security Card:** Contains form inputs for changing the user's password.
-   **Data Functions:** None. This page currently uses static placeholder data.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client / Provider:** Both roles have access to this page to manage their own account settings. The functionality is identical for both.

---

### 12. **Notifications Page (`/notifications`)**
-   **File:** `src/app/notifications/page.tsx`
-   **Purpose:** Displays a centralized list of all system-generated notifications.
-   **Key Components:**
    -   A single `Card` that contains a list of all notifications, each with a distinct icon, title, description, and timestamp.
-   **Data Functions:**
    - `getNotifications(role)`: Fetches all relevant notifications for the user's role.
-   **Role-Based Views:**
    -   **Guest:** Cannot access. Redirected to `/auth`.
    -   **Client:** Sees notifications relevant to their bookings and messages (e.g., "Booking Approved," "New Message from Provider").
    -   **Provider:** Sees notifications relevant to their business (e.g., "New Booking Request," "Client Cancelled," "New Review Received").

---
---

## References & Best Practices

This section outlines the key coding patterns, architectural decisions, and debugging best practices we have established for this project. Following these guidelines will help ensure our code remains clean, consistent, and functional.

## 1. Core Principle: Full-Circle Communication

Whenever an action is performed by one user that affects another (e.g., booking, cancellation, update), the system must notify **all** relevant parties.

- **Dual Notification System:** For every key event, we must trigger:
    1.  A **Push Notification** (`addNotification`) for immediate, high-visibility alerts.
    2.  An **AI-Generated Message** (`sendAutomatedMessage`) to provide context directly within the relevant chat conversation.

- **Centralized Triggers:** All notifications and AI messages should be triggered from within the core data-updating functions in `src/lib/data.ts` (e.g., `updateBookingStatus`, `addBooking`, `updateBooking`). This creates a single source of truth and prevents logic from being scattered across UI components.

## 2. AI Integration & Notification Workflows

### 2.1. System Notification Triggers

All push notifications are triggered from within `src/lib/data.ts` using the `addNotification` function.

| Event/Trigger | File & Function | Recipient(s) | Notification Title & Description |
| :--- | :--- | :--- | :--- |
| **New Booking Request** | `addBooking` | Provider & Client | **Provider:** "New Booking Request!" / **Client:** "Booking Request Sent!" |
| **Booking Approved** | `updateBookingStatus` | Provider & Client | **Provider:** "Booking Approved!" / **Client:** "Action Required - Review & Pay" |
| **Booking Confirmed** | `updateBookingStatus` | Provider & Client | **Provider:** "Payment Received!" / **Client:** "Booking Confirmed!" |
| **Booking Completed** | `updateBookingStatus` | Provider & Client | **Provider:** "Booking Completed!" / **Client:** "Service Complete!" |
| **Booking Updated** | `updateBooking` | Provider & Client | **Provider:** "Booking Updated Successfully" / **Client:** "Your Booking Was Updated" |
| **Booking Cancelled** | `updateBookingStatus` | Provider & Client | Both parties receive a tailored "Booking Cancelled" notification based on who initiated the action. |
| **New Review Submitted**| `addReview` | Provider & Client | **Provider:** "You have a new review!" / **Client:** "Review Submitted" |
| **New Message Sent** | `addMessage` | Recipient | "New Message from [Sender Name]" |

### 2.2. Dedicated AI Flows

- Each distinct AI task (e.g., drafting a cancellation message, suggesting a badge) must be encapsulated in its own dedicated flow file within `src/ai/flows/`.
- **Flow Naming Convention:** Use the pattern `draft-[action-name].ts` for message drafting flows (e.g., `draft-booking-cancellation.ts`).
- **Clear Inputs/Outputs:** Every flow must have clearly defined input and output schemas using Zod. This ensures type safety and makes the AI's task unambiguous.
- **Provider/Client Context:** For flows that generate messages, the prompt must be aware of the recipient (`provider` or `client`) to tailor the message content and tone appropriately.

### 2.3. Automated AI Message Triggers

All automated AI messages are triggered from within `src/lib/data.ts`.

| Event/Trigger | File & Function | AI Flow Used | Description |
| :--- | :--- | :--- | :--- |
| **New Booking Request** | `addBooking` | `draftNewBookingRequest` | When a **client** submits a new booking request, an AI message is sent to the **provider** informing them of the request. |
| **Booking Approved** | `updateBookingStatus` | `draftBookingApproval` | When a **provider** approves a 'Pending' booking, an AI message is sent to the **client** asking them to review and pay. A confirmation is also sent to the **provider**. |
| **Booking Confirmed** | `updateBookingStatus` | `draftBookingConfirmation` | After a **client** completes payment, a confirmation message is sent to them, and a notification message is sent to the **provider**. |
| **Booking Completed** | `updateBookingStatus` | `draftPostBookingMessage` | When a **provider** marks a booking as 'Completed', a follow-up thank you message is sent to the **client**, and a confirmation is sent to the **provider**. |
| **Booking Updated** | `updateBooking` | `draftBookingUpdate` | When a **provider** changes the date or services of a booking, separate, tailored AI messages are sent to **both** the client and the provider detailing the changes. |
| **Booking Cancelled** | `updateBookingStatus` | `draftBookingCancellation` | When a booking is cancelled by **either** the client or the provider, an AI message is sent to the other party informing them of the cancellation. The message content changes based on who initiated the cancellation. |


## 3. State Management & Data Flow

- **Single Source of Truth:** `src/lib/data.ts` acts as our mock database and is the single source of truth for all application data. All data mutations must go through the functions exposed by this file.
- **Client-Side Actions:** UI components should call functions from `data.ts` to mutate state. They should not modify state directly.
- **Keeping Data Fresh:** To ensure data consistency across browser tabs, components that display dynamic data (like booking lists or dashboards) should use a `useEffect` hook to re-fetch data when the window gains focus.
    ```javascript
    useEffect(() => {
        const fetchData = () => { /* ... fetch data ... */ };
        fetchData();
        window.addEventListener('focus', fetchData);
        return () => window.removeEventListener('focus', fetchData);
    }, []);
    ```

## 4. Component-Driven UI & Logic

- **Role-Specific Rendering:** Components should use the `useUserRole` hook to conditionally render UI elements and enable/disable actions based on whether the user is a `client` or a `provider`.
- **Isolate Complex UI:** Complex, stateful UI sections (like `ServiceManagementCard` or `BadgeProgress`) should be encapsulated in their own components to keep the main page files clean and focused.
- **Dialogs for Confirmation:** For destructive actions (like cancellations) or complex inputs (like adding/editing services), use a dialog (`AlertDialog`, `Dialog`) to confirm user intent and provide a focused interface.

## 5. Debugging Checklist

When a feature is not working as expected, follow this checklist:
1.  **Consult This Document:** Does the feature violate one of the principles outlined here? (e.g., Is a notification being triggered from the UI instead of `data.ts`?)
2.  **Check the UI Trigger:** Is the button's `onClick` handler being called correctly? Use `console.log` to verify.
3.  **Trace the Data Function:** Does the UI handler call the correct function in `src/lib/data.ts`? Are the correct parameters being passed?
4.  **Inspect the Data Mutation:** Inside the `data.ts` function, verify that the application state (e.g., the `bookings` array) is being updated as expected.
5.  **Verify Notification/Message Triggers:** Confirm that `addNotification` and `sendAutomatedMessage` are being called from within the data mutation function. Check the AI Message Triggers table above.
6.  **Check AI Flow Registration:** Ensure the relevant AI flow is registered in `src/ai/dev.ts`.
7.  **Verify Component Re-rendering:** Make sure the component displaying the data is re-rendering after the data changes (see State Management section above).
8.  **Check Conditional Rendering Logic:** Review the logic that shows/hides UI elements. Is the `useUserRole` hook being used correctly? Is the logic checking the correct booking `status`?
