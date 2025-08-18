

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is a fallback. In a real app, you might want to show a login form
// or redirect to a more specific page like /login or /signup.
export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a more useful page, like the discover page.
    router.replace('/discover');
  }, [router]);

  // Render a loading state or nothing while redirecting.
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p>Redirecting...</p>
    </div>
    );
}
