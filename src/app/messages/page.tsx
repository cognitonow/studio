
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Phone, Video } from "lucide-react"

const conversations = [
  { id: 1, name: "Olivia's Nail Studio", avatar: "https://placehold.co/100x100.png", dataAiHint: "woman face", lastMessage: "Perfect, see you then!", time: "10m", unread: 0, online: true },
  { id: 2, name: "Chloe's Hair Haven", avatar: "https://placehold.co/100x100.png", dataAiHint: "person smiling", lastMessage: "Yes, I have availability on Friday.", time: "2h", unread: 2, online: false },
  { id: 3, name: "Glow & Go Esthetics", avatar: "https://placehold.co/100x100.png", dataAiHint: "skincare product", lastMessage: "You're welcome! Glad I could help.", time: "1d", unread: 0, online: false },
  { id: 4, name: "Bridal Beauty Co.", avatar: "https://placehold.co/100x100.png", dataAiHint: "makeup brushes", lastMessage: "Let's schedule a trial run.", time: "3d", unread: 0, online: true },
]

const messages = [
    { id: 1, sender: 'provider', text: 'Hi there! Just confirming your appointment for the Balayage service tomorrow at 2 PM.' },
    { id: 2, sender: 'user', text: 'Hi Chloe! Yes, that sounds right. I was wondering if it would be possible to also get a quick trim?' },
    { id: 3, sender: 'provider', text: "Of course! A trim shouldn't add too much time. I've updated the appointment for you." },
    { id: 4, sender: 'user', text: "That's fantastic, thank you so much! "},
    { id: 5, sender: 'provider', text: "You're very welcome. Looking forward to seeing you tomorrow!" },
]

export default function MessagesPage() {
  const activeConversation = conversations[1]; // Chloe's Hair Haven is the active chat

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
                    <button key={convo.id} className={`flex items-center gap-4 p-4 w-full text-left hover:bg-muted/50 ${convo.id === activeConversation.id ? 'bg-muted' : ''}`}>
                        <div className="relative">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint={convo.dataAiHint} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {convo.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>}
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <p className="font-semibold truncate">{convo.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        </div>
                        <div className="text-xs text-muted-foreground shrink-0">{convo.time}</div>
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
                        {messages.map((message) => (
                            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                {message.sender === 'provider' && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                                        <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`rounded-lg px-4 py-2 max-w-[70%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="text-sm">{message.text}</p>
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
