/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceType = 'Tattoo Inquiry' | 'Photography Booking' | 'Piercing' | 'Hair Artistry';

export type CurrencyType = 'ZAR' | 'USD';

export type FilterStyle = 'original' | 'ancestral-contrast' | 'gold-shimmer' | 'neo-realism';

export interface ReferenceImage {
  id: string;
  name: string;
  dataUrl: string; // Base64 encoding from client upload
  filterStyle: FilterStyle;
  rotation: number; // 0 to 360
  scale: number; // 0.5 to 2.0
  brightness: number; // 50 to 150
  contrast: number; // 50 to 150
  notes?: string;
  createdAt: number;
}

export interface BookingRitual {
  id: string;
  fullName: string;
  email: string;
  serviceType: ServiceType;
  description: string;
  preferredArtist: 'The Needle (Elder Brother)' | 'The Lens (Younger Brother)' | 'Any Brother';
  preferredDate: string;
  currency: CurrencyType;
  estimatedPrice: number;
  referenceImages: ReferenceImage[];
  status: 'In Council' | 'Mark Approved' | 'Ritual Synced' | 'Awaiting Callback';
  createdAt: number;
}

export interface PortfolioItem {
  id: string;
  category: 'ink' | 'lens' | 'crown';
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}
