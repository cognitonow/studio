-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL -- Assuming UserRole is a string enum. Consider a separate user_roles table for better practice.
);


-- Create the servicecategories table
CREATE TABLE servicecategories (
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Create the providers table

CREATE TABLE providers (
    id UUID PRIMARY KEY,
    userId UUID UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    portfolio TEXT, -- Assuming portfolio is a URL or text description
    -- Add other provider-specific fields as needed
    CONSTRAINT fk_user
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- Create the services table
CREATE TABLE services (
    id UUID PRIMARY KEY,
    providerId UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    categoryId UUID,
    estimatedDuration INT, -- Duration in minutes, for example
    imageUrls TEXT[], -- Array of image URLs
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    CONSTRAINT fk_provider
        FOREIGN KEY(providerId)
        REFERENCES providers(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_service_category
        FOREIGN KEY(categoryId)
        REFERENCES servicecategories(id)
        ON DELETE SET NULL -- Or CASCADE, depending on desired behavior
);

-- Create the bookings table

CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    userId UUID NOT NULL, -- Client user
    providerId UUID NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'confirmed', 'completed', 'cancelled'
    -- serviceIds are handled by the booking_services linking table
    CONSTRAINT fk_client_user
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_booking_provider
        FOREIGN KEY(providerId)
        REFERENCES providers(id)
        ON DELETE CASCADE
);

-- Create a linking table for many-to-many relationship between bookings and services
CREATE TABLE booking_services (
    bookingId UUID NOT NULL,
    serviceId UUID NOT NULL,
    PRIMARY KEY (bookingId, serviceId),
    CONSTRAINT fk_booking
        FOREIGN KEY(bookingId)
        REFERENCES bookings(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_service
        FOREIGN KEY(serviceId)
        REFERENCES services(id)
        ON DELETE CASCADE
);

-- Add foreign key constraint to booking_services table that references bookings table
ALTER TABLE booking_services
ADD CONSTRAINT fk_booking_booking_services
FOREIGN KEY (bookingId) REFERENCES bookings(id) ON DELETE CASCADE;


-- Create the reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    userId UUID NOT NULL, -- Client user
    providerId UUID, -- Review for a provider (optional, could be per service)
    serviceId UUID, -- Review for a service (optional, could be per provider)
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Rating out of 5
    comment TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_user
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_review_provider
        FOREIGN KEY(providerId)
        REFERENCES providers(id)
        ON DELETE SET NULL, -- Or CASCADE
    CONSTRAINT fk_review_service
        FOREIGN KEY(serviceId)
        REFERENCES services(id)
        ON DELETE SET NULL, -- Or CASCADE
    -- Ensure a review is linked to either a provider or a service
    CONSTRAINT check_provider_or_service
        CHECK ( (providerId IS NOT NULL AND serviceId IS NULL) OR (providerId IS NULL AND serviceId IS NOT NULL) )
);