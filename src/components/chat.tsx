'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { draftChatResponse } from '@/ai/flows/draft-chat-response';
import { useToast } from '@/hooks/use-toast';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'provider';
}

interface ChatProps {
    providerName: string;
}

export function Chat({ providerName }: ChatProps) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I have a question about my booking.", sender: 'user' },
        { id: 2, text: "Of course! How can I help you?", sender: 'provider' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'user' }]);
            setNewMessage('');
        }
    };
    
    const handleAiAssist = async () => {
        if (!newMessage.trim()) {
            toast({
                title: "AI Assist",
                description: "Please type a short prompt for the AI to get started.",
                variant: 'destructive'
            });
            return;
        }
        
        setIsGenerating(true);
        try {
            const result = await draftChatResponse({ prompt: newMessage, providerName });
            setNewMessage(result.message);
        } catch (error) {
            console.error(error);
            toast({
                title: "AI Assist Failed",
                description: "There was an error generating the message. Please try again.",
                variant: 'destructive'
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Chat with {providerName}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-48 w-full pr-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
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
                        ))}
                    </div>
                </ScrollArea>
                <div className="mt-4 flex w-full items-start space-x-2">
                    <div className="flex-grow space-y-2">
                         <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message or AI prompt..."
                        />
                        <Button onClick={handleAiAssist} disabled={isGenerating} size="sm" variant="outline">
                            {isGenerating ? 
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 
                                <><Sparkles className="mr-2 h-4 w-4" /> AI Assist</>
                            }
                        </Button>
                    </div>
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
