'use client';

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Truck, 
  Check, 
  Sparkles, 
  Heart 
} from 'lucide-react';

interface FooterProps {
  onOpenBulkQuote: () => void;
  onOpenSampleKitModal: () => void;
  onOpenPincodeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBulkQuote,
  onOpenSampleKitModal,
  onOpenPincodeModal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100 relative">
      {/* 1. TRUST BAR */}
      <div className="border-b border-gray-100 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Premium Quality</h4>
                <p className="text-sm text-gray-500 mt-1">100% Super-Combed Cotton with anti-pilling honeycomb knit.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">48-Hour Dispatch</h4>
                <p className="text-sm text-gray-500 mt-1">Air Express shipping via trusted partners across India.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">100+ Wash Durability</h4>
                <p className="text-sm text-gray-500 mt-1">High-quality embroidery threads that never fade.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Zero Setup Charges</h4>
                <p className="text-sm text-gray-500 mt-1">Free digital proofs, free vectorization, and GST invoice credit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                ThreadVibe
              </span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              India&apos;s leading high-performance custom apparel & corporate printing platform. Empowering thousands of enterprises with custom embroidered apparel.
            </p>

            <div className="space-y-2 pt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 text-gray-700">
                <PhoneCall className="w-4 h-4 text-gray-400" />
                <span>Corporate Support: <strong>1800-889-8423</strong></span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>Bulk RFQ Desk: <strong>bulk@threadvibe.in</strong></span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span>Electronic City Phase 1, Bangalore, KA 560100</span>
              </div>
            </div>
          </div>

          {/* Col 2: Custom Polos */}
          <div className="space-y-4 text-sm">
            <h4 className="text-sm font-bold text-gray-900">
              Custom Products
            </h4>
            <ul className="space-y-3 text-gray-500">
              <li><a href="#customizer-studio" className="hover:text-gray-900 transition-colors">Premium Polos</a></li>
              <li><a href="#customizer-studio" className="hover:text-gray-900 transition-colors">Dry-Fit Athletic</a></li>
              <li><a href="#customizer-studio" className="hover:text-gray-900 transition-colors">Supima Luxury</a></li>
              <li><a href="#customizer-studio" className="hover:text-gray-900 transition-colors">Dual-Tone Tipped</a></li>
              <li><a href="#customizer-studio" className="hover:text-gray-900 transition-colors">Mandarin / Nehru</a></li>
            </ul>
          </div>

          {/* Col 3: Corporate Solutions */}
          <div className="space-y-4 text-sm">
            <h4 className="text-sm font-bold text-gray-900">
              Corporate Solutions
            </h4>
            <ul className="space-y-3 text-gray-500">
              <li>
                <button onClick={onOpenBulkQuote} className="hover:text-gray-900 transition-colors text-left cursor-pointer">
                  Request Quotation
                </button>
              </li>
              <li>
                <button onClick={onOpenSampleKitModal} className="hover:text-gray-900 transition-colors text-left cursor-pointer">
                  Order Sample Box
                </button>
              </li>
              <li><a href="#corporate-swag-builder" className="hover:text-gray-900 transition-colors">Employee Swag Kits</a></li>
              <li><a href="#bulk-pricing-matrix" className="hover:text-gray-900 transition-colors">Pricing Matrix</a></li>
              <li>
                <button onClick={onOpenPincodeModal} className="hover:text-gray-900 transition-colors text-left cursor-pointer">
                  Delivery Checker
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Tax Benefit */}
          <div className="space-y-4 text-sm">
            <h4 className="text-sm font-bold text-gray-900">
              Newsletter
            </h4>
            <p className="text-gray-500 text-sm">
              Receive seasonal corporate discount codes and news.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <input
                type="email"
                required
                placeholder="Enter work email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Subscribe
              </button>
              {subscribed && (
                <p className="text-emerald-600 font-medium text-xs">
                  ✓ Subscribed successfully!
                </p>
              )}
            </form>

            <div className="pt-2 text-xs text-gray-400">
              🔒 GSTIN Verified Business Invoicing
            </div>
          </div>

        </div>
      </div>

      {/* 3. COPYRIGHT & BOTTOM TICKER */}
      <div className="border-t border-gray-100 py-6 bg-white text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ThreadVibe. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="hover:text-gray-900 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-900 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-900 cursor-pointer">ISO 9001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
