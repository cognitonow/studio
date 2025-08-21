'use server';

import { getProviderById, getBookingHistoryForProvider } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProviderDetailPageClient } from '@/components/provider-detail-page-client';

export default async function ProviderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch all required data on the server
  const provider = getProviderById(id);
  if (!provider) {
    notFound();
  }
  
  const bookingHistory = getBookingHistoryForProvider(provider.id);

  return (
    <ProviderDetailPageClient 
      provider={provider} 
      initialBookingHistory={bookingHistory} 
    />
  );
}
