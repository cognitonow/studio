# Backlog

This document contains a list of features, improvements, and ideas for future development.

## Firebase & Cloud Backend Setup

This section outlines the essential, one-time setup steps required in the Google Cloud and Firebase consoles to enable the live backend for this application.

1.  **Upgrade to Blaze Plan:** Your Firebase project must be on the **Blaze (Pay-as-you-go)** plan to use services like Cloud SQL and Secret Manager.
2.  **Enable Google Cloud APIs:** In your project's Google Cloud Console, ensure the following APIs are enabled:
    *   Cloud SQL Admin API
    *   Vertex AI API
    *   Secret Manager API
    *   Firebase Data Connect API
3.  **Create Cloud SQL Instance:** Create a **PostgreSQL** instance in Cloud SQL with the exact Instance ID: `studio-fdc`.
4.  **Store GenAI API Key:**
    *   Get an API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   In the Google Cloud Console, go to **Secret Manager** and create a new secret named `GOOGLE_GENAI_API_KEY` with the key as its value.
5.  **Deploy Backend:** Run `firebase deploy` from your terminal to deploy your database schema and Cloud Functions.
6.  **(Optional) Seed Your Database:** To test the live connection, you need data in your database.
    *   First, ensure you have the `gcloud` CLI installed and authenticated (`gcloud auth login`).
    *   Connect to your Cloud SQL instance using the following command, which will open a `psql` prompt:
        ```bash
        gcloud beta sql connect studio-fdc --user=postgres --database=postgres
        ```
    *   Once connected, run the seed script with the following command inside the `psql` prompt:
        ```psql
        \i dataconnect/seed.sql
        ```
    *   This will populate your `Service` and `ServiceCategory` tables. You can then visit the `/services` page in your app to see the live data.

## High Priority: Phase 2 - Full Backend Migration

This section outlines the critical path to migrate the application from the current mock data (`src/lib/data.ts`) to a production-ready backend using Firebase Data Connect and a PostgreSQL database.

1.  **Migrate Read Operations (Queries):** Convert all functions that fetch data to use Data Connect `queries`. This is the foundation of the migration.
    *   `getProviders`, `getProviderById`, `getFeaturedProviders`, `getFavouriteProviders`, `getExploreQueueProviders`.
    *   `getAllServices`, `getServicesByIds`, `getServiceCategories`.
    *   `getBookings`, `getBookingById`, `getBookingHistoryForProvider`, `getActiveBookings`, `getClientHistoryByName`.
    *   `getReviews`.
    *   `getConversations`, `getMessagesForConversation`, `getProviderConversations`, `getProviderMessagesForConversation`.
    *   `getNotifications`, `getUnreadMessageCount`.

2.  **Migrate Write Operations (Mutations):** Convert all functions that create or update data to use Data Connect `mutations`. This is the most critical part, as it involves changing the state of your application.
    *   `addBooking`: Replace pushing to the `bookings` array with an `insertBooking` mutation.
    *   `updateBooking` & `updateBookingStatus`: Replace finding and modifying array elements with an `updateBooking` mutation.
    *   `addReview`: Replace pushing to the `reviews` array with an `insertReview` mutation and update the related provider's rating.
    *   `addMessage`: Replace pushing to the `messages` array with an `insertMessage` mutation.
    *   `saveProviderServices`: Replace modifying a provider's services list with an `updateProviderServices` mutation.
    *   `markNotificationAsRead`, `markAllNotificationsAsRead`, `markAllMessagesAsRead`.
    *   `startConversationWithProvider`.

3.  **Refactor Asynchronous UI Components:** Update all pages and components that consume the newly migrated data functions to properly handle asynchronous operations (e.g., using `async/await`, managing loading states, and handling potential errors). This will impact nearly every page in the application.

4.  **Full System Test:** Once the migration is complete, conduct a thorough test of all user flows (booking, messaging, reviewing, etc.) to ensure the application behaves as expected with the live database.

5.  **Incremental Testing and Verification (New Step):** After each significant migration step (e.g., migrating `getProviders`), create or update a specific test page or component to visually confirm that the new query or mutation is working correctly with the live database. This ensures issues are caught early and validates progress.


## Features

- [x] Sign up flow
- [x] Client Dashboard
- [x] Provider Dashboard
- [x] Functional review system
- [ ] Featured page
- [ ] Legal and FAQs page
- [ ] Provider stats and analytics page

## Improvements

- [ ] Link reviews to completed bookings so only clients who have finished an appointment can leave a review.
- [ ] Add more sophisticated availability management for providers.
- [ ] Implement real-time chat with Firebase.
- [ ] Add profile picture uploads.
- [x] SEO

### SEO & Accessibility Audit Checklist
- [x] **Complete OpenGraph Metadata:** Added comprehensive OG and Twitter card tags to the main layout for rich social media previews.
- [x] **Add Alt Text for Images:** Ensured all images have descriptive alt text for accessibility and image SEO.
- [x] **Fix Typography Hierarchy:** Verified that heading tags (H1, H2, etc.) are used logically and consistently across all pages.
- [x] **Update Placeholders & Content:** Removed default favicons and implemented a dynamic copyright year in the footer.
- [x] **Optimize Mobile Experience:** Added the viewport meta tag to ensure proper scaling on all mobile devices.
- [x] **Improve Performance:** Verified that all images are served using the `next/image` component to optimize loading times.
- [x] **Implement SEO Fundamentals:** Added meta descriptions and keywords to the main layout to improve search engine ranking.

## Architecture & Refactoring

### Full Backend & Database Migration Plan

This section outlines the analysis and steps required to migrate the application from the current mock data (`src/lib/data.ts`) to a production-ready backend using Firebase Data Connect and a PostgreSQL database.

#### Phase 1: Defining the Database Schema (Low-to-Medium Effort)

This phase involves creating the structure for your PostgreSQL database. You will define your tables and their relationships in the `dataconnect/schema/` directory.

- **Create Table Schemas**: For each core data type in `src/lib/types.ts` (`User`, `Provider`, `Service`, `Booking`, etc.), create a corresponding `.gql` file.
- **Define Columns & Types**: Map TypeScript types to SQL types (e.g., `string` -> `String`, `number` -> `Int`).
- **Establish Relationships**: Define foreign key relationships between tables (e.g., a `Booking` links to a `Provider` and a `User`).

#### Phase 2: Rewriting Data Access Functions (High Effort)

This is the most time-consuming phase, involving a rewrite of `src/lib/data.ts` to replace mock data functions with real database calls.

- **Remove Mock Data**: All hardcoded arrays (`providers`, `bookings`, `reviews`, etc.) will be deleted.
- **Implement Queries (Reading Data)**:
  - For every function that *retrieves* data (e.g., `getProviders`, `getBookingById`), define a **query** in the relevant `.gql` file.
  - Update the function in `data.ts` to call this query using the Data Connect SDK.
  - **Example**: `getProviderById(id)` will change from `providers.find(p => p.id === id)` to a Data Connect query like `Provider.get({ id: id })`.
- **Implement Mutations (Writing Data)**:
  - For every function that *changes* data (e.g., `addBooking`, `updateBookingStatus`), define a **mutation** in the relevant `.gql` file.
  - Update the function in `data.ts` to call this mutation.
  - **Example**: `addBooking(bookingData)` will change from `bookings.unshift(newBooking)` to calling an `insertBooking` mutation with the booking data.
- **Refactor AI Flows**: The AI-generated messages will need to be adapted to work with the data returned from your real database, but the core logic of calling the flows will remain the same.

This migration centralizes backend changes to the data layer, minimizing impact on UI components and providing a clear path to a production-ready application.


## Future Backend Features (Cloud Functions)

This section outlines common and powerful Cloud Functions that could be used to build a robust backend for the marketplace.

### 🛍️ Product & Listing Management
- **onProductCreate/onProductUpdate**: A Firestore trigger that runs whenever a seller adds or updates a product.
  - Create a searchable index of your products in a service like Algolia or Typesense.
  - Check the product description and images for inappropriate content using the Cloud Vision API.
- **onProductDelete**: A Firestore trigger that cleans up related data when a product is deleted.
  - Remove it from the search index.
  - Delete its associated images from Cloud Storage.

### 💳 Orders & Payments
- **createStripeCheckoutSession**: A callable function that securely communicates with a payment processor like Stripe to create a payment session.
- **stripeWebhook**: An HTTP trigger that listens for events from Stripe (e.g., successful payment) to:
  - Update the order status in Firestore.
  - Decrement the product's stock quantity.
  - Send confirmation emails to the buyer and seller.

### 👤 User & Seller Management
- **onUserCreate**: An Authentication trigger that runs when a new user signs up to:
  - Create a corresponding user profile document in Firestore.
  - Set a default user role (e.g., `role: 'buyer'`).
  - Send a welcome email.
- **requestSellerUpgrade**: A callable function that allows a user to request to become a seller, potentially triggering an admin approval workflow.

### ⭐ Reviews & Ratings
- **onReviewCreate**: A Firestore trigger that runs when a new review is submitted.
  - It can automatically calculate the new average rating for the product and update the product's document in the database, preventing the need for expensive client-side calculations.

### ⚙️ Maintenance & Moderation
- **dailyCleanup**: A scheduled function that runs automatically to perform routine tasks like:
  - Deleting abandoned shopping carts.
  - Calculating and processing seller payouts.
  - Generating daily sales reports.
