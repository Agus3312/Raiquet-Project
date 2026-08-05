import { UserRole, ListingStatus, OrderStatus, DeliveryStatus } from './enums';

export interface User {
  id: string;
  role: UserRole;
  email: string;
  reputationScore: number;
  mpAccountId?: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  condition: 'NEW' | 'USED';
  location: { lat: number; lng: number };
  embedding?: number[];
  status: ListingStatus;
}

export interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  itemPrice: number;
  buyerFee: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  mpPaymentId?: string;
}

export interface DeliveryJob {
  id: string;
  orderId: string;
  riderId?: string;
  status: DeliveryStatus;
  payoutAmount: number; // Always 3300 ARS
  pickupLocation: { lat: number; lng: number };
  dropoffLocation: { lat: number; lng: number };
}
