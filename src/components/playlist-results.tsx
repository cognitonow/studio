import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFeaturedProviders } from '@/lib/data';
import { ProviderCard } from './provider-card';
import { ListMusic } from 'lucide-react';

export function PlaylistResults() {
  const playlistProviders = getFeaturedProviders(); // Using featured for placeholder

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
            <ListMusic className="w-6 h-6 text-primary" />
            Your Playlist
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {playlistProviders.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
            {/* Add more for scrolling effect */}
            {playlistProviders.map(provider => (
              <ProviderCard key={`${provider.id}-clone`} provider={provider} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
