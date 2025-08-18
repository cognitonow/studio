import { ConnectorConfig } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface listServicesResponse {
  services: Service[];
  __typename?: 'listServicesResponse';
}

export interface listServicesArgs {

}

export declare function listServices(
  dataConnect: any,
  args: listServicesArgs
): Promise<listServicesResponse>;

export interface insertUserResponse {
  data: User;
  __typename?: 'insertUserResponse';
}

export interface insertUserArgs {
  id: UUIDString;
  name: string;
  email: string;
  role: string;
}

export declare function insertUser(
  dataConnect: any,
  args: insertUserArgs
): Promise<insertUserResponse>;

export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface ServiceCategory_Key {
  id: UUIDString;
  __typename?: 'ServiceCategory_Key';
}

export interface ServiceProvider_Key {
  id: UUIDString;
  __typename?: 'ServiceProvider_Key';
}

export interface Service_Key {
  id: UUIDString;
  __typename?: 'Service_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Booking {
  id: UUIDString;
  providerId: UUIDString;
  providerName: string;
  serviceIds: string[];
  date: TimestampString;
  status: string;
  clientName?: string;
  isPaid: boolean;
  reviewId?: string;
  __typename?: 'Booking';
}

export interface Review {
  id: UUIDString;
  bookingId: UUIDString;
  author: string;
  avatarUrl?: string;
  dataAiHint?: string;
  rating: number;
  comment: string;
  title?: string;
  __typename?: 'Review';
}

export interface ServiceCategory {
  id: UUIDString;
  name: string;
  services: Service[];
  __typename?: 'ServiceCategory';
}

export interface ServiceProvider {
  id: UUIDString;
  userId: UUIDString;
  name: string;
  specialty: string;
  avatarUrl: string;
  dataAiHint?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isFavourite?: boolean;
  bio: string;
  location: string;
  playlist: string;
  user: User;
  services: Service[];
  reviews: Review[];
  __typename?: 'ServiceProvider';
}

export interface Service {
  id: UUIDString;
  categoryId: UUIDString;
  name: string;
  description: string;
  price: number;
  duration: number;
  provider: ServiceProvider[];
  __typename?: 'Service';
}

export interface User {
  id: UUIDString;
  name: string;
  email: string;
  role: string;
  provider: ServiceProvider[];
  __typename?: 'User';
}
