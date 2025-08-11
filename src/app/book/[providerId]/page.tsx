'use client'

import { useSearchParams } from 'next/navigation';
import { getProviderById, services as allServices } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';
import { Chat } from '@/components/chat';

export default function BookingPage({ params }: { params: { providerId: string } }) {
  const { providerId } = params;
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  
  const provider = getProviderById(providerId);
  const service = allServices.find(s => s.id === serviceId);

  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!provider || !service) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 text-center">Confirm Your Booking</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{service.name}</CardTitle>
                <CardDescription>with {provider.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-2xl mb-2">${service.price}</p>
                <p className="text-muted-foreground">{service.duration} minutes</p>
                <p className="mt-4">{service.description}</p>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline">Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Payment Information</CardTitle>
                <CardDescription>Your card will be authorized but not charged.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="**** **** **** ****" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Chat />

            <Button size="lg" className="w-full">Confirm & Book for ${service.price}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
