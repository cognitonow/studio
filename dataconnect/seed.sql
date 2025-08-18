
-- To connect to the database and run this file:
-- 1. Ensure you have the gcloud CLI installed and authenticated.
-- 2. Run the following command in your terminal:
--    gcloud sql connect studio-fdc --user=postgres --database=postgres
-- 3. In the psql prompt that opens, run: \i dataconnect/seed.sql

-- Clear existing data to prevent errors on re-seeding
DELETE FROM "Service";
DELETE FROM "ServiceCategory";
DELETE FROM "ServiceProvider";
DELETE FROM "User";


-- Insert Service Categories
INSERT INTO "ServiceCategory" (id, name) VALUES
('hair', 'Hair'),
('facials', 'Facials'),
('nails', 'Nails'),
('brows-lashes', 'Brows & Lashes'),
('hair-removal', 'Hair Removal'),
('body', 'Body'),
('makeup', 'Makeup'),
('medi-spa', 'Aesthetic / Medi-Spa'),
('custom', 'Custom');

-- Insert Services
INSERT INTO "Service" (id, "categoryId", name, description, price, duration) VALUES
('hair-1', 'hair', 'Haircut', 'Professional haircut service.', 50, 45),
('hair-22', 'hair', 'Colour, Highlights, Balayage', 'Hair coloring services.', 180, 180),
('facials-1', 'facials', 'Classic Facial', 'A relaxing and cleansing facial.', 80, 60),
('nails-1', 'nails', 'Manicure', 'Classic manicure service.', 30, 45),
('nails-8', 'nails', 'Nail Art', 'Custom nail art designs.', 20, 30),
('makeup-2', 'makeup', 'Bridal Makeup', 'Specialized makeup for brides.', 200, 120);

-- Insert Users
-- Note: Replace UUIDs with actual user IDs from your Firebase Auth emulator/project if needed for testing specific users.
INSERT INTO "User" (id, name, email, role) VALUES
('9e7a488e-15d0-481d-a15e-310a6245d768', 'Olivia Owner', 'olivia@example.com', 'provider'),
('8a1b4b5a-7b3c-4c6d-8e1f-2a3b4c5d6e7f', 'Chloe Owner', 'chloe@example.com', 'provider'),
('7c2d8e9f-6a5b-4d8c-9a1e-3b4c5d6e7f8g', 'Alex Ray', 'alex@example.com', 'client');


-- Insert Service Providers
INSERT INTO "ServiceProvider" (id, "userId", name, specialty, "avatarUrl", "dataAiHint", rating, "reviewCount", "isFeatured", "isFavourite", bio, location, playlist) VALUES
('1', '9e7a488e-15d0-481d-a15e-310a6245d768', 'Olivia''s Nail Studio', 'Nail Art', 'https://placehold.co/100x100.png', 'nail art', 4.9, 124, TRUE, TRUE, 'Award-winning nail artist with 10+ years of experience in creating stunning and unique nail designs. Passionate about nail health and using high-quality, non-toxic products.', 'New York, NY', 'top-rated-nails'),
('2', '8a1b4b5a-7b3c-4c6d-8e1f-2a3b4c5d6e7f', 'Glow & Go Esthetics', 'Skincare', 'https://placehold.co/100x100.png', 'skincare product', 5.0, 88, TRUE, FALSE, 'Certified esthetician dedicated to helping you achieve your best skin. Specializing in results-driven facials and advanced skincare treatments.', 'Miami, FL', 'rejuvenating-facials');

-- Note: We are not seeding reviews, bookings, etc. yet as those models are not fully migrated.
-- This seed file is just to test the provider and service queries.
