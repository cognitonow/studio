

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Heart, Star, List, Repeat, DollarSign, Clock, User, Pencil } from "lucide-react"
import Link from "next/link"
import { providers, getClientDashboardData } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import type { Provider, Service, Booking } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, formatDistanceToNowStrict } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton";

interface ClientDashboardData {
    totalBookings: number;
    averageSpend: number;
    previousBookings: Booking[];
    favoriteProvider?: Provider;
    activeBooking?: (Booking & { services: Service[] });
}

export default function ClientDashboardPage() {
  const [dashboardData, setDashboardData] = useState<ClientDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getClientDashboardData();
    setDashboardData(data);
    setIsLoading(false);
  }, []);

  const favoriteProviderFirstService = dashboardData?.favoriteProvider?.services[0];


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
                        <div className="space-y-1">
                            <p className="font-semibold text-lg">{dashboardData.activeBooking.providerName}</p>
                            <p className="text-muted-foreground text-sm">{dashboardData.activeBooking.services.map(s => s.name).join(', ')}</p>
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
        <Card className="lg:col-span-1">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 font-headline">
                <Heart className="w-6 h-6 text-primary"/>
                Favorite Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading || !dashboardData?.favoriteProvider ? (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : (
                <>
                <Link href={`/provider/${dashboardData.favoriteProvider.id}`} className="block group">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={dashboardData.favoriteProvider.avatarUrl} data-ai-hint={dashboardData.favoriteProvider.dataAiHint} />
                        <AvatarFallback>{dashboardData.favoriteProvider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold group-hover:underline">{dashboardData.favoriteProvider.name}</h3>
                        <p className="text-sm text-muted-foreground">{dashboardData.favoriteProvider.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span>{dashboardData.favoriteProvider.rating} ({dashboardData.favoriteProvider.reviewCount} reviews)</span>
                        </div>
                    </div>
                </div>
                </Link>
                {favoriteProviderFirstService && (
                    <Button asChild className="w-full mt-6">
                        <Link href={`/book/${dashboardData.favoriteProvider.id}?service=${favoriteProviderFirstService.id}`}>
                            Book Again
                        </Link>
                    </Button>
                )}
              </>
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
