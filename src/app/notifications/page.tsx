
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, CheckCircle, MessageSquare, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  {
    id: 1,
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: "Booking Confirmed!",
    description: "Your appointment with Chloe's Hair Haven for a Balayage is confirmed for August 15, 2024 at 2:00 PM.",
    time: "1 hour ago",
    read: false,
    category: 'booking'
  },
  {
    id: 2,
    icon: <Calendar className="h-6 w-6 text-blue-500" />,
    title: "Appointment Reminder",
    description: "Just a friendly reminder about your upcoming Classic Manicure with Olivia's Nail Studio tomorrow at 10:00 AM.",
    time: "5 hours ago",
    read: false,
    category: 'booking'
  },
  {
    id: 3,
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "New Message",
    description: "Glow & Go Esthetics sent you a message about your upcoming Signature Facial.",
    time: "1 day ago",
    read: true,
    category: 'message'
  },
  {
    id: 4,
    icon: <XCircle className="h-6 w-6 text-red-500" />,
    title: "Booking Cancelled",
    description: "Your booking with Bridal Beauty Co. for Bridal Makeup on September 1, 2024 has been cancelled.",
    time: "2 days ago",
    read: true,
    category: 'booking'
  },
  {
      id: 5,
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Booking Confirmed!",
      description: "Your appointment with The Relaxation Station for a Deep Tissue Massage is confirmed for August 20, 2024 at 5:00 PM.",
      time: "3 days ago",
      read: true,
      category: 'booking'
  }
]

const bookingNotifications = notifications.filter(n => n.category === 'booking');
const messageNotifications = notifications.filter(n => n.category === 'message');

const NotificationList = ({ items }: { items: typeof notifications }) => (
  <div className="space-y-4">
    {items.length > 0 ? items.map((notification) => (
      <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg ${!notification.read ? 'bg-muted/50 border' : 'border-transparent'}`}>
        <div className="mt-1">
          {notification.icon}
        </div>
        <div className="flex-grow">
          <p className="font-semibold">{notification.title}</p>
          <p className="text-sm text-muted-foreground">{notification.description}</p>
          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
        </div>
        {!notification.read && (
          <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2"></div>
        )}
      </div>
    )) : (
        <p className="text-muted-foreground text-center py-8">No notifications in this category.</p>
    )}
  </div>
);


export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 flex items-center gap-3">
            <Bell className="w-8 h-8"/>
            Notifications
        </h1>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Your Recent Updates</CardTitle>
                        <CardDescription>Stay up-to-date with your bookings and messages.</CardDescription>
                    </div>
                     <Button variant="outline" size="sm">Mark all as read</Button>
                </div>
            </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <NotificationList items={notifications} />
              </TabsContent>
              <TabsContent value="bookings">
                <NotificationList items={bookingNotifications} />
              </TabsContent>
              <TabsContent value="messages">
                <NotificationList items={messageNotifications} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
