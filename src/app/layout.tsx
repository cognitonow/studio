'use client';

import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/components/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Metadata cannot be exported from a client component.
// In a real app, you might move this to a higher-level Server Component
// or handle metadata dynamically in individual page components.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Beauty Book - Find and Book Beauty Appointments</title>
        <meta name="description" content="Discover and book appointments with top-rated beauty professionals for hair, nails, skincare, and more. Read reviews, browse services, and manage your bookings with ease." />
        <meta name="keywords" content="beauty appointments, salon booking, spa booking, haircut, manicure, facial, beauty services" />
        <meta property="og:title" content="Beauty Book - Find and Book Beauty Appointments" />
        <meta property="og:description" content="The easiest way to discover and book your next beauty service." />
        <meta property="og:url" content="https://beauty-book.example.com" />
        <meta property="og:site_name" content="Beauty Book" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://placehold.co/1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="A collage of beauty services offered on Beauty Book" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beauty Book - Find and Book Beauty Appointments" />
        <meta name="twitter:description" content="Discover and book appointments with top-rated beauty professionals." />
        <meta name="twitter:image" content="https://placehold.co/1200x630.png" />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@400;700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
