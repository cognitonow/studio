
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, Bell, User, Search } from 'lucide-react';

// TODO: Replace with actual authentication logic
const userRole = 'client'; // 'provider' | 'guest'

function getNavLinks(role: string) {
    const commonLinks = [
        { href: '/discover', label: 'Discover' },
    ];
    
    const discoverIcon = { href: '/discover', label: 'Discover', icon: Search };
    const messagesIcon = { href: '/messages', label: 'Messages', icon: MessageSquare };
    const notificationsIcon = { href: '/notifications', label: 'Notifications', icon: Bell };
    const accountIcon = { href: '/account', label: 'Account', icon: User };

    switch (role) {
        case 'client':
            return {
                desktop: [],
                desktopIcons: [
                    discoverIcon,
                    messagesIcon,
                    notificationsIcon,
                    accountIcon,
                ],
                mobile: [
                    { href: '/discover', label: 'Discover' },
                    { href: '/bookings', label: 'My Bookings' },
                    { href: '/my-lists', label: 'My Lists' },
                    { href: '/messages', label: 'Messages' },
                    { href: '/notifications', label: 'Notifications' },
                    { href: '/account', label: 'Account' },
                ],
            };
        case 'provider':
             return {
                desktop: [
                    { href: '/dashboard', label: 'Dashboard' },
                ],
                desktopIcons: [
                    messagesIcon,
                    notificationsIcon,
                    accountIcon,
                ],
                mobile: [
                    { href: '/dashboard', label: 'Dashboard' },
                    { href: '/messages', label: 'Messages' },
                    { href: '/notifications', label: 'Notifications' },
                    { href: '/account', label: 'Account' },
                ],
            };
        default: // guest
             return {
                desktop: [
                    ...commonLinks,
                    { href: '/signup', label: 'Sign Up', isButton: true },
                ],
                desktopIcons: [],
                mobile: [
                     ...commonLinks,
                ],
            };
    }
}

const DesktopNavLinks = () => {
    const { desktop, desktopIcons } = getNavLinks(userRole);

    return (
        <>
            {desktop.map(({ href, label, isButton }) => {
                if (isButton) {
                    return (
                        <Button key={href} asChild>
                            <Link href={href}>{label}</Link>
                        </Button>
                    );
                }
                return (
                    <Link key={href} href={href} className="transition-colors text-foreground hover:text-primary font-medium">
                        {label}
                    </Link>
                );
            })}
            {desktopIcons.map(({ href, label, icon: Icon }) => (
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
