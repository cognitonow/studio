
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground md:text-6xl">
            <span className="font-display font-normal">Swipe</span> and find
            <br />
            your next Beauty Match!
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            We connect you with top-tier beauty professionals to transform your space and elevate your mood.
          </p>
          <Button size="lg" asChild>
            <Link href="/discover">
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div>
          <Image
            src="https://placehold.co/600x600.png"
            width={600}
            height={600}
            alt="Beauty product"
            className="rounded-lg"
            data-ai-hint="beauty product bottle"
          />
        </div>
      </div>
    </div>
  );
}
