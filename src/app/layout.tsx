
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: {
    default: 'Beauty Book - Find and Book Beauty Appointments',
    template: '%s | Beauty Book',
  },
  description: 'Discover and book appointments with top-rated beauty professionals for hair, nails, skincare, and more. Read reviews, browse services, and manage your bookings with ease.',
  keywords: ['beauty appointments', 'salon booking', 'spa booking', 'haircut', 'manicure', 'facial', 'beauty services'],
  openGraph: {
    title: 'Beauty Book - Find and Book Beauty Appointments',
    description: 'The easiest way to discover and book your next beauty service.',
    url: 'https://beauty-book.example.com', // In a real app, this would be the actual domain
    siteName: 'Beauty Book',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // OG image needs to be a real URL
        width: 1200,
        height: 630,
        alt: 'A collage of beauty services offered on Beauty Book',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty Book - Find and Book Beauty Appointments',
    description: 'Discover and book appointments with top-rated beauty professionals.',
    images: ['https://placehold.co/1200x630.png'], // Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    shortcut: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@400;700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
