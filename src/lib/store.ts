import type { Order, QuoteItem, OrderStatus, Customer } from './types';
import { mockOrders } from './mockData';

const ORDERS_KEY = 'printmaster_orders';
const QUOTE_CART_KEY = 'printmaster_quote_cart';
const NEXT_ORDER_ID_KEY = 'printmaster_next_order_num';

// ============================================================
// ORDER STORE
// ============================================================

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return mockOrders;
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) {
    // Initialize with mock data
    localStorage.setItem(ORDERS_KEY, JSON.stringify(mockOrders));
    return mockOrders;
  }
  try {
    return JSON.parse(stored) as Order[];
  } catch {
    return mockOrders;
  }
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderById(orderId: string): Order | undefined {
  return getOrders().find(o => o.orderId === orderId || o.id === orderId);
}

export function createOrder(
  customer: Customer,
  items: QuoteItem[],
  notes: string,
  deliveryMethod: 'pickup' | 'delivery'
): Order {
  const orders = getOrders();
  const nextNum = getNextOrderNum();
  const orderId = `ORD-2026-${nextNum}`;
  const now = new Date().toISOString();

  const newOrder: Order = {
    id: `order_${Date.now()}`,
    orderId,
    customer,
    items,
    status: 'quote_requested',
    deliveryMethod,
    notes,
    adminNotes: '',
    createdAt: now,
    updatedAt: now,
    statusHistory: [{ status: 'quote_requested', timestamp: now }],
  };

  orders.unshift(newOrder);
  saveOrders(orders);
  incrementOrderNum();
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus, note?: string): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.orderId === orderId || o.id === orderId);
  if (idx === -1) return null;

  const now = new Date().toISOString();
  orders[idx] = {
    ...orders[idx],
    status,
    updatedAt: now,
    statusHistory: [
      ...orders[idx].statusHistory,
      { status, timestamp: now, note },
    ],
  };
  saveOrders(orders);
  return orders[idx];
}

export function updateOrderQuote(orderId: string, amount: number): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.orderId === orderId || o.id === orderId);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], quoteAmount: amount, updatedAt: new Date().toISOString() };
  saveOrders(orders);
  return orders[idx];
}

export function addAdminNote(orderId: string, note: string): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.orderId === orderId || o.id === orderId);
  if (idx === -1) return null;
  const existing = orders[idx].adminNotes;
  orders[idx] = {
    ...orders[idx],
    adminNotes: existing ? `${existing}\n${note}` : note,
    updatedAt: new Date().toISOString(),
  };
  saveOrders(orders);
  return orders[idx];
}

export function adminCreateOrder(data: {
  customer: Customer;
  categoryName: string;
  categoryId: string;
  serviceName: string;
  quantity: number;
  specifications: string;
  deliveryMethod: 'pickup' | 'delivery';
  quoteAmount?: number;
  notes: string;
  adminNotes: string;
}): Order {
  const orders = getOrders();
  const nextNum = getNextOrderNum();
  const orderId = `ORD-2026-${nextNum}`;
  const now = new Date().toISOString();

  const item: QuoteItem = {
    id: `item_${Date.now()}`,
    categoryId: data.categoryId as import('./types').ServiceCategoryId,
    categoryName: data.categoryName,
    serviceName: data.serviceName,
    quantity: data.quantity,
    specifications: data.specifications,
    notes: '',
  };

  const newOrder: Order = {
    id: `order_${Date.now()}`,
    orderId,
    customer: data.customer,
    items: [item],
    status: 'quote_requested',
    deliveryMethod: data.deliveryMethod,
    quoteAmount: data.quoteAmount,
    notes: data.notes,
    adminNotes: data.adminNotes,
    createdAt: now,
    updatedAt: now,
    statusHistory: [{ status: 'quote_requested', timestamp: now }],
  };

  orders.unshift(newOrder);
  saveOrders(orders);
  incrementOrderNum();
  return newOrder;
}

function getNextOrderNum(): number {
  if (typeof window === 'undefined') return 1049;
  const stored = localStorage.getItem(NEXT_ORDER_ID_KEY);
  return stored ? parseInt(stored, 10) : 1049;
}

function incrementOrderNum(): void {
  if (typeof window === 'undefined') return;
  const current = getNextOrderNum();
  localStorage.setItem(NEXT_ORDER_ID_KEY, String(current + 1));
}

// ============================================================
// QUOTE CART STORE
// ============================================================

export function getQuoteCart(): QuoteItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(QUOTE_CART_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as QuoteItem[];
  } catch {
    return [];
  }
}

export function saveQuoteCart(items: QuoteItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(QUOTE_CART_KEY, JSON.stringify(items));
}

export function addToQuoteCart(item: Omit<QuoteItem, 'id'>): QuoteItem[] {
  const cart = getQuoteCart();
  const newItem: QuoteItem = { ...item, id: `qi_${Date.now()}` };
  const updated = [...cart, newItem];
  saveQuoteCart(updated);
  return updated;
}

export function removeFromQuoteCart(id: string): QuoteItem[] {
  const cart = getQuoteCart().filter(i => i.id !== id);
  saveQuoteCart(cart);
  return cart;
}

export function clearQuoteCart(): void {
  saveQuoteCart([]);
}
