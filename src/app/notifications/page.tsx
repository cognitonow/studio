
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, MessageSquare, XCircle } from "lucide-react"
import { getNotifications } from '@/lib/data';
import type { Notification } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NotificationList = ({ items }: { items: Notification[] }) => {
    const getIcon = (icon: Notification['icon']) => {
        switch (icon) {
            case 'new-booking':
                return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'cancellation':
                return <XCircle className="h-6 w-6 text-red-500" />;
            case 'message':
                return <MessageSquare className="h-6 w-6 text-primary" />;
            case 'confirmation':
                 return <CheckCircle className="h-6 w-6 text-blue-500" />;
            default:
                return <Bell className="h-6 w-6 text-muted-foreground" />;
        }
    }
    
    const getNotificationLink = (notification: Notification) => {
        if (notification.bookingId) {
            return `/booking/manage/${notification.bookingId}`;
        }
        if (notification.icon === 'message') {
            return '/messages';
        }
        return '#';
    }

    return (
    <div className="space-y-4">
      {items.length > 0 ? items.map((notification) => {
        const isClickable = notification.bookingId || notification.icon === 'message';
        const Wrapper = isClickable ? Link : 'div';
        const wrapperProps = isClickable ? { href: getNotificationLink(notification) } : {};

        return (
            <Wrapper key={notification.id} {...wrapperProps} className="block">
                <div className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border transition-colors",
                    !notification.read ? 'bg-muted/50 border-muted-foreground/20' : 'border-transparent',
                    isClickable && "hover:bg-accent hover:border-accent-foreground/30 cursor-pointer"
                    )}>
                    <div className="mt-1">
                        {getIcon(notification.icon)}
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
            </Wrapper>
        )
        }
      ) : (
          <p className="text-muted-foreground text-center py-8">No new notifications.</p>
      )}
    </div>
  )};


export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        setNotifications(getNotifications());
    }, []);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto">
                 <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2 font-headline">
                                    <Bell className="w-6 h-6"/>
                                    Recent Updates
                                </CardTitle>
                                <CardDescription>Stay up-to-date with your bookings and messages.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={markAllAsRead}>Mark all as read</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <NotificationList items={notifications} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
