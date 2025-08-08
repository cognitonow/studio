
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-20 max-w-6xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-semibold text-lg">RevivaDerm™</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
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
                  <span className="font-semibold text-lg">RevivaDerm™</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    <Link href="#" className="text-foreground transition-colors hover:text-foreground/80">Products</Link>
                    <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground/80">About us</Link>
                    <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground/80">Blog</Link>
                    <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground/80">Contacts</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="#" className="text-foreground transition-colors hover:text-foreground/80">Products</Link>
            <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground/80">About us</Link>
            <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground/80">Blog</Link>
            <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground/80">Contacts</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
