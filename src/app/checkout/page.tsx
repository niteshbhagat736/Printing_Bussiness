'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2, User, Phone, Mail, MapPin, Package, ChevronRight, ArrowLeft, CheckCircle, Truck, Store } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Customer } from '@/lib/types';

type Step = 'cart' | 'details' | 'review' | 'confirmed';

export default function CheckoutPage() {
  const { quoteCart, removeFromCart, clearCart, submitOrder, setCartOpen } = useApp();
  const router = useRouter();
  const [step, setStep] = useState<Step>('cart');
  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '', email: '', address: '' });
  const [delivery, setDelivery] = useState<'pickup' | 'delivery'>('pickup');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<{ orderId: string; customer: Customer } | null>(null);

  const handleSubmitOrder = () => {
    const order = submitOrder(customer, notes, delivery);
    setSubmittedOrder({ orderId: order.orderId, customer: order.customer });
    setStep('confirmed');
  };

  if (step === 'confirmed' && submittedOrder) {
    return <OrderConfirmedView orderId={submittedOrder.orderId} customer={submittedOrder.customer} />;
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '2rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {(['cart', 'details', 'review'] as Step[]).map((s, i) => {
            const labels = { cart: 'Quote Cart', details: 'Your Details', review: 'Review' };
            const active = s === step;
            const done = ['cart', 'details', 'review'].indexOf(step) > i;
            return (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#059669' : active ? 'var(--brand-blue)' : '#e5e7eb', color: done || active ? '#fff' : 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: active ? 600 : 400, color: active ? 'var(--brand-blue)' : done ? '#059669' : 'var(--text-light)' }}>
                    {labels[s]}
                  </span>
                </div>
                {i < 2 && <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* STEP 1: CART */}
        {step === 'cart' && (
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Quote Cart</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Review your selected services before submitting a quote request.
            </p>

            {quoteCart.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <ShoppingCart size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                <h3 style={{ marginBottom: '0.5rem' }}>Your quote cart is empty</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Browse our services and add items to get a quote.
                </p>
                <button onClick={() => router.push('/services')} className="btn-primary">
                  Browse Services
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {quoteCart.map(item => (
                    <div key={item.id} className="card" style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--brand-blue)', fontWeight: 600, marginBottom: 2 }}>{item.categoryName}</div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brand-dark)', marginBottom: '0.375rem' }}>{item.serviceName}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                            <span><strong>Qty:</strong> {item.quantity}</span>
                            {item.specifications && <span>· {item.specifications}</span>}
                            {item.designFileName && <span style={{ color: '#059669' }}>📎 {item.designFileName}</span>}
                          </div>
                          {item.notes && <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 4 }}>Note: {item.notes}</div>}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: 8, padding: '0.375rem', cursor: 'pointer', flexShrink: 0 }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '0.875rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: '#92400e', display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <span>💡</span>
                  <span>Prices will be quoted after our team reviews your requirements. All quotes are subject to GST, design, transport and installation charges as applicable.</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button onClick={() => clearCart()} className="btn-secondary">Clear Cart</button>
                  <button onClick={() => setStep('details')} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                    Continue to Details →
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2: CUSTOMER DETAILS */}
        {step === 'details' && (
          <div>
            <button onClick={() => setStep('cart')} className="btn-ghost" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ArrowLeft size={15} /> Back to Cart
            </button>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Details</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We'll use these details to send your quote and order updates.
            </p>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0 1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="name"><User size={13} style={{ display: 'inline', marginRight: 4 }} />Full Name *</label>
                  <input id="name" type="text" placeholder="e.g. Rahul Sharma" value={customer.name} onChange={e => setCustomer(p => ({ ...p, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone"><Phone size={13} style={{ display: 'inline', marginRight: 4 }} />Phone Number *</label>
                  <input id="phone" type="tel" placeholder="+91 98765 43210" value={customer.phone} onChange={e => setCustomer(p => ({ ...p, phone: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email"><Mail size={13} style={{ display: 'inline', marginRight: 4 }} />Email Address</label>
                  <input id="email" type="email" placeholder="your@email.com" value={customer.email} onChange={e => setCustomer(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label htmlFor="address"><MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />Address (for delivery)</label>
                  <input id="address" type="text" placeholder="Shop/Office address" value={customer.address} onChange={e => setCustomer(p => ({ ...p, address: e.target.value }))} />
                </div>
              </div>

              <div className="form-group">
                <label>Delivery / Pickup Preference</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    { value: 'pickup', label: 'Self Pickup', desc: 'Pick up from our shop', icon: Store },
                    { value: 'delivery', label: 'Home Delivery', desc: 'Delivered to your address', icon: Truck },
                  ].map(({ value, label, desc, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setDelivery(value as 'pickup' | 'delivery')}
                      style={{ flex: 1, minWidth: 180, padding: '0.875rem 1rem', borderRadius: 10, border: '2px solid', borderColor: delivery === value ? 'var(--brand-blue)' : 'var(--border)', background: delivery === value ? 'var(--brand-blue-light)' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon size={18} color={delivery === value ? 'var(--brand-blue)' : 'var(--text-light)'} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: delivery === value ? 'var(--brand-blue)' : 'var(--brand-dark)' }}>{label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="order-notes">Additional Notes</label>
                <textarea id="order-notes" placeholder="Any special requirements, deadline, additional information..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => setStep('review')}
                disabled={!customer.name || !customer.phone}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', opacity: (!customer.name || !customer.phone) ? 0.6 : 1, cursor: (!customer.name || !customer.phone) ? 'not-allowed' : 'pointer' }}
              >
                Review Order →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 'review' && (
          <div>
            <button onClick={() => setStep('details')} className="btn-ghost" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ArrowLeft size={15} /> Back to Details
            </button>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Review Your Order</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Please confirm all details before submitting.</p>

            <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Customer Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem 2rem', fontSize: '0.9rem' }}>
                <div><span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Name</span><br /><strong>{customer.name}</strong></div>
                <div><span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Phone</span><br /><strong>{customer.phone}</strong></div>
                {customer.email && <div><span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Email</span><br /><strong>{customer.email}</strong></div>}
                <div><span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Delivery</span><br /><strong style={{ textTransform: 'capitalize' }}>{delivery}</strong></div>
              </div>
              {customer.address && <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}><span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Address</span><br /><strong>{customer.address}</strong></div>}
            </div>

            <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Services ({quoteCart.length} item{quoteCart.length !== 1 ? 's' : ''})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {quoteCart.map(item => (
                  <div key={item.id} style={{ padding: '0.75rem 1rem', background: '#f9fafb', borderRadius: 8, border: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.serviceName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 2 }}>
                      {item.categoryName} · Qty: {item.quantity}
                      {item.specifications && ` · ${item.specifications}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {notes && (
              <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Notes:</span>
                <p style={{ fontSize: '0.9rem', marginTop: 2 }}>{notes}</p>
              </div>
            )}

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '0.875rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: '#92400e' }}>
              By submitting, you agree to receive a quote from our team. Final price will include GST, design charges, transport and installation as applicable.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSubmitOrder} className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                Submit Order Request →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderConfirmedView({ orderId, customer }: { orderId: string; customer: Customer }) {
  const router = useRouter();
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div className="card animate-scale-in" style={{ maxWidth: 520, width: '100%', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={36} color="#16a34a" />
        </div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Order Submitted!</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Thank you, <strong>{customer.name}</strong>. Your quote request has been received. Our team will review and send you a quote shortly.
        </p>

        <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', textAlign: 'left', fontSize: '0.875rem' }}>
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginBottom: 2 }}>Order ID</div>
              <div style={{ fontWeight: 700, color: 'var(--brand-blue)', fontSize: '1rem' }}>{orderId}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginBottom: 2 }}>Status</div>
              <div style={{ fontWeight: 600, color: '#059669' }}>Quote Requested</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginBottom: 2 }}>Date</div>
              <div style={{ fontWeight: 600 }}>{today}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginBottom: 2 }}>Next Step</div>
              <div style={{ fontWeight: 600 }}>Quote Review</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#eff6ff', borderRadius: 10, padding: '0.875rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: '#1d4ed8', textAlign: 'left' }}>
          💬 Our team will contact you on <strong>{customer.phone}</strong> via call/WhatsApp with your quote within a few hours.
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/orders')} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            Track My Order
          </button>
          <button onClick={() => router.push('/services')} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            Browse More Services
          </button>
        </div>
      </div>
    </div>
  );
}
