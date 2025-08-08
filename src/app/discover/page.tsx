
import { playlists, providers, getFeaturedProviders } from '@/lib/data';
import { ProviderCard } from '@/components/provider-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DiscoverPage() {
  const featuredProviders = getFeaturedProviders();

  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      {/* Search Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-2">Find Your Perfect Service</h1>
        <p className="text-muted-foreground mb-6">Search for services, providers, or locations</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="e.g. 'manicure near me'" className="pl-12 h-12 rounded-full" />
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h3 className="text-2xl font-bold font-headline mb-6">Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map(playlist => (
            <Link href="#" key={playlist.id} className="block group">
              <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-sm transition-transform group-hover:scale-105 duration-300">
                <Image
                  src={`https://placehold.co/400x400.png`}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                  data-ai-hint={playlist.id}
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <h4 className="text-lg font-bold text-white font-headline">{playlist.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Providers Section */}
      <section>
        <h3 className="text-2xl font-bold font-headline mb-6">Featured Providers</h3>
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {featuredProviders.map(provider => (
              <CarouselItem key={provider.id} className="md:basis-1/2 lg:basis-1/4">
                <ProviderCard provider={provider} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2" />
        </Carousel>
      </section>

      {/* All Providers Section */}
      <section>
        <h3 className="text-2xl font-bold font-headline mb-6">All Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {providers.map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>
    </div>
  );
}
