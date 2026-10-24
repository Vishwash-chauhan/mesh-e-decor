"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductItem, PRODUCTS, CATEGORIES, matchesCategory } from "@/data/products";
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
  const [allProducts, setAllProducts] = useState<ProductItem[]>(PRODUCTS);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setAllProducts(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = (
    selectedCategory === "All Collections"
      ? allProducts
      : allProducts.filter((p) => matchesCategory(p, selectedCategory))
  ).slice(0, 8);

  return (
    <section
      className="w-full bg-surface py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80"
      id="collection"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium">
              Mesmerizing Artistry
            </span>
            <span className="text-mute/60">•</span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
              The Archival Collections
            </span>
          </div>
          <h2 className="serif-display text-3xl sm:text-5xl text-espresso font-normal mb-4">
            The Archival Editions
          </h2>
          <p className="text-[14px] sm:text-[15px] text-subdued max-w-xl mx-auto font-light leading-relaxed">
            Silver-plated virgin brass is merely the prelude to an expansive
            repertoire of archival décor, sacred sanctuaries, and opulent
            lapidary craftsmanship.
          </p>
        </div>

        {/* Elegant Minimalist Category Navigation Tabs */}
        <div className="flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar gap-4 sm:gap-8 pb-3 mb-12 sm:mb-16 border-b border-borderdelicate/80 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium transition-all cursor-pointer whitespace-nowrap border-b-2 -mb-[1px] ${
                selectedCategory === cat
                  ? "border-espresso text-espresso font-semibold"
                  : "border-transparent text-mute hover:text-espresso hover:border-borderdelicate"
              }`}
            >
              {cat}
            </button>
          ))}
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
              <span>Request Bespoke Inquiry</span>
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
