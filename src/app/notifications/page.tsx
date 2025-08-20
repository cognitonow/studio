'use server';

import { getNotifications } from '@/lib/data';
import { NotificationsPageClient } from '@/components/notifications-page-client';

export default async function NotificationsPage() {
  // Pre-fetch notification data for both roles on the server.
  const clientNotifications = getNotifications('client');
  const providerNotifications = getNotifications('provider');

  return (
    <NotificationsPageClient
      initialClientNotifications={clientNotifications}
      initialProviderNotifications={providerNotifications}
    />
  );
}
