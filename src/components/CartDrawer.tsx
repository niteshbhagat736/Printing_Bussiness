'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Truck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '@/types';
import { PoloVectorModel } from './PoloVectorModel';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenBulkQuote: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onOpenBulkQuote,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalUnits = items.reduce((acc, item) => acc + item.totalQuantity, 0);

  // Coupon discount
  const couponDiscountAmount = appliedCoupon
    ? Math.round(subtotal * (appliedCoupon.discountPercent / 100))
    : 0;

  const shippingCost = subtotal > 1500 ? 0 : 120;
  const gstTax = Math.round((subtotal - couponDiscountAmount) * 0.05);
  const grandTotal = Math.max(0, subtotal - couponDiscountAmount + shippingCost + gstTax);

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'CORP40' || code === 'SAVE40') {
      setAppliedCoupon({ code, discountPercent: 40 });
      confetti({ particleCount: 40, spread: 60 });
    } else if (code === 'VIBEFIRST' || code === 'FIRST10') {
      setAppliedCoupon({ code, discountPercent: 15 });
      confetti({ particleCount: 30, spread: 50 });
    } else {
      setCouponError('Invalid promo code. Try "CORP40" or "VIBEFIRST"');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-white/75 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-100 text-gray-900 flex flex-col shadow-xl">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-black tracking-tight text-gray-900">
                Custom Merch Bag ({totalUnits} pcs)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 text-xs">
            {subtotal >= 1500 ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Truck className="w-4 h-4" />
                <span>🎉 You have unlocked Free Express Doorstep Shipping!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-1">
                  <span>Add ₹{1500 - subtotal} more for Free Shipping</span>
                  <span>₹{subtotal} / ₹1500</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-gray-900 h-full transition-all"
                    style={{ width: `${(subtotal / 1500) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-black">
                  ✓
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-gray-700 max-w-xs mx-auto">
                  Order ID: <strong className="text-indigo-400">#VP-IND-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our production team has received your vector graphics and digitizing for embroidery is in progress.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-gray-200 text-left text-xs space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Dispatch:</span>
                    <span className="text-emerald-400 font-bold">Within 48 Hours</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST Invoice:</span>
                    <span className="text-gray-900">Sent to registered email</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-5xl opacity-40">👕</div>
                <h3 className="text-base font-bold text-gray-700">Your Bag is Empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Use our live studio customizer to design custom apparel, drinkware, or corporate swag boxes for your team.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-gray-100 p-4 space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Item Vector Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 p-1 flex items-center justify-center shrink-0">
                      <PoloVectorModel
                        viewAngle="front"
                        color={item.color}
                        collarStyle={item.collarStyle}
                        customizationMethod={item.customizationMethod}
                        artworks={item.artworks}
                        activeLocation="left_chest"
                        isInteractive={false}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        {item.productName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-gray-600 mt-1">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <span>{item.color.name}</span>
                        <span>•</span>
                        <span className="capitalize text-indigo-400 font-semibold">{item.customizationMethod.replace('_', ' ')}</span>
                      </div>

                      {/* Size Quantities */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {Object.entries(item.quantityBreakdown).map(([size, count]) => {
                          if (count <= 0) return null;
                          return (
                            <span
                              key={size}
                              className="text-[10px] font-bold bg-gray-50 px-2 py-0.5 rounded border border-gray-200 text-gray-700"
                            >
                              {size}: {count}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      {item.totalQuantity} pcs × ₹{item.unitPrice}
                    </span>
                    <span className="text-sm font-black text-gray-900">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Actions */}
          {!orderSuccess && items.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              
              {/* Coupon Code Input */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Try coupon CORP40"
                      className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs text-gray-900 uppercase focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-900 border border-gray-300 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 font-bold mt-1">
                    ✓ Coupon &quot;{appliedCoupon.code}&quot; applied! {appliedCoupon.discountPercent}% OFF.
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({totalUnits} Custom Items):</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Promo Coupon Discount:</span>
                    <span>-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5% Apparel Tax):</span>
                  <span>₹{gstTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Insured Shipping:</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Grand Total:</span>
                  <span className="text-indigo-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Checkout (₹{grandTotal.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
