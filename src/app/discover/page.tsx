

'use client'

import { useState } from 'react';
import { providers, getFeaturedProviders, serviceCategories, services as allServices, dublinDistricts } from '@/lib/data';
import { ProviderCard } from '@/components/provider-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronDown, Heart, MessageCircle, User, Undo2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator, SelectGroup } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PlaylistResults } from '@/components/playlist-results';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExploreProviderCard } from '@/components/explore-provider-card';
import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function ExploreStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'none'>('none');

  const handleNext = () => {
    setDirection('right');
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % providers.length);
      setDirection('none');
    }, 300);
  };
  
  const handleLike = () => {
    setDirection('up');
    setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % providers.length);
        setDirection('none');
    }, 300);
  };

  const handlePrevious = () => {
    setDirection('left');
    setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + providers.length) % providers.length);
        setDirection('none');
    }, 300);
  };

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const isVisible = Math.abs(offset) <= 2; // Show active, and 2 cards behind

    if (!isVisible) {
      return { opacity: 0, zIndex: 0, transform: 'scale(0.5)', position: 'absolute', width: '100%', height: '100%' };
    }
    
    // Invert the stacking: top card (offset 0) is smallest, bottom cards (offset > 0) are larger.
    const scale = 1 - offset * 0.05;
    const translateY = offset * -30;
    const translateX = offset * -20;
    
    let transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
    let opacity = 1;
    let zIndex = providers.length - offset; // Higher offset (further back) gets lower z-index

    if (offset < 0) { // Cards that have been swiped past
      opacity = 0;
      transform = `translateX(0px) translateY(0px) scale(1)`;
    } else if (offset === 0) { // Active card
        zIndex = providers.length + 1; // Always on top
        if (direction === 'right') {
            transform = 'translateX(100%) rotate(15deg) scale(0.9)';
        } else if (direction === 'left') {
            transform = 'translateX(-100%) rotate(-15deg) scale(0.9)';
        } else if (direction === 'up') {
            transform = 'translateY(-100%) rotate(0deg) scale(0.9)';
        } else {
            transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
        }
    }


    return {
        transition: 'all 0.3s ease-in-out',
        transform,
        opacity,
        zIndex,
        position: 'absolute',
        width: '100%',
        height: '100%',
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md h-[550px]">
        {providers.map((provider, index) => (
          <div key={provider.id} style={getCardStyle(index)}>
            <ExploreProviderCard provider={provider} />
          </div>
        ))}
      </div>
      <div className="p-6 pt-8 flex justify-center items-center">
        <div className="flex justify-center items-center gap-6">
          <Button onClick={handlePrevious} variant="outline" size="icon" className="rounded-full h-20 w-20 shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/30" aria-label="Previous">
            <Undo2 className="h-10 w-10 text-primary" />
          </Button>
          <Button onClick={handleLike} variant="outline" size="icon" className="rounded-full h-20 w-20 shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/30" aria-label="Save to list">
            <Heart className="h-10 w-10 fill-primary text-primary" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full h-20 w-20 shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/30" aria-label="View profile">
                  <User className="h-10 w-10 text-primary" />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-0 max-w-md">
                <DialogHeader className="sr-only">
                    <DialogTitle>Provider Profile</DialogTitle>
                    <DialogDescription>
                        Detailed view of the service provider's profile.
                    </DialogDescription>
                </DialogHeader>
              <ExploreProviderCard provider={providers[activeIndex]} />
            </DialogContent>
          </Dialog>
          <Button onClick={handleNext} variant="outline" size="icon" className="rounded-full h-20 w-20 shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/30" aria-label="Open chat">
            <MessageCircle className="h-10 w-10 fill-primary text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}


export default function DiscoverPage() {
  const featuredProviders = getFeaturedProviders();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? undefined : categoryId);
    setSelectedService(undefined);
  }

  const filteredServices = selectedCategory ? allServices.filter(s => s.categoryId === selectedCategory) : [];
  
  const allServicesGrouped = serviceCategories.map(category => ({
    ...category,
    services: allServices.filter(service => service.categoryId === category.id)
  }));


  const handleLocationSelect = (districtId: string) => {
    setSelectedLocations(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(districtId)) {
        newSelection.delete(districtId);
      } else {
        newSelection.add(districtId);
      }
      return newSelection;
    });
  }
  
  const getSelectedLocationsText = () => {
    if (selectedLocations.size === 0) return "Select a district";
    if (selectedLocations.size === dublinDistricts.length) return "All Districts";
    if (selectedLocations.size === 1) return dublinDistricts.find(d => d.id === Array.from(selectedLocations)[0])?.name;
    return `${selectedLocations.size} districts selected`;
  }

  const currentServiceCategories = serviceCategories.slice(0, 8); // We can show up to 8 categories

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

      {/* Tabs Section */}
      <section>
        <Tabs defaultValue="explore">
          <TabsList className="mb-6">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="featured">Featured Providers</TabsTrigger>
            <TabsTrigger value="find">Find a Service</TabsTrigger>
          </TabsList>
          <TabsContent value="explore">
            <ExploreStack />
          </TabsContent>
          <TabsContent value="featured">
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
          </TabsContent>
          <TabsContent value="find">
            <div className="py-16 bg-muted/30 rounded-2xl">
              <div className="container mx-auto">
                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                  <div className="lg:col-span-1">
                    <PlaylistResults />
                  </div>
                  <div className="lg:col-span-2 flex flex-col space-y-8">
                      {/* Circular Menu */}
                      <div className="flex justify-center items-center">
                        <div className="relative w-[500px] h-[500px]">
                            {/* Dotted Circle */}
                            <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-full"></div>

                            {/* Central Image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full overflow-hidden">
                                <Image src="https://placehold.co/400x400.png" alt="Skincare" fill className="object-cover" data-ai-hint="woman face beauty" />
                            </div>

                            {/* Menu Items */}
                            {currentServiceCategories.map((category, index) => {
                              const angle = (index / currentServiceCategories.length) * 2 * Math.PI - (Math.PI / 2);
                              const radius = 250; // This should be half of the container's width/height

                              const x = radius * Math.cos(angle);
                              const y = radius * Math.sin(angle);
                              
                              const isSelected = selectedCategory === category.id;

                              return (
                                <div
                                  key={category.id}
                                  onClick={() => handleCategorySelect(category.id)}
                                  className={cn(
                                    "absolute cursor-pointer bg-background/80 backdrop-blur-sm p-2 px-4 rounded-full border border-border/50 font-semibold hover:text-primary hover:border-primary/80 transition-all duration-300 z-20 text-center",
                                    isSelected && "bg-primary text-primary-foreground border-primary scale-110",
                                  )}
                                  style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                >
                                  {category.name}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      {/* Advanced Search */}
                      <div className="flex-grow flex flex-col justify-end">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline"><Filter className="w-5 h-5" /> Advanced Search</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="category" className="flex items-center h-5">Category</Label>
                                <Select value={selectedCategory} onValueChange={handleCategorySelect}>
                                  <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {serviceCategories.map(cat => (
                                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))}
                                    <SelectSeparator />
                                    <SelectItem value="all">All</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="service" className="flex items-center h-5">
                                  <span>Service</span>
                                  {selectedCategory && (
                                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                                      - {serviceCategories.find(c => c.id === selectedCategory)?.name}
                                    </span>
                                  )}
                                </Label>
                                <Select value={selectedService} onValueChange={setSelectedService} disabled={!selectedCategory && !allServicesGrouped.length}>
                                    <SelectTrigger id="service">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedCategory ? (
                                        <SelectGroup>
                                          <SelectItem value={selectedCategory} className="font-bold text-primary">{serviceCategories.find(c => c.id === selectedCategory)?.name}</SelectItem>
                                          {filteredServices.map(service => (
                                            <SelectItem key={service.id} value={service.id} className="pl-8">{service.name}</SelectItem>
                                          ))}
                                        </SelectGroup>
                                      ) : (
                                        allServicesGrouped.map(group => (
                                          group.services.length > 0 && (
                                            <SelectGroup key={`group-${group.id}`}>
                                              <SelectItem value={group.id} className="font-bold text-primary">{group.name}</SelectItem>
                                              {group.services.map(service => (
                                                <SelectItem key={service.id} value={service.id} className="pl-8">{service.name}</SelectItem>
                                              ))}
                                            </SelectGroup>
                                          )
                                        ))
                                      )}
                                      <SelectSeparator />
                                      <SelectItem value="all">All</SelectItem>
                                    </SelectContent>
                                  </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="location" className="flex items-center h-5">Location</Label>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                      <span>{getSelectedLocationsText()}</span>
                                      <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-64">
                                    <DropdownMenuLabel>Dublin Districts</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {dublinDistricts.map(district => (
                                      <DropdownMenuCheckboxItem
                                        key={district.id}
                                        checked={selectedLocations.has(district.id)}
                                        onSelect={(e) => e.preventDefault()} // prevent menu from closing
                                        onPointerDown={() => handleLocationSelect(district.id)}
                                      >
                                        {district.name}
                                      </DropdownMenuCheckboxItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        onSelect={(e) => {
                                            e.preventDefault();
                                            if (selectedLocations.size === dublinDistricts.length) {
                                                setSelectedLocations(new Set());
                                            } else {
                                                setSelectedLocations(new Set(dublinDistricts.map(d => d.id)));
                                            }
                                        }}
                                        checked={selectedLocations.size === dublinDistricts.length}
                                      >
                                        All Districts
                                      </DropdownMenuCheckboxItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <Button className="w-full">
                              <Search className="mr-2 h-4 w-4" />
                              Search
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
