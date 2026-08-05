export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  RIDER = 'RIDER',
  ADMIN = 'ADMIN'
}

export enum ListingStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  SOLD = 'SOLD'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  DISPUTED = 'DISPUTED'
}

export enum DeliveryStatus {
  AVAILABLE = 'AVAILABLE',
  ACCEPTED = 'ACCEPTED',
  PICKED_UP = 'PICKED_UP',
  DELIVERED = 'DELIVERED'
}

export enum DeliveryZone {
  SHORT = 'SHORT',   // 0-3km
  MEDIUM = 'MEDIUM', // 3-8km
  LONG = 'LONG'      // 8-15km
}
