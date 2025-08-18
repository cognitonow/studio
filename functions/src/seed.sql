-- Mock data for service_categories
INSERT INTO service_categories (id, name) VALUES ('hair', 'Hair'), ('facials', 'Facials'), ('nails', 'Nails') ON CONFLICT (id) DO NOTHING;

-- Mock data for services
INSERT INTO services (id, category_id, name, description, price, duration) VALUES
('hair-1', 'hair', 'Haircut', 'Professional haircut service.', 50, 45),
('hair-22', 'hair', 'Colour, Highlights, Balayage', 'Hair coloring services.', 180, 180),
('facials-1', 'facials', 'Classic Facial', 'A relaxing and cleansing facial.', 80, 60),
('nails-1', 'nails', 'Manicure', 'Classic manicure service.', 30, 45),
('nails-8', 'nails', 'Nail Art', 'Custom nail art designs.', 20, 30)
ON CONFLICT (id) DO NOTHING;
