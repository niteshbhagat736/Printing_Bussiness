import React from 'react';
import Link from 'next/link';
import { CheckCircle, Award, Users, Star, ArrowRight, Target, Zap, Handshake, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '4rem 1.5rem', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 680, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '1rem' }}>
            About PrintMaster Pro
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.75 }}>
            A Nagpur-based printing and fabrication company serving businesses and individuals since 2014. We combine cutting-edge technology with craftsmanship to deliver premium results.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Our Story</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '1rem' }}>
                PrintMaster Pro started as a small digital printing shop in Nagpur in 2014. Over the years, we grew from a 2-machine setup to a full-scale printing and fabrication facility with advanced UV eco-solvent printers, laser cutters, CNC routers and LED board fabrication equipment.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Today, we are a one-stop destination for everything from visiting cards and banners to LED sign boards, laser-engraved awards and CNC-cut decorative panels.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {['10+ Years Experience', '500+ Clients Served', '150+ Service Types', 'Nagpur, Maharashtra'].map(tag => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'var(--brand-blue-light)', color: 'var(--brand-blue)', padding: '0.35rem 0.875rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600 }}>
                    <CheckCircle size={13} /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { num: '500+', label: 'Happy Clients' },
                { num: '10+', label: 'Years in Business' },
                { num: '150+', label: 'Services Offered' },
                { num: '5★', label: 'Customer Rating' },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 14, background: '#f9fafb' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-blue)' }}>{num}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section style={{ padding: '4rem 1.5rem', background: '#f8faff' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>What drives us every day to deliver our best</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: Target, title: 'Quality First', desc: 'We never compromise on material quality. Only premium, tested substrates and inks.' },
              { icon: Zap, title: 'Speed & Reliability', desc: 'On-time delivery is our promise. Express turnaround available for urgent jobs.' },
              { icon: Handshake, title: 'Honest Pricing', desc: 'Transparent quotes. No hidden charges. GST and extras always disclosed upfront.' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Continuously investing in the latest printing technology to serve you better.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--brand-blue)', display: 'inline-block', marginBottom: '0.875rem' }}><Icon size={40} strokeWidth={1.5} /></div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.875rem' }}>Ready to Work Together?</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '1.75rem' }}>Browse our services, get a quote, and experience the PrintMaster Pro difference.</p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn-primary" style={{ padding: '0.875rem 2rem' }}>View Services <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '0.875rem 2rem' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
