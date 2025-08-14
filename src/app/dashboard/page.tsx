

'use client'

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Award, Contact, Store, Clock, List, GalleryHorizontal, PlusCircle, Trash2, Upload, Info, Save, User, Star, MapPin } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MonthlyEarningsChart } from "@/components/monthly-earnings-chart"
import { Button } from "@/components/ui/button"
import { getProviderBookings, updateBookingStatus, getServicesByIds, providers } from '@/lib/data';
import type { Booking } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { BadgeProgress } from '@/components/badge-progress';
import { ServiceManagementCard } from '@/components/service-management-card';
  

export default function ProviderDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const provider = providers[2]; // Mocking Chloe's Hair Haven as the logged-in provider
  const [featuredImages, setFeaturedImages] = useState<Set<string>>(new Set(provider.portfolio.slice(0, 3).map(p => p.id)));


  useEffect(() => {
    const fetchBookings = () => {
      if (provider) {
        setBookings(getProviderBookings(provider.id));
      }
    };
    
    fetchBookings(); // Initial fetch

    // Set up the event listener to re-fetch when the window gains focus
    window.addEventListener('focus', fetchBookings);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('focus', fetchBookings);
    };
  }, [provider]);

  const handleStatusChange = (bookingId: string, status: Booking['status']) => {
    updateBookingStatus(bookingId, status, 'provider');
    if (provider) {
      setBookings(getProviderBookings(provider.id));
    }
  };
  
  const handleFeaturedImageSelect = (imageId: string) => {
    setFeaturedImages(prev => {
        const newSelection = new Set(prev);
        if (newSelection.has(imageId)) {
            newSelection.delete(imageId);
        } else {
            if (newSelection.size < 3) {
                newSelection.add(imageId);
            }
        }
        return newSelection;
    });
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Review Order and Pay':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Awaiting Payment</Badge>;
      case 'Confirmed':
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">Confirmed</Badge>;
      case 'Completed':
        return <Badge className="bg-green-500 text-white hover:bg-green-600">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getBookingActions = (booking: Booking) => {
    const now = new Date();
    
    switch (booking.status) {
      case 'Pending':
        return (
            <div className="flex gap-2 justify-end">
                 <Button size="sm" variant="outline" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>Manage</Link>
                </Button>
            </div>
        );
      case 'Review Order and Pay':
      case 'Confirmed':
         return (
            <div className="flex gap-2 justify-end">
                <Button key={`manage-${booking.id}`} size="sm" variant="outline" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>View Details</Link>
                </Button>
                 {new Date(booking.date) <= now && booking.status === 'Confirmed' && (
                    <Button size="sm" onClick={() => handleStatusChange(booking.id, 'Completed')}>Mark as Completed</Button>
                )}
            </div>
        );
      case 'Completed':
      case 'Cancelled':
         return (
            <Button key={`details-${booking.id}`} size="sm" variant="secondary" asChild>
                <Link href={`/booking/manage/${booking.id}`}>View Details</Link>
            </Button>
        );
      default:
        return null;
    }
  };
  
  const renderServices = (serviceIds: string[]) => {
    const services = getServicesByIds(serviceIds);
    if (services.length === 0) return 'N/A';
    if (services.length === 1) return services[0].name;
    return (
        <span title={services.map(s => s.name).join(', ')}>
            {`${services.length} services`}
        </span>
    );
  }


  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-8">Provider Dashboard</h1>
      <Tabs defaultValue="shop-management" className="space-y-4">
        <TabsList>
           <TabsTrigger value="shop-management">
            <Store className="mr-2 h-4 w-4" />
            Shop Management
          </TabsTrigger>
          <TabsTrigger value="bookings">Booking Management</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="shop-management">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
                {/* Shop Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/>Shop Profile</CardTitle>
                        <CardDescription>This information is displayed publicly on your profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="shop-name">Shop Name</Label>
                            <Input id="shop-name" defaultValue={provider.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="specialty">Specialty</Label>
                            <Input id="specialty" defaultValue={provider.specialty} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={provider.location} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio">About / Bio</Label>
                            <Textarea id="bio" defaultValue={provider.bio} rows={5} />
                        </div>
                         <div className="space-y-2">
                            <Label>Your Badges</Label>
                             <div className="flex flex-wrap gap-2">
                                {provider.badges.map(badge => <Badge key={badge} variant="secondary">{badge}</Badge>)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Badge Suggester Card */}
                <BadgeProgress />

            </div>
            {/* Right Column */}
            <div className="space-y-8">
                {/* Availability Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Availability Settings</CardTitle>
                        <CardDescription>Set your standard weekly working hours.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <Label>Monday</Label>
                            <Select defaultValue="09:00">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="09:00">09:00 AM</SelectItem></SelectContent>
                            </Select>
                            <Select defaultValue="17:00">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="17:00">05:00 PM</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <Button>Save Availability</Button>
                    </CardContent>
                </Card>

                {/* Portfolio Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GalleryHorizontal className="w-5 h-5" />Portfolio & Featured Images</CardTitle>
                        <CardDescription>Showcase your work and select up to 3 images to feature on your Explore card.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {provider.portfolio.map(item => (
                                <div key={item.id} className="relative group">
                                    <Label htmlFor={`featured-${item.id}`} className="cursor-pointer">
                                        <Image src={item.url} alt="Portfolio item" width={200} height={200} className="rounded-md object-cover aspect-square" data-ai-hint={item.dataAiHint} />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Trash2 className="h-6 w-6 text-white" />
                                        </div>
                                    </Label>
                                    <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
                                        <Checkbox 
                                            id={`featured-${item.id}`}
                                            checked={featuredImages.has(item.id)}
                                            onCheckedChange={() => handleFeaturedImageSelect(item.id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-6">
                            <Button className="flex-1">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Image
                            </Button>
                             <Button className="flex-1" variant="outline">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                
                 {/* Service Management */}
                <ServiceManagementCard />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Manage Bookings</CardTitle>
              <CardDescription>View and manage all your client bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service(s)</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.clientName}</TableCell>
                      <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                      <TableCell>{format(new Date(booking.date), "PPP p")}</TableCell>
                      <TableCell>
                        {getStatusBadge(booking.status)}
                      </TableCell>
                       <TableCell className="text-right">
                        {getBookingActions(booking)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+235</div>
                <p className="text-xs text-muted-foreground">+10.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+72</div>
                <p className="text-xs text-muted-foreground">+5 since last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-xs text-muted-foreground">Based on 212 reviews</p>
              </CardContent>
            </Card>
          </div>
          <MonthlyEarningsChart />
        </TabsContent>

      </Tabs>
    </div>
  )
}
