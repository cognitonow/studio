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
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBookings, getServicesByIds, addReview } from "@/lib/data"
import { useEffect, useState } from "react"
import type { Booking } from "@/lib/types"
import { CreditCard, Star, Send } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

function ReviewDialog({ booking, onReviewSubmit }: { booking: Booking, onReviewSubmit: () => void }) {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0 || !reviewComment.trim()) return;

    addReview(booking.id, reviewRating, reviewComment);
    
    toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback.",
    });

    // Reset form and close dialog
    setReviewRating(0);
    setReviewComment('');
    setIsOpen(false);
    onReviewSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" />
            Leave a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a review for {booking.providerName}</DialogTitle>
          <DialogDescription>
            Your feedback helps other users and allows the provider to improve.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmitReview}>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                  <Button 
                      key={i} 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setReviewRating(i + 1)}
                  >
                    <Star className={cn("w-6 h-6", i < reviewRating && 'text-primary fill-primary')} />
                  </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-comment">Comment</Label>
            <Textarea 
              id="feedback-comment" 
              placeholder="Tell us about your experience..." 
              rows={4} 
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit" disabled={reviewRating === 0 || !reviewComment.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface BookingsPageClientProps {
    initialBookings: {
        upcoming: Booking[];
        past: Booking[];
    };
}

export function BookingsPageClient({ initialBookings }: BookingsPageClientProps) {
  const [bookings, setBookings] = useState(initialBookings);

  const fetchBookings = () => {
    // getBookings is a client-side function that reads from the mock data source.
    // In a real app, you'd re-fetch from an API route.
    const allBookings = getBookings();
    setBookings(allBookings);
  };
  
  useEffect(() => {
    // Re-fetch when the window gets focus to catch updates from other tabs
    window.addEventListener('focus', fetchBookings);

    return () => {
        window.removeEventListener('focus', fetchBookings);
    };
  }, []);

  const renderServices = (serviceIds: string[]) => {
    const services = getServicesByIds(serviceIds);
    return services.map(s => s.name).join(', ');
  }
  
  const renderUpcomingBookingActions = (booking: Booking) => {
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

  const renderPastBookingActions = (booking: Booking) => {
    if (booking.status === 'Completed' && !booking.reviewId) {
        return <ReviewDialog booking={booking} onReviewSubmit={fetchBookings} />;
    }

    return (
      <Button variant="secondary" size="sm" asChild>
        <Link href={`/booking/manage/${booking.id}`}>View Details</Link>
      </Button>
    )
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
                          {renderUpcomingBookingActions(booking)}
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
                          {renderPastBookingActions(booking)}
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
