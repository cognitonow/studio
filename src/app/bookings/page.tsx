'use server';

import { getBookings } from "@/lib/data";
import { BookingsPageClient } from "@/components/bookings-page-client";

export default async function ClientBookingsPage() {
  // Fetch bookings on the server
  const allBookings = getBookings();

  return <BookingsPageClient initialBookings={allBookings} />;
}
