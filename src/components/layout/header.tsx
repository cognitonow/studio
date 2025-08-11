
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, Bell, User, Search, LogIn, LayoutDashboard } from 'lucide-react';

// TODO: Replace with actual authentication logic
const userRole = 'client'; // 'provider' | 'guest'

function getNavLinks(role: string) {
    const navConfig = {
        guest: {
            desktop: [
                { href: '/discover', label: 'Discover', icon: Search },
                { href: '/signup', label: 'Sign Up', icon: LogIn }
            ],
            mobile: [
                { href: '/discover', label: 'Discover' },
                { href: '/signup', label: 'Sign Up' },
            ],
        },
        client: {
            desktop: [
                { href: '/discover', label: 'Discover', icon: Search },
                { href: '/messages', label: 'Messages', icon: MessageSquare },
                { href: '/account', label: 'Account', icon: User },
            ],
            mobile: [
                { href: '/discover', label: 'Discover' },
                { href: '/my-lists', label: 'My Lists' },
                { href: '/bookings', label: 'Bookings' },
                { href: '/messages', label: 'Messages' },
                { href: '/account', label: 'Account' },
            ],
        },
        provider: {
            desktop: [
                { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { href: '/messages', label: 'Messages', icon: MessageSquare },
                { href: '/account', label: 'Account', icon: User },
            ],
            mobile: [
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/messages', label: 'Messages' },
                { href: '/account', label: 'Account' },
            ]
        }
    };

    return navConfig[role as keyof typeof navConfig] || navConfig.guest;
}


const DesktopNavLinks = () => {
    const { desktop } = getNavLinks(userRole);

    return (
        <>
            {desktop.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} passHref>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                    </Button>
                </Link>
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
            <span className="font-bold text-lg text-foreground">Beauty Book</span>
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
                 <SheetHeader className="p-4">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                 </SheetHeader>
                <Link href="/" className="mr-6 flex items-center space-x-2 p-4">
                  <Sprout className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg text-foreground">Beauty Book</span>
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
