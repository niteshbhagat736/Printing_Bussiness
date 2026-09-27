'use client';

import React from 'react';
import { ColorOption, CollarStyle, CustomizationMethod, PrintLocation, ArtworkLayer } from '@/types';

interface PoloVectorModelProps {
  viewAngle: 'front' | 'back' | 'left_chest_zoom' | 'sleeve';
  color: ColorOption;
  collarStyle?: CollarStyle;
  customizationMethod: CustomizationMethod;
  artworks: Partial<Record<PrintLocation, ArtworkLayer>>;
  activeLocation: PrintLocation;
  onSelectLocation?: (loc: PrintLocation) => void;
  embroideryThreadColor?: string;
  isInteractive?: boolean;
  className?: string;
}

export const PoloVectorModel: React.FC<PoloVectorModelProps> = ({
  viewAngle,
  color,
  collarStyle,
  customizationMethod,
  artworks,
  activeLocation,
  onSelectLocation,
  embroideryThreadColor = '#EAB308',
  isInteractive = true,
  className = '',
}) => {
  const isDark = color.isDark;
  const mainHex = color.hex;
  const secondaryHex = color.secondaryHex || (isDark ? '#38BDF8' : '#0F172A');

  // Helper to render artwork layer
  const renderArtwork = (location: PrintLocation, customStyles: React.CSSProperties = {}) => {
    const art = artworks[location];
    if (!art || !art.content) return null;

    const isEmbroidery = customizationMethod === 'embroidery';
    const activeColor = isEmbroidery ? embroideryThreadColor : art.color;

    return (
      <div
        style={{
          transform: `translate(${art.offsetX}px, ${art.offsetY}px) scale(${art.scale}) rotate(${art.rotation}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease, filter 0.2s ease',
          ...customStyles,
        }}
        className={`relative select-none pointer-events-none ${
          isEmbroidery ? 'embroidery-effect' : 'dtf-effect'
        }`}
      >
        {art.type === 'preset' && (
          <div
            className="w-full h-full flex items-center justify-center drop-shadow-md"
            style={{ color: activeColor }}
            dangerouslySetInnerHTML={{ __html: art.content }}
          />
        )}

        {art.type === 'upload' && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={art.content}
            alt="Custom uploaded logo"
            className="w-full h-full object-contain filter drop-shadow-md"
            style={isEmbroidery ? { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) contrast(1.1)' } : {}}
          />
        )}

        {art.type === 'text' && (
          <div
            style={{
              color: activeColor,
              fontFamily: art.fontFamily || 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: `${art.fontSize || 18}px`,
              textShadow: isEmbroidery
                ? '0 1px 1px rgba(255,255,255,0.4), 0 -1px 1px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.4)'
                : '0 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
            className="text-center font-bold tracking-wider"
          >
            {art.content}
          </div>
        )}

        {/* Realistic Embroidery Thread Highlight Simulation */}
        {isEmbroidery && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none rounded mix-blend-overlay" />
        )}
      </div>
    );
  };

  // 1. FRONT VIEW
  if (viewAngle === 'front') {
    return (
      <div className={`relative w-full max-w-[520px] aspect-[1/1.05] mx-auto flex items-center justify-center select-none ${className}`}>
        {/* Ambient Glow / Floor Reflection */}
        <div
          className="absolute -bottom-6 w-3/4 h-12 blur-2xl rounded-full opacity-40 transition-colors duration-500"
          style={{ backgroundColor: mainHex }}
        />

        <svg
          viewBox="0 0 600 620"
          className="w-full h-full drop-shadow-2xl transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pique fabric texture simulation */}
            <pattern id="piqueWeave" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="none" />
              <circle cx="2" cy="2" r="0.8" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} />
            </pattern>

            {/* Realistic Fabric Lighting Gradients */}
            <linearGradient id="bodyShade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.32)" />
            </linearGradient>

            <linearGradient id="sleeveLeftGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
            </linearGradient>

            <linearGradient id="sleeveRightGrad" x1="100%" y1="0%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
            </linearGradient>

            <linearGradient id="collarInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
          </defs>

          {/* INNER BACK NECK & BRAND LABEL */}
          <path
            d="M235,95 Q300,128 365,95 Q300,72 235,95 Z"
            fill={mainHex}
            filter="brightness(0.7)"
          />
          <path
            d="M235,95 Q300,128 365,95 Q300,72 235,95 Z"
            fill="url(#collarInnerGrad)"
          />

          {/* Inner Brand Tape */}
          <path
            d="M255,102 Q300,120 345,102"
            stroke={secondaryHex}
            strokeWidth="3.5"
            fill="none"
            opacity="0.85"
          />
          <text
            x="300"
            y="94"
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="7"
            fontFamily="Inter, sans-serif"
            fontWeight="bold"
            letterSpacing="2"
          >
            THREADVIBE • L • BIO-WASH 240GSM
          </text>

          {/* SLEEVE LEFT (Viewer Right) */}
          <g>
            <path
              d="M440,115 L555,225 C555,225 530,285 495,295 L425,210 Z"
              fill={mainHex}
            />
            <path
              d="M440,115 L555,225 C555,225 530,285 495,295 L425,210 Z"
              fill="url(#sleeveRightGrad)"
            />
            <path
              d="M440,115 L555,225 C555,225 530,285 495,295 L425,210 Z"
              fill="url(#piqueWeave)"
            />
            {/* Right Cuff Rib */}
            <path
              d="M555,225 L495,295 L483,285 L543,215 Z"
              fill={mainHex}
              filter="brightness(0.9)"
            />
            {collarStyle === 'contrast_tipped' && (
              <path
                d="M551,222 L491,292"
                stroke={secondaryHex}
                strokeWidth="4"
                fill="none"
              />
            )}
          </g>

          {/* SLEEVE RIGHT (Viewer Left) */}
          <g>
            <path
              d="M160,115 L45,225 C45,225 70,285 105,295 L175,210 Z"
              fill={mainHex}
            />
            <path
              d="M160,115 L45,225 C45,225 70,285 105,295 L175,210 Z"
              fill="url(#sleeveLeftGrad)"
            />
            <path
              d="M160,115 L45,225 C45,225 70,285 105,295 L175,210 Z"
              fill="url(#piqueWeave)"
            />
            {/* Left Cuff Rib */}
            <path
              d="M45,225 L105,295 L117,285 L57,215 Z"
              fill={mainHex}
              filter="brightness(0.9)"
            />
            {collarStyle === 'contrast_tipped' && (
              <path
                d="M49,222 L109,292"
                stroke={secondaryHex}
                strokeWidth="4"
                fill="none"
              />
            )}
          </g>

          {/* MAIN TORSO BODY */}
          <g>
            <path
              d="M175,108 L235,95 Q300,115 365,95 L425,108 L440,210 C425,320 435,470 445,565 C445,565 300,580 155,565 C165,470 175,320 160,210 Z"
              fill={mainHex}
            />
            <path
              d="M175,108 L235,95 Q300,115 365,95 L425,108 L440,210 C425,320 435,470 445,565 C445,565 300,580 155,565 C165,470 175,320 160,210 Z"
              fill="url(#bodyShade)"
            />
            <path
              d="M175,108 L235,95 Q300,115 365,95 L425,108 L440,210 C425,320 435,470 445,565 C445,565 300,580 155,565 C165,470 175,320 160,210 Z"
              fill="url(#piqueWeave)"
            />

            {/* Side Slits & Hem Detail */}
            <path
              d="M155,565 Q300,580 445,565"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M157,552 Q300,567 443,552"
              stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
              strokeWidth="1.5"
              strokeDasharray="4,2"
              fill="none"
            />

            {/* Side vents reinforcement */}
            <polygon points="155,565 158,540 163,540 160,565" fill={secondaryHex} opacity="0.8" />
            <polygon points="445,565 442,540 437,540 440,565" fill={secondaryHex} opacity="0.8" />

            {/* Subtle Torso Contours / Creases */}
            <path
              d="M195,220 Q225,320 205,480"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="4"
              fill="none"
              filter="blur(2px)"
            />
            <path
              d="M405,220 Q375,320 395,480"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="4"
              fill="none"
              filter="blur(2px)"
            />
          </g>

          {/* PLACKET / BUTTON BOX */}
          {collarStyle !== 'mandarin_nehru' && collarStyle !== 'metal_zip' && (
            <g>
              <path
                d="M282,105 L318,105 L318,255 L282,255 Z"
                fill={mainHex}
                filter="brightness(0.95)"
              />
              <path
                d="M282,105 L318,105 L318,255 L282,255 Z"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Placket box X-stitch at bottom */}
              <rect x="282" y="235" width="36" height="20" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              <line x1="282" y1="235" x2="318" y2="255" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              <line x1="318" y1="235" x2="282" y2="255" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

              {/* 3 Pearlized Buttons */}
              {[140, 180, 220].map((y, idx) => (
                <g key={idx}>
                  <circle cx="300" cy={y} r="6.5" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
                  <circle cx="300" cy={y} r="5" fill="#E2E8F0" />
                  <circle cx="298" cy={y - 1.5} r="1" fill="#475569" />
                  <circle cx="302" cy={y - 1.5} r="1" fill="#475569" />
                  <circle cx="298" cy={y + 1.5} r="1" fill="#475569" />
                  <circle cx="302" cy={y + 1.5} r="1" fill="#475569" />
                  <line x1="298" y1={y - 1.5} x2="302" y2={y + 1.5} stroke="#334155" strokeWidth="0.8" />
                  <line x1="302" y1={y - 1.5} x2="298" y2={y + 1.5} stroke="#334155" strokeWidth="0.8" />
                </g>
              ))}
            </g>
          )}

          {/* METAL ZIP OPTION */}
          {collarStyle === 'metal_zip' && (
            <g>
              <rect x="296" y="105" width="8" height="150" fill="#334155" rx="2" />
              <line x1="300" y1="105" x2="300" y2="250" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="3,2" />
              {/* Metallic Puller */}
              <rect x="294" y="170" width="12" height="24" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
              <circle cx="300" cy="184" r="3" fill="#334155" />
            </g>
          )}

          {/* MANDARIN / NEHRU STAND COLLAR */}
          {collarStyle === 'mandarin_nehru' && (
            <g>
              {/* Stand collar band */}
              <path
                d="M235,90 Q300,118 365,90 L365,65 Q300,90 235,65 Z"
                fill={mainHex}
                filter="brightness(1.08)"
              />
              <path
                d="M235,90 Q300,118 365,90 L365,65 Q300,90 235,65 Z"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Minimal Placket */}
              <path d="M288,95 L312,95 L312,210 L288,210 Z" fill={mainHex} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              <circle cx="300" cy="130" r="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
              <circle cx="300" cy="175" r="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
            </g>
          )}

          {/* CLASSIC OR CONTRAST TIPPED COLLAR WINGS */}
          {collarStyle !== 'mandarin_nehru' && (
            <g id="collar-wings">
              {/* Left Collar Wing (Viewer Left) */}
              <path
                d="M235,95 L282,105 L260,165 L200,105 Z"
                fill={mainHex}
                filter="brightness(1.05) drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
              />
              <path
                d="M235,95 L282,105 L260,165 L200,105 Z"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1"
                fill="none"
              />
              {collarStyle === 'contrast_tipped' && (
                <path
                  d="M202,106 L258,162 L280,107"
                  stroke={secondaryHex}
                  strokeWidth="3.5"
                  fill="none"
                />
              )}

              {/* Right Collar Wing (Viewer Right) */}
              <path
                d="M365,95 L318,105 L340,165 L400,105 Z"
                fill={mainHex}
                filter="brightness(1.05) drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
              />
              <path
                d="M365,95 L318,105 L340,165 L400,105 Z"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1"
                fill="none"
              />
              {collarStyle === 'contrast_tipped' && (
                <path
                  d="M398,106 L342,162 L320,107"
                  stroke={secondaryHex}
                  strokeWidth="3.5"
                  fill="none"
                />
              )}
            </g>
          )}
        </svg>

        {/* INTERACTIVE CUSTOMIZATION ZONES OVERLAYS */}

        {/* 1. LEFT CHEST ZONE */}
        <div
          onClick={() => isInteractive && onSelectLocation && onSelectLocation('left_chest')}
          className={`absolute cursor-pointer transition-all duration-300 rounded-xl flex items-center justify-center ${
            activeLocation === 'left_chest'
              ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 bg-indigo-500/15'
              : 'hover:bg-white/10'
          }`}
          style={{
            top: '28%',
            left: '30%',
            width: '20%',
            height: '18%',
          }}
          title="Left Chest Customization Zone"
        >
          {artworks.left_chest ? (
            <div className="w-full h-full p-2 flex items-center justify-center">
              {renderArtwork('left_chest')}
            </div>
          ) : (
            <div className="text-center opacity-70 group-hover:opacity-100 scale-90">
              <div className="border border-dashed border-indigo-400/80 rounded-lg px-2 py-1 text-[11px] font-semibold text-indigo-300 bg-gray-50/40 backdrop-blur-xs flex items-center gap-1">
                <span>🎯</span>
                <span>Left Chest</span>
              </div>
            </div>
          )}
        </div>

        {/* 2. CENTER CHEST ZONE */}
        <div
          onClick={() => isInteractive && onSelectLocation && onSelectLocation('center_chest')}
          className={`absolute cursor-pointer transition-all duration-300 rounded-xl flex items-center justify-center ${
            activeLocation === 'center_chest'
              ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 bg-indigo-500/15'
              : 'hover:bg-white/10'
          }`}
          style={{
            top: '46%',
            left: '32%',
            width: '36%',
            height: '24%',
          }}
          title="Center Front Chest Print Zone"
        >
          {artworks.center_chest ? (
            <div className="w-full h-full p-2 flex items-center justify-center">
              {renderArtwork('center_chest')}
            </div>
          ) : (
            <div className="text-center opacity-60 hover:opacity-100">
              <div className="border border-dashed border-cyan-400/80 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-gray-50/40 backdrop-blur-xs">
                Center Graphic Zone
              </div>
            </div>
          )}
        </div>

        {/* 3. SLEEVE ZONE (Left sleeve) */}
        <div
          onClick={() => isInteractive && onSelectLocation && onSelectLocation('sleeve_left')}
          className={`absolute cursor-pointer transition-all duration-300 rounded-lg flex items-center justify-center ${
            activeLocation === 'sleeve_left'
              ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 bg-indigo-500/20'
              : 'hover:bg-white/10'
          }`}
          style={{
            top: '32%',
            left: '11%',
            width: '14%',
            height: '14%',
          }}
          title="Sleeve Badge Zone"
        >
          {artworks.sleeve_left ? (
            <div className="w-full h-full p-1 flex items-center justify-center">
              {renderArtwork('sleeve_left')}
            </div>
          ) : (
            <div className="border border-dashed border-emerald-400/80 rounded px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300 bg-gray-50/40 backdrop-blur-xs">
              Sleeve
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. BACK VIEW
  if (viewAngle === 'back') {
    return (
      <div className={`relative w-full max-w-[520px] aspect-[1/1.05] mx-auto flex items-center justify-center select-none ${className}`}>
        <div
          className="absolute -bottom-6 w-3/4 h-12 blur-2xl rounded-full opacity-40 transition-colors duration-500"
          style={{ backgroundColor: mainHex }}
        />

        <svg
          viewBox="0 0 600 620"
          className="w-full h-full drop-shadow-2xl transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="piqueWeaveBack" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="none" />
              <circle cx="2" cy="2" r="0.8" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} />
            </pattern>
            <linearGradient id="bodyShadeBack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </linearGradient>
          </defs>

          {/* SLEEVES BACK */}
          <path d="M440,115 L555,225 C555,225 530,285 495,295 L425,210 Z" fill={mainHex} filter="brightness(0.95)" />
          <path d="M160,115 L45,225 C45,225 70,285 105,295 L175,210 Z" fill={mainHex} filter="brightness(0.95)" />

          {/* MAIN BACK TORSO */}
          <path
            d="M175,108 L235,90 Q300,85 365,90 L425,108 L440,210 C425,320 435,470 445,565 C445,565 300,580 155,565 C165,470 175,320 160,210 Z"
            fill={mainHex}
          />
          <path
            d="M175,108 L235,90 Q300,85 365,90 L425,108 L440,210 C425,320 435,470 445,565 C445,565 300,580 155,565 C165,470 175,320 160,210 Z"
            fill="url(#bodyShadeBack)"
          />
          <path
            d="M175,108 L235,90 Q300,85 365,90 L425,108 L440,210 C425,320 435,470 445,565 C445,565 300,580 155,565 C165,470 175,320 160,210 Z"
            fill="url(#piqueWeaveBack)"
          />

          {/* Back Yoke Seam (Premium Detail) */}
          <path
            d="M175,150 Q300,165 425,150"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M175,153 Q300,168 425,153"
            stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
            strokeWidth="1"
            strokeDasharray="4,2"
            fill="none"
          />

          {/* BACK COLLAR ROLL */}
          <path
            d="M235,90 Q300,75 365,90 L365,115 Q300,105 235,115 Z"
            fill={mainHex}
            filter="brightness(1.1) drop-shadow(0 3px 4px rgba(0,0,0,0.3))"
          />
          {collarStyle === 'contrast_tipped' && (
            <path
              d="M237,88 Q300,73 363,88"
              stroke={secondaryHex}
              strokeWidth="4"
              fill="none"
            />
          )}
        </svg>

        {/* BACK BIG PRINT ZONE OVERLAY */}
        <div
          onClick={() => isInteractive && onSelectLocation && onSelectLocation('back_full')}
          className={`absolute cursor-pointer transition-all duration-300 rounded-2xl flex items-center justify-center ${
            activeLocation === 'back_full'
              ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 bg-indigo-500/15'
              : 'hover:bg-white/10'
          }`}
          style={{
            top: '32%',
            left: '26%',
            width: '48%',
            height: '42%',
          }}
          title="Large Back Print Zone"
        >
          {artworks.back_full ? (
            <div className="w-full h-full p-4 flex items-center justify-center">
              {renderArtwork('back_full')}
            </div>
          ) : (
            <div className="text-center opacity-70 hover:opacity-100">
              <div className="border border-dashed border-amber-400/80 rounded-xl px-4 py-2 text-xs font-semibold text-amber-300 bg-gray-50/50 backdrop-blur-xs flex flex-col items-center gap-1">
                <span>👑</span>
                <span>Large Back Logo / Numbering</span>
                <span className="text-[10px] text-amber-200/70 font-normal">Max Area: 10&quot; × 12&quot;</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. LEFT CHEST MACRO ZOOM VIEW (Emphasizes Embroidery Stitching & Pique Texture)
  return (
    <div className={`relative w-full max-w-[500px] aspect-square mx-auto rounded-3xl overflow-hidden border border-gray-300/60 shadow-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center select-none ${className}`}>
      {/* Fabric Macro Background */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: mainHex }}
      />
      {/* Dense Honeycomb Weave Overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#FFFFFF' : '#000000'} 1.2px, transparent 1.2px)`,
          backgroundSize: '8px 8px',
        }}
      />
      {/* Lighting vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Collar & Placket Border Snippet */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-8 border-black/30 pointer-events-none" />

      <div className="relative z-10 w-4/5 h-4/5 border-2 border-dashed border-indigo-400/40 rounded-2xl flex flex-col items-center justify-center p-6 bg-white/20 backdrop-blur-xs">
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            {customizationMethod === 'embroidery' ? '3D Embroidery Simulation (Macro Zoom)' : 'HD DTF Digital Print (Macro Zoom)'}
          </span>
        </div>

        <div className="w-full h-full flex items-center justify-center scale-125">
          {artworks[activeLocation] ? (
            renderArtwork(activeLocation)
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">No artwork placed on {activeLocation.replace('_', ' ')} yet</p>
              <p className="text-xs text-gray-600 mt-1">Select an artwork or type text in the right studio panel</p>
            </div>
          )}
        </div>

        {customizationMethod === 'embroidery' && (
          <div className="absolute bottom-3 right-4 flex items-center gap-2 bg-white/80 px-2.5 py-1 rounded-full border border-amber-500/30">
            <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: embroideryThreadColor }} />
            <span className="text-[11px] font-semibold text-amber-300">Thread: {embroideryThreadColor}</span>
          </div>
        )}
      </div>
    </div>
  );
};
