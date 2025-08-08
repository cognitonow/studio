import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFeaturedProviders, playlists } from '@/lib/data';
import { ArrowRight, Bot, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { ProviderCard } from '@/components/provider-card';

const features = [
    {
      icon: <ShieldCheck />,
      title: 'Verified Providers',
      description: 'We ensure that every provider on our platform is vetted for quality and professionalism, giving you peace of mind.',
    },
    {
      icon: <CalendarCheck />,
      title: 'Seamless Booking',
      description: 'Find a time that works for you and book your appointment in just a few clicks. It\'s that simple.',
    },
    {
      icon: <Sparkles />,
      title: 'Personalized Experience',
      description: 'We use AI to help you discover new services and providers tailored to your unique style and preferences.',
    },
    {
      icon: <Bot />,
      title: 'Direct Communication',
      description: 'Our in-app chat lets you connect directly with your provider to discuss details and ask questions.',
    },
]


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

      {/* Features Section */}
      <section className="bg-background rounded-3xl relative">
        <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-1/2 h-1/2 text-accent/50" />
        </div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold font-headline">
                Why Choose Beauty Book?
              </h2>
              <p className="text-lg text-muted-foreground">
                We offer a variety of services and features designed to enhance your beauty and wellness journey.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
            </div>
            <div className="space-y-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 size-12 rounded-full bg-accent/80 flex items-center justify-center text-primary">
                            {feature.icon}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold font-headline">{feature.title}</h4>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
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
    </div>
  );
}
