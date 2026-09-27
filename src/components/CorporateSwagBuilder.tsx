'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  FileText 
} from 'lucide-react';
import { SwagBoxItem } from '@/types';

interface CorporateSwagBuilderProps {
  onOpenBulkQuote: () => void;
}

export const CorporateSwagBuilder: React.FC<CorporateSwagBuilderProps> = ({
  onOpenBulkQuote,
}) => {
  const [items, setItems] = useState<SwagBoxItem[]>([
    {
      id: 'swag-polo',
      name: 'Custom Embroidered 240 GSM Bio-Wash Polo',
      category: 'Apparel',
      price: 349,
      selected: true,
      iconName: '👕',
      customizationNote: 'Front Left Chest 3D Embroidery Included',
    },
    {
      id: 'swag-flask',
      name: 'Matte Black 750ml Vacuum Insulated Thermos Flask',
      category: 'Drinkware',
      price: 299,
      selected: true,
      iconName: '🍶',
      customizationNote: 'Precision Laser Logo Engraving Included',
    },
    {
      id: 'swag-journal',
      name: 'Soft-Touch Hardbound Vegan Leather Journal',
      category: 'Stationery',
      price: 189,
      selected: true,
      iconName: '📓',
      customizationNote: 'Debossed Gold Foil Logo on Cover',
    },
    {
      id: 'swag-pen',
      name: 'Matte Gunmetal Executive Rollerball Pen',
      category: 'Stationery',
      price: 79,
      selected: true,
      iconName: '✒️',
      customizationNote: 'Laser Engraved Company Name',
    },
    {
      id: 'swag-tote',
      name: 'Heavyweight 320 GSM Canvas Tote Bag',
      category: 'Bags',
      price: 149,
      selected: false,
      iconName: '👜',
      customizationNote: 'Full-Color Screen Printed Graphic',
    },
    {
      id: 'swag-box',
      name: 'Custom Magnetic Rigid Mailer Box + Shredded Tissue',
      category: 'Packaging',
      price: 199,
      selected: true,
      iconName: '📦',
      customizationNote: 'Full Exterior Custom Brand Print & Welcome Letter',
    },
  ]);

  const [kitQuantity, setKitQuantity] = useState<number>(50);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedItems = items.filter((i) => i.selected);
  const rawKitPrice = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  
  // Bundle savings
  const bundleDiscountPercent = 20; // 20% off when bundled
  const finalKitPrice = Math.round(rawKitPrice * (1 - bundleDiscountPercent / 100));
  const totalOrderPrice = finalKitPrice * kitQuantity;

  return (
    <section id="corporate-swag-builder" className="py-20 bg-gray-50 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Corporate Swag Kits
            </h2>
            <p className="text-gray-600 text-base mt-2 max-w-2xl">
              Create memorable onboarding kits & client gifts. Select items to calculate per-box bundle pricing.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-full">
            <Truck className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700 font-medium">
              Direct-to-Employee Delivery Available
            </span>
          </div>
        </div>

        {/* Builder Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Item Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-sm font-bold text-gray-900 block mb-3">
              Select Products for Your Kit:
            </span>

            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  item.selected
                    ? 'bg-gray-50 border-gray-900 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    {item.iconName}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 block mt-0.5">
                      {item.customizationNote}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-base font-bold text-gray-900">₹{item.price}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      item.selected
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'border-gray-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kit Live Pricing Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-sm font-bold text-gray-900">
                Summary
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                20% Bundle Savings
              </span>
            </div>

            {/* Quantity Controls */}
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-3">
                Order Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setKitQuantity(Math.max(10, kitQuantity - 10))}
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center bg-gray-50 border border-gray-200 py-2.5 rounded-full text-base font-bold text-gray-900">
                  {kitQuantity} Boxes
                </div>
                <button
                  onClick={() => setKitQuantity(kitQuantity + 10)}
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Selected Items Snapshot */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="text-sm font-bold text-gray-900 block mb-2">
                Included in Box:
              </span>
              <div className="space-y-1.5">
                {selectedItems.map((si) => (
                  <div key={si.id} className="flex justify-between text-sm text-gray-600">
                    <span>{si.iconName} {si.name.split(' ')[0]} {si.name.split(' ')[1]}</span>
                    <span>₹{si.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-500">
                <span>Standalone total:</span>
                <span className="line-through">₹{rawKitPrice}/box</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold">
                <span>Bundle Rate:</span>
                <span className="text-emerald-600">₹{finalKitPrice}/box</span>
              </div>
              <div className="flex justify-between items-end pt-3">
                <span className="text-base font-bold text-gray-900">Total ({kitQuantity} Kits):</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{totalOrderPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenBulkQuote}
              className="w-full py-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Get Swag Kit Quote</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
