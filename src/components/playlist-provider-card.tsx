import Link from 'next/link';
import Image from 'next/image';
import type { Provider } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface PlaylistProviderCardProps {
  provider: Provider;
}

export function PlaylistProviderCard({ provider }: PlaylistProviderCardProps) {
  return (
    <Link href={`/provider/${provider.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:shadow-lg group-hover:border-primary/50">
        <CardContent className="p-3 flex items-center gap-4">
          <div className="relative h-20 w-20 rounded-md overflow-hidden shrink-0">
            <Image
              src={provider.avatarUrl}
              alt={provider.name}
              fill
              className="object-cover"
              data-ai-hint={provider.dataAiHint}
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-headline font-semibold truncate group-hover:text-primary">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-sm">{provider.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({provider.reviewCount} reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
