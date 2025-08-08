import Link from 'next/link';
import Image from 'next/image';
import type { Provider } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/provider/${provider.id}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={provider.avatarUrl}
              alt={provider.name}
              fill
              className="object-cover"
              data-ai-hint={provider.dataAiHint}
            />
             <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm p-1 rounded-md">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold">{provider.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold mb-1 truncate font-headline">{provider.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{provider.specialty}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
           <Button asChild variant="outline" className="w-full">
              <Link href={`/provider/${provider.id}`}>Book now</Link>
           </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
