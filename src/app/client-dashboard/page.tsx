

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Heart, Star, List, Repeat, DollarSign, Clock, User, Pencil, MapPin } from "lucide-react"
import Link from "next/link"
import { providers, getClientDashboardData } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import type { Provider, Service, Booking } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, formatDistanceToNowStrict } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Image from "next/image"

interface ClientDashboardData {
    totalBookings: number;
    averageSpend: number;
    previousBookings: Booking[];
    favoriteProvider?: Provider;
    activeBooking?: (Booking & { services: Service[] });
}

const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Review Order and Pay':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Payment Required</Badge>;
      case 'Confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

export default function ClientDashboardPage() {
  const [dashboardData, setDashboardData] = useState<ClientDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getClientDashboardData();
    setDashboardData(data);
    setIsLoading(false);
  }, []);
  
  const favoriteProviderPortfolio = dashboardData?.favoriteProvider?.portfolio.slice(0, 3);
  const mainImage = favoriteProviderPortfolio?.[0] ?? { url: 'https://placehold.co/600x400.png', dataAiHint: 'salon interior' };
  const subImage1 = favoriteProviderPortfolio?.[1] ?? { url: 'https://placehold.co/400x400.png', dataAiHint: 'hair styling' };
  const subImage2 = favoriteProviderPortfolio?.[2] ?? { url: 'https://placehold.co/400x400.png', dataAiHint: 'makeup application' };

  const activeBookingTotalCost = dashboardData?.activeBooking?.services.reduce((acc, service) => acc + service.price, 0) ?? 0;

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
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            </>
            )}
          </CardContent>
        </Card>

        {/* Active Booking or Management Card */}
        <Card className="lg:col-span-1">
            {isLoading ? (
                <CardContent className="p-6">
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-6" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            ) : dashboardData?.activeBooking ? (
                 <>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Clock className="w-6 h-6 text-primary"/>
                            Active Booking
                        </CardTitle>
                        <CardDescription>Your next appointment is coming up!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-lg">{dashboardData.activeBooking.providerName}</p>
                                    <p className="text-muted-foreground text-sm">{dashboardData.activeBooking.services.map(s => s.name).join(', ')}</p>
                                </div>
                                {getStatusBadge(dashboardData.activeBooking.status)}
                            </div>
                        </div>
                        <div className="text-sm space-y-1">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>{format(new Date(dashboardData.activeBooking.date), 'PPPP')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{format(new Date(dashboardData.activeBooking.date), 'p')} ({formatDistanceToNowStrict(new Date(dashboardData.activeBooking.date), { addSuffix: true })})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold">${activeBookingTotalCost.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button asChild className="w-full">
                            <Link href={`/booking/manage/${dashboardData.activeBooking.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Manage Booking
                            </Link>
                        </Button>
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
                        {dashboardData.favoriteProvider.badges.slice(0, 2).map(badge => (
                            <Badge key={badge} variant="secondary">{badge}</Badge>
                        ))}
                    </div>
                    <Button asChild className="w-full mt-auto pt-4">
                        <Link href={`/provider/${dashboardData.favoriteProvider.id}`}>
                            View Profile
                        </Link>
                    </Button>
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
  )
}
