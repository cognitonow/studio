'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateBooking, getServicesByIds, updateBookingStatus, saveProviderServices } from '@/lib/data';
import type { Service, Booking, Provider } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Clock, PlusCircle, Trash2, XCircle, Save, ArrowLeft, CreditCard, User, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { AddServiceDialogContent } from '@/components/manage-booking/add-service-dialog';
import { CancelBookingDialog } from '@/components/manage-booking/cancel-booking-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ClientDetails } from '@/components/manage-booking/client-details';
import { Input } from '@/components/ui/input';
import { useUserRole } from '@/hooks/use-user-role';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';


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

const PaymentForm = ({ onConfirmPayment, totalCost }: { onConfirmPayment: () => void, totalCost: number }) => (
    <Card>
        <CardHeader>
            <CardTitle>Confirm & Pay</CardTitle>
            <CardDescription>Enter your payment details to confirm your booking.</CardDescription>
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
             <Button size="lg" className="w-full" onClick={onConfirmPayment}>Pay ${totalCost.toFixed(2)}</Button>
        </CardContent>
    </Card>
);

interface ManageBookingPageClientProps {
    initialBooking: Booking;
    initialProvider: Provider;
    initialServices: Service[];
}

export function ManageBookingPageClient({
    initialBooking,
    initialProvider,
    initialServices
}: ManageBookingPageClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { role: userRole } = useUserRole();

  const [booking, setBooking] = useState<Booking | null | undefined>(initialBooking);
  const [provider, setProvider] = useState<Provider | undefined>(initialProvider);
  const [bookedServices, setBookedServices] = useState<Service[]>(initialServices);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(initialBooking.date));
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  
  if (!booking || !provider) {
    // This case should be handled by the server component returning notFound()
    return <div className="container mx-auto py-12 px-4 text-center">Loading booking details...</div>;
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
    setIsAddServiceDialogOpen(false);
  };
  
  const handleAddCustomServiceToBooking = (name: string, price: number, duration: number) => {
      const newCustomService: Service = {
        id: `custom-${Date.now()}`,
        categoryId: 'custom', 
        name: name,
        description: 'Custom service added for this booking.',
        price: price,
        duration: duration,
      };
      
      setBookedServices(prev => [...prev, newCustomService]);
      setIsAddServiceDialogOpen(false);
  };

  const handleRemoveService = (serviceId: string) => {
    setBookedServices(prev => prev.filter(s => s.id !== serviceId));
  };
  
  const handleSaveChanges = () => {
    if (booking && selectedDate) {
      const newCustomServices = bookedServices.filter(s => s.id.startsWith('custom-'));
      if(newCustomServices.length > 0) {
        saveProviderServices(provider.id, [...provider.services, ...newCustomServices]);
      }

      updateBooking(booking.id, { 
          date: selectedDate.toISOString(),
          serviceIds: bookedServices.map(s => s.id),
      }, booking);
      
      toast({
        title: "Booking Updated!",
        description: "The appointment details have been successfully saved.",
      });
      router.push(userRole === 'provider' ? '/dashboard' : '/bookings'); 
    }
  };
  
  const handleCancelBooking = (cancelledBy: 'client' | 'provider') => {
    if (booking) {
      updateBookingStatus(booking.id, 'Cancelled', cancelledBy);
      toast({
        title: booking.status === 'Pending' ? 'Request Cancelled' : 'Booking Cancelled',
        description: "The appointment has been successfully cancelled.",
        variant: "destructive",
      });
      router.push(userRole === 'provider' ? '/dashboard' : '/bookings');
    }
  };

  const handleApproveBooking = () => {
      if (booking) {
          updateBookingStatus(booking.id, 'Review Order and Pay', 'provider');
          toast({
            title: 'Request Approved!',
            description: 'The client has been notified to complete payment.'
          });
          router.push('/dashboard');
      }
  }
  
  const handleConfirmPayment = () => {
    if (booking) {
        updateBooking(booking.id, { isPaid: true, status: 'Confirmed' }, booking);
        setBooking(prev => prev ? { ...prev, isPaid: true, status: 'Confirmed' } : null);
        toast({
            title: "Payment Successful!",
            description: "Your booking is paid and confirmed.",
        });
    }
  };

  const totalCost = bookedServices.reduce((acc, service) => acc + service.price, 0);
  const totalDuration = bookedServices.reduce((acc, service) => acc + service.duration, 0);

  const isReadOnly = booking.status === 'Completed' || booking.status === 'Cancelled';
  const showPaymentForm = userRole === 'client' && booking.status === 'Review Order and Pay' && !booking.isPaid;
  const canClientCancelRequest = userRole === 'client' && booking.status === 'Pending';
  const canProviderAmend = userRole === 'provider' && ['Pending', 'Review Order and Pay', 'Confirmed'].includes(booking.status);
  const canProviderEditDateTime = userRole === 'provider' && ['Pending', 'Confirmed'].includes(booking.status);
  const needsProviderAction = userRole === 'provider' && booking.status === 'Pending';
  const canProviderCancel = userRole === 'provider' && ['Review Order and Pay', 'Confirmed'].includes(booking.status);
  const canSaveChanges = canProviderAmend;
  const returnPath = userRole === 'provider' ? '/dashboard' : '/bookings';

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.push(returnPath)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {userRole === 'provider' ? 'Return to Dashboard' : 'Return to My Bookings'}
        </Button>
        <h1 className="text-4xl font-bold font-headline mb-8">
            {userRole === 'provider' ? 'Manage Client Booking' : 'Manage Your Booking'}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="space-y-8">
             {userRole === 'client' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Appointment with {provider.name}</CardTitle>
                        <CardDescription>
                            <Link href={`/provider/${provider.id}`} className="hover:underline text-primary">View their profile</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                         <Avatar className="w-16 h-16">
                            <AvatarImage src={provider.avatarUrl} alt={provider.name} data-ai-hint={provider.dataAiHint} />
                            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                            <p className="font-semibold">Date & Time</p>
                            <p className="text-muted-foreground">
                            {selectedDate 
                            ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
                            : 'No date selected'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
             )}

            {userRole === 'provider' && <ClientDetails clientName={booking.clientName || 'Client'} />}

            <Card>
              <CardHeader>
                <CardTitle>Booked Services</CardTitle>
                {!isReadOnly && <CardDescription>Add or remove services from this appointment.</CardDescription>}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookedServices.length > 0 ? bookedServices.map(service => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-muted-foreground">${service.price} - {service.duration} min</p>
                      </div>
                      {canProviderAmend && (
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-4">No services selected.</p>
                  )}
                </div>
                <Separator className="my-6" />
                {canProviderAmend && (
                    <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Another Service
                            </Button>
                        </DialogTrigger>
                        <AddServiceDialogContent 
                            providerServices={provider.services}
                            onAddService={handleAddService}
                            onAddCustomService={handleAddCustomServiceToBooking}
                        />
                    </Dialog>
                )}
                
                <div className="mt-6 text-right">
                    <p className="text-sm text-muted-foreground">Total duration: {totalDuration} min</p>
                    <p className="text-xl font-bold">Total: ${totalCost.toFixed(2)}</p>
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {showPaymentForm ? (
                <PaymentForm onConfirmPayment={handleConfirmPayment} totalCost={totalCost} />
            ) : (
                <Card>
                <CardHeader>
                    <CardTitle>{isReadOnly ? 'Appointment Date & Time' : 'Amend Date & Time'}</CardTitle>
                    {canProviderEditDateTime && <CardDescription>Select a new time for your appointment.</CardDescription>}
                </CardHeader>
                <CardContent className="flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                        disabled={isReadOnly || !canProviderEditDateTime}
                        />
                        <div className="w-full space-y-2">
                            <Label htmlFor="time" className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Appointment Time</span>
                            </Label>
                            <Select 
                                onValueChange={handleTimeSelect}
                                value={selectedDate ? `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`: ''}
                                disabled={isReadOnly || !canProviderEditDateTime || !selectedDate}
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
            )}

            <div className="flex flex-col gap-4">
                {needsProviderAction && (
                    <>
                        <Button size="lg" onClick={handleApproveBooking}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Approve Request
                        </Button>
                        <CancelBookingDialog onConfirm={() => handleCancelBooking('provider')}>
                             <Button size="lg" variant="destructive">
                                <ThumbsDown className="mr-2 h-4 w-4" />
                                Decline Request
                            </Button>
                        </CancelBookingDialog>
                         <Button size="lg" variant="outline" asChild>
                            <Link href={`/messages?providerId=${booking.providerId}&clientId=${booking.clientName}`}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Chat with Client
                            </Link>
                        </Button>
                    </>
                )}

                {canProviderCancel && (
                     <CancelBookingDialog onConfirm={() => handleCancelBooking('provider')}>
                        <Button variant="destructive" size="lg" className="w-full">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Booking
                        </Button>
                    </CancelBookingDialog>
                )}

                {canSaveChanges && (
                    <Button size="lg" className="w-full" onClick={handleSaveChanges} disabled={bookedServices.length === 0}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                )}

                 {canClientCancelRequest && (
                     <CancelBookingDialog onConfirm={() => handleCancelBooking('client')}>
                        <Button variant="destructive" size="lg" className="w-full">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Request
                        </Button>
                    </CancelBookingDialog>
                 )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
