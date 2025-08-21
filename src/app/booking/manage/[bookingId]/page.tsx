'use server';

import { getBookingById, getServicesByIds, providers } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ManageBookingPageClient } from '@/components/manage-booking/manage-booking-page-client';
import type { Booking, Provider, Service } from '@/lib/types';

export default async function ManageBookingPage({ params }: { params: { bookingId: string }}) {
  const bookingId = params.bookingId;
  const booking = getBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  const bookedServices: Service[] = getServicesByIds(booking.serviceIds);
  const provider = providers.find(p => p.id === booking.providerId);

  if (!provider) {
    notFound();
  }

  return (
    <ManageBookingPageClient 
      initialBooking={booking} 
      initialProvider={provider}
      initialServices={bookedServices}
    />
  );
}
