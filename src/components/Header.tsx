'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Truck, 
  PhoneCall, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  FileText,
  MapPin,
  Flame
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBulkQuote: () => void;
  onOpenPincodeModal: () => void;
  onNavigateToCustomizer: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToSwag: () => void;
  onNavigateToPricing: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenBulkQuote,
  onOpenPincodeModal,
  onNavigateToCustomizer,
  onNavigateToCatalog,
  onNavigateToSwag,
  onNavigateToPricing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 transition-all">

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div>
                <span className="text-2xl font-bold tracking-tight text-gray-900 font-sans">
                  ThreadVibe
                </span>
              </div>
            </button>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-gray-50 border-none rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all"
              />
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-8">
            <button
              onClick={onNavigateToCatalog}
              onMouseEnter={() => setShowCategoryMenu(true)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Products
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToPricing}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Pricing
            </button>

            <button
              onClick={onOpenBulkQuote}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Get Quote
            </button>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToCustomizer}
              className="hidden sm:flex items-center justify-center px-5 py-2.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Design Studio
            </button>

            {/* CART DRAWER BUTTON */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-white text-gray-700 hover:text-gray-900 border border-gray-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-gray-50 border-b border-gray-200 px-4 pt-3 pb-6 space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search custom polo shirts, swag kits..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <button
              onClick={() => { onNavigateToCustomizer(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold text-sm text-left"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Launch 3D Customizer Studio
              </span>
              <span>→</span>
            </button>

            <button
              onClick={() => { onNavigateToCatalog(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-white text-gray-800 text-sm font-semibold text-left flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              Browse All Custom Polos (240 GSM, Dry-Fit, Supima)
            </button>

            <button
              onClick={() => { onNavigateToSwag(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-white text-gray-800 text-sm font-semibold text-left flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-rose-400" />
              Corporate Swag & Onboarding Kits
            </button>

            <button
              onClick={() => { onNavigateToPricing(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-white text-gray-800 text-sm font-semibold text-left flex items-center gap-2"
            >
              <span>📊</span>
              Bulk Pricing & Volume Tier Matrix
            </button>

            <button
              onClick={() => { onOpenBulkQuote(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold text-left flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Request Official Bulk Quotation (GST Invoice)
            </button>

            <button
              onClick={() => { onOpenPincodeModal(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-white text-gray-700 text-sm font-medium text-left flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              Check Indian Pincode Delivery Timelines
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
