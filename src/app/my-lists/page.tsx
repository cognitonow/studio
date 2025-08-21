'use server';

import { getExploreQueueProviders, getFavouriteProviders } from "@/lib/data";
import { MyListsPageClient } from "@/components/my-lists-page-client";

export default async function MyListsPage() {
  // Fetch data on the server
  const exploreQueueProviders = getExploreQueueProviders();
  const favouriteProviders = getFavouriteProviders();

  return (
    <MyListsPageClient 
      initialExploreQueue={exploreQueueProviders}
      initialFavourites={favouriteProviders}
    />
  );
}
