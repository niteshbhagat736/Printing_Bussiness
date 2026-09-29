'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '3rem 1.5rem', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: '#fff', marginBottom: '0.75rem' }}>Contact Us</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Get in touch for quotes, enquiries or any printing-related questions.</p>
        </div>
      </section>

      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Get in Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Phone, title: 'Phone / WhatsApp', content: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: Mail, title: 'Email', content: 'info@printmasterpro.in', href: 'mailto:info@printmasterpro.in' },
                  { icon: MapPin, title: 'Address', content: 'Shop No. 12, Printing Market, Sitabuldi, Nagpur – 440001, Maharashtra' },
                  { icon: Clock, title: 'Business Hours', content: 'Mon–Sat: 9 AM – 8 PM\nSunday: 10 AM – 5 PM' },
                ].map(({ icon: Icon, title, content, href }) => (
                  <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color="var(--brand-blue)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 2 }}>{title}</div>
                      {href ? (
                        <a href={href} style={{ color: 'var(--brand-blue)', textDecoration: 'none', fontSize: '0.875rem' }}>{content}</a>
                      ) : (
                        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', whiteSpace: 'pre-line' }}>{content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#25d366', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', marginTop: '1.5rem', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>

              {/* Charges Note */}
              <div style={{ marginTop: '1.75rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400e', marginBottom: '0.5rem' }}>⚠️ Important Note</div>
                <ul style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: 2, paddingLeft: '1rem' }}>
                  <li>Design charges will be extra</li>
                  <li>GST charges will be extra</li>
                  <li>Transportation charges will be extra</li>
                  <li>Installation charges will be extra</li>
                  <li>Bamboo scaffolding charges will be extra</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: '1.75rem' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={32} color="#16a34a" />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    Thank you! We'll get back to you within a few hours.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-secondary" style={{ marginTop: '1.25rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 1rem' }}>
                      <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input id="name" type="text" placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                        <option value="">Select subject...</option>
                        <option>Quote Request</option>
                        <option>Order Status Enquiry</option>
                        <option>Design Assistance</option>
                        <option>General Enquiry</option>
                        <option>Complaint / Feedback</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea id="message" placeholder="Describe your requirements or question..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ minHeight: 100 }} required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
