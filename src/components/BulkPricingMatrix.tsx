'use client';

import React, { useState } from 'react';
import { 
  Percent, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  FileSpreadsheet, 
  Truck, 
  Check, 
  Gift 
} from 'lucide-react';

interface BulkPricingMatrixProps {
  onOpenBulkQuote: () => void;
  onOpenSampleKitModal: () => void;
}

export const BulkPricingMatrix: React.FC<BulkPricingMatrixProps> = ({
  onOpenBulkQuote,
  onOpenSampleKitModal,
}) => {
  const [sliderQty, setSliderQty] = useState<number>(75);
  const baseRate = 599; // Standard 240 GSM Bio-Wash Pique Polo base retail

  // Tier Discount Function
  const getDiscountData = (qty: number) => {
    if (qty >= 500) return { percent: 52, unitPrice: 289, label: 'Factory Direct Enterprise Tier' };
    if (qty >= 200) return { percent: 48, unitPrice: 311, label: 'Mega Corporate Tier' };
    if (qty >= 100) return { percent: 42, unitPrice: 347, label: 'Standard Enterprise Tier' };
    if (qty >= 50) return { percent: 35, unitPrice: 389, label: 'Growth Team Tier' };
    if (qty >= 20) return { percent: 22, unitPrice: 467, label: 'Startup Team Tier' };
    if (qty >= 6) return { percent: 12, unitPrice: 527, label: 'Small Batch Tier' };
    return { percent: 0, unitPrice: baseRate, label: 'Single Unit Retail' };
  };

  const discount = getDiscountData(sliderQty);
  const totalCost = discount.unitPrice * sliderQty;
  const originalCost = baseRate * sliderQty;
  const totalSavings = originalCost - totalCost;
  const gstTax = Math.round(totalCost * 0.05);

  return (
    <section id="bulk-pricing-matrix" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Volume Pricing Matrix
          </h2>
          <p className="text-gray-600 text-base mt-2">
            The more custom polos your team orders, the more you save.
          </p>
        </div>

        {/* 1. TIER CARDS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {[
            { range: '1 - 5 pcs', price: '₹599', discount: 'Retail', badge: 'MOQ: 1', active: sliderQty < 6 },
            { range: '6 - 19 pcs', price: '₹527', discount: '12% OFF', badge: 'Small Batch', active: sliderQty >= 6 && sliderQty < 20 },
            { range: '20 - 49 pcs', price: '₹467', discount: '22% OFF', badge: 'Team Tier', active: sliderQty >= 20 && sliderQty < 50 },
            { range: '50 - 99 pcs', price: '₹389', discount: '35% OFF', badge: 'Most Popular', active: sliderQty >= 50 && sliderQty < 100 },
            { range: '100 - 499 pcs', price: '₹347', discount: '42% OFF', badge: 'Enterprise', active: sliderQty >= 100 && sliderQty < 500 },
            { range: '500+ pcs', price: '₹289', discount: '52% OFF', badge: 'Factory Direct', active: sliderQty >= 500 },
          ].map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 text-center border transition-all duration-300 flex flex-col justify-between ${
                tier.active
                  ? 'bg-gray-900 border-gray-900 text-white scale-105 shadow-md z-10'
                  : 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${tier.active ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {tier.badge}
                </span>
                <div className={`text-sm font-medium mt-3 ${tier.active ? 'text-gray-300' : 'text-gray-600'}`}>{tier.range}</div>
                <div className="text-2xl font-bold mt-1">{tier.price}</div>
              </div>
              <div className={`text-xs font-bold mt-3 py-1 rounded ${tier.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-600'}`}>
                {tier.discount}
              </div>
            </div>
          ))}
        </div>

        {/* 2. INTERACTIVE SLIDER & LIVE CALCULATOR BOX */}
        <div className="rounded-[2rem] bg-gray-50 border border-gray-100 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Slider Control (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">
                    Adjust Your Desired Polo Order Quantity:
                  </span>
                  <span className="text-lg font-bold text-gray-900 bg-white px-4 py-2 rounded-xl border border-gray-200">
                    {sliderQty} Units
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1"
                  max="600"
                  step="5"
                  value={sliderQty}
                  onChange={(e) => setSliderQty(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />

                <div className="flex justify-between text-[11px] text-gray-500 mt-1 font-semibold">
                  <span>1 Unit</span>
                  <span>50 pcs (35% Off)</span>
                  <span>100 pcs (42% Off)</span>
                  <span>200 pcs</span>
                  <span>500+ Units (Factory Rate)</span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-600 font-medium">Quick Select:</span>
                {[25, 50, 100, 250, 500].map((q) => (
                  <button
                    key={q}
                    onClick={() => setSliderQty(q)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      sliderQty === q
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {q} Pcs
                  </button>
                ))}
              </div>

              {/* Corporate Benefits Included List */}
              <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Free Embroidery Digitization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Free Sample Kit Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>100% Cotton Bio-Wash</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>GST Business Credit Invoicing</span>
                </div>
              </div>
            </div>

            {/* Right Cost Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm font-bold text-gray-900">
                  Bulk Breakdown
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {discount.label}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Base Rate:</span>
                  <span className="line-through">₹{baseRate}/pc</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold">
                  <span>Bulk Unit Rate:</span>
                  <span>₹{discount.unitPrice}/pc</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Base Amount:</span>
                  <span>₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (5%):</span>
                  <span>₹{gstTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Total Savings:</span>
                  <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between">
                <span className="text-base font-bold text-gray-900">Total:</span>
                <div className="text-3xl font-bold text-gray-900">
                  ₹{(totalCost + gstTax).toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={onOpenBulkQuote}
                className="w-full py-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Quotation</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3. FREE FABRIC SWATCH SAMPLE KIT BANNER */}
        <div className="mt-12 rounded-[2rem] bg-gray-50 border border-gray-100 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
              <Gift className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Want to touch the fabric first?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Get our free fabric swatch kit delivered to your office in 2 days.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSampleKitModal}
            className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm transition-all cursor-pointer shrink-0"
          >
            Order Sample Kit
          </button>
        </div>

      </div>
    </section>
  );
};
