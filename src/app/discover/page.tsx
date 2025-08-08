
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
          <div className="flex justify-center items-center">
            <div className="relative w-[600px] h-[600px]">
                {/* Dotted Circle */}
                <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-full"></div>

                {/* Central Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full overflow-hidden">
                    <Image src="https://placehold.co/400x400.png" alt="Skincare" layout="fill" objectFit="cover" data-ai-hint="woman face beauty" />
                </div>

                {/* Menu Items */}
                {serviceCategories.map((category, index) => {
                  const angle = (index / serviceCategories.length) * 2 * Math.PI;
                  const radius = 280; // radius in pixels for the dot
                  const dotX = radius * Math.cos(angle);
                  const dotY = radius * Math.sin(angle);

                  const labelRadius = 340; // radius for text to be outside
                  const labelX = labelRadius * Math.cos(angle);
                  const labelY = labelRadius * Math.sin(angle);
                  
                  const isLeft = Math.cos(angle) < 0;

                  return (
                    <div key={category.name} className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                       {/* Dot */}
                       <div
                          className="absolute w-3 h-3 bg-primary rounded-full"
                          style={{
                            transform: `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`,
                          }}
                        />
                        {/* Label */}
                        <Link href="#" passHref>
                          <span
                            className="absolute bg-background/80 backdrop-blur-sm p-2 px-4 rounded-full border border-border/50 font-semibold hover:text-primary hover:border-primary/80 transition-colors"
                            style={{
                              left: `${labelX}px`,
                              top: `${labelY}px`,
                              transform: `translate(${isLeft ? '-100%' : '0%'}, -50%)`,
                              margin: `${isLeft ? '0 -10px 0 0' : '0 0 0 10px'}`
                            }}
                          >
                          {category.name}
                          </span>
                        </Link>
                    </div>
                  );
                })}
            </div>
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
