import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaylistProviderCard } from './playlist-provider-card';
import { ListMusic } from 'lucide-react';
import type { Provider } from '@/lib/types';

interface PlaylistResultsProps {
  providers: Provider[];
}

export function PlaylistResults({ providers }: PlaylistResultsProps) {
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
          {providers.length > 0 ? (
            <div className="space-y-4 pr-4">
              {providers.map(provider => (
                <PlaylistProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">Select a category to see a playlist.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
