# Backlog

This document contains a list of features, improvements, and ideas for future development.

## Features

- [x] Sign up flow
- [x] Client Dashboard
- [x] Functional review system
- [ ] Featured page
- [ ] Legal and FAQs page
- [ ] Provider stats and analytics page

## Improvements

- [ ] Link reviews to completed bookings so only clients who have finished an appointment can leave a review.
- [ ] Add more sophisticated availability management for providers.
- [ ] Implement real-time chat with Firebase.
- [ ] Add profile picture uploads.

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
