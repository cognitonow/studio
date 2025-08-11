
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
import { getBookings, getServicesByIds, services as allServices } from "@/lib/data"
import { useEffect, useState } from "react"
import type { Booking } from "@/lib/types"

export default function ClientBookingsPage() {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const { upcoming, past } = getBookings();
    setUpcomingBookings(upcoming);
    setPastBookings(past);
  }, []);

  const renderServices = (serviceIds: string[]) => {
    const services = getServicesByIds(serviceIds);
    return services.map(s => s.name).join(', ');
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
              <CardDescription>Here are your confirmed future bookings. You can amend or cancel them here.</CardDescription>
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
                  {upcomingBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.providerName}</TableCell>
                      <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/booking/manage/${booking.id}`}>Manage</Link>
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
                  {pastBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.providerName}</TableCell>
                      <TableCell>{renderServices(booking.serviceIds)}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge>{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                          <Button variant="secondary" size="sm" asChild>
                            <Link href={`/book/${booking.providerId}?service=${booking.serviceIds[0]}`}>Book Again</Link>
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
