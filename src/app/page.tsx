import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProviderCard } from '@/components/provider-card';
import { playlists, getProvidersByPlaylist, getFeaturedProviders, providers } from '@/lib/data';

export default function DiscoveryPage() {
  const featuredProviders = getFeaturedProviders();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">Find Your Perfect Beauty Match</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and book top-rated stylists, artists, and estheticians in your area.
        </p>
        <div className="mt-8 max-w-xl mx-auto flex items-center space-x-2">
          <Input type="search" placeholder="Search for services or providers..." className="flex-1 text-base" />
          <Button size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6 font-headline">Featured Providers</h2>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {featuredProviders.map((provider) => (
              <CarouselItem key={provider.id} className="md:basis-1/2 lg:basis-1/3">
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
      
      {playlists.map((playlist) => {
        const playlistProviders = getProvidersByPlaylist(playlist.id);
        if (playlistProviders.length === 0) return null;
        return (
          <section key={playlist.id} className="py-12">
            <h2 className="text-3xl font-bold tracking-tight mb-6 font-headline">{playlist.title}</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {playlistProviders.map((provider) => (
                  <CarouselItem key={provider.id} className="basis-5/6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
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
        );
      })}

      <section className="py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6 font-headline">Explore All Providers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>
    </div>
  );
}
