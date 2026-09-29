'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Plus, Eye, ArrowLeft, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { OrderStatus } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import { formatDate, STATUS_LABELS } from '@/lib/utils';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'quote_requested', label: 'Quote Requested' },
  { value: 'quote_sent', label: 'Quote Sent' },
  { value: 'quote_approved', label: 'Quote Approved' },
  { value: 'design_confirmed', label: 'Design Confirmed' },
  { value: 'in_production', label: 'In Production' },
  { value: 'ready', label: 'Ready for Pickup' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

function AdminOrdersInner() {
  const { orders, setAdminMode } = useApp();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setAdminMode(true);
  }, [setAdminMode]);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = !search || [o.orderId, o.customer.name, o.customer.phone, ...o.items.map(i => i.serviceName)].some(v => v.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = !statusFilter || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  if (!hydrated) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ background: '#1e1b4b', borderBottom: '1px solid #312e81', padding: '1.5rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/admin" style={{ color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none', fontSize: '0.875rem' }}>
              <ArrowLeft size={15} /> Dashboard
            </Link>
            <span style={{ color: '#4c1d95' }}>/</span>
            <h1 style={{ fontSize: '1.2rem', color: '#fff' }}>All Orders</h1>
          </div>
          <Link href="/admin/create-order" className="btn-primary" style={{ background: '#7c3aed', fontSize: '0.875rem' }}>
            <Plus size={15} /> Create Order
          </Link>
        </div>
      </div>

      <div className="container" style={{ padding: '1.5rem' }}>
        {/* Filters */}
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: 200 }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search orders, customers, services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={15} style={{ color: 'var(--text-light)' }} />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: 'var(--text)', background: '#fff', cursor: 'pointer' }}
            >
              {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
            {filtered.length} of {orders.length} orders
          </span>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Qty</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Quote</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>No orders found</td></tr>
                ) : (
                  filtered.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 700, color: 'var(--brand-blue)', whiteSpace: 'nowrap' }}>{order.orderId}</td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{order.customer.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{order.customer.phone}</div>
                      </td>
                      <td style={{ maxWidth: 220 }}>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.items[0].serviceName}</div>
                        {order.items.length > 1 && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{order.items.length - 1} more</div>}
                      </td>
                      <td style={{ fontSize: '0.875rem' }}>{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{formatDate(order.createdAt)}</td>
                      <td><StatusBadge status={order.status} size="sm" /></td>
                      <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {order.quoteAmount ? `₹${order.quoteAmount.toLocaleString('en-IN')}` : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Pending</span>}
                      </td>
                      <td>
                        <Link
                          href={`/admin/orders/${order.orderId}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'none', padding: '0.3rem 0.625rem', borderRadius: 6, border: '1px solid var(--border)' }}
                        >
                          <Eye size={12} /> Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <AdminOrdersInner />
    </Suspense>
  );
}
