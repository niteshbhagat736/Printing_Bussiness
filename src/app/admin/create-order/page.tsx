'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Phone, Mail, MapPin, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { serviceCategories } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function CreateOrderPage() {
  const { createAdminOrder, setAdminMode } = useApp();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<string | null>(null);

  useEffect(() => { setHydrated(true); setAdminMode(true); }, [setAdminMode]);

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    categoryId: '',
    serviceName: '',
    quantity: 1,
    specifications: '',
    delivery: 'pickup' as 'pickup' | 'delivery',
    quoteAmount: '',
    notes: '',
    adminNotes: '',
  });

  const selectedCat = serviceCategories.find(c => c.id === form.categoryId);

  const update = (key: string, value: unknown) => setForm(p => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const order = createAdminOrder({
      customer: {
        name: form.customerName,
        phone: form.phone,
        email: form.email,
        address: form.address,
      },
      categoryId: form.categoryId,
      categoryName: selectedCat?.name || form.categoryId,
      serviceName: form.serviceName,
      quantity: form.quantity,
      specifications: form.specifications,
      deliveryMethod: form.delivery,
      quoteAmount: form.quoteAmount ? parseFloat(form.quoteAmount) : undefined,
      notes: form.notes,
      adminNotes: form.adminNotes,
    });
    setCreating(false);
    setCreated(order.orderId);
  };

  if (!hydrated) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

  if (created) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card animate-scale-in" style={{ maxWidth: 480, width: '100%', padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ marginBottom: '0.5rem' }}>Order Created!</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>New order has been added to the system.</p>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--brand-blue)', marginBottom: '1.5rem' }}>{created}</div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href={`/admin/orders/${created}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>View Order</Link>
            <Link href="/admin/orders" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>All Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>
      <div style={{ background: '#1e1b4b', borderBottom: '1px solid #312e81', padding: '1.5rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/admin" style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: '#4c1d95' }}>/</span>
          <h1 style={{ fontSize: '1.2rem', color: '#fff' }}>Create New Order</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          {/* Customer Details */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} color="var(--brand-blue)" /> Customer Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 1.5rem' }}>
              <div className="form-group">
                <label htmlFor="cname">Customer Name *</label>
                <input id="cname" type="text" placeholder="e.g. Rahul Sharma" value={form.customerName} onChange={e => update('customerName', e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="cphone">Phone Number *</label>
                <input id="cphone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="cemail">Email</label>
                <input id="cemail" type="email" placeholder="customer@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="caddress">Address</label>
                <input id="caddress" type="text" placeholder="Delivery/shop address" value={form.address} onChange={e => update('address', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} color="var(--brand-blue)" /> Service Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 1.5rem' }}>
              <div className="form-group">
                <label htmlFor="cat">Service Category *</label>
                <select id="cat" value={form.categoryId} onChange={e => { update('categoryId', e.target.value); update('serviceName', ''); }} required>
                  <option value="">Select category...</option>
                  {serviceCategories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="svc">Sub-Service *</label>
                <select id="svc" value={form.serviceName} onChange={e => update('serviceName', e.target.value)} required disabled={!form.categoryId}>
                  <option value="">Select service...</option>
                  {selectedCat?.subServices.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="qty">Quantity *</label>
                <input id="qty" type="number" min={1} value={form.quantity} onChange={e => update('quantity', parseInt(e.target.value) || 1)} required />
              </div>
              <div className="form-group">
                <label htmlFor="quote-amt">Quote Amount (₹)</label>
                <input id="quote-amt" type="number" min={0} placeholder="Leave blank if not yet quoted" value={form.quoteAmount} onChange={e => update('quoteAmount', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="specs">Specifications</label>
              <textarea id="specs" placeholder="Size, colour, finish, material, dimensions..." value={form.specifications} onChange={e => update('specifications', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Delivery Method *</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { v: 'pickup', l: 'Self Pickup' },
                  { v: 'delivery', l: 'Home Delivery' },
                ].map(({ v, l }) => (
                  <button key={v} type="button" onClick={() => update('delivery', v)}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: 10, border: '2px solid', borderColor: form.delivery === v ? 'var(--brand-blue)' : 'var(--border)', background: form.delivery === v ? 'var(--brand-blue-light)' : '#fff', color: form.delivery === v ? 'var(--brand-blue)' : 'var(--text)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Notes</h2>
            <div className="form-group">
              <label htmlFor="cnotes">Customer Notes</label>
              <textarea id="cnotes" placeholder="Special requirements, deadline etc." value={form.notes} onChange={e => update('notes', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="anotes">Internal Admin Notes</label>
              <textarea id="anotes" placeholder="Internal notes for production team..." value={form.adminNotes} onChange={e => update('adminNotes', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Link href="/admin" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }} disabled={creating}>
              {creating ? 'Creating...' : <><Plus size={16} /> Create Order</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
