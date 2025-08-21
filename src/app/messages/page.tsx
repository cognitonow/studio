'use server';

import { Suspense } from "react";
import { getConversations, getMessagesForConversation, getProviderConversations, getProviderMessagesForConversation } from "@/lib/data";
import { MessagesPageClient } from "@/components/messages-page-client";
import type { Conversation } from "@/lib/types";

function Loading() {
  return <div className="container mx-auto py-12 px-4 h-[calc(100vh-10rem)] flex items-center justify-center"><p>Loading chats...</p></div>;
}

export default async function MessagesPage() {
  // Pre-fetch all data on the server
  const clientConversations = getConversations();
  const providerConversations = getProviderConversations();
  
  // Pre-fetch messages for the first conversation in each list as an initial view
  const initialClientMessages = clientConversations.length > 0 
    ? getMessagesForConversation(clientConversations[0].id)
    : [];

  const initialProviderMessages = providerConversations.length > 0
    ? getProviderMessagesForConversation(providerConversations[0].id)
    : [];
    
  const initialActiveClientConvo = clientConversations.length > 0 ? clientConversations[0] : undefined;
  const initialActiveProviderConvo = providerConversations.length > 0 ? providerConversations[0] : undefined;

  return (
    <Suspense fallback={<Loading />}>
      <MessagesPageClient
        initialClientConversations={clientConversations}
        initialProviderConversations={providerConversations}
        initialClientMessages={initialClientMessages}
        initialProviderMessages={initialProviderMessages}
        initialActiveClientConvo={initialActiveClientConvo}
        initialActiveProviderConvo={initialActiveProviderConvo}
      />
    </Suspense>
  );
}
