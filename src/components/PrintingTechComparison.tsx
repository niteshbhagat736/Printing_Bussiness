'use client';

import React, { useState } from 'react';
import { Sparkles, Check, X, ShieldCheck, Flame, Layers } from 'lucide-react';

export const PrintingTechComparison: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'embroidery' | 'dtf' | 'screen' | 'sublimation'>('embroidery');

  const methods = {
    embroidery: {
      title: 'Precision 3D Computerized Embroidery',
      subtitle: 'Tajima Multi-Head Industrial Stitching',
      badge: 'RECOMMENDED FOR CORPORATE POLOS',
      description: 'The gold standard in corporate uniforms. Stitched directly into the honeycomb pique weave using high-luster, colorfast polyester/viscose threads.',
      pros: [
        'Unmatched luxury 3D textured tactile hand-feel',
        'Lasts 100+ commercial wash cycles without fading',
        'Adds high perceived value to brand apparel',
        'Ideal for left chest logos, monograms & sleeve badges',
      ],
      cons: [
        'Not recommended for complex photographic portraits',
        'Tiny micro-text below 4mm may need simplification',
      ],
      idealFor: 'Executive Teams, Corporate Offsites, Hospitality Staff, Golf Polos',
      durability: '100+ Washes (Lifetime of Shirt)',
      turnaround: '48 Hours',
    },
    dtf: {
      title: 'Direct-To-Film (DTF) Digital Print',
      subtitle: 'Ultra-HD Photographic CMYK+White Transfer',
      badge: 'BEST FOR MULTI-COLOR GRADIENTS',
      description: 'Next-generation digital transfer technology that bonds high-density pigment ink to cotton fibers with a soft, breathable matte finish.',
      pros: [
        'Infinite photo-realistic color gradients & shadows',
        'No color limitations or per-color plate setup charges',
        'Razor-sharp vector edges on intricate graphics',
        'Flexible stretch-resistant membrane',
      ],
      cons: [
        'Flat texture (does not have 3D raised embroidery thread)',
      ],
      idealFor: 'Tech Startup Mascot Logos, Hackathon Merch, Multi-Color Back Art',
      durability: '60+ Washes',
      turnaround: '24-48 Hours',
    },
    screen: {
      title: 'High-Density Screen Printing',
      subtitle: 'Pantone Matched Plastisol & Water-Based Inks',
      badge: 'BEST VALUE FOR 100+ BULK ORDERS',
      description: 'Traditional heavy-duty screen printing using custom mesh stencils and high-opacity inks cured at 160°C for extreme vibrancy.',
      pros: [
        'Lowest cost per unit on large volume bulk orders',
        'Exact Pantone (PMS) brand color matching',
        'Super bright neon and metallic ink compatibility',
      ],
      cons: [
        'Setup charge per color screen on very small batches',
        'Not suitable for 1-piece sample orders',
      ],
      idealFor: 'College Fest Tees, Marathon Uniforms, Factory Workwear (100+ pcs)',
      durability: '80+ Washes',
      turnaround: '3-4 Days',
    },
    sublimation: {
      title: 'All-Over Thermal Dye Sublimation',
      subtitle: 'Molecular Gas Infusion into Dry-Fit Poly',
      badge: 'EXCLUSIVE FOR DRY-FIT PERFORMANCE',
      description: 'Heat turns solid dye into gas that molecularly bonds with micro-poly fibers. Zero weight, 100% breathable with zero hand-feel.',
      pros: [
        'Zero hand-feel (pores remain 100% open and breathable)',
        'Never peels, cracks, or fades ever',
        'Supports full edge-to-edge all-over patterns',
      ],
      cons: [
        'Works only on 100% Polyester / Dry-fit fabrics (not pure cotton)',
      ],
      idealFor: 'Cricket/Football Team Jerseys, Gym Wear, Cycling Kits',
      durability: 'Permanent Infusion',
      turnaround: '48 Hours',
    },
  };

  const cur = methods[activeMethod];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Printing Technology Comparison
          </h2>
          <p className="text-gray-600 text-base mt-2">
            Compare our industrial capabilities to find the best fit for your design.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {(Object.keys(methods) as Array<keyof typeof methods>).map((key) => {
            const m = methods[key];
            const isActive = activeMethod === key;
            return (
              <button
                key={key}
                onClick={() => setActiveMethod(key)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-3 ${isActive ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                    {m.badge}
                  </span>
                  <div className={`text-sm font-bold leading-snug ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {m.title}
                  </div>
                </div>
                <div className={`text-xs font-medium mt-4 ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                  {m.durability}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Comparison Card Detail */}
        <div className="rounded-[2rem] bg-white border border-gray-100 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
                  {cur.subtitle}
                </span>
                <h3 className="text-2xl font-black text-gray-900">
                  {cur.title}
                </h3>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {cur.description}
                </p>
              </div>

              {/* Pros List */}
              <div className="space-y-3">
                <span className="text-sm font-bold text-gray-900 block">
                  Advantages:
                </span>
                {cur.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-gray-900 shrink-0" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>

              {/* Ideal Use Cases */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-sm font-bold text-gray-900 block mb-2">
                  Best Suited For:
                </span>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {cur.idealFor}
                </span>
              </div>
            </div>

            {/* Right Metrics & Macro Simulation (5 cols) */}
            <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-6">
              <span className="text-sm font-bold text-gray-900 block border-b border-gray-200 pb-4">
                Technical Specifications
              </span>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                  <span>Wash Durability:</span>
                  <span className="font-bold text-gray-900">{cur.durability}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                  <span>Dispatch Turnaround:</span>
                  <span className="font-bold text-gray-900">{cur.turnaround}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                  <span>Color Fidelity:</span>
                  <span className="font-bold text-gray-900">100% Pantone Match</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Setup Fees:</span>
                  <span className="font-bold text-gray-900">Free</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200 text-center shadow-sm">
                <span className="text-sm text-gray-600 font-medium block">
                  Need Help Choosing? Our Designers provide free proofs in 15 mins.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
