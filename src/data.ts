/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'ink-1',
    category: 'ink',
    title: 'Ancestral Geometry Sleeve',
    description: 'Fused Ndebele symmetry and Great Zimbabwe stonework chevron patterns.',
    location: 'Bulawayo Studio',
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'ink-2',
    category: 'ink',
    title: 'Afro-Realist Crown Portrait',
    description: 'High contrast fine-line portrait celebrating maternal legacy.',
    location: 'Johannesburg (The Reef)',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'ink-3',
    category: 'ink',
    title: 'Kuruman Dust Chevron',
    description: 'Clay-red textured tribal mark commemorating early iron age miners.',
    location: 'Kuruman Sanctuary',
    imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lens-1',
    category: 'lens',
    title: 'Gold Miners in the Dusk',
    description: 'Cinematic documentary portrait of urban street hustle in the Golden City.',
    location: 'Johannesburg',
    imageUrl: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lens-2',
    category: 'lens',
    title: 'The Queen of Chitungwiza',
    description: 'High-fashion editorial highlighting traditional beaded crowns & high contrast studio setup.',
    location: 'Harare Studio',
    imageUrl: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lens-3',
    category: 'lens',
    title: 'Reef Sovereignty Grid',
    description: 'Grainy film portrait reflecting light against concrete and steel structures.',
    location: 'Johannesburg',
    imageUrl: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'crown-1',
    category: 'crown',
    title: 'Sacred Dreadlock Crown',
    description: 'Interlocked matured dreadlocks structured into high-fashion architectural loops.',
    location: 'Harare Studio',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'crown-2',
    category: 'crown',
    title: 'Reef Crown Twists',
    description: 'Clean organic maintenance with custom copper and golden wire bindings.',
    location: 'Johannesburg (The Reef)',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'crown-3',
    category: 'crown',
    title: 'Tribal Lock Sculpture',
    description: 'Intricate micro-loc styling and conditioning ritual root therapy.',
    location: 'Bulawayo Studio',
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
  }
];

export const EXCHANGE_RATE_ZAR_TO_USD = 18.5; // 1 USD = 18.5 ZAR

export const INSPlRATION_PRESETS = [
  {
    id: 'preset-geo',
    name: 'Ancestral Chevron Grid',
    desc: 'Great Zimbabwe stone patterns',
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'preset-crown',
    name: 'Loc Twist Concept',
    desc: 'Wired sacred locks layout',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'preset-street',
    name: 'High-Contrast Urban Lens',
    desc: 'Gritty street portrait mockup',
    imageUrl: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=600&auto=format&fit=crop'
  }
];
