-- This script is used to seed the PostgreSQL database with initial data.
-- You can run this script using the gcloud CLI against your Cloud SQL instance.
-- See instructions in backlog.md for how to connect and run this file.

-- Clear existing data to prevent duplicates on re-running
TRUNCATE TABLE "Service", "ServiceCategory" RESTART IDENTITY;

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

-- Insert Sample Services
-- Make sure the categoryId values match the ids inserted above.
INSERT INTO "Service" (id, "categoryId", name, description, price, duration) VALUES
('svc-hair-1', 'hair', 'Live Haircut', 'A live haircut service from the database.', 55, 45),
('svc-hair-2', 'hair', 'Live Blowout', 'A live blowout service from the database.', 45, 30),
('svc-nails-1', 'nails', 'Live Manicure', 'A classic manicure service from the database.', 35, 45),
('svc-nails-2', 'nails', 'Live Gel Polish', 'A long-lasting gel polish service from the database.', 50, 60),
('svc-facials-1', 'facials', 'Live Classic Facial', 'A relaxing and cleansing facial from the database.', 85, 60);

-- You can add more services here following the same pattern.
