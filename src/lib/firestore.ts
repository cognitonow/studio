
import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import type { Service } from './types';

// NOTE: This file is deprecated. Data fetching is moving to server actions
// in `src/app/actions/*` that use Firebase Data Connect with PostgreSQL.
// This file is kept for reference during the migration but should not be used for new development.

export async function getServicesFromFirestore(): Promise<Service[]> {
  if (!db) {
    console.error("Firestore database is not initialized.");
    throw new Error("Firestore not initialized");
  }
  
  console.log("Fetching services from Firestore...");
  const servicesCol = collection(db, 'services');
  const q = query(servicesCol);
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No services found in Firestore.");
    return [];
  }

  const services: Service[] = [];
  querySnapshot.forEach((doc) => {
    services.push({ id: doc.id, ...doc.data() } as Service);
  });
  
  console.log(`Fetched ${services.length} services.`);
  return services;
}
