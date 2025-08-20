
'use client'

import { useState, useEffect } from 'react';
import { useUserStore } from '@/hooks/use-user-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Award, Store, Clock, List, GalleryHorizontal, PlusCircle, Trash2, Upload, Info, Save, User, Star, MapPin, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight as ArrowRightIcon, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServicesByIds, getClientDashboardData } from '@/lib/data';
import type { Booking, Provider, Service } from '@/lib/types';
import { format, formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { allBadges } from '@/lib/badges';
import { StatusBadge } from '@/components/status-badge';
import { Heart, Repeat, Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ClientDashboardData {
    totalBookings: number;
    averageSpend: number;
    previousBookings: Booking[];
    favoriteProvider?: Provider;
    activeBookings: (Booking & { services: Service[] })[];
}

export default function ClientDashboard() {
  const [dashboardData, setDashboardData] = useState<ClientDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBookingIndex, setActiveBookingIndex] = useState(0);

  useEffect(() => {
    const fetchData = () => {
        const data = getClientDashboardData();
        setDashboardData(data);
        setIsLoading(false);
    };

    fetchData();

    // Re-fetch when the window gets focus, to catch updates
    window.addEventListener('focus', fetchData);

    return () => {
        window.removeEventListener('focus', fetchData);
    };
  }, []);
  
  const handleNextBooking = () => {
    if (dashboardData && dashboardData.activeBookings.length > 1) {
        setActiveBookingIndex((prevIndex) => (prevIndex + 1) % dashboardData.activeBookings.length);
    }
  }

  const handlePrevBooking = () => {
     if (dashboardData && dashboardData.activeBookings.length > 1) {
        setActiveBookingIndex((prevIndex) => (prevIndex - 1 + dashboardData.activeBookings.length) % dashboardData.activeBookings.length);
    }
  }

  const activeBooking = dashboardData?.activeBookings?.[activeBookingIndex];
  
  const favoriteProviderPortfolio = dashboardData?.favoriteProvider?.portfolio.slice(0, 3);
  const mainImage = favoriteProviderPortfolio?.[0] ?? { url: 'https://placehold.co/600x400.png', dataAiHint: 'salon interior' };
  const subImage1 = favoriteProviderPortfolio?.[1] ?? { url: 'https://placehold.co/400x400.png', dataAiHint: 'hair styling' };
  const subImage2 = favoriteProviderPortfolio?.[2] ?? { url: 'https://placehold.co/400x400.png', dataAiHint: 'makeup application' };

  const activeBookingTotalCost = activeBooking?.services.reduce((acc, service) => acc + service.price, 0) ?? 0;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-8">Client Dashboard</h1>
      
      {/* Section 1: Analytics Dashboard */}
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 mb-12">
        {/* Your Stats */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Star className="w-6 h-6 text-primary"/>
                Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading || !dashboardData ? (
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                       <div className="grid gap-2">
                         <Skeleton className="h-4 w-24" />
                         <Skeleton className="h-4 w-20" />
                         <Skeleton className="h-4 w-28" />
                       </div>
                    </div>
                    <Skeleton className="h-10 w-full" />
                 </div>
            ): (
            <>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Your Avatar" data-ai-hint="person face" />
                  <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2 text-sm">
                   <div className="flex items-center gap-2">
                      <Repeat className="w-4 h-4 text-muted-foreground"/>
                      <span className="font-semibold">{dashboardData.totalBookings}</span>
                      <span className="text-muted-foreground">Total Bookings</span>
                  </div>
                   <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground"/>
                      <span className="font-semibold">${dashboardData.averageSpend.toFixed(2)}</span>
                      <span className="text-muted-foreground">Average Spend</span>
                  </div>
              </div>
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-sm">Recent Activity</h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Provider</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dashboardData.previousBookings.slice(0, 3).map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell className="font-medium">{booking.providerName}</TableCell>
                                <TableCell>{format(new Date(booking.date), 'dd MMM yyyy')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button asChild className="w-full">
                <Link href="/bookings">
                    View Booking History
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            </>
            )}
          </CardContent>
        </Card>

        {/* Active Booking or Management Card */}
        <Card className="lg:col-span-1 flex flex-col">
            {isLoading ? (
                <CardContent className="p-6">
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-6" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            ) : activeBooking ? (
                 <>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Clock className="w-6 h-6 text-primary"/>
                                Active Booking
                            </CardTitle>
                             {(dashboardData?.activeBookings?.length ?? 0) > 1 && (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={handlePrevBooking} className="h-7 w-7">
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm text-muted-foreground">{activeBookingIndex + 1} / {dashboardData?.activeBookings.length}</span>
                                     <Button variant="ghost" size="icon" onClick={handleNextBooking} className="h-7 w-7">
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                        <CardDescription>Your next appointment is coming up!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow flex flex-col">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <p className="font-semibold text-lg">{activeBooking.providerName}</p>
                                <StatusBadge status={activeBooking.status} />
                            </div>
                            <div className="text-sm space-y-2 mt-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span>{format(new Date(activeBooking.date), 'PPPP')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span>{format(new Date(activeBooking.date), 'p')} ({formatDistanceToNowStrict(new Date(activeBooking.date), { addSuffix: true })})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-semibold">${activeBookingTotalCost.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <Separator className="my-4" />
                            
                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Services Booked:</h4>
                                {activeBooking.services.map((service, index) => (
                                    <div key={service.id}>
                                        <div>
                                            <p className="font-medium">{service.name}</p>
                                            <p className="text-xs text-muted-foreground">{service.description}</p>
                                        </div>
                                         {index < activeBooking.services.length - 1 && <Separator className="mt-3" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-4 space-y-2">
                            <Button asChild className="w-full">
                                <Link href={`/booking/manage/${activeBooking.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Manage Booking
                                </Link>
                            </Button>
                            <Button asChild variant="secondary" className="w-full">
                                <Link href="/bookings">View All Bookings</Link>
                            </Button>
                        </div>
                    </CardContent>
                 </>
            ) : (
                <>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Calendar className="w-6 h-6 text-primary"/>
                        Manage Appointments
                    </CardTitle>
                    <CardDescription>View upcoming and past bookings, or make changes.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">You have no upcoming appointments.</p>
                    <Button asChild size="lg">
                        <Link href="/bookings">
                            <Calendar className="mr-2 h-5 w-5" />
                            Go to My Bookings
                        </Link>
                    </Button>
                </CardContent>
                </>
            )}
        </Card>


        {/* Favourite Provider */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 font-headline">
                <Heart className="w-6 h-6 text-primary"/>
                Favorite Provider
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            {isLoading || !dashboardData?.favoriteProvider ? (
                <div className="space-y-4">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full mt-4" />
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-3 grid-rows-2 gap-1 h-32 rounded-lg overflow-hidden mb-4">
                        <div className="col-span-2 row-span-2 relative">
                            <Image
                                src={mainImage.url}
                                alt={`${dashboardData.favoriteProvider.name} portfolio 1`}
                                fill
                                className="object-cover"
                                data-ai-hint={mainImage.dataAiHint}
                            />
                        </div>
                        <div className="col-span-1 row-span-1 relative">
                            <Image
                                src={subImage1.url}
                                alt={`${dashboardData.favoriteProvider.name} portfolio 2`}
                                fill
                                className="object-cover"
                                data-ai-hint={subImage1.dataAiHint}
                            />
                        </div>
                        <div className="col-span-1 row-span-1 relative">
                            <Image
                                src={subImage2.url}
                                alt={`${dashboardData.favoriteProvider.name} portfolio 3`}
                                fill
                                className="object-cover"
                                data-ai-hint={subImage2.dataAiHint}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{dashboardData.favoriteProvider.name}</h3>
                        <p className="text-sm text-muted-foreground">{dashboardData.favoriteProvider.specialty}</p>
                    </div>
                    <div className="text-sm space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span>{dashboardData.favoriteProvider.rating} ({dashboardData.favoriteProvider.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{dashboardData.favoriteProvider.location}</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-grow">
                        {dashboardData.favoriteProvider.bio}
                    </p>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {dashboardData.favoriteProvider.badges.slice(0, 2).map(providerBadge => {
                            const badgeInfo = allBadges.find(b => b.name === providerBadge.name);
                            if (!badgeInfo) return null;
                            return (
                                <Badge key={badgeInfo.id} variant="secondary">{badgeInfo.levels[providerBadge.level].name}</Badge>
                            )
                        })}
                    </div>
                    <div className="mt-auto pt-4">
                        <Button asChild className="w-full">
                            <Link href={`/provider/${dashboardData.favoriteProvider.id}`}>
                                View Profile
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Section 2: My Lists */}
       <div className="grid md:grid-cols-1 gap-8">
         <div>
            <h2 className="text-3xl font-bold font-headline mb-4">My Lists</h2>
            <Card>
                <CardHeader>
                    <CardTitle>View Your Saved Providers</CardTitle>
                    <CardDescription>Access your Explore Queue and Favourites to easily book with providers you're interested in.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">Ready to find a saved provider? Click the button below to see your lists.</p>
                    <Button asChild size="lg">
                        <Link href="/my-lists">
                            <List className="mr-2 h-5 w-5" />
                            Go to My Lists
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

