import { getFeaturedProviders, serviceCategories, services as allServices, dublinDistricts, getProvidersByPlaylist, providers } from '@/lib/data';
import { DiscoverPageClient } from '@/components/discover-page-client';
import type { Provider, ServiceCategory, Service, DublinDistrict } from '@/lib/types';
import { getProviders } from '@/app/actions/providers';


export default async function DiscoverPage() {
  // Fetch all data on the server
  const allProviders: Provider[] = await getProviders();
  const featuredProviders = allProviders.filter(p => p.isFeatured);
  
  // This logic remains the same
  const allServicesGrouped = serviceCategories.map(category => ({
    ...category,
    services: allServices.filter(service => service.categoryId === category.id)
  }));
  
  const initialPlaylists: Record<string, Provider[]> = {
      'top-rated-nails': getProvidersByPlaylist('top-rated-nails'),
      'rejuvenating-facials': getProvidersByPlaylist('rejuvenating-facials'),
      'wedding-specialists': getProvidersByPlaylist('wedding-specialists'),
  };

  return (
    <DiscoverPageClient
      allProviders={allProviders}
      featuredProviders={featuredProviders}
      serviceCategories={serviceCategories}
      allServicesGrouped={allServicesGrouped}
      dublinDistricts={dublinDistricts}
      initialPlaylists={initialPlaylists}
    />
  );
}
