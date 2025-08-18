
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
            Create an Account or Log In
          </DialogTitle>
          <DialogDescription>
            To access features like booking, messaging, and saving favourites, you'll need to be logged in. Join our community or log in to your existing account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between gap-2">
            <DialogClose asChild>
                <Button asChild variant="secondary">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </DialogClose>
            <DialogClose asChild>
                <Button asChild>
                    <Link href="/login">Log In</Link>
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
