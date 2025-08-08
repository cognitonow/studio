import Image from 'next/image';
import Link from 'next/link';
import { getProviderById, providers } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, MapPin, GalleryHorizontal, MessageSquare, BookMarked } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const provider = getProviderById(id)
 
  if (!provider) {
    return {
      title: 'Provider Not Found',
    }
  }

  return {
    title: `${provider.name} | Beauty Book`,
    description: provider.bio,
  }
}

export async function generateStaticParams() {
  return providers.map((provider) => ({
    id: provider.id,
  }));
}

export default function ProviderDetailPage({ params }: { params: { id: string } }) {
  const provider = getProviderById(params.id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Provider Header */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="w-32 h-32 border-4 border-background shadow-md">
              <AvatarImage src={provider.avatarUrl} alt={provider.name} data-ai-hint={provider.dataAiHint} />
              <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="pt-4">
              <h1 className="text-4xl font-bold font-headline">{provider.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{provider.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4" />
                  <span>{provider.rating.toFixed(1)} ({provider.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.badges.map(badge => (
                  <Badge key={badge} variant="secondary">{badge}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">About</h2>
            <p className="text-foreground/80 leading-relaxed">{provider.bio}</p>
          </div>

          {/* Portfolio */}
          {provider.portfolio.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
                <GalleryHorizontal className="w-6 h-6 text-primary" />
                Portfolio
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {provider.portfolio.map(item => (
                  <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <Image src={item.url} alt="Portfolio item" fill className="object-cover" data-ai-hint={item.dataAiHint} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Verified Reviews</h2>
            <div className="space-y-6">
              {provider.reviews.map(review => (
                <Card key={review.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint={review.dataAiHint} />
                      <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Services & Booking */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2 font-headline">
                <BookMarked className="w-6 h-6 text-primary"/>
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {provider.services.map(service => (
                  <AccordionItem key={service.id} value={`item-${service.id}`}>
                    <AccordionTrigger className="font-semibold">{service.name}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">${service.price}</p>
                          <p className="text-sm text-muted-foreground">{service.duration} mins</p>
                        </div>
                        <Button asChild>
                          <Link href={`/book/${provider.id}?service=${service.id}`}>Book Now</Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button variant="outline" className="w-full mt-6">
                <MessageSquare className="w-4 h-4 mr-2"/> Contact Provider
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
