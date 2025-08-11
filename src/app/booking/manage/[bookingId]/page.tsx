
'use client'

import { useState, useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { providers, getBookingById, updateBooking, getServicesByIds, updateBookingStatus } from '@/lib/data';
import type { Service, Booking } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Clock, PlusCircle, Trash2, XCircle, Save } from 'lucide-react';
import { AddServiceDialog } from '@/components/manage-booking/add-service-dialog';
import { CancelBookingDialog } from '@/components/manage-booking/cancel-booking-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';


const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

// Helper to format time to AM/PM
const formatToAmPm = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
};

export default function ManageBookingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const [bookedServices, setBookedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  useEffect(() => {
    if (bookingId) {
      const foundBooking = getBookingById(bookingId);
      setBooking(foundBooking);
      if (foundBooking) {
        setBookedServices(getServicesByIds(foundBooking.serviceIds));
        setSelectedDate(new Date(foundBooking.date));
      }
    }
  }, [bookingId]);
  
  const provider = providers.find(p => p.id === booking?.providerId);
  
  if (booking === undefined) {
    return <div>Loading...</div>;
  }

  if (!booking || !provider) {
    notFound();
  }
  
  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours, minutes, 0, 0);
      setSelectedDate(newDate);
    }
  };

  const handleAddService = (service: Service) => {
    if (!bookedServices.find(s => s.id === service.id)) {
      setBookedServices(prev => [...prev, service]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setBookedServices(prev => prev.filter(s => s.id !== serviceId));
  };
  
  const handleSaveChanges = () => {
    if (booking && selectedDate) {
      updateBooking(booking.id, { 
          date: selectedDate.toISOString(),
          serviceIds: bookedServices.map(s => s.id),
      });
      toast({
        title: "Booking Updated!",
        description: "Your appointment details have been successfully saved.",
      });
      router.push('/dashboard'); 
    }
  };
  
  const handleCancelBooking = () => {
    if (booking) {
      updateBookingStatus(booking.id, 'Cancelled');
      toast({
        title: "Booking Cancelled",
        description: "The appointment has been successfully cancelled.",
        variant: "destructive",
      });
      router.push('/dashboard');
    }
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
                      ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
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
                  {bookedServices.length > 0 ? bookedServices.map(service => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-muted-foreground">${service.price} - {service.duration} min</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-4">No services selected.</p>
                  )}
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
                <div className="flex flex-col items-center gap-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                    <div className="w-full space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Appointment Time</span>
                        </Label>
                        <Select 
                            onValueChange={handleTimeSelect}
                            value={selectedDate ? `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`: ''}
                            disabled={!selectedDate}
                        >
                            <SelectTrigger id="time">
                                <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTimes.map(time => (
                                    <SelectItem key={time} value={time}>{formatToAmPm(time)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
               <Button size="lg" className="w-full" onClick={handleSaveChanges} disabled={bookedServices.length === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
               <CancelBookingDialog onConfirm={handleCancelBooking}>
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
