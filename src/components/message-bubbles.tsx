
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CreditCard, Sparkles } from "lucide-react"
import type { Message, Conversation } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MessageProps {
    message: Message;
}

interface UserMessageProps extends MessageProps {
    view: 'client' | 'provider';
}

interface ProviderMessageProps extends MessageProps {
    activeConversation: Conversation;
}

export const UserMessage = ({ message, view }: UserMessageProps) => {
    return (
        <div className="flex items-end gap-3 justify-end">
            <div className="flex flex-col gap-1 items-end">
                <div className={cn(
                    "rounded-lg px-4 py-3 max-w-md",
                    "bg-primary text-primary-foreground",
                    message.isAi && 'bg-purple-100 dark:bg-purple-900/50 text-foreground'
                )}>
                    <p className="text-sm">{message.text}</p>
                    {message.isAi && message.bookingId && (
                        <Button asChild size="sm" className="mt-3">
                            <Link href={`/booking/manage/${message.bookingId}`}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                {view === 'client' ? 'Review & Pay' : 'Manage Booking'}
                            </Link>
                        </Button>
                    )}
                </div>
                 {message.isAi && (
                    <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 pr-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Sent by AI Assistant</span>
                    </div>
                )}
            </div>
            <Avatar className="w-8 h-8">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                <AvatarFallback>{view === 'client' ? 'U' : 'P'}</AvatarFallback>
            </Avatar>
        </div>
    );
};

export const ProviderMessage = ({ message, activeConversation }: ProviderMessageProps) => {
    return (
        <div className="flex items-end gap-3">
            <Avatar className="w-8 h-8">
                <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-start">
                <div className={cn(
                    "rounded-lg px-4 py-3 max-w-md",
                    "bg-muted",
                    message.isAi && 'bg-purple-100 dark:bg-purple-900/50 text-foreground'
                )}>
                    <p className="text-sm">{message.text}</p>
                     {message.isAi && message.bookingId && (
                        <Button asChild size="sm" className="mt-3">
                            <Link href={`/booking/manage/${message.bookingId}`}>
                                View Booking Details
                            </Link>
                        </Button>
                    )}
                </div>
                {message.isAi && (
                    <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 pl-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Sent by AI Assistant</span>
                    </div>
                )}
            </div>
        </div>
    );
};
