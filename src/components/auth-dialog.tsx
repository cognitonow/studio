'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sprout } from "lucide-react"
import Link from "next/link"

interface AuthDialogProps {
    children: React.ReactNode;
}

export function AuthDialog({ children }: AuthDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-primary"/>
            Create an Account to Continue
          </DialogTitle>
          <DialogDescription>
            To access features like booking, messaging, and saving favourites, you'll need to be logged in. Join our community to connect with top beauty professionals.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="ghost">Continue as Guest</Button>
            </DialogClose>
            <Button asChild>
                <Link href="/auth">Log In / Sign Up</Link>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
