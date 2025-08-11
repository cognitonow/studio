
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, Bell, User, Search, List, Heart } from 'lucide-react';

// TODO: Replace with actual authentication logic
const userRole = 'client'; // 'provider' | 'guest'

const navLinks = {
  common: [
    { href: '/discover', label: 'Discover', icon: Search },
  ],
  guest: [
    { href: '/signup', label: 'Sign Up', isButton: true },
  ],
  client: [
    { href: '/my-lists', label: 'My Lists', icon: Heart },
    { href: '/bookings', label: 'Bookings', icon: Bell },
    { href: '/account', label: 'Account', icon: User },
  ],
  provider: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/account', label: 'Account', icon: User },
  ],
};

const DesktopNavLinks = () => {
    const links = [
        ...navLinks.common,
        ...(userRole === 'client' ? navLinks.client : []),
        ...(userRole === 'provider' ? navLinks.provider : []),
        ...(userRole === 'guest' ? navLinks.guest : []),
    ];

    return (
        <>
            {links.map(({ href, label, icon: Icon, isButton }) => {
                if (isButton) {
                    return (
                        <Button key={href} asChild>
                            <Link href={href}>{label}</Link>
                        </Button>
                    );
                }
                if (Icon) {
                    return (
                        <Button key={href} variant="outline" size="icon" className="rounded-full" asChild>
                           <Link href={href}>
                                <Icon className="h-5 w-5" />
                                <span className="sr-only">{label}</span>
                            </Link>
                        </Button>
                    );
                }
                return (
                    <Link key={href} href={href} className="transition-colors hover:text-primary text-foreground font-medium">
                        {label}
                    </Link>
                );
            })}
        </>
    );
};


const MobileNavLinks = () => {
    const links = [
        ...navLinks.common,
        ...(userRole === 'client' ? navLinks.client : []),
        ...(userRole === 'provider' ? navLinks.provider : []),
    ];

    return (
        <div className="flex flex-col space-y-3">
            {links.map(({ href, label }) => (
                <Link key={href} href={href} className="text-foreground transition-colors hover:text-primary">
                    {label}
                </Link>
            ))}
            {userRole === 'guest' && (
                <div className="mt-4 pt-4 border-t">
                    <Button asChild className="w-full">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            )}
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
