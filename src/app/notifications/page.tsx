'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, MessageSquare, XCircle, CreditCard, Star } from "lucide-react"
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/lib/data';
import type { Notification } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserRole } from '@/hooks/use-user-role';

const NotificationList = ({ items, onItemClick }: { items: Notification[], onItemClick: (id: number) => void }) => {
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
            case 'payment':
                return <CreditCard className="h-6 w-6 text-orange-500" />;
            case 'review':
                return <Star className="h-6 w-6 text-yellow-500" />;
            default:
                return <Bell className="h-6 w-6 text-muted-foreground" />;
        }
    }
    
    const getNotificationLink = (notification: Notification) => {
        if (notification.bookingId) {
            // Special case for review confirmations, link to the provider's page
            if (notification.icon === 'review' && notification.providerId) {
                return `/provider/${notification.providerId}`;
            }
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
        
        const wrapperProps = isClickable ? { 
            href: getNotificationLink(notification),
            onClick: () => onItemClick(notification.id),
        } : {};


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
    const { role } = useUserRole();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        setNotifications(getNotifications(role));
    }, [role]);

    const handleMarkAllAsRead = () => {
        markAllNotificationsAsRead(role);
        setNotifications(getNotifications(role));
    }

    const handleItemClick = (id: number) => {
        markNotificationAsRead(id, role);
        setNotifications(getNotifications(role));
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
                            {notifications.some(n => !n.read) && (
                                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>Mark all as read</Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <NotificationList items={notifications} onItemClick={handleItemClick} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
