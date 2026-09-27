'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Download, 
  Layers 
} from 'lucide-react';
import { FABRIC_COLORS, CLIENT_LOGOS } from '@/data/products';
import { PoloVectorModel } from './PoloVectorModel';
import { ColorOption, CollarStyle } from '@/types';

interface HeroSectionProps {
  onLaunchCustomizer: () => void;
  onExploreCatalog: () => void;
  onOpenBulkQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchCustomizer,
  onExploreCatalog,
  onOpenBulkQuote,
}) => {
  const [heroColor, setHeroColor] = useState<ColorOption>(FABRIC_COLORS[0]); // Midnight Navy
  const [heroCollar, setHeroCollar] = useState<CollarStyle>('contrast_tipped');

  return (
    <section className="relative pt-16 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT HERO TEXT & CTAs (7 cols on lg) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
              New: Premium Custom Apparel Platform
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
              Wear Your Brand <br/>
              <span className="text-gray-500">
                Identity.
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg text-gray-600 font-normal leading-relaxed max-w-xl">
              Precision embroidery & printing on premium heavyweight cotton. Design online in seconds, dispatched in 48 hours.
            </p>


            {/* HERO ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLaunchCustomizer}
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-base transition-all cursor-pointer"
              >
                <span>Design Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-medium text-base transition-all cursor-pointer"
              >
                <span>Explore Catalog</span>
              </button>
            </div>
          </div>

          {/* RIGHT INTERACTIVE POLO HERO CARD (6 cols on lg) */}
          <div className="lg:col-span-6 lg:pl-10 mt-12 lg:mt-0">
            <div className="relative rounded-[2rem] bg-gray-50/50 p-8 flex flex-col items-center border border-gray-100">
              
              {/* POLO VECTOR RENDERER */}
              <div className="w-full flex items-center justify-center">
                <PoloVectorModel
                  viewAngle="front"
                  color={heroColor}
                  collarStyle={heroCollar}
                  customizationMethod="embroidery"
                  artworks={{
                    left_chest: {
                      type: 'preset',
                      content: `<svg viewBox="0 0 100 100" fill="currentColor"><polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round"/><circle cx="50" cy="55" r="14" fill="currentColor"/></svg>`,
                      color: '#EAB308',
                      scale: 1,
                      rotation: 0,
                      offsetX: 0,
                      offsetY: 0,
                    },
                  }}
                  activeLocation="left_chest"
                  embroideryThreadColor="#EAB308"
                />
              </div>

              {/* HERO COLOR SELECTOR PALETTE */}
              <div className="mt-8 flex items-center justify-center gap-3">
                {FABRIC_COLORS.slice(0, 6).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setHeroColor(c)}
                    className={`w-8 h-8 rounded-full transition-all shrink-0 cursor-pointer border-2 ${
                      heroColor.id === c.id
                        ? 'scale-110 border-gray-900'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CLIENT TRUST BRAND STRIP */}
        <div className="mt-16 pt-8 border-t border-gray-200/80">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6">
            Trusted by 14,000+ Fast-Growing Brands & Fortune 500 Enterprises Across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            {CLIENT_LOGOS.map((client, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-bold text-gray-700 text-sm md:text-base hover:text-gray-900 transition-colors">
                <span className="text-lg">{client.logoText.split(' ')[0]}</span>
                <span>{client.logoText.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
