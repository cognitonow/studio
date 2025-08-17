
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Testimonials } from '@/components/testimonials';
import { app } from '@/lib/firebase'; // Assuming 'app' is exported
// Import from the generated Data Connect React SDK package
import { useListServicesQuery, type ListServicesQuery as Service } from '@firebasegen/default-connector-react';
export default function LandingPage() {
  const { data, loading, error } = useListServicesQuery(app);
  return (
    <>
      <section className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground md:text-6xl">
              <span className="font-display font-normal">Swipe</span> and find
              <br />
              your next Beauty Match!
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              We connect you with top-tier beauty professionals to transform your space and elevate your mood.
            </p>
            <Button size="lg" asChild>
              <Link href="/discover">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Display fetched services */}
          <div className="md:col-span-2 text-center">
            <h2 className="text-2xl font-bold mb-4">Available Services</h2>
            {loading && <p>Loading services...</p>}
            {error && <p className="text-red-500">Error fetching services: {error.message}</p>}
            {data && data.services && data.services.length > 0 && (
              <ul>
                {data.services.map((service: Service) => ( // Use the correct type for a single service item
                  <li key={service.id}>{service.name} - ${service.price?.toFixed(2)}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Image
              src="https://placehold.co/600x600.png"
              width={600}
              height={600}
              alt="An elegant bottle of beauty product on a stylish background"
              className="rounded-lg"
              data-ai-hint="beauty product bottle"
              priority
            />
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
