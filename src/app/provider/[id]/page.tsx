

'use client'

import Image from 'next/image';
import Link from 'next/link';
import { getProviderById, getBookingHistoryForProvider, addReview } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, MapPin, GalleryHorizontal, MessageSquare, BookMarked, Heart, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import type { Booking, Provider } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';
import { allBadges } from '@/lib/badges';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
 
export default function ProviderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const [provider, setProvider] = useState<Provider | undefined>(() => getProviderById(id));
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  
  // State for the review form
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');


  useEffect(() => {
    if (provider) {
        setBookingHistory(getBookingHistoryForProvider(provider.id));
    }
  }, [provider]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0 || !reviewComment.trim() || !provider) return;

    addReview(provider.id, reviewRating, reviewComment);
    
    // To ensure the UI updates, we get the fresh provider object and update state
    const updatedProvider = getProviderById(id);
    setProvider(updatedProvider); // This will trigger a re-render with the new review
    
    toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback.",
    });

    // Reset form
    setReviewRating(0);
    setReviewComment('');
  };


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
                {provider.badges.map(providerBadge => {
                  const badgeInfo = allBadges.find(b => b.name === providerBadge.name);
                  if (!badgeInfo) return null;
                  const levelInfo = badgeInfo.levels[providerBadge.level];
                  return (
                    <Badge key={badgeInfo.id} variant="secondary" className="transition-colors hover:bg-secondary/80">
                      {levelInfo.name}
                    </Badge>
                  )
                })}
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

          {/* Reviews, Chat, Booking History Tabs */}
          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Verified Reviews</TabsTrigger>
              <TabsTrigger value="feedback">Leave Feedback</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="booking-history">Booking History</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
                <div className="space-y-6 mt-6">
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
            </TabsContent>
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmitReview}>
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                           <Button 
                                key={i} 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="text-muted-foreground hover:text-primary"
                                onClick={() => setReviewRating(i + 1)}
                            >
                             <Star className={cn("w-6 h-6", i < reviewRating && 'text-primary fill-primary')} />
                           </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback-comment">Comment</Label>
                      <Textarea 
                        id="feedback-comment" 
                        placeholder="Tell us about your experience..." 
                        rows={4} 
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={reviewRating === 0 || !reviewComment.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chat">
               <Card>
                <CardHeader>
                  <CardTitle>Start a Conversation</CardTitle>
                  <CardDescription>Have a question for {provider.name}? Send them a message directly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={`/messages?providerId=${provider.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat with {provider.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="booking-history">
              <Card>
                <CardHeader>
                  <CardTitle>Your History with {provider.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingHistory.length > 0 ? bookingHistory.map(booking => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.serviceIds.join(', ')}</TableCell>
                          <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                          <TableCell><StatusBadge status={booking.status} /></TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">No previous bookings with this provider.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
              <div className="flex flex-col gap-2 mt-6">
                <Button variant="secondary">
                  <Heart className="w-4 h-4 mr-2"/> Save to Favourites
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/messages?providerId=${provider.id}`}>
                    <MessageSquare className="w-4 h-4 mr-2"/> Contact Provider
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
