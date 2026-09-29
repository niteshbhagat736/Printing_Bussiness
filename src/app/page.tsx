'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Star,
  Phone,
  MessageCircle,
  Building2,
  Store,
  Building,
  GraduationCap,
  Hospital,
  PartyPopper,
  ShoppingCart,
  Factory,
  Printer,
  Lightbulb,
  Scissors,
  Sparkles,
  Wrench,
  Eye,
  Layers,
  Award,
  Box,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  FileCheck,
  Sparkle
} from 'lucide-react';
import { popularServices } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import type { ServiceCategoryId } from '@/lib/types';

// ============================================================
// DATA FOR END-PRODUCT SHOWCASE
// ============================================================
interface EndProduct {
  id: string;
  title: string;
  category: 'signage' | 'stationery' | 'packaging' | 'awards' | 'outdoor';
  categoryLabel: string;
  image: string;
  specs: string[];
  finish: string;
  priceFrom: string;
  turnaround: string;
  description: string;
  fullSpecs: {
    material: string;
    thickness: string;
    lighting: string;
    durability: string;
    idealFor: string;
  };
  cartPayload: {
    categoryId: ServiceCategoryId;
    categoryName: string;
    serviceName: string;
    quantity: number;
    specifications: string;
  };
}

const END_PRODUCTS: EndProduct[] = [
  {
    id: 'prod-1',
    title: 'Architectural 3D LED Backlit Channel Letters',
    category: 'signage',
    categoryLabel: '3D LED Signage',
    image: '/architectural-signage.jpg',
    specs: ['Samsung LED Modules', 'Brushed Titanium / Acrylic', 'Warm Halo Glow'],
    finish: 'Warm 3000K Halo Backlit + Brushed Metal Trim',
    priceFrom: '₹2,400 / sq.ft',
    turnaround: '3–5 Days',
    description: 'Commercial corporate building signage engineered for 24/7 exterior weather resilience. Features laser-cut letters, CNC machined sides, and uniform halo illumination.',
    fullSpecs: {
      material: 'Imported Cast Acrylic + 304 Titanium Trim',
      thickness: '50mm Depth with 3mm Cast Face',
      lighting: 'Samsung IP67 Waterproof LED Modules (50,000 hrs)',
      durability: '7+ Years UV & Weather Resistance',
      idealFor: 'Corporate HQs, Luxury Hotels, Retail Flagships, Hospitals'
    },
    cartPayload: {
      categoryId: 'led-board',
      categoryName: 'LED Boards & Signage',
      serviceName: '3D Backlit LED Channel Letters',
      quantity: 1,
      specifications: '3D Titanium Trim, Samsung Warm White LEDs, IP67 Waterproof Power Supply'
    }
  },
  {
    id: 'prod-2',
    title: 'Imperial Navy & Gold Foil Corporate Cards',
    category: 'stationery',
    categoryLabel: 'Luxury Stationery',
    image: '/luxury-cards.jpg',
    specs: ['450 GSM Velvet Touch', 'Deep Metallic Gold Foil', 'Spot UV Emboss'],
    finish: 'Hot Stamped Foil + Raised Tactile Geometric UV',
    priceFrom: '₹1,200 / 100 pcs',
    turnaround: '24–48 Hours',
    description: 'Ultra-heavyweight 450 GSM duplex paper with tactile soft-touch velvet lamination, metallic hot gold foil stamping, and matching embossed stationery suite.',
    fullSpecs: {
      material: '450 GSM Royal Navy Matte Artboard',
      thickness: '0.65mm Heavy Rigid Caliper',
      lighting: 'Reflective Metallic Foil under ambient light',
      durability: 'Scratch-resistant velvet lamination',
      idealFor: 'Founders, C-Suite Executives, Architects, Attorneys'
    },
    cartPayload: {
      categoryId: 'colour-digital',
      categoryName: 'Digital Colour Printing',
      serviceName: 'Luxury Gold Foil Visiting Cards',
      quantity: 500,
      specifications: '450 GSM Velvet Lamination, Hot Gold Foil on Face, Blind Emboss'
    }
  },
  {
    id: 'prod-3',
    title: 'Custom Rigid Luxury Retail & Gift Boxes',
    category: 'packaging',
    categoryLabel: 'Custom Packaging',
    image: '/packaging-boxes.jpg',
    specs: ['1200 GSM Kappa Board', 'Rose Gold Foil Accents', 'Magnetic Closure'],
    finish: 'Linen Textured Paper Wrap + Rose Gold Stamp',
    priceFrom: '₹180 / box (Min 50)',
    turnaround: '4–6 Days',
    description: 'Bespoke hand-crafted rigid presentation boxes with concealed magnetic closures, custom die-cut EVA foam inserts, and textured specialty paper wrappers.',
    fullSpecs: {
      material: '1200 GSM High-Density Kappa Board + 150 GSM Textured Wrap',
      thickness: '2.5mm Rigid Structural Wall',
      lighting: 'Satin Foil Luster with Matt Protective Barrier',
      durability: 'Heavy-duty crush resistant',
      idealFor: 'Jewelry, Luxury Perfumes, Corporate Gifting, VIP Hampers'
    },
    cartPayload: {
      categoryId: 'other-work',
      categoryName: 'Fabrication & Binding',
      serviceName: 'Custom Rigid Gift Box with Magnetic Flap',
      quantity: 100,
      specifications: '1200 GSM Kappa, Rose Gold Foil Logo, Custom Foam Insert'
    }
  },
  {
    id: 'prod-4',
    title: 'Optical Crystal & Gold Anodized Trophies',
    category: 'awards',
    categoryLabel: 'Awards & Mementos',
    image: '/laser-trophies.jpg',
    specs: ['Pure Optical Acrylic', 'Precision Laser Facets', 'Gold Metal Base'],
    finish: 'Sub-Surface Laser Engraving + Brushed Gold Footing',
    priceFrom: '₹1,850 / piece',
    turnaround: '2–3 Days',
    description: 'Pristine diamond-bevelled optical acrylic and crystal corporate awards with high-precision fiber laser etching and brushed aluminum gold anodized pedestal bases.',
    fullSpecs: {
      material: 'Optical Grade 20mm Acrylic + Solid Cast Aluminum',
      thickness: '20mm Solid Crystal Profile',
      lighting: 'Internal light-refracting bevelled facets',
      durability: 'Scratch-coated lifetime clarity',
      idealFor: 'Annual Corporate Galas, Leadership Awards, Sports Trophies'
    },
    cartPayload: {
      categoryId: 'laser-cnc',
      categoryName: 'Laser & CNC Cutting',
      serviceName: 'Optical Acrylic & Gold Corporate Trophy',
      quantity: 10,
      specifications: '20mm Bevelled Acrylic, Custom Laser Engraving, Gold Metal Base'
    }
  },
  {
    id: 'prod-5',
    title: 'Commercial Fleet Livery & Vehicle Wraps',
    category: 'outdoor',
    categoryLabel: 'Vehicle Branding',
    image: '/vehicle-branding.jpg',
    specs: ['3M Cast Wrap Film', 'UV Gloss Overlaminate', 'Zero Bubble Finish'],
    finish: '7-Year Anti-Fade Cast Vinyl + Edge Sealer',
    priceFrom: '₹12,000 / vehicle',
    turnaround: '1–2 Days',
    description: 'Full commercial vehicle wraps installed with temperature-controlled precision. Resistant to harsh Indian summer sunlight, dust, highway gravel, and pressure washes.',
    fullSpecs: {
      material: '3M IJ180mC Cast Vinyl with Comply Air-Release',
      thickness: '50 Micron Ultra-Conformable Film',
      lighting: 'High gloss vibrant chromatic reflection',
      durability: '7-Year Outdoor Anti-Peeling Warranty',
      idealFor: 'Logistics Vans, Commercial Fleets, Service Trucks, Food Trucks'
    },
    cartPayload: {
      categoryId: 'solvent',
      categoryName: 'Solvent & Large Format',
      serviceName: 'Full Commercial Fleet Vehicle Wrap',
      quantity: 1,
      specifications: 'Full Body Contoured Cast Vinyl, 3M Overlaminate, On-Site Installation'
    }
  },
  {
    id: 'prod-6',
    title: 'Industrial Precision Laser Cut Filigree & Screens',
    category: 'awards',
    categoryLabel: 'Laser & CNC Cutting',
    image: '/laser-cnc.jpg',
    specs: ['0.05mm Beam Precision', 'Acrylic, MDF & ACP', 'Burr-Free Flame Edge'],
    finish: 'Optically Clear Polished Edge Cutting',
    priceFrom: '₹95 / running ft',
    turnaround: 'Same Day / 24hr',
    description: 'High-power CO2 and fiber laser CNC cutting for intricate architectural jali screens, display baffles, custom stencils, acrylic letters, and precision templates.',
    fullSpecs: {
      material: 'Cast Acrylic (up to 25mm), MDF, Brass, Stainless Steel, ACP',
      thickness: '0.8mm to 25mm sheet capability',
      lighting: 'Flame polished translucent edges',
      durability: 'Industrial architectural grade',
      idealFor: 'Interior Designers, Signage Fabricators, Exhibition Architects'
    },
    cartPayload: {
      categoryId: 'laser-cnc',
      categoryName: 'Laser & CNC Cutting',
      serviceName: 'Precision CNC & Laser Profile Cutting',
      quantity: 50,
      specifications: 'Custom Vector Path, Flame-Polished Edge, Tolerances +/-0.1mm'
    }
  }
];

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function HomePage() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <HeroSection />
      <ClientTrustMarquee />
      <EndProductGallery />
      <InstantQuoteCalculator />
      <MaterialsAndFinishes />
      <PopularServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <IndustriesSection />
      <FaqSection />
      <CTASection />
    </div>
  );
}

// ============================================================
// 1. HERO SECTION (FULLY MOBILE RESPONSIVE)
// ============================================================
function HeroSection() {
  return (
    <section
      className="hero-padding-mobile"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 17, 34, 0.94) 0%, rgba(15, 30, 75, 0.88) 55%, rgba(20, 48, 120, 0.94) 100%), url("/hero-facility.jpg") center/cover no-repeat',
        color: '#fff',
        padding: '5rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative light blooms */}
      <div style={{ position: 'absolute', top: '-10%', left: '15%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,197,253,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>
        <div className="hero-grid">

          {/* Left Column */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 9999, padding: '0.4rem 1.1rem', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem', color: '#93c5fd', backdropFilter: 'blur(8px)', maxWidth: '100%' }}>
              <span className="pulse-dot" style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Plant Operational • Fast Turnaround in Nagpur</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.14, marginBottom: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>
              Enterprise Printing,<br />
              <span style={{ background: 'linear-gradient(90deg, #60a5fa, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                3D Signage & Custom
              </span><br />
              Fabrication Works
            </h1>

            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '2rem', maxWidth: 540 }}>
              Your end-to-end industrial manufacturing partner in Nagpur. From luxury embossed stationery and rigid retail packaging to illuminated 3D LED letters, vehicle wraps, and precision laser CNC fabrication.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2.5rem' }}>
              <Link
                href="/services"
                className="mobile-w-full"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.875rem 1.75rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  color: '#1e40af',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform 0.15s, box-shadow 0.15s'
                }}
              >
                Browse All 150+ Services <ArrowRight size={17} />
              </Link>

              <a
                href="#quote-estimator"
                className="mobile-w-full"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.875rem 1.75rem',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.28)',
                  color: '#fff',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.15s'
                }}
              >
                <Zap size={16} color="#60a5fa" /> Instant Price Estimator
              </a>
            </div>

            {/* Quality Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              {[
                { icon: Shield, text: 'Delta-E < 2 Color Certified' },
                { icon: Clock, text: '24–48hr Turnaround' },
                { icon: Wrench, text: '100% In-House Plant' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: '#bfdbfe', fontWeight: 500 }}>
                  <Icon size={15} color="#60a5fa" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visualizer Grid with Hover Cards */}
          <div>
            <div className="hero-tiles-grid">

              {/* Showcase 1 */}
              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.92) 100%), url("/architectural-signage.jpg") center/cover',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 16,
                  padding: '1.25rem',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform 0.25s, border-color 0.25s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 9999, background: 'rgba(59,130,246,0.3)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.3)', fontWeight: 600 }}>
                    Illuminated
                  </span>
                  <Lightbulb size={22} color="#60a5fa" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 2 }}>3D LED Signs</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.76rem' }}>Architectural channel letters with Samsung LED modules</p>
                </div>
              </div>

              {/* Showcase 2 */}
              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.92) 100%), url("/luxury-cards.jpg") center/cover',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 16,
                  padding: '1.25rem',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform 0.25s, border-color 0.25s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 9999, background: 'rgba(217,119,6,0.3)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.3)', fontWeight: 600 }}>
                    Foil Stamped
                  </span>
                  <Sparkles size={22} color="#fcd34d" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 2 }}>Luxury Stationery</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.76rem' }}>450 GSM velvet touch with metallic gold stamping</p>
                </div>
              </div>

              {/* Showcase 3 */}
              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.92) 100%), url("/laser-trophies.jpg") center/cover',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 16,
                  padding: '1.25rem',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform 0.25s, border-color 0.25s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 9999, background: 'rgba(16,185,129,0.3)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)', fontWeight: 600 }}>
                    CNC Precision
                  </span>
                  <Scissors size={22} color="#6ee7b7" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 2 }}>Laser Trophies</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.76rem' }}>Optical acrylic & anodized metal gala awards</p>
                </div>
              </div>

              {/* Showcase 4 */}
              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.92) 100%), url("/packaging-boxes.jpg") center/cover',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 16,
                  padding: '1.25rem',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform 0.25s, border-color 0.25s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 9999, background: 'rgba(168,85,247,0.3)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.3)', fontWeight: 600 }}>
                    Rigid Board
                  </span>
                  <Box size={22} color="#d8b4fe" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 2 }}>Custom Packaging</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.76rem' }}>1200 GSM Kappa luxury rigid retail & gift boxes</p>
                </div>
              </div>

            </div>

            {/* Bottom Floating Notice */}
            <div
              className="animate-float"
              style={{
                marginTop: '1rem',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#e2e8f0',
                fontSize: '0.8rem'
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#1a56db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={15} color="#fff" />
              </div>
              <div>
                <strong>Need on-site measurement?</strong> We dispatch site engineers across Nagpur & Vidarbha.
              </div>
            </div>
          </div>

        </div>

        {/* Hero Quick Metrics */}
        <div className="hero-stats-grid" style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
          {[
            { value: '500+', label: 'Corporate Clients' },
            { value: '150+', label: 'In-House Services' },
            { value: '10+ Yrs', label: 'Manufacturing' },
            { value: '24–48h', label: 'Express Turnaround' },
            { value: '100%', label: 'Fitment Guarantee' }
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#60a5fa', letterSpacing: '-0.02em' }}>{value}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 2. CLIENT TRUST MARQUEE
// ============================================================
function ClientTrustMarquee() {
  const clients = [
    { name: 'Tata Steel Processing', tag: 'Industrial Fabrication' },
    { name: 'Mahindra Lifespaces', tag: 'Site Signboards & Hoardings' },
    { name: 'Apollo Hospitals Network', tag: 'Interior Wayfinding & Acrylic' },
    { name: 'Persistent Systems Ltd.', tag: 'Corporate Branding & Badges' },
    { name: 'Haldiram’s Retail', tag: 'Packaging & Glow Sign Boards' },
    { name: 'Radisson Blu Hotel', tag: 'Brass & Titanium Architectural Signs' },
    { name: 'VNIT Engineering Campus', tag: 'Annual Gala Trophies & Backdrops' },
    { name: 'Reliance Smart Superstore', tag: 'Promo Standees & POS Displays' },
    { name: 'Larsen & Toubro Ltd.', tag: 'Safety Signage & Flex Hoardings' }
  ];

  return (
    <div style={{ background: '#0b1120', borderBottom: '1px solid #1e293b', padding: '1.25rem 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '0.75rem', padding: '0 1rem' }}>
        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', fontWeight: 700 }}>
          Trusted By 500+ Corporate Clients, Retail Flagships & Institutions
        </span>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                whiteSpace: 'nowrap'
              }}
            >
              <Building2 size={16} color="#60a5fa" />
              <div>
                <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem' }}>{client.name}</span>
                <span style={{ color: '#64748b', fontSize: '0.72rem', marginLeft: 8 }}>({client.tag})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. END-PRODUCT SHOWCASE GALLERY (CORE USER REQUIREMENT)
// ============================================================
function EndProductGallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'signage' | 'stationery' | 'packaging' | 'awards' | 'outdoor'>('all');
  const [inspectingProduct, setInspectingProduct] = useState<EndProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { addToCart, setCartOpen } = useApp();

  const filteredProducts = activeTab === 'all'
    ? END_PRODUCTS
    : END_PRODUCTS.filter(p => p.category === activeTab);

  const handleQuickAdd = (product: EndProduct) => {
    addToCart({
      categoryId: product.cartPayload.categoryId,
      categoryName: product.cartPayload.categoryName,
      serviceName: product.cartPayload.serviceName,
      quantity: product.cartPayload.quantity,
      specifications: product.cartPayload.specifications,
      notes: `Quick quote request via End-Product Showcase (${product.title})`
    });
    setToastMessage(`Added "${product.title}" to Quote Cart`);
    setCartOpen(true);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section id="end-products" className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-blue)', background: 'var(--brand-blue-light)', padding: '0.3rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Layers size={14} /> Real Finished Products & Tactile Works
          </div>
          <h2>Manufactured In-House. Delivered Flawlessly.</h2>
          <p>
            Explore real physical deliverables fabricated in our Nagpur workshop. Inspect materials, finishes, technical specifications, and request immediate prototype quotes.
          </p>
        </div>

        {/* Filter Tabs with Smooth Touch Horizontal Scroll on Mobile */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            gap: '0.5rem',
            paddingBottom: '0.5rem',
            marginBottom: '2.5rem',
            justifyContent: 'flex-start'
          }}
        >
          {[
            { id: 'all', label: 'All Works (6)' },
            { id: 'signage', label: '3D LED & Signage' },
            { id: 'stationery', label: 'Luxury Stationery' },
            { id: 'packaging', label: 'Custom Packaging' },
            { id: 'awards', label: 'Laser & CNC Trophies' },
            { id: 'outdoor', label: 'Fleet & Outdoor' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`tab-pill ${activeTab === tab.id ? 'tab-pill-active' : 'tab-pill-inactive'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="end-products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              
              {/* Product Image Frame */}
              <div style={{ position: 'relative', height: 230, overflow: 'hidden', background: '#0f172a' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-card-img"
                />
                
                {/* Badge top-left */}
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(15,23,42,0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {product.categoryLabel}
                </span>

                {/* Turnaround badge top-right */}
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(16,185,129,0.9)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.6rem',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                  }}
                >
                  <Clock size={11} /> {product.turnaround}
                </span>

                {/* Inspect Overlay Trigger */}
                <button
                  onClick={() => setInspectingProduct(product)}
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    background: 'rgba(255,255,255,0.92)',
                    color: '#1e293b',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  <Eye size={13} color="#1a56db" /> Inspect Specs
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-dark)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                  {product.title}
                </h3>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
                  {product.description}
                </p>

                {/* Spec chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {product.specs.map(spec => (
                    <span key={spec} className="spec-chip">
                      <CheckCircle size={10} color="#1a56db" /> {spec}
                    </span>
                  ))}
                </div>

                {/* Price and CTA row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Base Estimate</span>
                    <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--brand-blue)' }}>{product.priceFrom}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => setInspectingProduct(product)}
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      <Plus size={13} /> Quote
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* INSPECT PRODUCT MODAL */}
      {inspectingProduct && (
        <div className="modal-overlay" onClick={() => setInspectingProduct(null)}>
          <div className="modal" style={{ maxWidth: 720, width: '100%' }} onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {inspectingProduct.categoryLabel} Specifications
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--brand-dark)', marginTop: 2 }}>
                  {inspectingProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingProduct(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Modal Image Zoom */}
            <div style={{ height: 220, borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem', background: '#0f172a' }}>
              <img
                src={inspectingProduct.image}
                alt={inspectingProduct.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Technical Spec Sheet Table */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>
                Engineering & Material Data
              </h4>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.75rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Base Material</span>
                  <strong>{inspectingProduct.fullSpecs.material}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Gauge / Thickness</span>
                  <strong>{inspectingProduct.fullSpecs.thickness}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Optics / Finish</span>
                  <strong>{inspectingProduct.finish}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Durability Rating</span>
                  <strong>{inspectingProduct.fullSpecs.durability}</strong>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Best Suited For</span>
                  <strong>{inspectingProduct.fullSpecs.idealFor}</strong>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Estimated Turnaround</span>
                <strong style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.9rem' }}>
                  <Clock size={14} /> {inspectingProduct.turnaround}
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setInspectingProduct(null)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleQuickAdd(inspectingProduct);
                    setInspectingProduct(null);
                  }}
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Plus size={16} /> Add to Quote Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#0f172a',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: 10,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.85rem',
            fontWeight: 600,
            zIndex: 9999
          }}
        >
          <CheckCircle size={16} color="#10b981" /> {toastMessage}
        </div>
      )}

    </section>
  );
}

// ============================================================
// 4. INSTANT QUOTE & TURNAROUND ESTIMATOR (INTERACTIVE UX)
// ============================================================
function InstantQuoteCalculator() {
  const { addToCart, setCartOpen } = useApp();

  const optionsMap = {
    'led-board': {
      label: '3D LED Channel Signboard',
      items: [
        { name: 'Backlit Acrylic Channel Letters (Warm/Cool LED)', base: 2400, unit: 'sq.ft', turnaround: '3–4 Days', catId: 'led-board' as ServiceCategoryId },
        { name: 'Titanium Front-Lit 3D Letters', base: 3200, unit: 'sq.ft', turnaround: '4–5 Days', catId: 'led-board' as ServiceCategoryId },
        { name: 'Custom Neon Flex Graphic Sign', base: 1800, unit: 'sq.ft', turnaround: '2–3 Days', catId: 'led-board' as ServiceCategoryId },
      ],
      finishes: ['Samsung IP67 LEDs', 'Titanium Gold Trim', 'Matt Black Silhouette', 'Weatherproof ACP Tray']
    },
    'visiting-cards': {
      label: 'Business Cards & Stationery',
      items: [
        { name: '450 GSM Velvet Touch + Gold Foil', base: 1200, unit: '100 pcs', turnaround: '24–48 Hours', catId: 'colour-digital' as ServiceCategoryId },
        { name: '350 GSM Matte Lamination Premium Cards', base: 450, unit: '100 pcs', turnaround: '24 Hours', catId: 'colour-digital' as ServiceCategoryId },
        { name: 'Transparent Frosted PVC Waterproof Cards', base: 1600, unit: '100 pcs', turnaround: '2–3 Days', catId: 'colour-digital' as ServiceCategoryId },
      ],
      finishes: ['Hot Gold Foil', 'Spot UV Emboss', 'Silver Foil', 'Round Corner Die-Cut']
    },
    'packaging': {
      label: 'Custom Rigid Boxes & Packaging',
      items: [
        { name: '1200 GSM Kappa Rigid Box with Magnetic Flap', base: 180, unit: 'box (min 50)', turnaround: '4–6 Days', catId: 'other-work' as ServiceCategoryId },
        { name: 'Custom Die-Cut Mono Carton 350 GSM', base: 35, unit: 'box (min 500)', turnaround: '3–5 Days', catId: 'offset' as ServiceCategoryId },
        { name: 'Corrugated Mailer Boxes with Digital Print', base: 65, unit: 'box (min 100)', turnaround: '3–4 Days', catId: 'other-work' as ServiceCategoryId },
      ],
      finishes: ['Rose Gold Foil Stamping', 'Custom Velvet Foam Insert', 'Matte Soft-Touch', 'Spot Gloss UV']
    },
    'laser-cutting': {
      label: 'Laser & CNC Custom Fabrication',
      items: [
        { name: 'Optical Acrylic Bevelled Trophy with Gold Metal', base: 1850, unit: 'piece', turnaround: '2–3 Days', catId: 'laser-cnc' as ServiceCategoryId },
        { name: 'Custom Architectural Jali Screen (ACP/MDF)', base: 110, unit: 'sq.ft', turnaround: '24–48 Hours', catId: 'laser-cnc' as ServiceCategoryId },
        { name: 'Brass / Acrylic Corporate Nameplate', base: 1250, unit: 'unit', turnaround: '24 Hours', catId: 'laser-cnc' as ServiceCategoryId },
      ],
      finishes: ['Fiber Laser Engraved', 'Flame Polished Edges', 'Gold Mirror Backing', 'Keyhole Wall Standoffs']
    },
    'standees': {
      label: 'Roll-Up Standees & Promo Displays',
      items: [
        { name: 'Roll-Up Standee 6x3 ft (Aluminium Base + Star Flex)', base: 1250, unit: 'unit', turnaround: 'Same Day / 24h', catId: 'solvent' as ServiceCategoryId },
        { name: 'Luxury Broad Base Roll-Up Standee with Cloth Media', base: 2200, unit: 'unit', turnaround: '24 Hours', catId: 'solvent' as ServiceCategoryId },
        { name: 'Promo Table / Canopy Tent Branding', base: 3800, unit: 'unit', turnaround: '2–3 Days', catId: 'solvent' as ServiceCategoryId },
      ],
      finishes: ['Star Flex Media', 'Non-Tear Satin Media', 'Waterproof Outdoor Inks', 'Carry Bag Included']
    }
  };

  type CategoryKey = keyof typeof optionsMap;
  const [selectedCat, setSelectedCat] = useState<CategoryKey>('led-board');
  const [itemIndex, setItemIndex] = useState(0);
  const [quantity, setQuantity] = useState(5);
  const [selectedFinish, setSelectedFinish] = useState(optionsMap['led-board'].finishes[0]);

  const currentGroup = optionsMap[selectedCat];
  const activeItem = currentGroup.items[itemIndex] || currentGroup.items[0];

  const estimatedMin = Math.round(activeItem.base * quantity * 0.95);
  const estimatedMax = Math.round(activeItem.base * quantity * 1.15);

  const handleCalculateAddToCart = () => {
    addToCart({
      categoryId: activeItem.catId,
      categoryName: currentGroup.label,
      serviceName: activeItem.name,
      quantity: quantity,
      specifications: `Estimated: ${quantity} ${activeItem.unit}, Finish: ${selectedFinish}`,
      notes: `Calculated quote estimate: ₹${estimatedMin.toLocaleString()} - ₹${estimatedMax.toLocaleString()}`
    });
    setCartOpen(true);
  };

  return (
    <section id="quote-estimator" className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
      <div className="container">
        
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1a56db', background: 'var(--brand-blue-light)', padding: '0.3rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Zap size={14} /> Interactive Cost & Turnaround Estimator
          </div>
          <h2>Instant Production Estimate</h2>
          <p>Configure product specs, materials, and batch quantities to get a ballpark quote and turnaround time in real-time.</p>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 12px 36px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          
          {/* Category Tabs with Horizontal Scrolling on Mobile */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              background: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              padding: '0.5rem'
            }}
          >
            {(Object.keys(optionsMap) as CategoryKey[]).map(key => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCat(key);
                  setItemIndex(0);
                  setSelectedFinish(optionsMap[key].finishes[0]);
                }}
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: selectedCat === key ? '#ffffff' : 'transparent',
                  color: selectedCat === key ? '#1a56db' : '#64748b',
                  boxShadow: selectedCat === key ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {optionsMap[key].label}
              </button>
            ))}
          </div>

          {/* Calculator Body */}
          <div className="estimator-body-grid" style={{ padding: '1.75rem' }}>
            
            {/* Inputs Column */}
            <div>
              
              {/* Product Option Picker */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                  Select Specification / Model
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentGroup.items.map((item, idx) => (
                    <div
                      key={item.name}
                      onClick={() => setItemIndex(idx)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 10,
                        border: `1.5px solid ${itemIndex === idx ? 'var(--brand-blue)' : '#e2e8f0'}`,
                        background: itemIndex === idx ? '#f0f5ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Unit: ~₹{item.base} / {item.unit}</div>
                      </div>
                      {itemIndex === idx && <CheckCircle size={18} color="var(--brand-blue)" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Finish Options */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                  Premium Finish / Treatment
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {currentGroup.finishes.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        borderRadius: 8,
                        border: `1px solid ${selectedFinish === f ? 'var(--brand-blue)' : '#cbd5e1'}`,
                        background: selectedFinish === f ? 'var(--brand-blue)' : '#f8fafc',
                        color: selectedFinish === f ? '#fff' : '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                  Quantity / Size Units: <strong style={{ color: 'var(--brand-blue)' }}>{quantity}</strong>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - (selectedCat === 'packaging' ? 10 : 1)))}
                    style={{ width: 42, height: 42, borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="1"
                    max={selectedCat === 'visiting-cards' ? 20 : selectedCat === 'packaging' ? 200 : 50}
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--brand-blue)' }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + (selectedCat === 'packaging' ? 10 : 1))}
                    style={{ width: 42, height: 42, borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Live Estimate Card */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: 16, padding: '1.75rem', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(15,23,42,0.18)' }}>
              
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#93c5fd', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.65rem', borderRadius: 9999, marginBottom: '1rem' }}>
                  <Clock size={12} /> Schedule: {activeItem.turnaround}
                </div>

                <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Estimated Range</div>
                <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 900, color: '#60a5fa', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                  ₹{estimatedMin.toLocaleString()} – ₹{estimatedMax.toLocaleString()}*
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  *Excluding GST and custom on-site installation. Final quotation will be confirmed upon artwork review.
                </div>

                {/* Selected Summary */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Item:</span>
                    <span style={{ fontWeight: 600, color: '#fff', textAlign: 'right', maxWidth: 180 }}>{activeItem.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Finish:</span>
                    <span style={{ fontWeight: 600, color: '#bfdbfe' }}>{selectedFinish}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Batch Units:</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{quantity} {activeItem.unit}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '2rem' }}>
                <button
                  onClick={handleCalculateAddToCart}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: '#ffffff',
                    color: '#1e40af',
                    border: 'none',
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  <Plus size={16} /> Add to Quote Cart & Checkout
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// ============================================================
// 5. MATERIALS & FINISHES VISUALIZER
// ============================================================
function MaterialsAndFinishes() {
  const [selectedMaterial, setSelectedMaterial] = useState(0);

  const materials = [
    {
      title: 'Precision Hot Foil Stamping',
      subtitle: 'Metallic Gold, Silver, Rose Gold, Holographic',
      desc: 'Heat-transferred metallic foil fused with steel die tooling. Creates an undeniably luxurious reflective luster that captures boardroom lighting.',
      durability: 'Scratch-resistant & anti-peel',
      idealFor: 'Executive visiting cards, certificate seals, luxury packaging boxes, wedding invitation suites',
      image: '/luxury-cards.jpg'
    },
    {
      title: 'Architectural Titanium & Backlit LEDs',
      subtitle: 'Samsung 3000K–6500K IP67 Modules',
      desc: 'Formed 304-grade titanium and stainless steel channel letters with milky cast acrylic diffuser faces. Engineered for high-contrast visibility at day and halo glow at night.',
      durability: '50,000 hour LED lifespan • 7+ years exterior finish',
      idealFor: 'Corporate building facades, hotel signage, hospital emergency entrances, retail showrooms',
      image: '/architectural-signage.jpg'
    },
    {
      title: 'Heavyweight 1200 GSM Kappa Rigid Board',
      subtitle: 'Dense Structural Packaging Paperboard',
      desc: 'Ultra-rigid greyboard wrapped in imported Italian linen or metallic coated paper. Features crisp 90-degree V-groove folds and hidden magnetic closures.',
      durability: 'Crush-resistant rigid protection',
      idealFor: 'VIP corporate gifting, luxury product launches, high-end electronics, jewelry',
      image: '/packaging-boxes.jpg'
    },
    {
      title: 'Precision Optical Cast Acrylic',
      subtitle: 'Laser Cut & Flame-Polished Edges',
      desc: 'Crystal-clear imported acrylic sheets with 92% light transmittance. Precision cut using CNC and CO2 lasers to produce mirror-like flame polished edges.',
      durability: 'UV stabilized • Won’t yellow under indoor lighting',
      idealFor: 'Annual leadership awards, interior office nameplates, counter stands, light boxes',
      image: '/laser-trophies.jpg'
    }
  ];

  const current = materials[selectedMaterial];

  return (
    <section className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
      <div className="container">
        
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1a56db', background: 'var(--brand-blue-light)', padding: '0.3rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Sparkle size={14} /> Material Engineering & Touch
          </div>
          <h2>The Craft of Premium Materials</h2>
          <p>The difference between average printing and world-class branding is in the substrates, inks, and mechanical fitment.</p>
        </div>

        <div className="materials-layout-grid">
          
          {/* Material Selector List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {materials.map((m, idx) => (
              <div
                key={m.title}
                onClick={() => setSelectedMaterial(idx)}
                style={{
                  padding: '1.25rem',
                  borderRadius: 14,
                  border: `2px solid ${selectedMaterial === idx ? 'var(--brand-blue)' : '#f1f5f9'}`,
                  background: selectedMaterial === idx ? '#f8faff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: selectedMaterial === idx ? '0 4px 16px rgba(26,86,219,0.08)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: selectedMaterial === idx ? 'var(--brand-blue)' : '#1e293b' }}>
                    {m.title}
                  </h4>
                  {selectedMaterial === idx && <CheckCircle size={18} color="var(--brand-blue)" />}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Interactive Material Showcase Preview */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
              <img
                src={current.image}
                alt={current.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                {current.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {current.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                <div>
                  <strong style={{ color: '#1e293b' }}>Durability:</strong> <span style={{ color: '#64748b' }}>{current.durability}</span>
                </div>
                <div>
                  <strong style={{ color: '#1e293b' }}>Ideal Applications:</strong> <span style={{ color: '#64748b' }}>{current.idealFor}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  href="/services"
                  className="btn-primary mobile-w-full"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Explore Corresponding Services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ============================================================
// 6. POPULAR SERVICES GRID
// ============================================================
function PopularServicesSection() {
  return (
    <section className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#f8faff' }}>
      <div className="container">
        
        <div className="section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1a56db', background: 'var(--brand-blue-light)', padding: '0.3rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Printer size={14} /> Complete Service Catalog
          </div>
          <h2>Popular Industrial & Commercial Services</h2>
          <p>Explore our most requested corporate printing, signage fabrication, and finishing capabilities</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {popularServices.map(service => (
            <Link
              key={service.name}
              href={`/services?cat=${service.category}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                borderRadius: 16,
                background: '#fff',
                textDecoration: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--brand-blue)';
                el.style.boxShadow = '0 8px 24px rgba(26,86,219,0.12)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--brand-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue)' }}>
                {React.createElement(service.icon, { size: 24, strokeWidth: 1.75 })}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--brand-dark)', marginBottom: 4 }}>{service.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.55 }}>{service.description}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--brand-blue)', fontWeight: 700, marginTop: 'auto', paddingTop: '0.5rem' }}>
                View Options <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/services" className="btn-primary mobile-w-full" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
            View All 150+ In-House Services <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
}

// ============================================================
// 7. WHY CHOOSE US
// ============================================================
function WhyChooseUsSection() {
  const reasons = [
    { icon: Shield, title: 'Commercial Grade Substrates', desc: 'No flimsy papers or cheap Chinese LEDs. We stock 350+ GSM artboards, Star flex, cast 3M vinyl, and genuine Samsung LEDs with IP67 power units.' },
    { icon: Zap, title: 'Rapid In-House Turnaround', desc: 'Because we own digital presses, laser cutters, and CNC routers under one roof, we eliminate middlemen and ship urgent jobs within 24–48 hours.' },
    { icon: CheckCircle, title: 'One-Stop Plant in Nagpur', desc: 'Stationery, packaging, 3D architectural signage, stamps, binding, and trade show standees — all coordinated by a single account manager.' },
    { icon: Star, title: 'Vector Pre-Flight & Art Proofing', desc: 'Our in-house design team inspects your bleed margins, color profiles (CMYK vs RGB), resolution DPI, and vector paths before any machine turns on.' },
    { icon: Phone, title: 'Dedicated B2B Support', desc: 'Direct WhatsApp communication, live photos during production, transparent GST invoices, and volume contract pricing for corporate accounts.' },
    { icon: Wrench, title: 'Professional Site Installation', desc: 'Our trained crew handles on-site scaffolding, mounting, electrical connections, and architectural fitment across Maharashtra.' },
  ];

  return (
    <section className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
      <div className="container">
        
        <div className="section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1a56db', background: 'var(--brand-blue-light)', padding: '0.3rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Award size={14} /> The PrintMaster Pro Advantage
          </div>
          <h2>Why 500+ Businesses Trust Us</h2>
          <p>We combine industrial machinery with meticulous craftsmanship to elevate your brand presence.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: '1.5rem', borderRadius: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Icon size={22} color="var(--brand-blue)" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1e293b' }}>{title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================
// 8. HOW IT WORKS
// ============================================================
function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Select Service or End-Product', desc: 'Browse our 11 categories or choose an end-product. Specify custom dimensions, finishing options, and quantity.' },
    { num: '02', title: 'Submit Artwork or Brief', desc: 'Upload your vector files (PDF/CDR/AI) or request our in-house graphic design studio to create artwork from scratch.' },
    { num: '03', title: 'Approval & Digital Proof', desc: 'Receive a digital mock-up and comprehensive formal quote within hours via WhatsApp or email. Approve to lock production.' },
    { num: '04', title: 'Precision Production & Dispatch', desc: 'Track your order from machine cutting to QC inspection. Delivered securely or professionally installed at your site.' },
  ];

  return (
    <section id="how-it-works" className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
      <div className="container">
        
        <div className="section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1a56db', background: 'var(--brand-blue-light)', padding: '0.3rem 0.85rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <FileCheck size={14} /> Seamless B2B Workflow
          </div>
          <h2>How It Works</h2>
          <p>Fast, transparent, four-step process from digital concept to physical reality.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {steps.map(step => (
            <div
              key={step.num}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a56db, #3b82f6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 6px 18px rgba(26,86,219,0.3)'
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{step.num}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1e293b' }}>{step.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================
// 9. INDUSTRIES SERVED
// ============================================================
function IndustriesSection() {
  const industries = [
    { icon: Building2, name: 'Corporate Offices', sub: 'Stationery, ID cards, brass nameplates & indoor wayfinding' },
    { icon: Store, name: 'Retail & Showrooms', sub: '3D illuminated signage, window graphics & point-of-sale displays' },
    { icon: Building, name: 'Real Estate & Infra', sub: 'Large format hoardings, mesh banners & architectural site boards' },
    { icon: GraduationCap, name: 'Colleges & Schools', sub: 'Annual day mementos, certificates, student ID cards & brochures' },
    { icon: Hospital, name: 'Healthcare Networks', sub: 'Wayfinding signages, doctor directories, OPD prescription pads' },
    { icon: PartyPopper, name: 'Conferences & Expos', sub: 'Tension fabric backdrops, roll-up standees & lanyards' },
    { icon: ShoppingCart, name: 'Direct-To-Consumer Brands', sub: 'Custom rigid packaging boxes, metallic stickers & mailers' },
    { icon: Factory, name: 'Manufacturing Plants', sub: 'ISO safety boards, machinery stencils & self-inking stamps' },
  ];

  return (
    <section className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
      <div className="container">
        
        <div className="section-header">
          <h2>Specialized Industry Solutions</h2>
          <p>Custom tailored packages engineered for the exact compliance, brand guidelines, and durability of your sector.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {industries.map(({ icon: Icon, name, sub }) => (
            <div
              key={name}
              style={{
                padding: '1.25rem',
                borderRadius: 14,
                border: '1px solid var(--border)',
                background: '#f8fafc',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ color: 'var(--brand-blue)', marginBottom: '0.75rem' }}>
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--brand-dark)', marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', lineHeight: 1.5 }}>{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================
// 10. INTERACTIVE FAQ ACCORDION
// ============================================================
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What file formats and color profiles are recommended for production?',
      a: 'We recommend print-ready vector PDFs, CorelDraw (.CDR), Adobe Illustrator (.AI), or high-resolution TIFF/PSD files at 300 DPI. For digital & offset printing, please submit artwork in CMYK color mode. For laser cutting and CNC router jobs, vector outlines (.DXF, .DWG, .AI, or .EPS) are preferred.'
    },
    {
      q: 'Do you provide on-site measurement and installation for 3D sign boards?',
      a: 'Yes! We have an experienced in-house site fabrication team equipped with scaffolding and laser measurement tools. We handle site inspection, structural civil mounting, weatherproofing, and electrical connections throughout Nagpur and the Vidarbha region.'
    },
    {
      q: 'Can I get physical samples or a digital pre-production proof before mass printing?',
      a: 'Absolutely. For corporate card orders, boxes, and brochures, we provide PDF digital pre-flight proofs free of charge. Physical sample proofs with hot foil stamping or rigid box prototypes can also be fabricated upon request prior to volume production runs.'
    },
    {
      q: 'How fast can you deliver rush orders?',
      a: 'Because our Heidelberg offset presses, Konica Minolta digital presses, CO2 laser cutters, and solvent plotters operate under one roof, urgent orders (like business cards, brochures, standees, or acrylic mementos) can be manufactured within 24 hours of artwork sign-off.'
    },
    {
      q: 'Do you provide formal GST invoices and credit terms for corporate clients?',
      a: 'Yes, we are a fully GST-compliant manufacturing firm. Every quote and order includes an itemized GST invoice with HSN codes. Recurring corporate accounts can also register for 15-day or 30-day PO billing terms.'
    }
  ];

  return (
    <section className="section-padding-mobile" style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: 840 }}>
        
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about specs, file submission, installation, and corporate billing.</p>
        </div>

        <div>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 14,
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.15s'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={18} color="var(--brand-blue)" /> : <ChevronDown size={18} color="#64748b" />}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.86rem', color: '#475569', lineHeight: 1.65, borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ============================================================
// 11. CTA SECTION (MOBILE RESPONSIVE)
// ============================================================
function CTASection() {
  return (
    <section
      className="section-padding-mobile"
      style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.35rem 0.9rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.25rem', color: '#93c5fd' }}>
          <Zap size={14} /> Ready to Upgrade Your Brand Identity?
        </div>

        <h2 style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Let’s Build Your Next Printing & Signage Project
        </h2>
        
        <p style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Whether you need 500 foil-stamped corporate cards, 50 illuminated LED channel letters, or a complete fleet wrap — our engineering team delivers precision every time.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
          <Link
            href="/services"
            className="mobile-w-full"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.95rem 1.85rem',
              background: '#fff',
              color: '#1e40af',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
            }}
          >
            Explore 150+ Services Catalog <ArrowRight size={17} />
          </Link>
          
          <a
            href="https://wa.me/919876543210?text=Hi%20PrintMaster%20Pro,%20I%20would%20like%20a%20custom%20quotation%20for%20a%20printing/signage%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-w-full"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.95rem 1.75rem',
              background: '#25d366',
              color: '#fff',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(37,211,102,0.3)'
            }}
          >
            <MessageCircle size={18} /> Chat on WhatsApp Directly
          </a>

          <Link
            href="/checkout"
            className="mobile-w-full"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.95rem 1.75rem',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              backdropFilter: 'blur(8px)'
            }}
          >
            Open Quote Cart
          </Link>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', fontSize: '0.82rem', color: '#93c5fd' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <CheckCircle size={15} color="#60a5fa" /> In-House Production in Nagpur
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <CheckCircle size={15} color="#60a5fa" /> GST Invoices & Proof Approval
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <CheckCircle size={15} color="#60a5fa" /> Direct Shipping Across India
          </span>
        </div>
      </div>
    </section>
  );
}
