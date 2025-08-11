import Link from 'next/link';
import Image from 'next/image';
import type { Provider } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ExploreProviderCardProps {
  provider: Provider;
}

export function ExploreProviderCard({ provider }: ExploreProviderCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-xl">
        <CardHeader className="p-0">
            <div className="relative h-64 w-full">
                <Image
                src={provider.avatarUrl}
                alt={provider.name}
                fill
                className="object-cover"
                data-ai-hint={provider.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                    <CardTitle className="text-3xl font-bold font-headline drop-shadow-lg">{provider.name}</CardTitle>
                    <CardDescription className="text-white/90 drop-shadow-md">{provider.specialty}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-semibold text-foreground">{provider.rating.toFixed(1)}</span>
                    <span>({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                </div>
            </div>
            <p className="text-foreground/80 leading-relaxed line-clamp-3 h-[4.5rem]">{provider.bio}</p>
            <div className="flex flex-wrap gap-2">
                {provider.badges.slice(0, 3).map(badge => (
                    <Badge key={badge} variant="secondary">{badge}</Badge>
                ))}
            </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
           <Button className="w-full" asChild size="lg">
              <Link href={`/provider/${provider.id}`}>View Profile</Link>
           </Button>
        </CardFooter>
    </Card>
  );
}
