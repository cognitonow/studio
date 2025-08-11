
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, Bell, User } from 'lucide-react';

// TODO: Replace with actual authentication logic
const userRole = 'client'; // 'provider' | 'guest'

const CommonLinks = () => (
  <>
    <Link href="/discover" className="transition-colors hover:text-primary text-foreground">Discover</Link>
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
      <Button variant="outline" size="icon" className="rounded-full" asChild>
        <Link href="/my-lists">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">My Lists</span>
        </Link>
      </Button>
       <Button variant="outline" size="icon" className="rounded-full" asChild>
        <Link href="/bookings">
          <Bell className="h-5 w-5" />
          <span className="sr-only">My Bookings</span>
        </Link>
      </Button>
      <Button variant="outline" size="icon" className="rounded-full" asChild>
        <Link href="/account">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </Link>
      </Button>
    </>
  );

const ProviderLinks = () => (
  <>
    <Link href="/dashboard" className="transition-colors hover:text-primary text-foreground">Dashboard</Link>
    <Button variant="outline" size="icon" className="rounded-full" asChild>
        <Link href="/messages">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Link>
    </Button>
    <Button variant="outline" size="icon" className="rounded-full" asChild>
        <Link href="/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Link>
    </Button>
    <Button variant="outline" size="icon" className="rounded-full" asChild>
      <Link href="/account">
        <User className="h-5 w-5" />
        <span className="sr-only">Account</span>
      </Link>
    </Button>
  </>
);


const MobileCommonLinks = () => (
    <>
      <Link href="/discover" className="text-foreground transition-colors hover:text-primary">Discover</Link>
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
      <Link href="/my-lists" className="text-foreground transition-colors hover:text-primary">My Lists</Link>
      <Link href="/bookings" className="text-foreground transition-colors hover:text-primary">My Bookings</Link>
      <Link href="/account" className="text-foreground transition-colors hover:text-primary">Account</Link>
    </>
  );

const MobileProviderLinks = () => (
    <>
        <Link href="/dashboard" className="text-foreground transition-colors hover:text-primary">Dashboard</Link>
        <Link href="/messages" className="text-foreground transition-colors hover:text-primary">Messages</Link>
        <Link href="/notifications" className="text-foreground transition-colors hover:text-primary">Notifications</Link>
        <Link href="/account" className="text-foreground transition-colors hover:text-primary">Account</Link>
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
                    <div className="flex flex-col space-y-3 pt-6 border-t">
                        {userRole === 'guest' && <MobileGuestLinks />}
                        {userRole === 'client' && <MobileClientLinks />}
                        {userRole === 'provider' && <MobileProviderLinks />}
                    </div>
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
