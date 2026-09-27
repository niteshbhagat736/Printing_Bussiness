'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  Layers, 
  Check, 
  SlidersHorizontal, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Truck 
} from 'lucide-react';
import { PRODUCTS, FABRIC_COLORS } from '@/data/products';
import { Product, ColorOption } from '@/types';
import { PoloVectorModel } from './PoloVectorModel';

interface ProductCatalogProps {
  onSelectProductForCustomizer: (product: Product) => void;
  onOpenBulkQuote: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProductForCustomizer,
  onOpenBulkQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethodFilter, setSelectedMethodFilter] = useState<string>('all');
  
  // Track selected color per product card
  const [productColorMap, setProductColorMap] = useState<Record<string, ColorOption>>(() => {
    const initial: Record<string, ColorOption> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.availableColors[0] || FABRIC_COLORS[0];
    });
    return initial;
  });

  const handleColorChange = (productId: string, color: ColorOption) => {
    setProductColorMap((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'polo' && p.category !== 'polo') return false;
      if (selectedCategory === 'swag' && p.category !== 'swag_box') return false;
      if (selectedCategory === 'dryfit' && !p.name.includes('Dry-Fit')) return false;
      if (selectedCategory === 'supima' && !p.name.includes('Supima')) return false;
    }
    if (selectedMethodFilter !== 'all') {
      if (!p.supportedMethods.includes(selectedMethodFilter as any)) return false;
    }
    return true;
  });

  return (
    <section id="product-catalog" className="py-20 bg-gray-50 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Product Catalog
            </h2>
            <p className="text-gray-600 text-base mt-2 max-w-xl">
              Premium apparel engineered for corporate teams.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBulkQuote}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Download PDF Catalog</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-2 rounded-2xl border border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'polo', label: 'Polo Shirts' },
              { id: 'dryfit', label: 'Dry-Fit' },
              { id: 'supima', label: 'Supima' },
              { id: 'swag', label: 'Swag Boxes' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="hidden sm:inline">Customization:</span>
            <select
              value={selectedMethodFilter}
              onChange={(e) => setSelectedMethodFilter(e.target.value)}
              aria-label="Filter by Customization Method"
              className="bg-white border border-gray-300 text-gray-800 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Methods</option>
              <option value="embroidery">Embroidery Only</option>
              <option value="dtf_print">DTF Print Only</option>
              <option value="screen_print">Screen Print Only</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const activeColor = productColorMap[product.id] || product.availableColors[0];
            const isApparel = product.category === 'polo' || product.category === 'tshirt';
            
            let emojiIcon = '🎁';
            if (product.category === 'drinkware') emojiIcon = '🍶';
            if (product.category === 'bag') emojiIcon = '👜';
            if (product.category === 'stationery') emojiIcon = '📓';

            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Top Media & Preview Container */}
                <div className="relative p-6 bg-gray-50 flex flex-col items-center justify-center border-b border-gray-100 min-h-[280px]">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white text-gray-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Rating Pill */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>

                  {/* Interactive Polo Preview */}
                  <div className="w-full max-w-[200px] h-[190px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {!isApparel ? (
                      <div className="text-center p-4">
                        <span className="text-6xl block mb-2">{emojiIcon}</span>
                        <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 px-2 py-1 rounded-lg border border-indigo-500/30">
                          {product.category === 'swag_box' ? '5-Item Custom Kit' : 'Custom Product'}
                        </span>
                      </div>
                    ) : (
                      <PoloVectorModel
                        viewAngle="front"
                        color={activeColor}
                        collarStyle={product.availableCollarStyles?.[0] || 'classic_ribbed'}
                        customizationMethod="embroidery"
                        artworks={{
                          left_chest: {
                            type: 'preset',
                            content: `<svg viewBox="0 0 100 100" fill="currentColor"><polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" stroke-width="8"/><circle cx="50" cy="55" r="14" fill="currentColor"/></svg>`,
                            color: '#EAB308',
                            scale: 0.9,
                            rotation: 0,
                            offsetX: 0,
                            offsetY: 0,
                          },
                        }}
                        activeLocation="left_chest"
                        isInteractive={false}
                      />
                    )}
                  </div>

                  {/* Color Swatch Selector on Card */}
                  {isApparel && (
                    <div className="w-full mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-gray-600">
                        {product.availableColors.length} Colors:
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                        {product.availableColors.slice(0, 5).map((col) => (
                          <button
                            key={col.id}
                            onClick={() => handleColorChange(product.id, col)}
                            className={`w-4 h-4 rounded-full transition-transform cursor-pointer border ${
                              activeColor.id === col.id
                                ? 'scale-125 ring-2 ring-indigo-400 border-white'
                                : 'border-gray-300 hover:scale-110'
                            }`}
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Body Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Pricing Matrix Highlight */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">
                          Starts at
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.bulkPrice100}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        onSelectProductForCustomizer(product);
                        const el = document.getElementById('customizer-studio');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
