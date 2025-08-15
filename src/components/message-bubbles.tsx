
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { Message, Conversation, Booking, UserRole } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getBookingById } from "@/lib/data"

interface MessageProps {
    message: Message;
}

interface UserMessageProps extends MessageProps {
    view: UserRole;
}

interface ProviderMessageProps extends MessageProps {
    activeConversation: Conversation;
    view: UserRole;
}

export const UserMessage = ({ message, view }: UserMessageProps) => {
    return (
        <div className="flex items-end gap-3 justify-end">
            <div className="flex flex-col gap-1 items-end">
                <div className={cn(
                    "rounded-lg px-4 py-3 max-w-md",
                    "bg-primary text-primary-foreground"
                )}>
                    <p className="text-sm">{message.text}</p>
                </div>
            </div>
            <Avatar className="w-8 h-8">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                <AvatarFallback>{view === 'client' ? 'U' : 'P'}</AvatarFallback>
            </Avatar>
        </div>
    );
};

export const ProviderMessage = ({ message, activeConversation, view }: ProviderMessageProps) => {
    
    // Fetch the booking to check its status
    const booking = message.bookingId ? getBookingById(message.bookingId) : null;

    const showButton = booking && ['Pending', 'Review Order and Pay', 'Confirmed'].includes(booking.status);

    return (
        <div className="flex items-end gap-3">
            <Avatar className="w-8 h-8">
                <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-start">
                <div className={cn(
                    "rounded-lg px-4 py-3 max-w-md",
                    message.isAi 
                        ? "bg-accent/10 border border-accent/20 text-foreground" 
                        : "bg-muted"
                )}>
                    <p className="text-sm">{message.text}</p>
                     {message.isAi && showButton && booking && (
                        <Button asChild size="sm" className="mt-3">
                            <Link href={`/booking/manage/${booking.id}`}>
                                {view === 'client' && booking.status === 'Review Order and Pay' ? 'Review & Pay' : 'Manage Booking'}
                            </Link>
                        </Button>
                    )}
                </div>
                {message.isAi && (
                    <div className="flex items-center gap-1 text-xs text-accent pl-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Sent by AI Assistant</span>
                    </div>
                )}
            </div>
        </div>
    );
};
