
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, User } from "lucide-react"
import { getConversations, getMessagesForConversation, markAllMessagesAsRead, startConversationWithProvider, getProviderConversations, getProviderMessagesForConversation } from "@/lib/data"
import { useState, useEffect } from "react"
import type { Conversation, Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { UserMessage, ProviderMessage } from "@/components/message-bubbles"

type ChatView = 'client' | 'provider';

export default function MessagesPage() {
  const [view, setView] = useState<ChatView>('client');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>();
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isProviderView = view === 'provider';
    const convos = isProviderView ? getProviderConversations() : getConversations();

    setConversations(convos);
    
    let initialConvo: Conversation | undefined = undefined;

    if (view === 'client') {
        const providerIdToChat = searchParams.get('providerId');
        if (providerIdToChat) {
            const existingConvo = convos.find(c => c.providerId === providerIdToChat);
            if (existingConvo) {
                initialConvo = existingConvo;
            } else {
                const newConvo = startConversationWithProvider(providerIdToChat);
                if (newConvo) {
                    setConversations(prev => [newConvo, ...prev]);
                    initialConvo = newConvo;
                }
            }
            // Clean up URL after handling the param
            router.replace('/messages');
        }
    }
    
    if (!initialConvo && convos.length > 0) {
        initialConvo = convos[0];
    }
    
    setActiveConversation(initialConvo);

  }, [view, searchParams, router, isMounted]);
  
  const handleConversationSelect = (convo: Conversation) => {
    setActiveConversation(convo);
    if (convo.unread > 0) {
      markAllMessagesAsRead(convo.id, view);
      // This part is tricky in mock data, in a real app you'd refetch or update state more granularly
      const updatedConvos = view === 'provider' ? getProviderConversations() : getConversations();
      setConversations(updatedConvos);
    }
  }
  
  const activeMessages = activeConversation ? 
    (view === 'provider' ? getProviderMessagesForConversation(activeConversation.id) : getMessagesForConversation(activeConversation.id)) 
    : [];

  if (!isMounted) {
    return <div>Loading...</div>; // Or a loading skeleton
  }

  if (conversations.length === 0) {
    return (
        <div className="container mx-auto py-12 px-4 h-[calc(100vh-10rem)] flex flex-col items-center justify-center gap-4">
             <p className="text-muted-foreground">No active conversations.</p>
        </div>
    )
  }

  if (!activeConversation) {
    return (
      <div className="container mx-auto py-12 px-4 h-[calc(100vh-10rem)] flex items-center justify-center">
        <p>Loading chats...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 h-full">
        
        {/* Conversations List */}
        <Card className="md:col-span-1 lg:col-span-1 h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-headline">Chats</CardTitle>
            </div>
            <div className="relative pt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            <ScrollArea className="h-full">
              <div className="space-y-1">
                {conversations.map(convo => (
                    <button key={convo.id} onClick={() => handleConversationSelect(convo)} className={cn("flex items-center gap-4 p-4 w-full text-left transition-colors", activeConversation && convo.id === activeConversation.id ? 'bg-muted' : 'hover:bg-muted/50')}>
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint={convo.dataAiHint} />
                            <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow overflow-hidden">
                            <p className={cn("truncate font-semibold", convo.unread > 0 && 'font-bold text-primary')}>{convo.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        </div>
                        <div className="flex flex-col items-end shrink-0 gap-1">
                          <p className="text-xs text-muted-foreground">{convo.time}</p>
                          {convo.unread > 0 && (
                            <span className="w-5 h-5 text-xs flex items-center justify-center rounded-full bg-primary text-primary-foreground">{convo.unread}</span>
                          )}
                        </div>
                    </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Active Chat Window */}
        <Card className="md:col-span-2 lg:col-span-3 h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex items-center gap-4">
                     <Avatar className="w-10 h-10">
                        <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} data-ai-hint={activeConversation.dataAiHint} />
                        <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-lg">{activeConversation.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        {view === 'client' ? (
                             <Link href={`/provider/${activeConversation.providerId}`}>
                                <User className="mr-2 h-4 w-4" />
                                View Profile
                            </Link>
                        ) : (
                             <Link href={`/booking/manage/1`}>
                                <User className="mr-2 h-4 w-4" />
                                View Client History
                            </Link>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 overflow-hidden">
                 <ScrollArea className="h-full pr-4">
                    <div className="space-y-6">
                        {activeMessages.map((message) => {
                           const isUser = (message.sender === 'user' && view === 'client') || (message.sender === 'provider' && view === 'provider');
                           if (isUser) {
                               return <UserMessage key={message.id} message={message} view={view} />;
                           }
                           return <ProviderMessage key={message.id} message={message} activeConversation={activeConversation} />;
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
            <div className="p-4 border-t bg-background">
                <form className="flex w-full items-center space-x-4">
                    <Input placeholder="Type your message..." className="flex-grow" />
                    <Button type="submit" size="icon">
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </div>
        </Card>

      </div>
    </div>
  )
}
