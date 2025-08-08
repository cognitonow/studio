
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
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

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
              Select a category or use advanced search to find providers.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Advanced Search */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><Filter className="w-5 h-5" /> Advanced Search</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hair">Hair</SelectItem>
                        <SelectItem value="nails">Nails</SelectItem>
                        <SelectItem value="skin">Skin</SelectItem>
                        <SelectItem value="massage">Massage</SelectItem>
                        <SelectItem value="makeup">Makeup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York, NY</SelectItem>
                        <SelectItem value="la">Los Angeles, CA</SelectItem>
                        <SelectItem value="chi">Chicago, IL</SelectItem>
                        <SelectItem value="mia">Miami, FL</SelectItem>
                        <SelectItem value="aus">Austin, TX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price Range</Label>
                    <Select>
                      <SelectTrigger id="price">
                        <SelectValue placeholder="Select a price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">$</SelectItem>
                        <SelectItem value="2">$$</SelectItem>
                        <SelectItem value="3">$$$</SelectItem>
                        <SelectItem value="4">$$$$</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select>
                      <SelectTrigger id="rating">
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 stars</SelectItem>
                        <SelectItem value="4">4 stars & up</SelectItem>
                        <SelectItem value="3">3 stars & up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* Circular Menu */}
            <div className="lg:col-span-2 flex justify-center items-center">
              <div className="relative w-[600px] h-[600px]">
                  {/* Dotted Circle */}
                  <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-full z-10"></div>

                  {/* Central Image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full overflow-hidden">
                      <Image src="https://placehold.co/400x400.png" alt="Skincare" layout="fill" objectFit="cover" data-ai-hint="woman face beauty" />
                  </div>

                  {/* Menu Items */}
                  {serviceCategories.map((category, index) => {
                    const angle = (index / serviceCategories.length) * 2 * Math.PI;
                    const radius = 300; // radius for the dot
                    const dotX = (radius / 2) * Math.cos(angle);
                    const dotY = (radius / 2) * Math.sin(angle);

                    const labelRadius = 340; // radius for text to be outside
                    const labelX = (labelRadius / 2) * Math.cos(angle);
                    const labelY = (labelRadius / 2) * Math.sin(angle);
                    
                    const isLeft = Math.cos(angle) < 0;

                    return (
                      <div key={category.name} className="absolute" style={{ left: '50%', top: '50%', transform: `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)` }}>
                         {/* Dot */}
                         <div
                            className="absolute w-5 h-5 bg-primary rounded-full z-20"
                          />
                          {/* Label */}
                          <Link href="#" passHref>
                            <span
                              className="absolute bg-background/80 backdrop-blur-sm p-2 px-4 rounded-full border border-border/50 font-semibold hover:text-primary hover:border-primary/80 transition-colors z-30"
                              style={{
                                transform: `translate(${isLeft ? '-100%' : '0%'}, -50%) translateX(${isLeft ? -20 : 20}px)`,
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
