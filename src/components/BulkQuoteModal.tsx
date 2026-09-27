'use client';

import React, { useState } from 'react';
import { X, FileText, Sparkles, CheckCircle2, Upload, ShieldCheck, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BulkQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkQuoteModal: React.FC<BulkQuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    quantity: '100',
    apparelType: 'Signature 240 GSM Bio-Wash Pique Polo',
    brandingMethod: 'Precision 3D Embroidery',
    city: '',
    deliveryDateNeeded: 'Within 7 Days',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-xl text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Official Quotation Request Received!
            </h3>
            <p className="text-sm text-gray-700 max-w-md mx-auto">
              Thank you, <strong className="text-indigo-400">{formData.contactName || 'Valued Partner'}</strong>! Our senior merch consultant is preparing your GST quote for <strong>{formData.quantity} Units</strong> of {formData.apparelType}.
            </p>
            <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Free Virtual Proof & Fabric Swatch Kit dispatched</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <PhoneCall className="w-4 h-4 text-indigo-400" />
                <span>A dedicated corporate manager will WhatsApp / Email you in &lt;15 mins</span>
              </div>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Request Factory-Direct Bulk Quotation
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Get customized volume pricing with free embroidery digitization, free swatch samples, and GST invoicing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Technologies Pvt Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Official Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@acmetech.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Estimated Quantity *</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="50">50 - 99 pcs (35% Off)</option>
                    <option value="100">100 - 249 pcs (42% Off)</option>
                    <option value="250">250 - 499 pcs (48% Off)</option>
                    <option value="500">500 - 1,000 pcs (52% Off)</option>
                    <option value="2000">1,000+ pcs (Direct Factory Contract)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Product Style *</label>
                  <select
                    value={formData.apparelType}
                    onChange={(e) => setFormData({ ...formData, apparelType: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Signature 240 GSM Bio-Wash Pique Polo">240 GSM Bio-Wash Pique Polo</option>
                    <option value="AeroCool Dry-Fit Performance Polo">AeroCool Dry-Fit Athletic Polo</option>
                    <option value="Executive Supima Silk-Touch Polo">Executive Supima Luxury Polo</option>
                    <option value="Contrast Tipped Dual Tone Polo">Contrast Tipping Polo</option>
                    <option value="Corporate Swag Onboarding Kit">Complete Corporate Swag Box</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Branding Method</label>
                  <select
                    value={formData.brandingMethod}
                    onChange={(e) => setFormData({ ...formData, brandingMethod: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Precision 3D Embroidery">3D Computerized Embroidery</option>
                    <option value="DTF Full Color Digital Print">DTF Full-Color Digital Print</option>
                    <option value="High Density Screen Print">Screen Printing</option>
                    <option value="Need Expert Recommendation">Need Expert Recommendation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Special Requirements / Custom Colors / Placements</label>
                <textarea
                  rows={2}
                  placeholder="e.g. We need 150 navy polos with gold embroidery on left chest and employee names on right sleeve."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Privacy • Fast Response</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
