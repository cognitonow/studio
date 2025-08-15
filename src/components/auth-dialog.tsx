
'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Sprout } from "lucide-react"
import Link from "next/link"

interface AuthDialogProps {
    children: React.ReactNode;
}

export function AuthDialog({ children }: AuthDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-primary"/>
            Create an Account to Continue
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access features like booking, messaging, and saving favourites, you'll need to be logged in. Join our community to connect with top beauty professionals.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue as Guest</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/signup">Log In / Sign Up</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
