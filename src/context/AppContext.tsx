'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { QuoteItem, Order } from '@/lib/types';
import {
  getQuoteCart,
  saveQuoteCart,
  addToQuoteCart,
  removeFromQuoteCart,
  clearQuoteCart,
  getOrders,
  createOrder,
  updateOrderStatus,
  updateOrderQuote,
  addAdminNote,
  adminCreateOrder,
} from '@/lib/store';
import type { Customer, OrderStatus } from '@/lib/types';

interface AppContextValue {
  // Quote Cart
  quoteCart: QuoteItem[];
  addToCart: (item: Omit<QuoteItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;

  // Orders
  orders: Order[];
  refreshOrders: () => void;
  submitOrder: (customer: Customer, notes: string, delivery: 'pickup' | 'delivery') => Order;
  changeOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  setOrderQuote: (orderId: string, amount: number) => void;
  appendAdminNote: (orderId: string, note: string) => void;
  createAdminOrder: (data: Parameters<typeof adminCreateOrder>[0]) => Order;

  // UI state
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isAdminMode: boolean;
  setAdminMode: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [quoteCart, setQuoteCart] = useState<QuoteItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAdminMode, setAdminMode] = useState(false);

  useEffect(() => {
    setQuoteCart(getQuoteCart());
    setOrders(getOrders());
  }, []);

  const refreshOrders = useCallback(() => {
    setOrders(getOrders());
  }, []);

  const addToCart = useCallback((item: Omit<QuoteItem, 'id'>) => {
    const updated = addToQuoteCart(item);
    setQuoteCart(updated);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    const updated = removeFromQuoteCart(id);
    setQuoteCart(updated);
  }, []);

  const clearCart = useCallback(() => {
    clearQuoteCart();
    setQuoteCart([]);
  }, []);

  const submitOrder = useCallback((customer: Customer, notes: string, delivery: 'pickup' | 'delivery') => {
    const order = createOrder(customer, quoteCart, notes, delivery);
    setOrders(getOrders());
    clearQuoteCart();
    setQuoteCart([]);
    return order;
  }, [quoteCart]);

  const changeOrderStatus = useCallback((orderId: string, status: OrderStatus, note?: string) => {
    updateOrderStatus(orderId, status, note);
    setOrders(getOrders());
  }, []);

  const setOrderQuote = useCallback((orderId: string, amount: number) => {
    updateOrderQuote(orderId, amount);
    setOrders(getOrders());
  }, []);

  const appendAdminNote = useCallback((orderId: string, note: string) => {
    addAdminNote(orderId, note);
    setOrders(getOrders());
  }, []);

  const createAdminOrderFn = useCallback((data: Parameters<typeof adminCreateOrder>[0]) => {
    const order = adminCreateOrder(data);
    setOrders(getOrders());
    return order;
  }, []);

  return (
    <AppContext.Provider value={{
      quoteCart,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount: quoteCart.length,
      orders,
      refreshOrders,
      submitOrder,
      changeOrderStatus,
      setOrderQuote,
      appendAdminNote,
      createAdminOrder: createAdminOrderFn,
      isCartOpen,
      setCartOpen,
      isAdminMode,
      setAdminMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
