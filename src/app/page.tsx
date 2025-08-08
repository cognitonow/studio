import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProviderCard } from '@/components/provider-card';
import { getFeaturedProviders, getProvidersByPlaylist, playlists, providers } from '@/lib/data';

export default function LandingPage() {
  const featuredProviders = getFeaturedProviders();

  return (
    <div className="container mx-auto py-12 px-4 space-y-24">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">Find & Book Your Next</h1>
        <h2 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-8">Beauty Appointment</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
          Discover top-rated beauty professionals in your area. Read reviews, browse portfolios, and book your perfect service instantly.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Input placeholder="Search for services or providers..." className="h-14 text-lg pl-6 pr-14" />
            <Button size="icon" className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10 w-10">
              <Search />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {playlists.map(playlist => (
        <section key={playlist.id}>
          <h3 className="text-3xl font-bold font-headline mb-6">{playlist.title}</h3>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {getProvidersByPlaylist(playlist.id).map(provider => (
                <CarouselItem key={provider.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1">
                    <ProviderCard provider={provider} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      ))}

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
