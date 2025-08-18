
-- Clear existing data to prevent conflicts
TRUNCATE TABLE "users", "service_categories", "services" CASCADE;

-- Insert User data
INSERT INTO "users" ("id", "name", "email", "role") VALUES
('user-1', 'Olivia Owner', 'olivia@example.com', 'provider'),
('provider-user-id', 'Glow Esthetics', 'glow@example.com', 'provider');


-- Insert ServiceCategory data
INSERT INTO "service_categories" ("id", "name") VALUES
('hair', 'Hair'),
('facials', 'Facials'),
('nails', 'Nails'),
('brows-lashes', 'Brows & Lashes'),
('hair-removal', 'Hair Removal'),
('body', 'Body'),
('makeup', 'Makeup'),
('medi-spa', 'Aesthetic / Medi-Spa'),
('custom', 'Custom');

-- Insert Service data
INSERT INTO "services" ("id", "categoryId", "name", "description", "price", "duration") VALUES
('hair-1', 'hair', 'Haircut', 'Professional haircut service.', 50, 45),
('hair-2', 'hair', 'Blowout', 'Professional blowout service.', 40, 30),
('hair-3', 'hair', 'Updo', 'Elegant updo for special occasions.', 75, 60),
('facials-1', 'facials', 'Classic Facial', 'A relaxing and cleansing facial.', 80, 60),
('facials-2', 'facials', 'Chemical Peel', 'Exfoliating treatment for smoother skin.', 120, 60),
('nails-1', 'nails', 'Manicure', 'Classic manicure service.', 30, 45),
('nails-2', 'nails', 'Pedicure', 'Classic pedicure service.', 45, 60),
('nails-3', 'nails', 'Gel / Shellac', 'Long-lasting gel polish.', 45, 60);
