'use client';

import React, { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronUp, Plus, X, Filter, ArrowRight, Info } from 'lucide-react';
import { serviceCategories, filterTags } from '@/lib/mockData';
import type { ServiceCategory, ServiceCategoryId, SubService } from '@/lib/types';
import { useApp } from '@/context/AppContext';

// ============================================================
// SERVICES PAGE
// ============================================================
function ServicesPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCat = searchParams.get('cat') as ServiceCategoryId | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedCat, setExpandedCat] = useState<string | null>(initialCat);
  const [selectedService, setSelectedService] = useState<{ cat: ServiceCategory; service: SubService } | null>(null);

  // Scroll to opened category
  useEffect(() => {
    if (initialCat) {
      setExpandedCat(initialCat);
      setTimeout(() => {
        document.getElementById(`cat-${initialCat}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [initialCat]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results: { cat: ServiceCategory; service: SubService }[] = [];
    serviceCategories.forEach(cat => {
      cat.subServices.forEach(s => {
        if (s.name.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q) || (s.description?.toLowerCase().includes(q))) {
          results.push({ cat, service: s });
        }
      });
    });
    return results;
  }, [searchQuery]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (activeFilter === 'all') return serviceCategories;
    if (activeFilter === 'other') return serviceCategories.filter(c => !['digital', 'offset', 'signage', 'cutting', 'uv', 'fabrication', 'laser'].includes(c.filterTag));
    return serviceCategories.filter(c => c.filterTag === activeFilter);
  }, [activeFilter]);

  const toggleCat = useCallback((id: string) => {
    setExpandedCat(prev => prev === id ? null : id);
  }, []);

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '3rem 1.5rem 2rem', color: '#fff' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '0.5rem' }}>Our Services</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '1.75rem', maxWidth: 560 }}>
            11 service categories, 150+ printing and fabrication options. Search or filter to find exactly what you need.
          </p>

          {/* Search */}
          <div style={{ maxWidth: 520, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder='Search services... e.g. "Acrylic", "Vinyl", "Visiting Card"'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.9rem', color: 'var(--text)', background: 'transparent' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '0.75rem 1.5rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1.5rem', fontSize: '0.78rem', color: '#92400e', fontWeight: 600 }}>
          <span><Info size={13} style={{ display: 'inline', marginRight: 4 }} />Design charges extra</span>
          <span>• GST extra</span>
          <span>• Transportation charges extra</span>
          <span>• Installation charges extra</span>
          <span>• Bamboo scaffolding charges extra</span>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Search Results */}
        {searchResults !== null ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem' }}>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </h2>
              <button onClick={() => setSearchQuery('')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
                Clear search
              </button>
            </div>
            {searchResults.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-light)' }}>
                <Search size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                <p style={{ fontWeight: 600 }}>No services found</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Try a different search term</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
                {searchResults.map(({ cat, service }) => (
                  <SearchResultCard key={service.id} cat={cat} service={service} onSelect={() => setSelectedService({ cat, service })} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Filter size={16} style={{ color: 'var(--text-light)' }} />
              {filterTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setActiveFilter(tag.id)}
                  style={{
                    padding: '0.4rem 0.875rem',
                    borderRadius: 9999,
                    border: '1px solid',
                    borderColor: activeFilter === tag.id ? 'var(--brand-blue)' : 'var(--border)',
                    background: activeFilter === tag.id ? 'var(--brand-blue)' : '#fff',
                    color: activeFilter === tag.id ? '#fff' : 'var(--text)',
                    fontWeight: activeFilter === tag.id ? 600 : 500,
                    fontSize: '0.83rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Category Cards + Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {filteredCategories.map(cat => (
                <CategoryAccordion
                  key={cat.id}
                  category={cat}
                  isOpen={expandedCat === cat.id}
                  onToggle={() => toggleCat(cat.id)}
                  onSelectService={service => setSelectedService({ cat, service })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add to Quote Modal */}
      {selectedService && (
        <AddToQuoteModal
          category={selectedService.cat}
          service={selectedService.service}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading services...</div>}>
      <ServicesPageInner />
    </Suspense>
  );
}

// ============================================================
// CATEGORY ACCORDION
// ============================================================
function CategoryAccordion({
  category, isOpen, onToggle, onSelectService
}: {
  category: ServiceCategory;
  isOpen: boolean;
  onToggle: () => void;
  onSelectService: (s: SubService) => void;
}) {
  return (
    <div id={`cat-${category.id}`} className="accordion-item" style={{ borderRadius: 14, overflow: 'hidden', boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : 'none', transition: 'box-shadow 0.2s' }}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="accordion-header"
        style={{ width: '100%', textAlign: 'left', background: isOpen ? 'var(--brand-blue-light)' : '#fff' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <div style={{ flexShrink: 0, color: 'var(--brand-blue)' }}>{React.createElement(category.icon, { size: 28 })}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isOpen ? 'var(--brand-blue)' : 'var(--brand-dark)' }}>
                {category.name}
              </h3>
              <span style={{ fontSize: '0.72rem', background: isOpen ? 'var(--brand-blue)' : '#f3f4f6', color: isOpen ? '#fff' : 'var(--text-light)', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 600 }}>
                {category.count} options
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: 2, lineHeight: 1.5 }} className="hide-mobile">
              {category.description}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {isOpen ? <ChevronUp size={18} style={{ color: 'var(--brand-blue)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-light)' }} />}
        </div>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="accordion-body" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.625rem' }}>
            {category.subServices.map(service => (
              <div
                key={service.id}
                style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.875rem 1rem', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,86,219,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--brand-dark)', marginBottom: 2 }}>{service.name}</div>
                  {service.description && <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{service.description}</div>}
                  {service.startingPrice && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--brand-blue)', fontWeight: 600, marginTop: 2 }}>
                      Starting ₹{service.startingPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onSelectService(service)}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.75rem', background: 'var(--brand-blue-light)', color: 'var(--brand-blue)', border: '1px solid #bfdbfe', borderRadius: 8, fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  <Plus size={13} /> Add
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                // Request quote for whole category
                onSelectService({ id: category.id, name: `${category.name} (Multiple Services)` });
              }}
              className="btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}
            >
              Request Quote for This Category →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SEARCH RESULT CARD
// ============================================================
function SearchResultCard({ cat, service, onSelect }: { cat: ServiceCategory; service: SubService; onSelect: () => void }) {
  return (
    <div
      style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem 1.25rem', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', transition: 'border-color 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,86,219,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div>
        <div style={{ fontSize: '0.72rem', color: 'var(--brand-blue)', fontWeight: 600, marginBottom: 2 }}>
          <span style={{ display: 'inline-flex', verticalAlign: 'text-bottom', marginRight: '0.2rem' }}>{React.createElement(cat.icon, { size: 14 })}</span> {cat.name}
        </div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>{service.name}</div>
        {service.description && <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 2 }}>{service.description}</div>}
        {service.startingPrice && (
          <div style={{ fontSize: '0.78rem', color: 'var(--brand-blue)', fontWeight: 600, marginTop: 2 }}>
            From ₹{service.startingPrice.toLocaleString('en-IN')}
          </div>
        )}
      </div>
      <button
        onClick={onSelect}
        style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 0.875rem', background: 'var(--brand-blue)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        <Plus size={14} /> Add to Quote
      </button>
    </div>
  );
}

// ============================================================
// ADD TO QUOTE MODAL
// ============================================================
function AddToQuoteModal({ category, service, onClose }: {
  category: ServiceCategory;
  service: SubService;
  onClose: () => void;
}) {
  const { addToCart, setCartOpen } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [specs, setSpecs] = useState('');
  const [notes, setNotes] = useState('');
  const [designFile, setDesignFile] = useState<string>('');
  const [added, setAdded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart({
      categoryId: category.id,
      categoryName: category.name,
      serviceName: service.name,
      quantity,
      specifications: specs,
      notes,
      designFileName: designFile || undefined,
    });
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal animate-scale-in" style={{ maxWidth: 500 }}>
        {added ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.875rem' }}>✅</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Added to Quote Cart!</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              <strong>{service.name}</strong> has been added to your quote.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--brand-blue)', fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(category.icon, { size: 14 })} {category.name}
                </div>
                <h2 style={{ fontSize: '1.2rem', lineHeight: 1.25 }}>{service.name}</h2>
                {service.startingPrice && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: 4 }}>Starting from ₹{service.startingPrice.toLocaleString('en-IN')}</div>
                )}
              </div>
              <button onClick={onClose} style={{ padding: '0.375rem', border: '1px solid var(--border)', borderRadius: 8, background: '#f9fafb', cursor: 'pointer', flexShrink: 0 }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="qty">Quantity *</label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="specs">Specifications</label>
                <textarea
                  id="specs"
                  placeholder="Size, colour, finish, material, dimensions etc."
                  value={specs}
                  onChange={e => setSpecs(e.target.value)}
                  style={{ minHeight: 72 }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="design">Design File (optional)</label>
                <input
                  id="design"
                  type="text"
                  placeholder="Filename or describe your design (e.g. logo.ai)"
                  value={designFile}
                  onChange={e => setDesignFile(e.target.value)}
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  💡 You can share actual files via WhatsApp/email after submitting.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  placeholder="Any special requirements, urgency, delivery preferences..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ minHeight: 60 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Plus size={16} /> Add to Quote Cart
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
