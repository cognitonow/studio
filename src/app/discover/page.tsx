
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
import { Play, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DiscoverPage() {
  const featuredProviders = getFeaturedProviders();

  const serviceCategories = [
    { name: 'Hair' },
    { name: 'Nails' },
    { name: 'Skin' },
    { name: 'Feet' },
    { name: 'Hands' },
    { name: 'Body' },
  ];

  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-2xl overflow-hidden flex items-center">
        <Image
            src="https://placehold.co/1200x450.png"
            alt="Woman with beautiful makeup"
            fill
            className="object-cover"
            data-ai-hint="woman face makeup"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/0" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="bg-background/80 backdrop-blur-sm p-8 rounded-2xl space-y-6 max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Elevate Your Beauty Routine</h1>
                <p className="text-muted-foreground">Discover top-rated salons and spas near you. Read reviews, browse services, and book your next appointment with confidence.</p>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input placeholder="Search for services, e.g. 'manicure'" className="pl-12 h-12 rounded-full" />
                </div>
            </div>
            <div></div>
        </div>
      </section>

      {/* Categories Section v2 */}
       <section className="py-16 bg-muted/30 rounded-2xl">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">Find a Service</h2>
            <p className="text-muted-foreground mt-2">
              Select a category to start exploring expert providers.
            </p>
          </div>
          <div className="relative flex justify-center items-center min-h-[450px]">
            <div className="absolute w-[300px] h-[450px] rounded-[150px] overflow-hidden">
                <Image src="https://placehold.co/400x600.png" alt="Skincare" layout="fill" objectFit="cover" data-ai-hint="woman face beauty" />
                 <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800">
                        <Play className="w-8 h-8 ml-1" />
                    </button>
                </div>
            </div>
            {serviceCategories.map((category, index) => {
              const angle = (index / serviceCategories.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 40; // Use a single radius for a perfect circle
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle) * (9/16 * 1.5); // Adjust for aspect ratio of container
              const textAlign = x > 50 ? 'left' : 'right';
              
              return (
                <div
                  key={category.name}
                  className="absolute group"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <div className={`flex items-center gap-3 ${textAlign === 'right' ? 'flex-row-reverse' : ''}`}>
                    <Link href="#" className="font-semibold text-lg hover:text-primary transition-colors">{category.name}</Link>
                    <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
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
