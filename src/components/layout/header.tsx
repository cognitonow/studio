
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, Bell } from 'lucide-react';

// TODO: Replace with actual authentication logic
const userRole = 'client'; // 'provider' | 'guest'

const CommonLinks = () => (
  <>
    <Link href="/discover" className="transition-colors hover:text-foreground/80 text-foreground">Discover</Link>
    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">About Us</Link>
    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">Blog</Link>
  </>
)

const GuestLinks = () => (
  <>
    <Button asChild>
      <Link href="/signup">Sign Up</Link>
    </Button>
  </>
);

const ClientLinks = () => (
    <>
      <Link href="/bookings" className="transition-colors hover:text-foreground/80 text-foreground/60">My Bookings</Link>
      <Link href="/my-lists" className="transition-colors hover:text-foreground/80 text-foreground/60">My Lists</Link>
      <Button variant="ghost" size="icon" asChild>
        <Link href="/messages">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Link>
      </Button>
       <Button variant="ghost" size="icon" asChild>
        <Link href="/notifications">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Link>
      </Button>
      <Button asChild>
        <Link href="/account">Account</Link>
      </Button>
    </>
  );

const ProviderLinks = () => (
  <>
    <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
    <Button variant="ghost" size="icon" asChild>
        <Link href="/messages">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Link>
    </Button>
    <Button variant="ghost" size="icon" asChild>
        <Link href="/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Link>
    </Button>
    <Button asChild>
      <Link href="/account">Account</Link>
    </Button>
  </>
);


const MobileCommonLinks = () => (
    <>
      <Link href="/discover" className="text-foreground transition-colors hover:text-foreground/80">Discover</Link>
      <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">About Us</Link>
      <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Blog</Link>
    </>
  )

const MobileGuestLinks = () => (
    <div className="mt-4">
        <Button asChild className="w-full">
            <Link href="/signup">Sign Up</Link>
        </Button>
    </div>
);

const MobileClientLinks = () => (
    <>
      <Link href="/bookings" className="text-foreground/60 transition-colors hover:text-foreground/80">My Bookings</Link>
      <Link href="/my-lists" className="text-foreground/60 transition-colors hover:text-foreground/80">My Lists</Link>
      <Link href="/messages" className="text-foreground/60 transition-colors hover:text-foreground/80">Messages</Link>
      <Link href="/notifications" className="text-foreground/60 transition-colors hover:text-foreground/80">Notifications</Link>
    </>
  );

const MobileProviderLinks = () => (
    <>
        <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">Dashboard</Link>
        <Link href="/messages" className="text-foreground/60 transition-colors hover:text-foreground/80">Messages</Link>
        <Link href="/notifications" className="text-foreground/60 transition-colors hover:text-foreground/80">Notifications</Link>
    </>
);


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
            <CommonLinks />
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
                    <MobileCommonLinks />
                    {userRole === 'guest' && <MobileGuestLinks />}
                    {userRole === 'client' && <MobileClientLinks />}
                    {userRole === 'provider' && <MobileProviderLinks />}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            {userRole === 'guest' && <GuestLinks />}
            {userRole === 'client' && <ClientLinks />}
            {userRole === 'provider' && <ProviderLinks />}
        </div>
      </div>
    </header>
  );
}
