'use client';

import React, { useState } from 'react';
import { X, Gift, CheckCircle2, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleKitModal: React.FC<SampleKitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    expectedOrderUnits: '50 - 200 pcs',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-xl text-gray-900">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 text-amber-300 flex items-center justify-center mx-auto text-3xl">
              🎁
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Free Swatch Kit Dispatched!
            </h3>
            <p className="text-sm text-gray-700 max-w-md mx-auto">
              Your physical Fabric Swatch & Stitch Density Sample Book has been queued for dispatch to <strong className="text-amber-300">{formData.company}</strong> in {formData.city}.
            </p>
            <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs text-left max-w-sm mx-auto space-y-1 text-gray-700">
              <div>📦 <strong>Contents:</strong> 12x Fabric Color Swatches + 240 GSM Bio-Wash Swatch + Tajima 3D Gold Thread Stitch Sample + Flexible Size Measuring Tape</div>
              <div className="pt-2 text-emerald-400 font-bold">⚡ Estimated Delivery: 2-3 Business Days</div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-8 py-3.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-all cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Order Free Fabric Swatch Kit
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-6">
              Feel the 240 GSM weight, inspect the 3D embroidery threads, and verify sizing before placing your team order.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NextGen Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Office Delivery Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Floor 4, Block B, Tech Park, Outer Ring Road"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bangalore"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 560103"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                <span>Dispatch My Free Kit</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
