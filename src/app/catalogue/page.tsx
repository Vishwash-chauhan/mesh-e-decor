"use client";

import React, { useState, useMemo } from "react";
import TopStrip from "@/components/TopStrip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, ProductItem } from "@/data/products";

export default function CataloguePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "low-to-high" | "high-to-low" | "code">("featured");

  const handleOpenConcierge = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleInquirePiece = (product: ProductItem) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== "All Collections") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // Sort Products
    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === "code") {
      result.sort((a, b) => a.code.localeCompare(b.code));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-espresso font-light">
      {/* Top Banner Strip */}
      <TopStrip />

      {/* Main Sticky Header */}
      <Navbar onOpenConcierge={handleOpenConcierge} />

      {/* Catalogue Content */}
      <main className="w-full flex-grow">
        {/* Catalogue Editorial Hero Header */}
        <section className="w-full bg-canvas py-12 sm:py-16 border-b border-borderdelicate/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium">
                  Complete Archives
                </span>
                <span className="text-mute/60">•</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
                  Catalogue Edition 2026
                </span>
              </div>
              <h1 className="serif-display text-4xl sm:text-6xl text-espresso font-normal tracking-tight mb-4">
                The Archival Catalogue
              </h1>
              <p className="text-[14px] sm:text-[16px] text-subdued font-light leading-relaxed">
                Explore our full repertoire of silver-plated virgin brassware,
                mother-of-pearl lapidary, sacred sanctum kalashas, and bespoke boardroom specimens.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="mt-8 pt-8 border-t border-borderdelicate/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-grow max-w-md">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-mute text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by title, code (e.g. JGM-0076), or material..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-borderdelicate pl-10 pr-4 py-3 min-h-[44px] text-xs text-espresso placeholder:text-mute focus:outline-none focus:border-espresso transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-espresso text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.18em] text-mute whitespace-nowrap hidden sm:inline">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-surface border border-borderdelicate px-4 py-3 min-h-[44px] text-xs uppercase tracking-[0.15em] text-espresso focus:outline-none focus:border-espresso cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="code">Catalogue Code</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Main Products Grid & Category Navigation */}
        <section className="w-full bg-surface py-12 sm:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter Horizontal Strip */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-8 sm:mb-12 border-b border-borderdelicate/80 -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center justify-center ${
                    selectedCategory === cat
                      ? "bg-espresso text-alabaster shadow-sm"
                      : "bg-alabaster border border-borderdelicate text-subdued hover:text-espresso hover:border-espresso"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results Summary Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 text-[11px] uppercase tracking-[0.2em] text-mute border-b border-borderdelicate/40">
              <span>
                Showing {filteredAndSortedProducts.length} of {PRODUCTS.length} Specimen Pieces
              </span>
              {(selectedCategory !== "All Collections" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All Collections");
                    setSearchQuery("");
                  }}
                  className="text-golddeep hover:text-espresso underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <span className="serif-display text-2xl text-subdued mb-2 italic">
                  No matching artefacts found
                </span>
                <p className="text-[13px] text-mute mb-6 max-w-md">
                  We could not find any specimen matching "{searchQuery}". Please refine your search criteria or contact our concierge.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Collections");
                    setSearchQuery("");
                  }}
                  className="px-6 py-3 bg-espresso text-alabaster text-[10px] uppercase tracking-[0.2em] font-medium"
                >
                  View All Collections
                </button>
              </div>
            )}

            {/* Concierge Commission Banner */}
            <div className="mt-20 p-8 sm:p-12 bg-canvas border border-borderdelicate/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-2">
                  Bespoke Commissions
                </span>
                <h3 className="serif-display text-2xl sm:text-3xl text-espresso font-normal mb-2">
                  Unlisted Archival Specimen Inquiry
                </h3>
                <p className="text-[13px] text-subdued font-light leading-relaxed">
                  Seeking a historical design, custom size kalash, or specialized laser hallmark engraving for institutional gifting?
                </p>
              </div>
              <button
                onClick={handleOpenConcierge}
                className="px-8 py-4 bg-espresso text-alabaster hover:bg-[#2A2622] text-[11px] uppercase tracking-[0.24em] font-medium transition-all cursor-pointer whitespace-nowrap min-h-[48px] w-full md:w-auto text-center"
              >
                Inquire Private Concierge
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Bespoke Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
