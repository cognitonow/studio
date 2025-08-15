
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBookings, getServicesByIds } from "@/lib/data"
import { useEffect, useState } from "react"
import type { Booking } from "@/lib/types"
import { CreditCard } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"

export default function ClientBookingsPage() {
  const [bookings, setBookings] = useState<{ upcoming: Booking[], past: Booking[] }>({ upcoming: [], past: [] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // This function will run on mount and every time the component is focused
    const fetchBookings = () => {
        const allBookings = getBookings();
        setBookings(allBookings);
    };

    fetchBookings();

    // Re-fetch when the window gets focus, to catch updates from other tabs
    window.addEventListener('focus', fetchBookings);

    return () => {
        window.removeEventListener('focus', fetchBookings);
    };
  }, []);

  const renderServices = (serviceIds: string[]) => {
    const services = getServicesByIds(serviceIds);
    return services.map(s => s.name).join(', ');
  }
  
  const renderBookingActions = (booking: Booking) => {
    switch (booking.status) {
        case 'Review Order and Pay':
            return (
                <Button size="sm" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Make Payment
                    </Link>
                </Button>
            );
        case 'Pending':
             return (
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>View</Link>
                </Button>
            )
        default:
             return (
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/booking/manage/${booking.id}`}>Manage</Link>
                </Button>
            );
    }
  }

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-8">My Bookings</h1>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Here are your requested and confirmed future bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Service(s)</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.upcoming.length > 0 ? bookings.upcoming.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.providerName}</TableCell>
                      <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="text-right">
                          {renderBookingActions(booking)}
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">You have no upcoming appointments.</TableCell>
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
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>Review your past services and providers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Service(s)</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {bookings.past.length > 0 ? bookings.past.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.providerName}</TableCell>
                      <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="text-right">
                          <Button variant="secondary" size="sm" asChild>
                            <Link href={`/booking/manage/${booking.id}`}>View Details</Link>
                          </Button>
                      </TableCell>
                    </TableRow>
                   )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">You have no past appointments.</TableCell>
                    </TableRow>
                   )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
