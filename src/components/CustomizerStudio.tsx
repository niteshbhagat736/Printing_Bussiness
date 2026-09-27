'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Upload, 
  Type, 
  Image as ImageIcon, 
  Layers, 
  Sliders, 
  Eye, 
  RotateCw, 
  ZoomIn, 
  Download, 
  ShoppingBag, 
  Check, 
  Trash2, 
  Info, 
  Sparkle,
  ArrowRight,
  ShieldAlert,
  Percent,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, ColorOption, CollarStyle, CustomizationMethod, PrintLocation, ArtworkLayer, CartItem } from '@/types';
import { FABRIC_COLORS, THREAD_COLORS, PRESET_ARTWORKS } from '@/data/products';
import { PoloVectorModel } from './PoloVectorModel';

interface CustomizerStudioProps {
  selectedProduct: Product;
  onAddToCart: (item: CartItem) => void;
  onOpenBulkQuote: () => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({
  selectedProduct,
  onAddToCart,
  onOpenBulkQuote,
}) => {
  // Studio States
  const [viewAngle, setViewAngle] = useState<'front' | 'back' | 'left_chest_zoom' | 'sleeve'>('front');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(selectedProduct.availableColors[0] || FABRIC_COLORS[0]);
  const [collarStyle, setCollarStyle] = useState<CollarStyle | undefined>(selectedProduct.availableCollarStyles?.[0]);
  const [customizationMethod, setCustomizationMethod] = useState<CustomizationMethod>('embroidery');
  const [activeLocation, setActiveLocation] = useState<PrintLocation>('left_chest');
  const [embroideryThreadColor, setEmbroideryThreadColor] = useState<string>(THREAD_COLORS[0].hex);
  const [embroideryDensity, setEmbroideryDensity] = useState<'standard' | 'high_relief_3d'>('high_relief_3d');

  // Artwork layers mapped by location
  const [artworks, setArtworks] = useState<Partial<Record<PrintLocation, ArtworkLayer>>>({
    left_chest: {
      type: 'preset',
      content: PRESET_ARTWORKS[0].svg,
      label: PRESET_ARTWORKS[0].name,
      color: PRESET_ARTWORKS[0].defaultColor,
      scale: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
    },
  });

  // Custom Text Editor State
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Inter, sans-serif');
  const [customTextColor, setCustomTextColor] = useState('#FFFFFF');

  // Size & Quantity Breakdown
  const [sizes, setSizes] = useState({
    S: 10,
    M: 20,
    L: 15,
    XL: 5,
    XXL: 0,
    XXXL: 0,
  });

  // Active studio tool tab
  const [activeTab, setActiveTab] = useState<'fabric' | 'method' | 'artwork' | 'text' | 'sizes'>('artwork');

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadDpiMessage, setUploadDpiMessage] = useState<string | null>(null);

  // Total Quantity calculation
  const totalQuantity = Object.values(sizes).reduce((a, b) => a + b, 0);

  // Tiered Pricing Algorithm
  const calculatePricing = () => {
    let base = selectedProduct.basePrice;
    
    // Customization Location Addons
    let customizationCost = 0;
    if (artworks.left_chest) customizationCost += customizationMethod === 'embroidery' ? 120 : 80;
    if (artworks.center_chest) customizationCost += customizationMethod === 'embroidery' ? 160 : 110;
    if (artworks.back_full) customizationCost += customizationMethod === 'embroidery' ? 220 : 160;
    if (artworks.sleeve_left) customizationCost += customizationMethod === 'embroidery' ? 90 : 60;

    let unitBeforeDiscount = base + customizationCost;

    // Volume Discount Tiers
    let discountPercent = 0;
    if (totalQuantity >= 200) discountPercent = 48;
    else if (totalQuantity >= 100) discountPercent = 42;
    else if (totalQuantity >= 50) discountPercent = 35;
    else if (totalQuantity >= 20) discountPercent = 22;
    else if (totalQuantity >= 6) discountPercent = 12;

    const unitPrice = Math.round(unitBeforeDiscount * (1 - discountPercent / 100));
    const totalPrice = unitPrice * Math.max(1, totalQuantity);
    const savings = Math.round((unitBeforeDiscount - unitPrice) * Math.max(1, totalQuantity));

    return {
      unitBeforeDiscount,
      discountPercent,
      unitPrice,
      totalPrice,
      savings,
    };
  };

  const pricing = calculatePricing();

  // Handlers for Artwork
  const handleSelectPresetArtwork = (preset: typeof PRESET_ARTWORKS[0]) => {
    setArtworks((prev) => ({
      ...prev,
      [activeLocation]: {
        type: 'preset',
        content: preset.svg,
        label: preset.name,
        color: preset.defaultColor,
        scale: 1,
        rotation: 0,
        offsetX: 0,
        offsetY: 0,
      },
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setArtworks((prev) => ({
        ...prev,
        [activeLocation]: {
          type: 'upload',
          content: dataUrl,
          label: file.name,
          color: '#FFFFFF',
          scale: 1,
          rotation: 0,
          offsetX: 0,
          offsetY: 0,
        },
      }));
      setUploadDpiMessage('✓ 300+ DPI Vector Ready: Auto-optimized for high-density embroidery & DTF printing');
      setTimeout(() => setUploadDpiMessage(null), 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomText = () => {
    if (!customText.trim()) return;
    setArtworks((prev) => ({
      ...prev,
      [activeLocation]: {
        type: 'text',
        content: customText,
        label: `Text: ${customText}`,
        color: customTextColor,
        fontFamily: selectedFont,
        fontSize: 20,
        scale: 1,
        rotation: 0,
        offsetX: 0,
        offsetY: 0,
      },
    }));
  };

  const handleRemoveArtwork = (location: PrintLocation) => {
    setArtworks((prev) => {
      const next = { ...prev };
      delete next[location];
      return next;
    });
  };

  const handleSizeChange = (sizeKey: keyof typeof sizes, value: number) => {
    setSizes((prev) => ({
      ...prev,
      [sizeKey]: Math.max(0, value),
    }));
  };

  const handleApplyPopularCorporateRatio = (targetTotal: number = 50) => {
    // 10% S, 30% M, 40% L, 15% XL, 5% XXL
    setSizes({
      S: Math.round(targetTotal * 0.1),
      M: Math.round(targetTotal * 0.3),
      L: Math.round(targetTotal * 0.4),
      XL: Math.round(targetTotal * 0.15),
      XXL: Math.round(targetTotal * 0.05),
      XXXL: 0,
    });
  };

  const handleAddToCart = () => {
    if (totalQuantity === 0) {
      alert('Please enter at least 1 quantity in the size breakdown tab.');
      setActiveTab('sizes');
      return;
    }

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#06B6D4', '#E11D48', '#EAB308'],
    });

    const item: CartItem = {
      id: `cart-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      color: selectedColor,
      collarStyle: collarStyle,
      customizationMethod: customizationMethod,
      artworks: artworks,
      quantityBreakdown: sizes,
      totalQuantity: totalQuantity,
      unitPrice: pricing.unitPrice,
      totalPrice: pricing.totalPrice,
      addedAt: new Date().toISOString(),
    };

    onAddToCart(item);
  };

  const handleDownloadProof = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    alert('🎉 High-Resolution Virtual Digital Proof generated and downloaded! Perfect for corporate approvals.');
  };

  const activeArtwork = artworks[activeLocation];

  return (
    <section id="customizer-studio" className="py-12 bg-gray-50 text-gray-900 relative">
      {/* Studio Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Design Your {selectedProduct.name}
            </h2>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadProof}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Proof</span>
            </button>
            <button
              onClick={onOpenBulkQuote}
              className="px-4 py-2.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas & Right Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT CANVAS & MODEL PREVIEW (7 cols) ================= */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* View Angle Switcher Tabs */}
            <div className="w-full flex items-center gap-2 mb-6">
              <button
                onClick={() => setViewAngle('front')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  viewAngle === 'front'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setViewAngle('back')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  viewAngle === 'back'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Back View
              </button>
            </div>

            {/* VECTOR MODEL CANVAS CONTAINER */}
            <div className="relative w-full rounded-[2rem] p-6 sm:p-10 bg-white border border-gray-100 shadow-sm flex items-center justify-center min-h-[500px] overflow-hidden">

              {/* MODEL ITSELF */}
              {selectedProduct.category === 'polo' || selectedProduct.category === 'tshirt' ? (
                <PoloVectorModel
                  viewAngle={viewAngle}
                  color={selectedColor}
                  collarStyle={collarStyle}
                  customizationMethod={customizationMethod}
                  artworks={artworks}
                  activeLocation={activeLocation}
                  onSelectLocation={(loc) => {
                    setActiveLocation(loc);
                    if (loc === 'back_full' && viewAngle === 'front') setViewAngle('back');
                    if (loc !== 'back_full' && viewAngle === 'back') setViewAngle('front');
                  }}
                  embroideryThreadColor={embroideryThreadColor}
                  className="transition-all duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center z-10">
                  <span className="text-8xl md:text-9xl mb-6 drop-shadow-2xl">
                    {selectedProduct.category === 'drinkware' ? '🍶' : selectedProduct.category === 'bag' ? '👜' : selectedProduct.category === 'stationery' ? '📓' : '🎁'}
                  </span>
                  <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-gray-200 shadow-xl max-w-sm">
                    <h3 className="text-xl font-black text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{selectedProduct.tagline}</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 text-indigo-500 text-xs font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>3D Preview Available for Apparel Only</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Clickable Placements Guide Overlay */}
              <div className="absolute bottom-6 left-6 text-sm text-gray-500 bg-white/80 px-4 py-2 rounded-full border border-gray-100">
                Click dotted zones on the item to place logos
              </div>
            </div>

            {/* Customization Location Placement Selector Buttons */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { id: 'left_chest', label: 'Left Chest', angle: 'front' },
                { id: 'center_chest', label: 'Center Front', angle: 'front' },
                { id: 'back_full', label: 'Upper Back', angle: 'back' },
                { id: 'sleeve_left', label: 'Left Sleeve', angle: 'front' },
              ].map((loc) => {
                const isActive = activeLocation === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setActiveLocation(loc.id as PrintLocation);
                      setViewAngle(loc.angle as any);
                    }}
                    className={`px-4 py-3 rounded-2xl border text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{loc.label}</span>
                  </button>
                );
              })}
            </div>

          </div>


          {/* ================= RIGHT CONTROLS & STUDIO PANEL (5 cols) ================= */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm space-y-8">
            
            {/* CONTROL NAVIGATION TABS */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4 overflow-x-auto scrollbar-none">
              {[
                { id: 'artwork', label: 'Artwork' },
                { id: 'text', label: 'Text' },
                { id: 'fabric', label: 'Product' },
                { id: 'method', label: 'Print' },
                { id: 'sizes', label: 'Sizes' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-sm font-medium pb-2 -mb-[18px] border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>


            {/* ================= TAB 1: LOGO & ARTWORK ================= */}
            {activeTab === 'artwork' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center justify-between">
                    <span>Upload Custom Brand Logo</span>
                    <span className="text-[11px] text-emerald-400 font-normal">Auto 300-DPI Vectorize</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Supports PNG, SVG, AI, JPG files (Transparent backgrounds recommended)
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 border-2 border-dashed border-gray-300 hover:border-indigo-500 rounded-2xl p-4 text-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-all group"
                  >
                    <Upload className="w-6 h-6 text-indigo-400 mx-auto group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold text-gray-800 block">
                      Click to Browse File or Drag & Drop
                    </span>
                    <span className="text-[10px] text-gray-600">
                      Target Placement: <strong className="text-indigo-300">{activeLocation.replace('_', ' ')}</strong>
                    </span>
                  </div>

                  {uploadDpiMessage && (
                    <div className="mt-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl">
                      {uploadDpiMessage}
                    </div>
                  )}
                </div>

                {/* Curated Preset Artwork Library */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Or Select Instant Preset Logo
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_ARTWORKS.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => handleSelectPresetArtwork(art)}
                        className="p-3 rounded-xl bg-gray-50/80 hover:bg-indigo-950/40 border border-gray-200 hover:border-indigo-500/50 flex flex-col items-center gap-2 text-center transition-all cursor-pointer group"
                      >
                        <div
                          className="w-8 h-8 group-hover:scale-110 transition-transform"
                          style={{ color: art.defaultColor }}
                          dangerouslySetInnerHTML={{ __html: art.svg }}
                        />
                        <span className="text-[10px] font-semibold text-gray-700 line-clamp-1">
                          {art.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale & Position Fine-Tuning */}
                {activeArtwork && (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">
                        Adjust Artwork on {activeLocation.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleRemoveArtwork(activeLocation)}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    {/* Scale Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Size Scale</span>
                        <span className="text-indigo-400 font-bold">{Math.round((activeArtwork.scale || 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="1.8"
                        step="0.05"
                        value={activeArtwork.scale || 1}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setArtworks((prev) => ({
                            ...prev,
                            [activeLocation]: { ...prev[activeLocation]!, scale: val },
                          }));
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    {/* Rotation Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Rotation</span>
                        <span className="text-indigo-400 font-bold">{activeArtwork.rotation || 0}°</span>
                      </div>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        step="1"
                        value={activeArtwork.rotation || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setArtworks((prev) => ({
                            ...prev,
                            [activeLocation]: { ...prev[activeLocation]!, rotation: val },
                          }));
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* ================= TAB 2: ADD CUSTOM TEXT ================= */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Enter Text (Team Name, Staff Title, Monogram)
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g. OPERATIONS LEAD / CREW 2026"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Typography Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    Select Typography Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Modern Sans', font: 'Inter, sans-serif' },
                      { name: 'Athletic Block', font: 'Impact, sans-serif' },
                      { name: 'Tech Monospace', font: 'monospace' },
                      { name: 'Luxury Serif', font: 'Georgia, serif' },
                    ].map((f) => (
                      <button
                        key={f.font}
                        onClick={() => setSelectedFont(f.font)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedFont === f.font
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-indigo-600'
                        }`}
                        style={{ fontFamily: f.font }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color Swatches */}
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    Thread / Ink Color
                  </label>
                  <div className="flex items-center gap-2">
                    {['#FFFFFF', '#EAB308', '#38BDF8', '#E11D48', '#4ADE80', '#000000'].map((hex) => (
                      <button
                        key={hex}
                        onClick={() => setCustomTextColor(hex)}
                        className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                          customTextColor === hex ? 'ring-2 ring-indigo-500 scale-110 border-white' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleApplyCustomText}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Type className="w-4 h-4" />
                  <span>Apply Text to {activeLocation.replace('_', ' ')}</span>
                </button>
              </div>
            )}


            {/* ================= TAB 3: FABRIC COLOR & COLLAR ================= */}
            {activeTab === 'fabric' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">
                      Fabric Shade: <strong className="text-gray-900">{selectedColor.name}</strong>
                    </span>
                    <span className="text-[11px] text-indigo-400 font-semibold">12 Available</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {FABRIC_COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          selectedColor.id === color.id
                            ? 'bg-gray-100 border-indigo-500 ring-2 ring-indigo-500/30'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[9px] font-medium text-gray-700 truncate w-full text-center">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collar Style Selector */}
                {selectedProduct.availableCollarStyles && selectedProduct.availableCollarStyles.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    Collar & Placket Architecture
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'classic_ribbed', name: 'Classic Ribbed Collar', desc: 'Solid single-tone matching body' },
                      { id: 'contrast_tipped', name: 'Dual-Tone Contrast Tipping', desc: 'Sporty stripe on collar & cuffs' },
                      { id: 'mandarin_nehru', name: 'Mandarin / Nehru Band', desc: 'Modern minimal stand collar' },
                      { id: 'metal_zip', name: 'Premium Metal Zip Collar', desc: 'Sleek brass zipper closure' },
                    ].filter(c => selectedProduct.availableCollarStyles?.includes(c.id as CollarStyle)).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCollarStyle(c.id as CollarStyle)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          collarStyle === c.id
                            ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-indigo-600'
                        }`}
                      >
                        <div className="text-xs font-bold text-gray-900">{c.name}</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">{c.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                )}
              </div>
            )}


            {/* ================= TAB 4: PRINT / EMBROIDERY METHOD ================= */}
            {activeTab === 'method' && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-gray-700 block">
                  Select Customization Technology
                </span>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      id: 'embroidery',
                      title: 'Embroidery',
                      desc: 'Classic stitched design, highly durable.',
                      tag: '+₹120',
                    },
                    {
                      id: 'dtf_print',
                      title: 'Digital Print (DTF)',
                      desc: 'Full color printing for detailed graphics.',
                      tag: '+₹80',
                    },
                    {
                      id: 'screen_print',
                      title: 'Screen Print',
                      desc: 'Cost-effective for large bulk orders.',
                      tag: '+₹60',
                    },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setCustomizationMethod(m.id as CustomizationMethod)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        customizationMethod === m.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{m.title}</span>
                        <span className="text-xs font-medium text-gray-500">
                          {m.tag}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {m.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Embroidery Thread Palette (When Embroidery selected) */}
                {customizationMethod === 'embroidery' && (
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <span className="text-xs font-bold text-gray-700 block">
                      Tajima High-Sheen Thread Color
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {THREAD_COLORS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setEmbroideryThreadColor(t.hex)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                            embroideryThreadColor === t.hex
                              ? 'bg-indigo-600/30 border-indigo-400 text-white'
                              : 'bg-white border-gray-200 text-gray-600 hover:text-indigo-600'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: t.hex }}
                          />
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* ================= TAB 5: SIZES & BULK MATRIX ================= */}
            {activeTab === 'sizes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Enter Quantity Breakdown by Size
                    </span>
                    <span className="text-[10px] text-gray-600">
                      Standard Men & Unisex Indian Size Specs (Inches)
                    </span>
                  </div>
                  <button
                    onClick={() => handleApplyPopularCorporateRatio(50)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto-Fill 50-Pack
                  </button>
                </div>

                {/* Size Matrix Inputs Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(['S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const).map((sz) => (
                    <div key={sz} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                      <span className="text-xs font-black text-gray-700 block">{sz}</span>
                      <input
                        type="number"
                        min="0"
                        value={sizes[sz]}
                        onChange={(e) => handleSizeChange(sz, parseInt(e.target.value) || 0)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1 text-center text-sm font-bold text-gray-900 focus:outline-none focus:border-indigo-500 mt-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Volume Tier Bar */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">Total Quantity:</span>
                    <span className="text-base font-black text-gray-900">{totalQuantity} Units</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400">Active Bulk Discount:</span>
                    <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                      {pricing.discountPercent}% OFF
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalQuantity / 100) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-600 text-right">
                    Add {Math.max(0, 50 - totalQuantity)} more units to unlock 35% discount tier!
                  </p>
                </div>
              </div>
            )}


            {/* ================= BOTTOM PRICING & CHECKOUT BAR ================= */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-gray-600 font-medium">Unit Price (Bulk Tier)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">₹{pricing.unitPrice}</span>
                    <span className="text-xs text-gray-500 line-through">₹{pricing.unitBeforeDiscount}</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {pricing.discountPercent}% SAVED
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-gray-600 font-medium">Total Order ({totalQuantity} pcs)</span>
                  <div className="text-2xl font-black text-indigo-300">
                    ₹{pricing.totalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Add to Bag CTA Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-gray-900 font-black text-sm tracking-wide shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>Add {totalQuantity} Custom Polos to Bag (₹{pricing.totalPrice.toLocaleString('en-IN')})</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
