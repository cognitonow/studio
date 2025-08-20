
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageSquare, User, Search, UserPlus, LayoutDashboard, ChevronDown, Eye, Briefcase, Globe, Book, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react';
import { getNotifications, getUnreadMessageCount } from '@/lib/data';
import { useUserStore } from '@/hooks/use-user-store';
import type { UserRole } from '@/lib/types';


function getNavLinks(role: UserRole) {
    const navConfig = {
        guest: {
            desktop: [
                { href: '/discover', label: 'Discover', icon: Search },
                { href: '/auth', label: 'Sign Up', icon: UserPlus }
            ],
            mobile: [
                { href: '/discover', label: 'Discover' },
                { href: '/auth', label: 'Log In / Sign Up' },
                { href: '/', label: 'Home' },
            ],
        },
        client: {
            desktop: [
                { href: '/discover', label: 'Discover', icon: Search },
                { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { href: '/bookings', label: 'My Bookings', icon: Book },
                { href: '/messages', label: 'Messages', icon: MessageSquare },
                { href: '/notifications', label: 'Notifications', icon: Bell },
                { href: '/account', label: 'Account', icon: User },
            ],
            mobile: [
                { href: '/discover', label: 'Discover' },
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/my-lists', label: 'My Lists' },
                { href: '/bookings', label: 'My Bookings' },
                { href: '/messages', label: 'Messages' },
                { href: '/notifications', label: 'Notifications' },
                { href: '/account', label: 'Account' },
            ],
        },
        provider: {
            desktop: [
                { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { href: '/messages', label: 'Messages', icon: MessageSquare },
                { href: '/notifications', label: 'Notifications', icon: Bell },
                { href: '/account', label: 'Account', icon: User },
            ],
            mobile: [
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/messages', label: 'Messages' },
                { href: '/notifications', label: 'Notifications' },
                { href: '/account', 'label': 'Account' },
            ]
        }
    };
    
    return navConfig[role] || navConfig.guest;
}


const DesktopNavLinks = ({ role, hasUnreadNotifications, hasUnreadMessages, isMounted }: { role: UserRole, hasUnreadNotifications: boolean, hasUnreadMessages: boolean, isMounted: boolean }) => {
    const { desktop } = getNavLinks(role);
    const { user } = useUserStore();

    if (!isMounted) {
        return null; // Don't render anything on the server for dynamic links
    }

    if (!user) {
        return (
            <>
                <Button variant="ghost" asChild><Link href="/discover">Discover</Link></Button>
                <Button asChild><Link href="/auth">Sign Up</Link></Button>
            </>
        )
    }
    
    return (
        <>
            {desktop.map(({ href, label, icon: Icon }) => (
                 <Link key={`${href}-${label}`} href={href} passHref>
                    <Button variant="outline" size="icon" className="rounded-full relative">
                        {isMounted && label === 'Notifications' && hasUnreadNotifications && (
                             <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
                        )}
                        {isMounted && label === 'Messages' && hasUnreadMessages && (
                             <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
                        )}
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                    </Button>
                </Link>
            ))}
        </>
    );
};


const MobileNavLinks = ({ role }: { role: UserRole }) => {
    const { mobile } = getNavLinks(role);

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
  const [isMounted, setIsMounted] = React.useState(false);
  const { user, role: userRole, setRole: setUserRole, logout } = useUserStore();
  const [hasUnread, setHasUnread] = React.useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      const checkUnreads = () => {
          const notifications = getNotifications(userRole);
          setHasUnread(notifications.some(n => !n.read));

          const unreadMessagesCount = getUnreadMessageCount(userRole);
          setHasUnreadMessages(unreadMessagesCount > 0);
      };

      checkUnreads();
      
      const interval = setInterval(checkUnreads, 5000); 

      return () => clearInterval(interval);
    }
  }, [isMounted, userRole]);

  const roleLabels: Record<UserRole, string> = {
    guest: 'Guest View',
    client: 'Client View',
    provider: 'Provider View'
  }
  
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    // Determine the redirect path after role change
    let path = '/';
    if (newRole === 'provider') path = '/dashboard';
    if (newRole === 'client') path = '/discover';
    window.location.href = path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-7xl items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Beauty Book</span>
          </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                      {isMounted ? roleLabels[userRole] : 'Loading...'}
                      <ChevronDown className="h-4 w-4" />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>Switch View</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => handleRoleChange('guest')}>
                          <Globe className="mr-2 h-4 w-4"/>
                          <span>Guest View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleRoleChange('client')}>
                      <Eye className="mr-2 h-4 w-4"/>
                      Client View
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleRoleChange('provider')}>
                      <Briefcase className="mr-2 h-4 w-4"/>
                      Provider View
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  {isMounted && <MobileNavLinks role={userRole} />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <DesktopNavLinks role={userRole} hasUnreadNotifications={hasUnread} hasUnreadMessages={hasUnreadMessages} isMounted={isMounted} />
            </nav>
        </div>
      </div>
    </header>
  );
}
