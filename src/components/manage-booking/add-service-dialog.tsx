'use client'

import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Service } from "@/lib/types"
import { PlusCircle, Edit } from "lucide-react"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface AddServiceDialogContentProps {
  providerServices: Service[];
  onAddService: (service: Service) => void;
  onAddCustomService?: (name: string, price: number, duration: number) => void;
}

export function AddServiceDialogContent({ 
  providerServices, 
  onAddService, 
  onAddCustomService = () => {},
}: AddServiceDialogContentProps) {
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  
  const handleAddCustomClick = () => {
    if (customName && customPrice && customDuration && onAddCustomService) {
        onAddCustomService(customName, Number(customPrice), Number(customDuration));
        // Reset and close
        setCustomName('');
        setCustomPrice('');
        setCustomDuration('');
    }
  }

  const handleAddPredefinedClick = (service: Service) => {
    onAddService(service);
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add a Service</DialogTitle>
        <DialogDescription>
          Add a pre-defined service or create a custom one for this booking only.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 border p-4 rounded-lg">
          <h4 className="font-semibold flex items-center gap-2"><Edit className="w-4 h-4"/> Add Custom Service</h4>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                  <Label htmlFor="custom-name">Service Name</Label>
                  <Input id="custom-name" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g., Fringe Trim" />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="custom-price">Price ($)</Label>
                  <Input id="custom-price" type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="20" />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="custom-duration">Duration (min)</Label>
                  <Input id="custom-duration" type="number" value={customDuration} onChange={(e) => setCustomDuration(e.target.value)} placeholder="15" />
              </div>
          </div>
          <DialogClose asChild>
            <Button onClick={handleAddCustomClick} disabled={!customName || !customPrice || !customDuration}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Custom Service
            </Button>
          </DialogClose>
      </div>
      
      <Separator />

      <h4 className="font-semibold">Add Pre-defined Service</h4>
      <ScrollArea className="h-60">
          <div className="space-y-4 pr-6">
          {providerServices.map(service => (
              <DialogClose asChild key={service.id}>
                <div className="flex justify-between items-center p-3 rounded-md border">
                    <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-muted-foreground">${service.price} - {service.duration} min</p>
                    </div>
                    <Button size="sm" onClick={() => handleAddPredefinedClick(service)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add
                    </Button>
                </div>
              </DialogClose>
          ))}
          </div>
      </ScrollArea>
    </DialogContent>
  )
}
