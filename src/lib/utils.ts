import type { OrderStatus } from './types';

export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  quote_requested: 'Quote Requested',
  quote_sent: 'Quote Sent',
  quote_approved: 'Quote Approved',
  design_confirmed: 'Design Confirmed',
  in_production: 'In Production',
  ready: 'Ready for Pickup',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  quote_requested: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  quote_sent: 'bg-blue-100 text-blue-800 border-blue-200',
  quote_approved: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  design_confirmed: 'bg-purple-100 text-purple-800 border-purple-200',
  in_production: 'bg-orange-100 text-orange-800 border-orange-200',
  ready: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-gray-100 text-gray-700 border-gray-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export const STATUS_ORDER: OrderStatus[] = [
  'quote_requested',
  'quote_sent',
  'quote_approved',
  'design_confirmed',
  'in_production',
  'ready',
  'completed',
];

export function getStatusStep(status: OrderStatus): number {
  return STATUS_ORDER.indexOf(status);
}

export function generateOrderId(): string {
  return `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}
