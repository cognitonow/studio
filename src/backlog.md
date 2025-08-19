# Backlog

This document contains a list of features, improvements, and ideas for future development.

## Your Backend Setup Checklist

This section outlines the final, essential setup steps required in the Google Cloud and Firebase consoles to enable the live backend for your application. You have already completed the first step by creating your new database.

### ✅ Step 1: Create Cloud SQL Instance (Completed)
- You have successfully created your new PostgreSQL instance with the ID **`beautybook-db`** in the **`europe-west1`** region.

---

### Step 2: Set Database Password & Store as a Secret
You need to set a password for your database user and securely store it where your Cloud Functions can access it.

1.  **Go to Cloud SQL:** In the Google Cloud Console, navigate to **Databases > SQL** and click on your `beautybook-db` instance.
2.  **Set Password:** Go to the **Users** tab, click the three-dot menu (⋮) next to the `postgres` user, and select **Change password**. Set a strong password and save it temporarily.
3.  **Go to Secret Manager:** In the Google Cloud Console, navigate to **Security > Secret Manager**.
4.  **Create Secret:**
    *   Click **CREATE SECRET**.
    *   For the **Name**, enter `DB_PASSWORD`.
    *   In the **Secret value** field, paste the password you just created.
    *   Leave the other settings as default and click **CREATE SECRET**.

---

### Step 3: Store Your GenAI API Key
Your application uses AI features. This step stores the necessary API key securely.

1.  **Get API Key:** If you haven't already, get a GenAI API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Create Secret:** Go back to **Secret Manager** in the Google Cloud Console.
3.  **Create Secret:**
    *   Click **CREATE SECRET**.
    *   For the **Name**, enter `GOOGLE_GENAI_API_KEY`.
    *   In the **Secret value** field, paste your key from the Google AI Studio.
    *   Click **CREATE SECRET**.

---

### Step 4: Grant Permissions to Functions
Your Cloud Functions need permission to access the secrets you just created and to manage other Firebase services.

1.  **Go to IAM:** In the Google Cloud Console, navigate to **IAM & Admin > IAM**.
2.  **Find Service Account:** Find the principal (the user/account) that ends with `@appspot.gserviceaccount.com`. This is the default service account for your Cloud Functions.
3.  **Grant Roles:** Click the pencil icon (Edit principal) for that account, click **ADD ANOTHER ROLE**, and add the following roles:
    *   **`Secret Manager Secret Accessor`**: Allows functions to read the database password and API keys you created.
    *   **`Firebase Authentication Admin`**: Allows the `listUsers` function to access Firebase Authentication user data.
4.  **Save** the changes.

---

### Step 5: Deploy Your Backend
Now that your database is ready and your secrets are in place, deploy your application.

1.  **Open a terminal** in your project's root directory.
2.  Run the command: `firebase deploy`

This will deploy your database schema, your functions with the correct permissions, and your web application. Your live backend is now fully configured and operational.

---

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
- **stripeWebhook**: An HTTP trigger that. listens for events from Stripe (e.g., successful payment) to:
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
