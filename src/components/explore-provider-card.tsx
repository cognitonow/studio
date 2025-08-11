

import Link from 'next/link';
import Image from 'next/image';
import type { Provider } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


interface ExploreProviderCardProps {
  provider: Provider;
}

const badgeDescriptions: Record<string, string> = {
    'Top Rated': 'This provider has consistently received high ratings from clients.',
    'Quick Responder': 'This provider is known for their fast response times to inquiries.',
    'Nail Art Pro': 'An expert in creating intricate and beautiful nail art designs.',
    'Skincare Guru': 'A specialist in skincare, offering expert advice and treatments.',
    '5-Star Safety': 'This provider adheres to the highest standards of safety and hygiene.',
    'Client Favorite': 'A provider who is frequently booked and highly recommended by clients.',
    'Color Whiz': 'A master of hair color, from subtle highlights to bold transformations.',
    'Bridal Expert': 'Specializes in creating beautiful looks for weddings and bridal parties.',
    'On-Location Pro': 'This provider offers services at your location for added convenience.',
    'Pain Relief Pro': 'Specializes in therapies and treatments aimed at alleviating pain.',
}


export function ExploreProviderCard({ provider }: ExploreProviderCardProps) {
  const portfolioImages = provider.portfolio.slice(0, 3);
  const mainImage = portfolioImages[0] ?? { url: 'https://placehold.co/600x400.png', dataAiHint: 'salon interior' };
  const subImage1 = portfolioImages[1] ?? { url: 'https://placehold.co/400x400.png', dataAiHint: 'hair styling' };
  const subImage2 = portfolioImages[2] ?? { url: 'https://placehold.co/400x400.png', dataAiHint: 'makeup application' };

  return (
    <Card className="w-full mx-auto overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-xl">
        <CardHeader className="p-0">
            <div className="grid grid-cols-3 grid-rows-2 gap-1 h-64">
                <div className="col-span-2 row-span-2 relative">
                    <Image
                        src={mainImage.url}
                        alt={`${provider.name} portfolio 1`}
                        fill
                        className="object-cover"
                        data-ai-hint={mainImage.dataAiHint}
                    />
                </div>
                <div className="col-span-1 row-span-1 relative">
                     <Image
                        src={subImage1.url}
                        alt={`${provider.name} portfolio 2`}
                        fill
                        className="object-cover"
                        data-ai-hint={subImage1.dataAiHint}
                    />
                </div>
                <div className="col-span-1 row-span-1 relative">
                     <Image
                        src={subImage2.url}
                        alt={`${provider.name} portfolio 3`}
                        fill
                        className="object-cover"
                        data-ai-hint={subImage2.dataAiHint}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
             <div>
                <CardTitle className="text-3xl font-bold font-headline">{provider.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{provider.specialty}</CardDescription>
            </div>
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
                    <Popover key={badge}>
                        <PopoverTrigger asChild>
                            <Badge variant="secondary" className="cursor-pointer">{badge}</Badge>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                            <div className="space-y-2">
                                <h4 className="font-semibold">{badge}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {badgeDescriptions[badge] || 'This provider has earned a special badge.'}
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>
                ))}
            </div>
        </CardContent>
    </Card>
  );
}
