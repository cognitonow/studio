
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getServices } from '@/app/actions/services';
import type { Service } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (e: any) {
        console.error("Data Connect fetch error:", e);
        setError(`Failed to fetch services. Please ensure your backend is deployed and the database is populated. Error: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Our Services</CardTitle>
          <CardDescription>
            This page verifies the connection to your PostgreSQL database via Firebase Data Connect. Below is a list of services fetched from the live backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full mt-2" />
                    </CardContent>
                  </Card>
                ))
              : services.length > 0 
                ? services.map((service) => (
                    <Card key={service.id}>
                      <CardHeader>
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>${service.price} - {service.duration} min</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))
                : null
            }
            {!isLoading && !error && services.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-8">
                    <p>Connection successful, but no services were found in the database.</p>
                    <p className="text-sm">Please ensure you have run `firebase deploy` and populated your database tables with data.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
