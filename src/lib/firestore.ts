
import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import type { Service } from './types';

// NOTE: This is a placeholder for fetching real data.
// In a real app, this data would be populated in your Firestore database.
// For now, it will likely return an empty array, but a successful empty
// fetch still proves the connection and API key are working.

export async function getServices(): Promise<Service[]> {
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
