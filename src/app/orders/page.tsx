'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Package, Clock, ChevronRight, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Order, OrderStatus } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import { formatDate, formatDateTime, STATUS_LABELS, STATUS_ORDER } from '@/lib/utils';

export default function OrdersPage() {
  const { orders } = useApp();
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const filtered = orders.filter(o =>
    o.orderId.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    o.items.some(i => i.serviceName.toLowerCase().includes(search.toLowerCase()))
  );

  if (!hydrated) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>Loading orders...</div>;

  if (selectedOrder) {
    return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '2.5rem 1.5rem', color: '#fff' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', marginBottom: '0.375rem' }}>My Orders</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Track your print orders and quote requests</p>
          <div style={{ maxWidth: 420, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem' }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by order ID or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem', background: 'transparent', color: '#fff' }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No orders found</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {search ? 'Try a different search term.' : "You haven't placed any orders yet."}
            </p>
            {!search && <Link href="/services" className="btn-primary">Browse Services</Link>}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(order => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,86,219,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.375rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--brand-blue)' }}>{order.orderId}</span>
                      <StatusBadge status={order.status} size="sm" />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--brand-dark)', marginBottom: '0.25rem' }}>
                      {order.items[0].serviceName}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-light)', flexWrap: 'wrap' }}>
                      <span><Clock size={11} style={{ display: 'inline', marginRight: 3 }} />{formatDate(order.createdAt)}</span>
                      <span>Qty: {order.items.reduce((s, i) => s + i.quantity, 0)}</span>
                      <span style={{ textTransform: 'capitalize' }}>{order.deliveryMethod}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    {order.quoteAmount && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Quote</div>
                        <div style={{ fontWeight: 700, color: 'var(--brand-dark)' }}>₹{order.quoteAmount.toLocaleString('en-IN')}</div>
                      </div>
                    )}
                    <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ORDER DETAIL VIEW
// ============================================================
function OrderDetailView({ order, onBack }: { order: Order; onBack: () => void }) {
  const currentStepIdx = STATUS_ORDER.indexOf(order.status);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '2rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-light)', fontWeight: 500 }}>
          ← Back to Orders
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>{order.orderId}</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Placed on {formatDate(order.createdAt)}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Customer */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>Customer</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div><div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>Name</div><div style={{ fontWeight: 600 }}>{order.customer.name}</div></div>
            <div><div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>Phone</div><div style={{ fontWeight: 600 }}>{order.customer.phone}</div></div>
            {order.customer.email && <div><div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>Email</div><div style={{ fontWeight: 600 }}>{order.customer.email}</div></div>}
            <div><div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>Delivery</div><div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{order.deliveryMethod}</div></div>
          </div>
        </div>

        {/* Services */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>Services</h3>
          {order.items.map(item => (
            <div key={item.id} style={{ padding: '0.875rem', background: '#f9fafb', borderRadius: 10, marginBottom: '0.5rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--brand-blue)', fontWeight: 600, marginBottom: 2 }}>{item.categoryName}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.375rem' }}>{item.serviceName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                Qty: {item.quantity}
                {item.specifications && ` · ${item.specifications}`}
              </div>
              {item.designFileName && <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: 4 }}>📎 {item.designFileName}</div>}
              {item.notes && <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 4 }}>Note: {item.notes}</div>}
            </div>
          ))}
          {order.quoteAmount && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.875rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>Quote Amount</span>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--brand-blue)' }}>₹{order.quoteAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>Order Timeline</h3>
          <ul className="timeline">
            {STATUS_ORDER.map((status, idx) => {
              if (status === 'cancelled') return null;
              const historyEntry = order.statusHistory.find(h => h.status === status);
              const isDone = idx <= currentStepIdx && order.status !== 'cancelled';
              const isCurrent = idx === currentStepIdx;

              return (
                <li key={status} className="timeline-item">
                  <div
                    className="timeline-dot"
                    style={{
                      background: isDone ? (isCurrent ? 'var(--brand-blue)' : '#dcfce7') : '#f3f4f6',
                      border: `2px solid ${isDone ? (isCurrent ? 'var(--brand-blue)' : '#86efac') : '#e5e7eb'}`,
                    }}
                  >
                    {isDone ? (
                      isCurrent ? <span style={{ color: '#fff', fontSize: '0.7rem' }}>●</span> : <CheckCircle size={14} color="#16a34a" />
                    ) : (
                      <Circle size={14} color="#d1d5db" />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingTop: '0.2rem' }}>
                    <div style={{ fontWeight: isCurrent ? 700 : isDone ? 500 : 400, color: isDone ? 'var(--brand-dark)' : '#9ca3af', fontSize: '0.875rem' }}>
                      {STATUS_LABELS[status]}
                    </div>
                    {historyEntry && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {formatDateTime(historyEntry.timestamp)}
                        {historyEntry.note && ` · ${historyEntry.note}`}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {order.notes && (
          <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 4 }}>Notes</div>
            <p style={{ fontSize: '0.875rem' }}>{order.notes}</p>
          </div>
        )}

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '0.875rem 1.25rem', fontSize: '0.83rem', color: '#1d4ed8' }}>
          💬 For updates, call us at <strong>+91 98765 43210</strong> or WhatsApp with your order ID: <strong>{order.orderId}</strong>
        </div>
      </div>
    </div>
  );
}
