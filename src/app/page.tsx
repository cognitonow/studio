import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sprout } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            <span className="text-primary flex items-center gap-3">
              Rejuvenation
              <Sprout className="w-12 h-12" />
            </span>
            <span>of the mind and body</span>
          </h1>
          <div className="max-w-md text-muted-foreground space-y-4 text-lg">
            <p>
              Discover and book appointments with the best beauty and wellness
              professionals in your area.
            </p>
            <p>
              From rejuvenating facials to relaxing massages, find the perfect
              service to revitalize your mind and body.
            </p>
          </div>
           <Button asChild size="lg" className="text-lg">
            <Link href="/discover">Explore Services</Link>
          </Button>
        </div>
        <div>
          <Image
            src="https://placehold.co/600x600.png"
            alt="Beauty and wellness products"
            width={600}
            height={600}
            className="rounded-3xl shadow-2xl"
            data-ai-hint="beauty products"
          />
        </div>
      </div>
    </div>
  );
}
