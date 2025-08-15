# Page Data Map

This document outlines the primary data structures and key data points used on each page of the application. It serves as a reference for understanding data flow from the source (`src/lib/data.ts`) to the UI components.

---

### `/` (Landing Page)
- **Data Used:** None. This is a static marketing page.

---

### `/discover` (Discover Page)
- **Primary Data Structures:** `Provider`, `ServiceCategory`, `Service`
- **Data Points:**
    - `getFeaturedProviders()`: Used for the main carousel.
    - `providers`: The entire list is used for the "Explore" stack.
        - `provider.name`, `provider.specialty`, `provider.bio`, `provider.rating`, `provider.reviewCount`, `provider.location`, `provider.badges`, `provider.portfolio`
    - `serviceCategories`, `services`: Used to populate the "Find a Service" advanced search filters.
    - `dublinDistricts`: Used for the location filter dropdown.
    - `getProvidersByPlaylist()`: Used to dynamically update the "Your Playlist" section based on category selection.

---

### `/provider/[id]` (Provider Detail Page)
- **Primary Data Structures:** `Provider`, `Booking`
- **Data Points:**
    - `getProviderById(id)`: Fetches the complete profile for the displayed provider.
        - All `Provider` fields are used here.
    - `getBookingHistoryForProvider(id)`: Fetches past bookings for the "Booking History" tab.
        - `booking.serviceIds`, `booking.date`, `booking.status`

---

### `/book/[providerId]` (Booking Request Page)
- **Primary Data Structures:** `Provider`, `Service`, `Booking`
- **Data Points:**
    - `getProviderById(providerId)`: To display provider info (`provider.name`, `provider.avatarUrl`).
    - `services`: To find the selected service (`service.name`, `service.price`, `service.duration`, `service.description`).
    - `getBookedTimes(providerId, date)`: To determine available time slots in the calendar.
    - `addBooking()`: The function called to create a new booking record.
        - `booking.providerId`, `booking.serviceIds`, `booking.date`

---

### `/booking/manage/[bookingId]` (Manage Booking Page)
- **Primary Data Structures:** `Booking`, `Service`, `Provider`
- **Data Points:**
    - `getBookingById(bookingId)`: Fetches all details for the specific booking. This is the core data source.
        - All `Booking` fields are used.
    - `getServicesByIds()`: To display details of the services included in the booking.
    - `getClientHistoryByName()`: *(Provider View)* Fetches stats about the client associated with the booking.
    - `updateBooking()`: Function called when changes are saved.
    - `updateBookingStatus()`: Function called for approvals, cancellations, etc.

---

### `/bookings` (My Bookings Page - Client View)
- **Primary Data Structures:** `Booking`
- **Data Points:**
    - `getBookings()`: Fetches all bookings for the current client, separated into `upcoming` and `past`.
        - `booking.id`, `booking.providerName`, `booking.serviceIds`, `booking.date`, `booking.status`
    - `getServicesByIds()`: To display service names.

---

### `/dashboard` (Dashboard Page - Client/Provider View)
- **Primary Data Structures:** `Booking`, `Provider`, `Service`
- **Client View:**
    - `getClientDashboardData()`: A comprehensive function that fetches:
        - `totalBookings`, `averageSpend`
        - `previousBookings`: A list of past bookings.
        - `favoriteProvider`: The complete `Provider` object for the user's favorite.
        - `activeBooking`: The next upcoming `Booking` with its associated `Service` details.
- **Provider View:**
    - `getProviderBookings(providerId)`: Fetches all bookings associated with the provider.
        - `booking.clientName`, `booking.serviceIds`, `booking.date`, `booking.status`
    - `providerServices`: The list of services the provider currently offers.
    - The provider's own `Provider` profile data for editing (name, bio, portfolio, etc.).

---

### `/messages` (Messages Page)
- **Primary Data Structures:** `Conversation`, `Message`
- **Data Points:**
    - `getConversations()` / `getProviderConversations()`: Fetches the list of all chat threads for the user.
        - All `Conversation` fields are used.
    - `getMessagesForConversation()` / `getProviderMessagesForConversation()`: Fetches the message history for the active chat.
        - All `Message` fields are used.
    - `addMessage()`: Function to send a new message.

---

### `/notifications` (Notifications Page)
- **Primary Data Structures:** `Notification`
- **Data Points:**
    - `getNotifications(role)`: Fetches all relevant notifications for the user's role.
        - All `Notification` fields are used.

---

### `/my-lists` (My Lists Page - Client View)
- **Primary Data Structures:** `Provider`
- **Data Points:**
    - `getExploreQueueProviders()`: Fetches providers the user has saved from the "Explore" stack.
    - `getFavouriteProviders()`: Fetches providers the user has explicitly marked as a favorite.

---

### `/account` (Account Page)
- **Data Used:** None. This page currently uses static placeholder data.

---

### `/signup` (Sign Up Page)
- **Primary Data Structures:** `UserRole`
- **Data Points:**
    - This page collects user input (name, email, password, role) and sends it to the `signUp` function in `src/lib/auth.ts`.
