'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ShoppingCart, Printer, LayoutDashboard
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/orders', label: 'My Orders' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setCartOpen, isAdminMode, setAdminMode } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('#')[0]) && href !== '/';
  };

  return (
    <>
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: scrolled ? 'rgba(255,255,255,0.98)' : '#fff',
          borderBottom: '1px solid #e5e7eb',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.2s, backdrop-filter 0.2s',
        }}
      >
        <div className="container" style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, gap: '1.5rem' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36,
                background: 'var(--brand-blue)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Printer size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-dark)', lineHeight: 1.1 }}>PrintMaster</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--brand-blue)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pro</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1, justifyContent: 'center' }} className="hide-mobile">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: isActive(link.href) ? 600 : 500,
                    color: isActive(link.href) ? 'var(--brand-blue)' : 'var(--text)',
                    background: isActive(link.href) ? 'var(--brand-blue-light)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 0.15s, color 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive(link.href)) {
                      (e.target as HTMLElement).style.background = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive(link.href)) {
                      (e.target as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {isAdminMode && (
                <Link
                  href="/admin"
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: pathname.startsWith('/admin') ? 600 : 500,
                    color: pathname.startsWith('/admin') ? '#7c3aed' : 'var(--text)',
                    background: pathname.startsWith('/admin') ? '#f3e8ff' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              {/* Admin toggle */}
              <button
                onClick={() => setAdminMode(!isAdminMode)}
                title={isAdminMode ? 'Exit Admin' : 'Admin Mode'}
                style={{
                  padding: '0.4rem', borderRadius: 8,
                  border: '1px solid',
                  borderColor: isAdminMode ? '#7c3aed' : 'var(--border)',
                  background: isAdminMode ? '#f3e8ff' : 'transparent',
                  color: isAdminMode ? '#7c3aed' : 'var(--text-light)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                className="hide-mobile"
              >
                <LayoutDashboard size={16} />
              </button>

              {/* Quote Cart */}
              <button
                onClick={() => setCartOpen(true)}
                style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  background: cartCount > 0 ? 'var(--brand-blue)' : '#fff',
                  color: cartCount > 0 ? '#fff' : 'var(--text)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                <ShoppingCart size={16} />
                <span className="hide-mobile">Quote Cart</span>
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 18, height: 18,
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Request Quote CTA */}
              <Link href="/services" className="btn-primary hide-mobile" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Request Quote
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'none' }}
                className="mobile-hamburger"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: '#fff', borderTop: '1px solid var(--border)',
            padding: '1rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.25rem',
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? 'var(--brand-blue)' : 'var(--text)',
                  background: isActive(link.href) ? 'var(--brand-blue-light)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            {isAdminMode && (
              <Link href="/admin" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.625rem 0.875rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, color: '#7c3aed', textDecoration: 'none' }}>
                Admin Dashboard
              </Link>
            )}
            <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => { setAdminMode(!isAdminMode); setMobileOpen(false); }}
                style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border)', borderRadius: 8, background: '#f9fafb', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
              >
                <LayoutDashboard size={14} /> {isAdminMode ? 'Exit Admin' : 'Admin Mode'}
              </button>
              <Link href="/services" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}>
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quote Cart Drawer */}
      <QuoteCartDrawer />
    </>
  );
}

function QuoteCartDrawer() {
  const { isCartOpen, setCartOpen, quoteCart, removeFromCart, cartCount } = useApp();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated || !isCartOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={() => setCartOpen(false)} />
      <div className="drawer animate-slide-in">
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Quote Cart</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: 2 }}>{cartCount} item{cartCount !== 1 ? 's' : ''} selected</p>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ padding: '0.375rem', border: '1px solid var(--border)', borderRadius: 8, background: '#f9fafb', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {quoteCart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-light)' }}>
              <ShoppingCart size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontWeight: 600 }}>Your quote cart is empty</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Browse services and add items to request a quote.</p>
              <button onClick={() => setCartOpen(false)} className="btn-primary" style={{ marginTop: '1.25rem' }}>
                Browse Services
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {quoteCart.map(item => (
                <div key={item.id} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '0.875rem 1rem', background: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-blue)', fontWeight: 600, marginBottom: 2 }}>{item.categoryName}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>{item.serviceName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                        Qty: {item.quantity}
                        {item.specifications && ` · ${item.specifications.substring(0, 50)}${item.specifications.length > 50 ? '...' : ''}`}
                      </div>
                      {item.designFileName && (
                        <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem' }}>📎 {item.designFileName}</div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: 6, padding: '0.3rem', cursor: 'pointer', flexShrink: 0 }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {quoteCart.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ background: '#fff8e1', border: '1px solid #fde68a', borderRadius: 8, padding: '0.75rem', marginBottom: '0.875rem', fontSize: '0.8rem', color: '#92400e' }}>
              💡 Prices will be quoted after reviewing your requirements
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}
            >
              Continue to Details →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
