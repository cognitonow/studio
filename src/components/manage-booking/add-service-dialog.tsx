
'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Service } from "@/lib/types"
import { PlusCircle } from "lucide-react"

interface AddServiceDialogProps {
  children: React.ReactNode;
  providerServices: Service[];
  onAddService: (service: Service) => void;
}

export function AddServiceDialog({ children, providerServices, onAddService }: AddServiceDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Service</DialogTitle>
          <DialogDescription>
            Browse available services from this provider and add them to your booking.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
            <div className="space-y-4 pr-6">
            {providerServices.map(service => (
                <div key={service.id} className="flex justify-between items-center p-3 rounded-md border">
                     <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-muted-foreground">${service.price} - {service.duration} min</p>
                      </div>
                      <Button size="sm" onClick={() => onAddService(service)}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add
                      </Button>
                </div>
            ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
