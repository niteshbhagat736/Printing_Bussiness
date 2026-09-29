'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Circle, Edit2, MessageSquare, DollarSign, Phone, User, Package, Truck, Store } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Order, OrderStatus } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import { formatDate, formatDateTime, STATUS_LABELS, STATUS_ORDER } from '@/lib/utils';

const NEXT_STATUS_MAP: Partial<Record<OrderStatus, OrderStatus>> = {
  quote_requested: 'quote_sent',
  quote_sent: 'quote_approved',
  quote_approved: 'design_confirmed',
  design_confirmed: 'in_production',
  in_production: 'ready',
  ready: 'completed',
};

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders, changeOrderStatus, setOrderQuote, appendAdminNote, setAdminMode } = useApp();
  const [hydrated, setHydrated] = useState(false);

  // Modal states
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [noteText, setNoteText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');

  useEffect(() => {
    setHydrated(true);
    setAdminMode(true);
  }, [setAdminMode]);

  const order = orders.find(o => o.orderId === id || o.id === id);

  if (!hydrated) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
  if (!order) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Order not found</h2>
      <Link href="/admin/orders" className="btn-primary" style={{ marginTop: '1rem' }}>← Back to Orders</Link>
    </div>
  );

  const currentStepIdx = STATUS_ORDER.indexOf(order.status);
  const nextStatus = NEXT_STATUS_MAP[order.status];

  const handleStatusUpdate = () => {
    if (!selectedStatus) return;
    changeOrderStatus(order.orderId, selectedStatus, statusNote);
    setShowStatusModal(false);
    setStatusNote('');
    setSelectedStatus('');
  };

  const handleQuoteUpdate = () => {
    const amount = parseFloat(quoteAmount);
    if (!amount || isNaN(amount)) return;
    setOrderQuote(order.orderId, amount);
    setShowQuoteModal(false);
    setQuoteAmount('');
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    appendAdminNote(order.orderId, noteText.trim());
    setShowNoteModal(false);
    setNoteText('');
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ background: '#1e1b4b', borderBottom: '1px solid #312e81', padding: '1.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem', fontSize: '0.85rem', color: '#a5b4fc', flexWrap: 'wrap' }}>
            <Link href="/admin" style={{ color: '#a5b4fc', textDecoration: 'none' }}>Dashboard</Link>
            <span>/</span>
            <Link href="/admin/orders" style={{ color: '#a5b4fc', textDecoration: 'none' }}>Orders</Link>
            <span>/</span>
            <span style={{ color: '#fff' }}>{order.orderId}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>{order.orderId}</h1>
              <p style={{ color: '#a5b4fc', fontSize: '0.85rem' }}>Placed {formatDate(order.createdAt)} · Updated {formatDate(order.updatedAt)}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '1.5rem' }}>
        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.5rem' }}>
          {nextStatus && (
            <button
              onClick={() => changeOrderStatus(order.orderId, nextStatus)}
              className="btn-primary"
              style={{ background: '#059669', fontSize: '0.875rem' }}
            >
              ✓ Mark as {STATUS_LABELS[nextStatus]}
            </button>
          )}
          <button onClick={() => { setSelectedStatus(order.status); setShowStatusModal(true); }} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
            <Edit2 size={14} /> Update Status
          </button>
          <button onClick={() => { setQuoteAmount(order.quoteAmount?.toString() || ''); setShowQuoteModal(true); }} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
            <DollarSign size={14} /> {order.quoteAmount ? 'Edit Quote' : 'Set Quote'}
          </button>
          <button onClick={() => setShowNoteModal(true)} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
            <MessageSquare size={14} /> Add Note
          </button>
          <a href={`tel:${order.customer.phone}`} className="btn-secondary" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
            <Phone size={14} /> Call Customer
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', alignItems: 'start' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Customer */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <User size={14} /> Customer
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
                <div><strong style={{ fontSize: '1.05rem' }}>{order.customer.name}</strong></div>
                <div><a href={`tel:${order.customer.phone}`} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>{order.customer.phone}</a></div>
                {order.customer.email && <div><a href={`mailto:${order.customer.email}`} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>{order.customer.email}</a></div>}
                {order.customer.address && <div style={{ color: 'var(--text-light)' }}>{order.customer.address}</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  {order.deliveryMethod === 'pickup' ? <Store size={14} color="var(--text-light)" /> : <Truck size={14} color="var(--text-light)" />}
                  <span style={{ color: 'var(--text-light)', textTransform: 'capitalize' }}>{order.deliveryMethod}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Package size={14} /> Services
              </h3>
              {order.items.map(item => (
                <div key={item.id} style={{ padding: '0.875rem', background: '#f9fafb', borderRadius: 10, marginBottom: '0.625rem', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--brand-blue)', fontWeight: 600, marginBottom: 2 }}>{item.categoryName}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.375rem' }}>{item.serviceName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    Qty: <strong>{item.quantity}</strong>
                    {item.specifications && <><br />{item.specifications}</>}
                  </div>
                  {item.designFileName && <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: 4 }}>📎 {item.designFileName}</div>}
                  {item.notes && <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 4 }}>Note: {item.notes}</div>}
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Quote Amount</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--brand-blue)' }}>
                    {order.quoteAmount ? `₹${order.quoteAmount.toLocaleString('en-IN')}` : <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Not set</span>}
                  </span>
                  <button onClick={() => { setQuoteAmount(order.quoteAmount?.toString() || ''); setShowQuoteModal(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            {(order.notes || order.adminNotes) && (
              <div className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>Notes</h3>
                {order.notes && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Customer Note</div>
                    <p style={{ fontSize: '0.875rem' }}>{order.notes}</p>
                  </div>
                )}
                {order.adminNotes && (
                  <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '0.75rem', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#16a34a', marginBottom: 4, fontWeight: 600 }}>Admin Notes</div>
                    <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>{order.adminNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Timeline */}
          <div className="card" style={{ padding: '1.25rem' }}>
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
                        background: isDone ? (isCurrent ? '#1a56db' : '#dcfce7') : '#f3f4f6',
                        border: `2px solid ${isDone ? (isCurrent ? '#1a56db' : '#86efac') : '#e5e7eb'}`,
                      }}
                    >
                      {isDone ? (
                        isCurrent
                          ? <span style={{ color: '#fff', fontSize: '0.6rem', fontWeight: 700 }}>●</span>
                          : <CheckCircle size={14} color="#16a34a" />
                      ) : (
                        <Circle size={14} color="#d1d5db" />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingTop: '0.2rem' }}>
                      <div style={{ fontWeight: isCurrent ? 700 : isDone ? 500 : 400, color: isDone ? 'var(--brand-dark)' : '#9ca3af', fontSize: '0.875rem' }}>
                        {STATUS_LABELS[status]}
                      </div>
                      {historyEntry ? (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                          {formatDateTime(historyEntry.timestamp)}
                          {historyEntry.note && ` · ${historyEntry.note}`}
                        </div>
                      ) : isCurrent ? null : (
                        <div style={{ fontSize: '0.72rem', color: '#d1d5db', marginTop: 2 }}>Pending</div>
                      )}
                    </div>
                    {!isDone && isCurrent === false && nextStatus && idx === currentStepIdx + 1 && (
                      <button
                        onClick={() => changeOrderStatus(order.orderId, status)}
                        style={{ fontSize: '0.72rem', background: '#eff6ff', color: 'var(--brand-blue)', border: '1px solid #bfdbfe', borderRadius: 6, padding: '0.25rem 0.5rem', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600 }}
                      >
                        Mark →
                      </button>
                    )}
                  </li>
                );
              })}
              {order.status === 'cancelled' && (
                <li className="timeline-item">
                  <div className="timeline-dot" style={{ background: '#fee2e2', border: '2px solid #fca5a5' }}>
                    <span style={{ color: '#dc2626', fontSize: '0.7rem' }}>✕</span>
                  </div>
                  <div style={{ flex: 1, paddingTop: '0.2rem' }}>
                    <div style={{ fontWeight: 700, color: '#dc2626', fontSize: '0.875rem' }}>Cancelled</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* UPDATE STATUS MODAL */}
      {showStatusModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowStatusModal(false); }}>
          <div className="modal animate-scale-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Update Order Status</h2>
            <div className="form-group">
              <label htmlFor="new-status">New Status</label>
              <select id="new-status" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value as OrderStatus)}>
                <option value="">Select status...</option>
                {STATUS_ORDER.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status-note">Internal Note (optional)</label>
              <textarea id="status-note" placeholder="e.g. Customer confirmed design, starting production..." value={statusNote} onChange={e => setStatusNote(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowStatusModal(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleStatusUpdate} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={!selectedStatus}>
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUOTE MODAL */}
      {showQuoteModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowQuoteModal(false); }}>
          <div className="modal animate-scale-in" style={{ maxWidth: 420 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Set Quote Amount</h2>
            <div className="form-group">
              <label htmlFor="quote-amount">Amount (₹) — excl. GST & extras</label>
              <input
                id="quote-amount"
                type="number"
                min={0}
                placeholder="e.g. 18500"
                value={quoteAmount}
                onChange={e => setQuoteAmount(e.target.value)}
              />
            </div>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '0.75rem', fontSize: '0.8rem', color: '#92400e', marginBottom: '1.25rem' }}>
              Note: GST, design, transportation and installation charges are extra.
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowQuoteModal(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleQuoteUpdate} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save Quote</button>
            </div>
          </div>
        </div>
      )}

      {/* NOTE MODAL */}
      {showNoteModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowNoteModal(false); }}>
          <div className="modal animate-scale-in" style={{ maxWidth: 420 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Add Internal Note</h2>
            <div className="form-group">
              <label htmlFor="note-text">Note</label>
              <textarea id="note-text" placeholder="Internal note for production team..." value={noteText} onChange={e => setNoteText(e.target.value)} style={{ minHeight: 100 }} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowNoteModal(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleAddNote} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={!noteText.trim()}>Add Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
