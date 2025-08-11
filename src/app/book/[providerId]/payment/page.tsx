
'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { getProviderById, getServicesByIds, addBooking, services as allServices } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const providerId = params.providerId as string;
  const serviceId = searchParams.get('service');
  const dateStr = searchParams.get('date');

  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (dateStr) {
      setDate(new Date(dateStr));
    }
  }, [dateStr]);

  const provider = getProviderById(providerId);
  // In a multi-service booking, you might get an array of IDs
  const serviceIds = serviceId ? [serviceId] : [];
  const services = getServicesByIds(serviceIds);
  const totalCost = services.reduce((acc, service) => acc + service.price, 0);

  if (!provider || services.length === 0 || !date) {
    if (!provider || !dateStr) {
      notFound();
    }
    return null; 
  }
  
  const handleConfirmBooking = () => {
    if (!provider || services.length === 0 || !date) return;

    addBooking({
        providerId: provider.id,
        providerName: provider.name,
        serviceIds: services.map(s => s.id),
        date: date.toISOString(),
    });

    router.push('/bookings');
  };
  
  const handleChat = () => {
    router.push('/messages');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Booking Details
        </Button>

        <h1 className="text-4xl font-bold font-headline mb-2 text-center">Confirm & Pay</h1>
        <p className="text-muted-foreground text-center mb-8">Step 2 of 3: Enter your payment details to confirm.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Booking Summary */}
          <div className="space-y-8">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Booking Summary</CardTitle>
                <CardDescription>with {provider.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    {services.map(service => (
                        <div key={service.id} className="flex justify-between">
                            <span>{service.name}</span>
                            <span>${service.price}</span>
                        </div>
                    ))}
                </div>
                 <div className="mt-4 pt-4 border-t space-y-2">
                    <p className="text-muted-foreground">
                        {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-muted-foreground">
                        {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                </div>
                 <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-xl">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full" onClick={handleChat}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with {provider.name}
            </Button>
          </div>

          {/* Right Column: Payment Form */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Payment Information</CardTitle>
                <CardDescription>Your card will be authorized but not charged until the service.</CardDescription>
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
            <Button size="lg" className="w-full" onClick={handleConfirmBooking}>Confirm & Book for ${totalCost.toFixed(2)}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
