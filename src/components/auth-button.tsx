
'use client';

import Link from 'next/link';
import { useUserStore } from '@/hooks/use-user-store';
import { AuthDialog } from '@/components/auth-dialog';
import { Button, type ButtonProps } from '@/components/ui/button';

interface AuthButtonProps extends ButtonProps {
  children: React.ReactNode;
  /**
   * The navigation path for logged-in users.
   * If not provided, the button will perform its `onClick` action without navigation.
   */
  href?: string;
}

/**
 * A button that requires a user to be logged in.
 * If the user is a guest, it renders an AuthDialog trigger.
 * If the user is logged in, it renders a regular button, optionally wrapped in a Link if `href` is provided.
 */
export function AuthButton({ children, href, ...props }: AuthButtonProps) {
  const { user } = useUserStore();

  // Case 1: User is not logged in. Show the authentication dialog.
  if (!user) {
    return (
      <AuthDialog>
        <Button {...props}>{children}</Button>
      </AuthDialog>
    );
  }

  // Case 2: User is logged in and an `href` is provided for navigation.
  if (href) {
    return (
      <Button {...props} asChild>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  // Case 3: User is logged in and no `href` is provided (e.g., for actions like 'Save').
  return (
    <Button {...props}>
      {children}
    </Button>
  );
}
