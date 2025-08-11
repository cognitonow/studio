
'use client'

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { providers, services as allServices } from '@/lib/data';
import type { Service } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Clock, PlusCircle, Trash2, XCircle, AlertTriangle, Save } from 'lucide-react';
import { AddServiceDialog } from '@/components/manage-booking/add-service-dialog';
import { CancelBookingDialog } from '@/components/manage-booking/cancel-booking-dialog';

// Mock data - in a real app, this would be fetched from a database
const mockBooking = {
  id: "1",
  providerId: "3",
  serviceIds: ["hair-22"],
  date: new Date("2024-08-15T14:00:00"),
};

export default function ManageBookingPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  // For now, we'll use the mock booking if the ID matches.
  const booking = bookingId === mockBooking.id ? mockBooking : null;

  const provider = providers.find(p => p.id === booking?.providerId);
  
  const [bookedServices, setBookedServices] = useState<Service[]>(() => 
    allServices.filter(s => booking?.serviceIds.includes(s.id))
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(booking?.date);

  if (!booking || !provider) {
    notFound();
  }

  const handleAddService = (service: Service) => {
    if (!bookedServices.find(s => s.id === service.id)) {
      setBookedServices(prev => [...prev, service]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setBookedServices(prev => prev.filter(s => s.id !== serviceId));
  };
  
  const totalCost = bookedServices.reduce((acc, service) => acc + service.price, 0);
  const totalDuration = bookedServices.reduce((acc, service) => acc + service.duration, 0);


  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8">Manage Your Booking</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Column: Booking Details & Services */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Current Appointment</CardTitle>
                <CardDescription>With {provider.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {selectedDate 
                      ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                      : 'No date selected'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booked Services</CardTitle>
                <CardDescription>Add or remove services from your appointment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookedServices.map(service => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-muted-foreground">${service.price} - {service.duration} min</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <AddServiceDialog 
                  providerServices={provider.services}
                  onAddService={handleAddService}
                >
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Service
                  </Button>
                </AddServiceDialog>
                
                <div className="mt-6 text-right">
                    <p className="text-sm text-muted-foreground">New duration: {totalDuration} min</p>
                    <p className="text-xl font-bold">New Total: ${totalCost.toFixed(2)}</p>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Column: Calendar & Actions */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Amend Date & Time</CardTitle>
                <CardDescription>Select a new time for your appointment.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
               <Button size="lg" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
               <CancelBookingDialog onConfirm={() => console.log('Booking cancelled')}>
                    <Button variant="destructive" size="lg" className="w-full">
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Booking
                    </Button>
               </CancelBookingDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
