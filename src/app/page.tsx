'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { Product, CartItem } from '@/types';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CustomizerStudio } from '@/components/CustomizerStudio';
import { ProductCatalog } from '@/components/ProductCatalog';
import { BulkPricingMatrix } from '@/components/BulkPricingMatrix';
import { PrintingTechComparison } from '@/components/PrintingTechComparison';
import { CorporateSwagBuilder } from '@/components/CorporateSwagBuilder';
import { CustomerProofShowcase } from '@/components/CustomerProofShowcase';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { BulkQuoteModal } from '@/components/BulkQuoteModal';
import { PincodeEstimatorModal } from '@/components/PincodeEstimatorModal';
import { SampleKitModal } from '@/components/SampleKitModal';

export default function Home() {
  // Selected product for the live Customizer Studio
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [isSampleKitModalOpen, setIsSampleKitModalOpen] = useState(false);

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [item, ...prev]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll Navigation Handlers
  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-studio');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSwag = () => {
    const el = document.getElementById('corporate-swag-builder');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    const el = document.getElementById('bulk-pricing-matrix');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP HEADER */}
      <Header
        cartCount={cartItems.reduce((acc, curr) => acc + curr.totalQuantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        onOpenPincodeModal={() => setIsPincodeModalOpen(true)}
        onNavigateToCustomizer={scrollToCustomizer}
        onNavigateToCatalog={scrollToCatalog}
        onNavigateToSwag={scrollToSwag}
        onNavigateToPricing={scrollToPricing}
      />

      {/* 2. HERO SECTION */}
      <main className="flex-1">
        <HeroSection
          onLaunchCustomizer={scrollToCustomizer}
          onExploreCatalog={scrollToCatalog}
          onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        />

        {/* 3. INTERACTIVE 3D/2D CUSTOMIZER STUDIO (Core Feature) */}
        <CustomizerStudio
          selectedProduct={selectedProduct}
          onAddToCart={handleAddToCart}
          onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        />

        {/* 4. PRODUCT CATALOG */}
        <ProductCatalog
          onSelectProductForCustomizer={(product) => {
            setSelectedProduct(product);
          }}
          onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        />

        {/* 5. BULK VOLUME PRICING MATRIX */}
        <BulkPricingMatrix
          onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
          onOpenSampleKitModal={() => setIsSampleKitModalOpen(true)}
        />

        {/* 6. PRINTING TECHNOLOGY COMPARISON */}
        <PrintingTechComparison />

        {/* 7. CORPORATE SWAG ONBOARDING BUILDER */}
        <CorporateSwagBuilder
          onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        />

        {/* 8. VERIFIED REVIEWS & FAQS */}
        <CustomerProofShowcase />
      </main>

      {/* 9. FOOTER */}
      <Footer
        onOpenBulkQuote={() => setIsBulkQuoteOpen(true)}
        onOpenSampleKitModal={() => setIsSampleKitModalOpen(true)}
        onOpenPincodeModal={() => setIsPincodeModalOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenBulkQuote={() => {
          setIsCartOpen(false);
          setIsBulkQuoteOpen(true);
        }}
      />

      <BulkQuoteModal
        isOpen={isBulkQuoteOpen}
        onClose={() => setIsBulkQuoteOpen(false)}
      />

      <PincodeEstimatorModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
      />

      <SampleKitModal
        isOpen={isSampleKitModalOpen}
        onClose={() => setIsSampleKitModalOpen(false)}
      />
    </div>
  );
}
