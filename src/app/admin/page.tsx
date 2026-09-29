'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Package, Clock, CheckCircle, TrendingUp,
  Search, Filter, Plus, Eye, ChevronRight, AlertCircle,
  BarChart2, Users, Zap, RefreshCw
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Order, OrderStatus } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import { formatDate, STATUS_LABELS } from '@/lib/utils';

export default function AdminPage() {
  const { orders, isAdminMode, setAdminMode } = useApp();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setAdminMode(true); // auto-activate admin mode when visiting admin page
  }, [setAdminMode]);

  if (!hydrated) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'quote_requested').length,
    inProduction: orders.filter(o => o.status === 'in_production').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders.filter(o => o.quoteAmount).reduce((s, o) => s + (o.quoteAmount || 0), 0),
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>
      {/* Admin Header */}
      <div style={{ background: '#1e1b4b', borderBottom: '1px solid #312e81', padding: '1.5rem', color: '#fff' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>Admin Dashboard</h1>
            <p style={{ color: '#a5b4fc', fontSize: '0.85rem' }}>PrintMaster Pro — Order Management System</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/admin/create-order" className="btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: '0.875rem' }}>
              <Plus size={15} /> Create Order
            </Link>
            <Link href="/admin/orders" className="btn-secondary" style={{ fontSize: '0.875rem', borderColor: '#312e81', color: '#a5b4fc', background: 'rgba(255,255,255,0.05)' }}>
              <Package size={15} /> All Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Orders', value: stats.total, icon: Package, color: '#1a56db', bg: '#eff6ff' },
            { label: 'Pending Quotes', value: stats.pending, icon: Clock, color: '#d97706', bg: '#fffbeb' },
            { label: 'In Production', value: stats.inProduction, icon: Zap, color: '#ea580c', bg: '#fff7ed' },
            { label: 'Ready for Pickup', value: stats.ready, icon: CheckCircle, color: '#16a34a', bg: '#f0fdf4' },
            { label: 'Completed', value: stats.completed, icon: TrendingUp, color: '#7c3aed', bg: '#faf5ff' },
            { label: 'Est. Revenue', value: `₹${(stats.revenue / 1000).toFixed(0)}K`, icon: BarChart2, color: '#0891b2', bg: '#ecfeff', isAmount: true },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-dark)', lineHeight: 1.1 }}>{value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 2 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.05rem' }}>Recent Orders</h2>
            <Link href="/admin/orders" style={{ fontSize: '0.85rem', color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <AdminOrderTable orders={orders.slice(0, 6)} />
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <Link href="/admin/create-order" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={22} color="#7c3aed" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>Create New Order</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Add order for walk-in customer</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/orders?status=quote_requested" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#d97706'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(217,119,6,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={22} color="#d97706" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>Pending Quotes <span style={{ color: '#d97706' }}>({stats.pending})</span></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Review and send quotes</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/orders?status=in_production" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(234,88,12,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={22} color="#ea580c" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>In Production <span style={{ color: '#ea580c' }}>({stats.inProduction})</span></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Active production jobs</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/orders?status=ready" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(22,163,74,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={22} color="#16a34a" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>Ready for Pickup <span style={{ color: '#16a34a' }}>({stats.ready})</span></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Notify customers</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminOrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Quote</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ fontWeight: 700, color: 'var(--brand-blue)', whiteSpace: 'nowrap' }}>{order.orderId}</td>
              <td>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{order.customer.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{order.customer.phone}</div>
              </td>
              <td>
                <div style={{ fontWeight: 500, fontSize: '0.875rem', maxWidth: 200 }}>{order.items[0].serviceName}</div>
                {order.items.length > 1 && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{order.items.length - 1} more</div>}
              </td>
              <td style={{ fontSize: '0.82rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{formatDate(order.createdAt)}</td>
              <td><StatusBadge status={order.status} size="sm" /></td>
              <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                {order.quoteAmount ? `₹${order.quoteAmount.toLocaleString('en-IN')}` : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>}
              </td>
              <td>
                <Link
                  href={`/admin/orders/${order.orderId}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'none', padding: '0.3rem 0.625rem', borderRadius: 6, border: '1px solid var(--border)' }}
                >
                  <Eye size={13} /> View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
