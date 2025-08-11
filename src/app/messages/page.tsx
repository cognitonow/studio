
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Phone, Video, Sparkles } from "lucide-react"
import { getConversations, getMessages, markAllMessagesAsRead } from "@/lib/data"
import { useState, useEffect, useCallback } from "react"
import type { Conversation, Message } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>();

  const fetchAndUpdateState = useCallback(() => {
    const convos = getConversations();
    console.log('Polling: Fetched conversations', convos.map(c => ({id: c.id, unread: c.unread})));
    setConversations(convos);

    if (activeConversation) {
        const updatedActiveConvo = convos.find(c => c.id === activeConversation.id);
        setActiveConversation(updatedActiveConvo);
    } else if (convos.length > 0) {
        // Automatically select the first conversation with unread messages, or the very first one
        const initialConvo = convos.find(c => c.unread > 0) || convos[0];
        if (initialConvo) {
            handleConversationSelect(initialConvo);
        }
    }
  }, [activeConversation]); // Re-create this function if activeConversation changes

  useEffect(() => {
    // Initial fetch
    fetchAndUpdateState();
    setMessages(getMessages());
    
    // Set up polling to check for new messages
    const interval = setInterval(fetchAndUpdateState, 2000); 

    return () => clearInterval(interval);

  }, [fetchAndUpdateState]);
  
  const handleConversationSelect = (convo: Conversation) => {
    console.log('handleConversationSelect triggered for convo ID:', convo.id);
    setActiveConversation(convo);
    // Mark messages as read in the data source
    markAllMessagesAsRead(convo.id);
    // Re-fetch conversations to update the UI with the new 'read' status
    const updatedConvos = getConversations();
    console.log('State after marking as read:', updatedConvos.map(c => ({id: c.id, unread: c.unread})));
    setConversations(updatedConvos);
  }


  if (!activeConversation) {
    return (
        <div className="container mx-auto py-12 px-4 h-[calc(100vh-10rem)] flex items-center justify-center">
            <p className="text-muted-foreground">Loading conversations...</p>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 h-full">
        
        {/* Conversations List */}
        <Card className="md:col-span-1 lg:col-span-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Chats</CardTitle>
            <div className="relative pt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            <ScrollArea className="h-full">
              <div className="space-y-1">
                {conversations.map(convo => (
                    <button key={convo.id} onClick={() => handleConversationSelect(convo)} className={cn("flex items-center gap-4 p-4 w-full text-left transition-colors", convo.id === activeConversation.id ? 'bg-muted' : 'hover:bg-muted/50')}>
                        <div className="relative">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint={convo.dataAiHint} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {convo.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>}
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <p className={cn("font-semibold truncate", convo.unread > 0 && "font-bold text-primary")}>{convo.name}</p>
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
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon"><Phone /></Button>
                    <Button variant="outline" size="icon"><Video /></Button>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 overflow-hidden">
                 <ScrollArea className="h-full pr-4">
                    <div className="space-y-6">
                        {messages.filter(m => m.conversationId === activeConversation.id).map((message) => (
                            <div key={message.id} className={cn("flex items-end gap-3", message.sender === 'user' ? 'justify-end' : '')}>
                                {message.sender === 'provider' && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                                        <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="flex flex-col gap-1">
                                    <div className={cn(
                                        "rounded-lg px-4 py-2 max-w-[70%]",
                                        message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
                                        message.isAi && 'bg-purple-100 dark:bg-purple-900/50'
                                        )}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    {message.isAi && (
                                        <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 pl-2">
                                            <Sparkles className="w-3 h-3" />
                                            <span>Sent by AI Assistant</span>
                                        </div>
                                    )}
                                </div>
                                {message.sender === 'user' && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
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
