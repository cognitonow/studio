import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout } from 'lucide-react';
import { Input } from '../ui/input';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-7xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Beauty Book</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">Home</Link>
            <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">Discover</Link>
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2 p-4">
                  <Sprout className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">Beauty Book</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    <Link href="/" className="text-foreground transition-colors hover:text-foreground/80">Home</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Discover</Link>
                    <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">Dashboard</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 sm:w-auto sm:flex-none">
             <Input placeholder="Search..." className="hidden md:flex"/>
          </div>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
