

'use client'

import { useState, useEffect } from 'react';
import { useUserStore } from '@/hooks/use-user-store';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';


// Provider Dashboard Components
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
import { getProviderBookings, updateBookingStatus, getServicesByIds, providers as allProviders, getActiveBookings, getProviderByUserId, saveProviderProfile } from '@/lib/data';
import type { Booking, Provider, Service } from '@/lib/types';
import { format, startOfDay, formatDistanceToNowStrict } from 'date-fns';
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

// Client Dashboard Components
import { Heart, Repeat, Pencil } from "lucide-react"
import { getClientDashboardData } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';
import { allBadges } from '@/lib/badges';


// Provider Dashboard Component
function ProviderDashboard() {
  const { user } = useUserStore();
  const { toast } = useToast();
  const [provider, setProvider] = useState<Provider | undefined>(undefined);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [featuredImages, setFeaturedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // State for the editable profile fields
  const [shopName, setShopName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');


  useEffect(() => {
    if (user) {
      const currentProvider = getProviderByUserId(user.id);
      if (currentProvider) {
        setProvider(currentProvider);
        setFeaturedImages(new Set(currentProvider.portfolio.slice(0, 3).map(p => p.id)));
        setBookings(getProviderBookings(currentProvider.id));
        // Initialize form state
        setShopName(currentProvider.name);
        setSpecialty(currentProvider.specialty);
        setLocation(currentProvider.location);
        setBio(currentProvider.bio);
      }
      setIsLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    if (!provider) return;
    
    const fetchBookings = () => {
      setBookings(getProviderBookings(provider.id));
    };
    
    fetchBookings();
    
    // Re-fetch data on window focus to keep it fresh
    window.addEventListener('focus', fetchBookings);

    return () => {
      window.removeEventListener('focus', fetchBookings);
    };
  }, [provider]);

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

  if (isLoading) {
      return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold font-headline mb-8">
                <Skeleton className="h-10 w-3/4" />
            </h1>
            <div className="space-y-4">
                <div className="flex space-x-1">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-48" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-10 w-32" />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-16 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-8">
                        <Card>
                            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                            <CardContent className="space-y-4">
                                 <Skeleton className="h-16 w-full" />
                                 <Skeleton className="h-10 w-32" />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-40 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
      );
  }
  
  if (!provider) {
    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <h2 className="text-2xl font-bold">Provider Profile Not Found</h2>
            <p className="text-muted-foreground mt-2">We couldn't find a provider profile associated with your account.</p>
        </div>
    );
  }

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

// Client Dashboard Component
interface ClientDashboardData {
    totalBookings: number;
    averageSpend: number;
    previousBookings: Booking[];
    favoriteProvider?: Provider;
    activeBookings: (Booking & { services: Service[] })[];
}

function ClientDashboard() {
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


export default function DashboardPage() {
    const { role, isLoading, user } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
        // Show a loading skeleton or a blank page while redirecting
        return (
            <div className="container mx-auto py-12 px-4">
                 <h1 className="text-4xl font-bold font-headline mb-8">
                    <Skeleton className="h-10 w-3/4" />
                </h1>
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (role === 'provider') {
        return <ProviderDashboard />;
    }
    
    // Default to ClientDashboard for 'client' role
    return <ClientDashboard />;
}
