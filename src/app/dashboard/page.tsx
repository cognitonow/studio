
'use client'

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Award, Bell, CheckCircle, MessageSquare, XCircle, Contact } from "lucide-react"
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
import { getProviderBookings, updateBookingStatus, getServicesByIds, getNotifications } from '@/lib/data';
import type { Booking, Notification } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
  
const NotificationList = ({ items }: { items: Notification[] }) => {
    const getIcon = (icon: Notification['icon']) => {
        switch (icon) {
            case 'new-booking':
                return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'cancellation':
                return <XCircle className="h-6 w-6 text-red-500" />;
            case 'message':
                return <MessageSquare className="h-6 w-6 text-primary" />;
            case 'confirmation':
                 return <CheckCircle className="h-6 w-6 text-blue-500" />;
            default:
                return <Bell className="h-6 w-6 text-muted-foreground" />;
        }
    }
    return (
    <div className="space-y-4">
      {items.length > 0 ? items.map((notification) => (
        <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg ${!notification.read ? 'bg-muted/50 border' : 'border-transparent'}`}>
          <div className="mt-1">
            {getIcon(notification.icon)}
          </div>
          <div className="flex-grow">
            <p className="font-semibold">{notification.title}</p>
            <p className="text-sm text-muted-foreground">{notification.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
          </div>
          {!notification.read && (
            <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2"></div>
          )}
        </div>
      )) : (
          <p className="text-muted-foreground text-center py-8">No new notifications.</p>
      )}
    </div>
  )};

export default function ProviderDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setBookings(getProviderBookings());
    setNotifications(getNotifications());
  }, []);

  const handleStatusChange = (bookingId: string, status: Booking['status']) => {
    updateBookingStatus(bookingId, status);
    setBookings(getProviderBookings());
    setNotifications(getNotifications());
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
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
    const bookingDate = new Date(booking.date);
    const now = new Date();
    
    const actions: JSX.Element[] = [];

    if (booking.status !== 'Cancelled' && booking.status !== 'Completed') {
         actions.push(
            <Button key="contact" size="sm" variant="ghost" asChild>
                <Link href="/messages">
                    <Contact className="h-4 w-4" />
                </Link>
            </Button>
        );
    }

    switch (booking.status) {
      case 'Pending':
        actions.push(
             <Button key="manage" size="sm" variant="outline" asChild>
                <Link href={`/booking/manage/${booking.id}`}>Manage</Link>
            </Button>,
            <Button key="confirm" size="sm" variant="outline" onClick={() => handleStatusChange(booking.id, 'Confirmed')}>Confirm</Button>,
            <Button key="cancel" size="sm" variant="destructive" onClick={() => handleStatusChange(booking.id, 'Cancelled')}>Cancel</Button>
        );
        break;
      case 'Confirmed':
        if (bookingDate <= now) {
          actions.push(<Button key="complete" size="sm" onClick={() => handleStatusChange(booking.id, 'Completed')}>Mark as Completed</Button>);
        } else {
            actions.push(
                 <Button key="manage" size="sm" variant="outline" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>Manage</Link>
                </Button>,
                <Button key="cancel" size="sm" variant="destructive" onClick={() => handleStatusChange(booking.id, 'Cancelled')}>Cancel</Button>
            );
        }
        break;
      default:
        return null;
    }
    
    return <div className="flex gap-2 justify-end">{actions}</div>;
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
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Booking Management</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

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

        <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Bell className="w-6 h-6"/>
                                Recent Updates
                            </CardTitle>
                            <CardDescription>Stay up-to-date with your bookings and messages.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Mark all as read</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <NotificationList items={notifications} />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
