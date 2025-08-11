
'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { getProviderById, services as allServices } from '@/lib/data';
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
  const service = allServices.find(s => s.id === serviceId);

  if (!provider || !service || !date) {
    // Return a loading state or null while date is being set
    // to avoid trying to render with an undefined date.
    // Or, you can show a loading spinner.
    // For now, notFound() is fine if the params are essential.
    if (!provider || !service || !dateStr) {
      notFound();
    }
    return null; 
  }
  
  const handleConfirmBooking = () => {
    // In a real app, you would process the payment here.
    // For now, we'll just navigate to the messages page.
    console.log('Booking confirmed!');
    router.push('/messages');
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
                <div className="space-y-2">
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-muted-foreground">
                        {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-muted-foreground">
                        {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                </div>
                 <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-xl">
                    <span>Total</span>
                    <span>${service.price}</span>
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
            <Button size="lg" className="w-full" onClick={handleConfirmBooking}>Confirm & Book for ${service.price}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
