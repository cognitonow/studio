
'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { getProviderById, services as allServices } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Clock, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

export default function BookingPage({ params: { providerId } }: { params: { providerId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  
  const provider = getProviderById(providerId);
  const service = allServices.find(s => s.id === serviceId);

  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!provider || !service) {
    notFound();
  }

  const handleTimeSelect = (time: string) => {
    if (date) {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      setDate(newDate);
    }
  };
  
  const handleProceedToPayment = () => {
    if (date && serviceId) {
      const params = new URLSearchParams({
        service: serviceId,
        date: date.toISOString(),
      });
      router.push(`/book/${providerId}/payment?${params.toString()}`);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-2 text-center">Book Your Service</h1>
        <p className="text-muted-foreground text-center mb-8">Step 1 of 3: Select your preferred date and time.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{service.name}</CardTitle>
                <CardDescription>with {provider.name}</CardDescription>
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
            <Button size="lg" className="w-full" onClick={handleProceedToPayment}>
                Proceed to Payment
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
                    onSelect={setDate}
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
                              {availableTimes.map(time => (
                                  <SelectItem key={time} value={time}>{formatToAmPm(time)}</SelectItem>
                              ))}
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
