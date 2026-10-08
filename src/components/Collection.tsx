"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductItem, PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "./ProductCard";

export type { ProductItem };

interface CollectionProps {
  onInquirePiece: (product: ProductItem) => void;
  onOpenConcierge?: () => void;
}

export default function Collection({
  onInquirePiece,
  onOpenConcierge,
}: CollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");

  const filteredProducts = (
    selectedCategory === "All Collections"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory)
  ).slice(0, 6);

  return (
    <section
      className="w-full bg-surface py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80"
      id="collection"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with wide breathing room */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 lg:mb-20 pb-6 sm:pb-8 border-b border-borderdelicate/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium">
                Mesmerizing Artistry
              </span>
              <span className="text-mute/60">•</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
                The Archival Collections
              </span>
            </div>
            <h2 className="serif-display text-3xl sm:text-5xl text-espresso font-normal mb-3">
              The Archival Editions
            </h2>
            <p className="text-[14px] text-subdued max-w-xl font-light leading-relaxed">
              Silver-plated virgin brass is merely the prelude to an expansive
              repertoire of archival décor, sacred sanctuaries, and opulent
              lapidary craftsmanship.
            </p>
          </div>

          {/* Filter Tabs - Horizontal scrollable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pt-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 md:flex-wrap shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center justify-center ${
                  selectedCategory === cat
                    ? "bg-espresso text-alabaster shadow-sm"
                    : "bg-transparent border border-borderdelicate text-subdued hover:text-espresso hover:border-espresso"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid Reusing ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onInquire={onInquirePiece}
            />
          ))}
        </div>

        {/* Editorial Catalogue Citation */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-borderdelicate/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="serif-display text-2xl sm:text-3xl text-golddeep italic">
              200+
            </span>
            <p className="text-[13px] text-subdued max-w-xl font-light">
              Each season, Mesh ‘E’ Decor commissions over two hundred bespoke
              designs for high patrons and royal nuptials.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-medium text-alabaster bg-espresso px-6 py-3 hover:bg-[#2A2622] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Explore Full Catalogue</span>
              <span className="material-symbols-outlined text-[15px]">
                arrow_forward
              </span>
            </Link>
            <button
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-medium text-espresso hover:text-golddeep transition-colors border-b border-espresso hover:border-golddeep pb-1 min-h-[44px] cursor-pointer"
            >
              <span>Specification Dossier</span>
              <span className="material-symbols-outlined text-[15px]">
                arrow_outward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
