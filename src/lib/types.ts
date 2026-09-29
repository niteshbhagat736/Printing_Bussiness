// ============================================================
// CORE TYPES - PrintMaster Pro
// ============================================================

export type ServiceCategoryId =
  | 'colour-digital'
  | 'bw-digital'
  | 'offset'
  | 'riso-inkjet'
  | 'solvent'
  | 'led-board'
  | 'plotter-cutting'
  | 'uv-eco-solvent'
  | 'other-work'
  | 'laser-cnc';

export interface SubService {
  id: string;
  name: string;
  description?: string;
  startingPrice?: number;
}

import React from 'react';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  icon: React.ElementType;
  description: string;
  count: number;
  filterTag: string;
  subServices: SubService[];
}

// Order & Quote Types
export type OrderStatus =
  | 'quote_requested'
  | 'quote_sent'
  | 'quote_approved'
  | 'design_confirmed'
  | 'in_production'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface QuoteItem {
  id: string;
  categoryId: ServiceCategoryId;
  categoryName: string;
  serviceName: string;
  quantity: number;
  specifications: string;
  notes: string;
  designFileName?: string;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  address?: string;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export interface Order {
  id: string;
  orderId: string;
  customer: Customer;
  items: QuoteItem[];
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  quoteAmount?: number;
  estimatedAmount?: number;
  notes: string;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusHistoryEntry[];
}

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

// Admin types
export interface AdminStats {
  totalOrders: number;
  pendingQuotes: number;
  inProduction: number;
  readyForPickup: number;
  completed: number;
  estimatedRevenue: number;
}

// Filter types
export type ServiceFilter =
  | 'all'
  | 'digital'
  | 'offset'
  | 'signage'
  | 'cutting'
  | 'uv'
  | 'fabrication'
  | 'laser'
  | 'other';

export interface SearchResult {
  categoryId: ServiceCategoryId;
  categoryName: string;
  service: SubService;
}
