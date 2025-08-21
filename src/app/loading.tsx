'use client';

import { useState, useEffect } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Animate over 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // This loading UI will be displayed as a fallback while the page content is loading.
  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg font-semibold text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
}
