'use client';

import React, { useState } from 'react';
import { X, MapPin, Truck, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

interface PincodeEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PincodeEstimatorModal: React.FC<PincodeEstimatorModalProps> = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    city: string;
    state: string;
    dispatchHours: string;
    deliveryDays: string;
    courier: string;
    isExpress: boolean;
  } | null>(null);

  if (!isOpen) return null;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) return;

    const code = pincode.trim();
    if (code.startsWith('560') || code.startsWith('562')) {
      setResult({ city: 'Bengaluru', state: 'Karnataka', dispatchHours: '24-48 Hours', deliveryDays: '2 Business Days', courier: 'Blue Dart Aviation', isExpress: true });
    } else if (code.startsWith('110') || code.startsWith('122') || code.startsWith('201')) {
      setResult({ city: 'Delhi NCR (Gurgaon / Noida)', state: 'Delhi NCR', dispatchHours: '24-48 Hours', deliveryDays: '2 Business Days', courier: 'Delhivery Air Express', isExpress: true });
    } else if (code.startsWith('400') || code.startsWith('410') || code.startsWith('411')) {
      setResult({ city: 'Mumbai / Pune', state: 'Maharashtra', dispatchHours: '24-48 Hours', deliveryDays: '2-3 Business Days', courier: 'Blue Dart Aviation', isExpress: true });
    } else if (code.startsWith('500')) {
      setResult({ city: 'Hyderabad', state: 'Telangana', dispatchHours: '24-48 Hours', deliveryDays: '2 Business Days', courier: 'DTDC Prime Air', isExpress: true });
    } else if (code.startsWith('600')) {
      setResult({ city: 'Chennai', state: 'Tamil Nadu', dispatchHours: '24-48 Hours', deliveryDays: '2-3 Business Days', courier: 'Blue Dart Aviation', isExpress: true });
    } else {
      setResult({ city: 'Pan-India Destination', state: 'India', dispatchHours: '48 Hours', deliveryDays: '3-4 Business Days', courier: 'Delhivery Surface & Air', isExpress: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-xl text-gray-900">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-2">
          Check Delivery Speed
        </h2>
        <p className="text-xs text-gray-600 mt-1 mb-6">
          Enter your 6-digit delivery pincode to check dispatch turnaround and air transit time.
        </p>

        <form onSubmit={handleCheckPincode} className="flex gap-2 mb-6">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit Indian Pincode (e.g. 560001)"
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:border-gray-900"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Check
          </button>
        </form>

        {result && (
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4 mt-2">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
              <div>
                <span className="text-sm font-bold text-gray-900 block">{result.city}, {result.state}</span>
                <span className="text-xs text-emerald-600 font-medium mt-0.5 inline-block">Express Serviceable Area</span>
              </div>
              <span className="text-xs font-medium text-gray-700 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                {result.courier}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs text-gray-500 block">Dispatch:</span>
                <span className="font-bold text-gray-900 flex items-center gap-1.5 mt-1">
                  <Clock className="w-4 h-4 text-gray-700" />
                  {result.dispatchHours}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                <span className="text-xs text-gray-500 block">Transit:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1.5 mt-1">
                  <Truck className="w-4 h-4" />
                  {result.deliveryDays}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed pt-1">
              Includes insured door-to-door courier tracking, OTP verification, and tamper-proof waterproof packaging.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
