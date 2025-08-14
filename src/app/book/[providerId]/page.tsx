

'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { getProviderById, services as allServices, getBookedTimes, addBooking } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Clock, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const allPossibleTimes = [
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

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { toast } = useToast();
  const providerId = params.providerId as string;
  const serviceId = searchParams.get('service');
  
  const provider = getProviderById(providerId);
  const service = allServices.find(s => s.id === serviceId);

  const [date, setDate] = useState<Date | undefined>();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const newDate = new Date();
    newDate.setHours(9,0,0,0);
    setDate(newDate);
  }, []);
  
  useEffect(() => {
    if (date && providerId) {
      const bookedTimes = getBookedTimes(providerId, date);
      const filteredTimes = allPossibleTimes.filter(time => !bookedTimes.includes(time));
      setAvailableTimes(filteredTimes);
    }
  }, [date, providerId]);


  if (!provider || !service) {
    notFound();
  }
  
  if (!isMounted) {
    return null; // or a loading skeleton
  }


  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
        const currentHour = date?.getHours() ?? 9;
        const currentMinutes = date?.getMinutes() ?? 0;
        selectedDate.setHours(currentHour, currentMinutes, 0, 0);
    }
    setDate(selectedDate);
  }

  const handleTimeSelect = (time: string) => {
    if (date) {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      setDate(newDate);
    }
  };
  
  const handleRequestBooking = () => {
    if (!provider || !service || !date) return;

    addBooking({
        providerId: provider.id,
        providerName: provider.name,
        serviceIds: [service.id],
        date: date.toISOString(),
        isPaid: false,
    });
    
    toast({
        title: "Booking Request Sent!",
        description: "Your request has been sent to the provider. You can see its status in 'My Bookings'.",
    });

    router.push('/bookings');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-2 text-center">Request a Booking</h1>
        <p className="text-muted-foreground text-center mb-8">Select your preferred date and time. Your booking will be confirmed by the provider.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={provider.avatarUrl} alt={provider.name} data-ai-hint={provider.dataAiHint} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
                    <CardDescription>with {provider.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-2xl mb-2">${service.price}</p>
                <p className="text-muted-foreground">{service.duration} minutes</p>
                <p className="mt-4">{service.description}</p>
                 {date && (
                    <p className="mt-4 font-semibold">
                        Selected: {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                )}
              </CardContent>
            </Card>
            <Button size="lg" className="w-full" onClick={handleRequestBooking} disabled={!date}>
                Request to Book
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Select Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
               <div className="flex flex-col items-center gap-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                    disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                  <div className="w-full space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Appointment Time</span>
                      </Label>
                      <Select 
                          onValueChange={handleTimeSelect}
                          value={date ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`: ''}
                          disabled={!date}
                      >
                          <SelectTrigger id="time">
                              <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                              {availableTimes.length > 0 ? (
                                availableTimes.map(time => (
                                    <SelectItem key={time} value={time}>{formatToAmPm(time)}</SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-times" disabled>No available times</SelectItem>
                              )}
                          </SelectContent>
                      </Select>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
