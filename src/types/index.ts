export type PrintLocation = 'left_chest' | 'center_chest' | 'back_full' | 'sleeve_left';

export type CustomizationMethod = 'embroidery' | 'dtf_print' | 'screen_print';

export type CollarStyle = 'classic_ribbed' | 'contrast_tipped' | 'mandarin_nehru' | 'metal_zip';

export type FabricGSM = '180 GSM (Ultra Light)' | '210 GSM (All Season)' | '240 GSM (Heavy Pique)' | '280 GSM (Industrial Pro)';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string; // For contrast tipping / dual-tone
  isDark: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  basePrice: number; // For 1 pc
  bulkPrice50: number; // For 50+ pcs
  bulkPrice100: number; // For 100+ pcs
  gsm?: string;
  fabric?: string;
  fit?: string;
  moq: number;
  availableColors: ColorOption[];
  availableCollarStyles?: CollarStyle[];
  supportedMethods: CustomizationMethod[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  popularFor: string;
  leadTime: string;
  features: string[];
}

export interface ArtworkLayer {
  type: 'preset' | 'upload' | 'text';
  content: string; // SVG path / image data URL / text string
  label?: string;
  color: string;
  fontFamily?: string;
  fontSize?: number;
  scale: number; // 0.5 to 2
  rotation: number; // -180 to 180
  offsetX: number; // -50 to 50
  offsetY: number; // -50 to 50
  isCurved?: boolean;
  curveRadius?: number;
}

export interface CustomizerState {
  selectedProduct: Product;
  viewAngle: 'front' | 'back' | 'left_chest_zoom' | 'sleeve';
  selectedColor: ColorOption;
  collarStyle?: CollarStyle;
  customizationMethod: CustomizationMethod;
  activeLocation: PrintLocation;
  artworks: Partial<Record<PrintLocation, ArtworkLayer>>;
  embroideryThreadColor: string;
  embroideryStitchDensity: 'standard' | 'high_relief_3d';
  quantityBreakdown: {
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
    XXXL: number;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  color: ColorOption;
  collarStyle?: CollarStyle;
  customizationMethod: CustomizationMethod;
  artworks: Partial<Record<PrintLocation, ArtworkLayer>>;
  quantityBreakdown: {
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
    XXXL: number;
  };
  totalQuantity: number;
  unitPrice: number;
  totalPrice: number;
  thumbnailDataUrl?: string;
  addedAt: string;
}

export interface BulkQuoteRequest {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  estimatedQuantity: number;
  preferredProduct: string;
  customizationMethod: CustomizationMethod;
  notes: string;
}

export interface SwagBoxItem {
  id: string;
  name: string;
  category: string;
  price: number;
  selected: boolean;
  iconName: string;
  customizationNote: string;
}
