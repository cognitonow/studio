import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProviderCard } from '@/components/provider-card';
import { getFeaturedProviders, getProvidersByPlaylist, playlists, providers } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const featuredProviders = getFeaturedProviders();

  return (
    <div className="container mx-auto py-12 px-4 space-y-24">
      {/* Hero Section */}
      <section className="relative bg-accent/50 rounded-3xl p-8 md:p-12 min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1200x800.png"
            alt="Relaxing background with beauty products"
            fill
            className="object-cover opacity-20"
            data-ai-hint="candles beauty products"
          />
        </div>
        <div className="relative z-10 max-w-2xl text-foreground/80">
          <h1 className="text-4xl md:text-6xl font-headline mb-4 text-foreground font-semibold">
            Create Your Sanctuary of Self-Care
          </h1>
          <p className="max-w-xl text-lg text-foreground/70 mb-8">
            Discover the art of relaxation and rejuvenation. We connect you with top-tier beauty professionals to transform your space and elevate your mood.
          </p>
          <Button size="lg" className="h-12 text-base" asChild>
            <Link href="#discover">
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="discover">
        <h3 className="text-3xl font-bold font-headline mb-8 text-center">Find Your Perfect Match</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {playlists.map(playlist => (
            <Link href="#" key={playlist.id} className="block group">
              <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg transition-transform group-hover:scale-105 duration-300">
                <Image
                  src={`https://placehold.co/400x400.png`}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                  data-ai-hint={playlist.id}
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <h4 className="text-2xl font-bold text-white font-headline">{playlist.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Providers Section */}
      <section>
        <h3 className="text-3xl font-bold font-headline mb-6">Featured Providers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

       {/* All Providers Section */}
       <section>
        <div className="text-center">
          <h3 className="text-3xl font-bold font-headline mb-6">Explore All Providers</h3>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Browse through our extensive network of talented beauty experts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {providers.map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
