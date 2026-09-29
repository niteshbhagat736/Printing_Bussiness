import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Printer, Share2, MessageSquare, Play, AtSign } from 'lucide-react';

const services = [
  'Colour Digital Printing',
  'B&W Digital Printing',
  'Offset Printing',
  'Solvent Printing',
  'UV Eco Solvent Printing',
  'LED Board Making',
  'Plotter Cutting',
  'Laser / CNC Routing',
  'Vehicle Branding',
  'Stamps & Binding',
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/orders', label: 'Track Order' },
  { href: '/checkout', label: 'Request Quote' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin Panel' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#111928', color: '#9ca3af', marginTop: 0 }}>
      {/* Important Notice Strip */}
      <div style={{ background: '#1e2939', borderBottom: '1px solid #374151', padding: '0.75rem 1.5rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 2rem', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 600, color: '#d1d5db' }}>
          <span>⚠️ Design Charges Extra</span>
          <span>⚠️ GST Charges Extra</span>
          <span>⚠️ Transportation Charges Extra</span>
          <span>⚠️ Installation Charges Extra</span>
          <span>⚠️ Bamboo Scaffolding Charges Extra</span>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, background: 'var(--brand-blue)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Printer size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', lineHeight: 1.1 }}>PrintMaster</div>
                <div style={{ fontSize: '0.65rem', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pro</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem', color: '#9ca3af' }}>
              Your one-stop solution for printing, branding, signage, fabrication and digital printing services. Quality you can trust, delivered on time.
            </p>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {[Share2, MessageSquare, Play, AtSign].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: '#1e2939', border: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', textDecoration: 'none', transition: 'border-color 0.15s' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 700 }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {services.map(s => (
                <li key={s}>
                  <Link href="/services" className="footer-link">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 700 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 700 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ flexShrink: 0, marginTop: 2, color: '#93c5fd' }} />
                <span style={{ fontSize: '0.83rem', lineHeight: 1.6 }}>Shop No. 12, Printing Market, Nagpur – 440001, Maharashtra</span>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                <Phone size={15} style={{ flexShrink: 0, color: '#93c5fd' }} />
                <span style={{ fontSize: '0.83rem' }}>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                <Mail size={15} style={{ flexShrink: 0, color: '#93c5fd' }} />
                <span style={{ fontSize: '0.83rem' }}>info@printmasterpro.in</span>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <Clock size={15} style={{ flexShrink: 0, marginTop: 2, color: '#93c5fd' }} />
                <div style={{ fontSize: '0.83rem' }}>
                  <div>Mon – Sat: 9:00 AM – 8:00 PM</div>
                  <div>Sunday: 10:00 AM – 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1e2939', padding: '1.25rem 1.5rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            © 2026 PrintMaster Pro. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            All prices are subject to GST. Design, transport & installation charges extra.
          </p>
        </div>
      </div>
    </footer>
  );
}
