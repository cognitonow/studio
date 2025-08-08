import Link from 'next/link';
import Image from 'next/image';
import type { Provider } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/provider/${provider.id}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={provider.avatarUrl}
              alt={provider.name}
              fill
              className="object-cover"
              data-ai-hint={provider.dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold mb-1 truncate font-headline">{provider.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{provider.specialty}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-semibold">{provider.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
          </div>
          {provider.isFeatured && <Badge variant="secondary">Featured</Badge>}
        </CardFooter>
      </Card>
    </Link>
  );
}
