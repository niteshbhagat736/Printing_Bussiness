'use client';

import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { CUSTOMER_REVIEWS } from '@/data/products';

export const CustomerProofShowcase: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the minimum order quantity (MOQ) for custom embroidered polos?',
      a: 'We have NO minimum order quantity (MOQ: 1 unit) for standard orders! You can order a single personalized sample polo to inspect the fit, fabric feel, and 3D embroidery quality before placing a bulk team order.',
    },
    {
      q: 'What file formats can I upload for my company logo?',
      a: 'We accept PNG, SVG, AI, EPS, PDF, and high-resolution JPG files. Our automated studio analyzes your file for 300+ DPI sharpness. If you need assistance with vectorization or thread stitch color matching, our in-house merch designers convert it for free within 15 minutes.',
    },
    {
      q: 'How durable is the embroidery and DTF printing after multiple washes?',
      a: 'Our Japanese Tajima 3D computerized embroidery uses poly-neon threads guaranteed for 100+ commercial wash cycles with zero fraying. Our DTF (Direct-To-Film) digital prints are cured with high-density stretch binders that resist cracking for 60+ machine washes.',
    },
    {
      q: 'Can we order a physical Fabric Swatch & Stitch Sample Kit first?',
      a: 'Yes! For corporate teams planning an order of 50+ units, we dispatch a complimentary Fabric Swatch Kit containing all 12 fabric color swatches, 240 GSM pique samples, dry-fit swatches, and real embroidered thread samples to your office address within 48 hours.',
    },
    {
      q: 'Do you provide GST business invoices with Input Tax Credit (ITC)?',
      a: 'Yes, 100%. All corporate orders include an official GST tax invoice (5% GST for apparel) with your company GSTIN, allowing you to claim complete Input Tax Credit.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Trusted by 14,800+ Workplaces
          </h2>
          <p className="text-gray-600 text-base mt-2">
            See why leading startups and enterprise teams choose ThreadVibe.
          </p>
        </div>

        {/* 1. REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-[2rem] bg-white border border-gray-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow space-y-6"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{rev.date}</span>
                </div>

                {/* Verified Order Tag */}
                <div className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{rev.verifiedOrder}</span>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Company Profile */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xl w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{rev.author}</h4>
                    <p className="text-xs text-gray-500">{rev.role}</p>
                    <p className="text-xs text-gray-900 font-medium mt-0.5">{rev.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{rev.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-gray-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
