
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, Bell, User, Search, LogIn, LayoutDashboard } from 'lucide-react';

// TODO: Replace with actual authentication logic
const userRole = 'client'; // 'provider' | 'guest'

function getNavLinks(role: string) {
    const discoverIcon = { href: '/discover', label: 'Discover', icon: Search };
    const messagesIcon = { href: '/messages', label: 'Messages', icon: MessageSquare };
    const notificationsIcon = { href: '/notifications', label: 'Notifications', icon: Bell };
    const accountIcon = { href: '/account', label: 'Account', icon: User };
    const dashboardIcon = { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard };
    const signUpIcon = { href: '/signup', label: 'Sign Up', icon: LogIn };

    const clientLinks = [discoverIcon, messagesIcon, notificationsIcon, accountIcon];
    const providerLinks = [dashboardIcon, messagesIcon, notificationsIcon, accountIcon];
    const guestLinks = [discoverIcon, signUpIcon];

    let desktopLinks: { href: string; label: string; icon: React.ElementType; }[] = [];
    let mobileLinks: { href: string; label: string; }[] = [];

    switch (role) {
        case 'client':
            desktopLinks = clientLinks;
            mobileLinks = [
                { href: '/discover', label: 'Discover' },
                { href: '/bookings', label: 'My Bookings' },
                { href: '/my-lists', label: 'My Lists' },
                { href: '/messages', label: 'Messages' },
                { href: '/notifications', label: 'Notifications' },
                { href: '/account', label: 'Account' },
            ];
            break;
        case 'provider':
            desktopLinks = providerLinks;
            mobileLinks = [
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/messages', label: 'Messages' },
                { href: '/notifications', label: 'Notifications' },
                { href: '/account', label: 'Account' },
            ];
            break;
        default: // guest
            desktopLinks = guestLinks;
            mobileLinks = [
                { href: '/discover', label: 'Discover' },
                { href: '/signup', label: 'Sign Up' },
            ];
            break;
    }
    
    return { desktop: desktopLinks, mobile: mobileLinks };
}

const DesktopNavLinks = () => {
    const { desktop } = getNavLinks(userRole);

    return (
        <>
            {desktop.map(({ href, label, icon: Icon }) => (
                <Button key={href} variant="outline" size="icon" className="rounded-full" asChild>
                   <Link href={href}>
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                    </Link>
                </Button>
            ))}
        </>
    );
};


const MobileNavLinks = () => {
    const { mobile } = getNavLinks(userRole);

    return (
        <div className="flex flex-col space-y-3">
            {mobile.map(({ href, label }) => (
                <Link key={href} href={href} className="text-foreground transition-colors hover:text-primary">
                    {label}
                </Link>
            ))}
        </div>
    );
};


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-7xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Beauty Book</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                 <SheetHeader>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                 </SheetHeader>
                <Link href="/" className="mr-6 flex items-center space-x-2 p-4">
                  <Sprout className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">Beauty Book</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <MobileNavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
                <DesktopNavLinks />
            </nav>
        </div>
      </div>
    </header>
  );
}
