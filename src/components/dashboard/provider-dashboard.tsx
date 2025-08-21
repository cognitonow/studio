
'use client'

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Award, Store, Clock, List, GalleryHorizontal, PlusCircle, Trash2, Upload, Info, Save, User, Star, MapPin, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight as ArrowRightIcon, MessageSquare } from "lucide-react"
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
import { getServicesByIds, updateBookingStatus, saveProviderProfile } from '@/lib/data';
import type { Booking, Provider, Service, ProviderDashboardData } from '@/lib/types';
import { format, startOfDay } from 'date-fns';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { BadgeProgress } from '@/components/badge-progress';
import { ServiceManagementCard } from '@/components/service-management-card';
import { StatusBadge } from '@/components/status-badge';
import { allBadges } from '@/lib/badges';


interface ProviderDashboardProps {
    data: ProviderDashboardData | null;
}

export default function ProviderDashboard({ data }: ProviderDashboardProps) {
  const { toast } = useToast();
  const [provider, setProvider] = useState<Provider | undefined>(data?.provider);
  const [bookings, setBookings] = useState<Booking[]>(data?.bookings || []);
  const [featuredImages, setFeaturedImages] = useState<Set<string>>(new Set());

  // State for the editable profile fields
  const [shopName, setShopName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');


  useEffect(() => {
    if (data?.provider) {
      setProvider(data.provider);
      setBookings(data.bookings);
      setFeaturedImages(new Set(data.provider.portfolio.slice(0, 3).map(p => p.id)));
      setShopName(data.provider.name);
      setSpecialty(data.provider.specialty);
      setLocation(data.provider.location);
      setBio(data.provider.bio);
    }
  }, [data]);
  
  if (!provider) {
    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <h2 className="text-2xl font-bold">Provider Profile Not Found</h2>
            <p className="text-muted-foreground mt-2">We couldn't find a provider profile associated with your account.</p>
        </div>
    );
  }

  const handleProfileSave = () => {
    if (!provider) return;
    saveProviderProfile(provider.id, {
      name: shopName,
      specialty: specialty,
      location: location,
      bio: bio,
    });
    toast({
      title: "Profile Saved!",
      description: "Your public profile has been updated.",
    });
  };

  const handleStatusChange = (bookingId: string, status: Booking['status']) => {
    updateBookingStatus(bookingId, status, 'provider');
    // Re-setting from the server-fetched data for simplicity, in real app you might refetch
    setBookings(data?.bookings || []);
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

  const getBookingActions = (booking: Booking) => {
    const chatLink = `/messages?providerId=${booking.providerId}&clientId=${booking.clientName}`;
    if (booking.status === 'Pending') {
        return (
            <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Approve
                    </Link>
                </Button>
                 <Button size="sm" variant="ghost" asChild>
                    <Link href={chatLink}>
                        <MessageSquare className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        )
    }

    if (booking.status === 'Completed' || booking.status === 'Cancelled') {
        return (
            <Button size="sm" variant="secondary" asChild>
                <Link href={`/booking/manage/${booking.id}`}>View Details</Link>
            </Button>
        )
    }
    
    return (
         <Button size="sm" variant="outline" asChild>
            <Link href={`/booking/manage/${booking.id}`}>Manage</Link>
        </Button>
    )
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

  const today = startOfDay(new Date());

  const currentBookings = bookings.filter(b => 
    new Date(b.date) >= today && (b.status === 'Pending' || b.status === 'Confirmed' || b.status === 'Review Order and Pay')
  ).sort((a, b) => new Date(a.date).getTime() - new Date(a.date).getTime());

  const pastBookings = bookings.filter(b => 
      new Date(b.date) < today || b.status === 'Completed' || b.status === 'Cancelled'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


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
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/>Shop Profile</CardTitle>
                        <CardDescription>This information is displayed publicly on your profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="shop-name">Shop Name</Label>
                            <Input id="shop-name" value={shopName} onChange={e => setShopName(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="specialty">Specialty</Label>
                            <Input id="specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={location} onChange={e => setLocation(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio">About / Bio</Label>
                            <Textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={5} />
                        </div>
                         <div className="space-y-2">
                            <Label>Your Badges</Label>
                             <div className="flex flex-wrap gap-2">
                                {provider.badges.map(providerBadge => {
                                  const badgeInfo = allBadges.find(b => b.name === providerBadge.name);
                                  if (!badgeInfo) return null;
                                  return (
                                    <Badge key={badgeInfo.id} variant="secondary">{badgeInfo.levels[providerBadge.level].name}</Badge>
                                  )
                                })}
                            </div>
                        </div>
                         <Button onClick={handleProfileSave}>
                            <Save className="mr-2 h-4 w-4" />
                            Save Profile
                        </Button>
                    </CardContent>
                </Card>
                <BadgeProgress />
            </div>
            <div className="space-y-8">
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
                <ServiceManagementCard providerId={provider.id} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <Tabs defaultValue="current">
            <TabsList>
                <TabsTrigger value="current">Current Bookings</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
                <Card>
                    <CardHeader>
                    <CardTitle>Current Bookings</CardTitle>
                    <CardDescription>View and manage all your active and pending client bookings.</CardDescription>
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
                        {currentBookings.length > 0 ? currentBookings.map(booking => (
                            <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.clientName}</TableCell>
                            <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                            <TableCell>{format(new Date(booking.date), "PPP p")}</TableCell>
                            <TableCell>
                                <StatusBadge status={booking.status} view="provider" />
                            </TableCell>
                            <TableCell className="text-right">
                                {getBookingActions(booking)}
                            </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">No current bookings.</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="past">
                <Card>
                    <CardHeader>
                    <CardTitle>Past Bookings</CardTitle>
                    <CardDescription>View your completed and cancelled booking history.</CardDescription>
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
                        {pastBookings.length > 0 ? pastBookings.map(booking => (
                            <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.clientName}</TableCell>
                            <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                            <TableCell>{format(new Date(booking.date), "PPP p")}</TableCell>
                            <TableCell>
                                <StatusBadge status={booking.status} view="provider" />
                            </TableCell>
                            <TableCell className="text-right">
                                {getBookingActions(booking)}
                            </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">No past bookings.</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${data?.stats.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+{data?.stats.revenueChange}% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{data?.stats.totalBookings}</div>
                <p className="text-xs text-muted-foreground">+{data?.stats.bookingsChange}% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{data?.stats.newClients}</div>
                <p className="text-xs text-muted-foreground">+{data?.stats.clientsChange} since last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.provider.rating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">Based on {data?.provider.reviewCount} reviews</p>
              </CardContent>
            </Card>
          </div>
          <MonthlyEarningsChart />
        </TabsContent>

      </Tabs>
    </div>
  )
}
