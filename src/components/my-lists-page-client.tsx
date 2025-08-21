'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProviderCard } from "@/components/provider-card"
import { Heart, List } from "lucide-react"
import type { Provider } from "@/lib/types"

interface MyListsPageClientProps {
  initialExploreQueue: Provider[];
  initialFavourites: Provider[];
}

export function MyListsPageClient({
  initialExploreQueue,
  initialFavourites
}: MyListsPageClientProps) {
  // The state is initialized with server-fetched data, so there's no client-side fetch.
  // We can add client-side state management later if needed (e.g., for removing items from a list).
  const exploreQueueProviders = initialExploreQueue;
  const favouriteProviders = initialFavourites;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-8">My Lists</h1>
      <Tabs defaultValue="explore-queue">
        <TabsList>
          <TabsTrigger value="explore-queue">
            <List className="mr-2 h-4 w-4" />
            Explore Queue
          </TabsTrigger>
          <TabsTrigger value="favourites">
            <Heart className="mr-2 h-4 w-4" />
            My Favourites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore-queue">
          <Card>
            <CardHeader>
              <CardTitle>Explore Queue</CardTitle>
              <CardDescription>Providers you've saved from the Explore page. A great place to start when you're ready to book!</CardDescription>
            </CardHeader>
            <CardContent>
              {exploreQueueProviders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {exploreQueueProviders.map(provider => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Your explore queue is empty. Go to the Explore page to add some providers!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favourites">
          <Card>
            <CardHeader>
              <CardTitle>My Favourite Beauty Bookers</CardTitle>
              <CardDescription>Your most-loved providers, all in one place. Easy to rebook!</CardDescription>
            </CardHeader>
            <CardContent>
              {favouriteProviders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {favouriteProviders.map(provider => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">You haven't added any favourites yet. Click the 'Save to Favourites' button on a provider's profile.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
