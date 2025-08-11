
'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'provider';
    timestamp: string;
}

export function ProviderChatHistory() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Can I see some more examples of your balayage work?", sender: 'user', timestamp: '2 days ago' },
        { id: 2, text: "Absolutely! I'll send some over to your email. Do you have a specific color palette in mind?", sender: 'provider', timestamp: '2 days ago' },
        { id: 3, text: "Something with caramel and honey tones would be lovely.", sender: 'user', timestamp: '2 days ago' },
        { id: 4, text: "Perfect, I have some great examples for you. Sending them now!", sender: 'provider', timestamp: '2 days ago' },
        { id: 5, text: "Thanks so much!", sender: 'user', timestamp: '2 days ago' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
            setMessages([
                ...messages,
                { id: newId, text: newMessage, sender: 'user', timestamp: 'Just now' }
            ]);
            setNewMessage('');
            // Simulate provider response
            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    { id: newId + 1, text: "Thanks for your message! I'll get back to you shortly.", sender: 'provider', timestamp: 'Just now' }
                ]);
            }, 1000);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Conversation</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-64 w-full pr-4 mb-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex flex-col gap-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {message.sender === 'provider' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman face" />
                                            <AvatarFallback>P</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg px-3 py-2 max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    {message.sender === 'user' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person face" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                                <span className={`text-xs text-muted-foreground px-12`}>
                                    {message.timestamp}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a new message..."
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
