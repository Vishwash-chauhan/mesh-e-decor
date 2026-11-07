"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductItem, PRODUCTS, CATEGORIES, matchesCategory } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export type { ProductItem };

interface CollectionProps {
  onInquirePiece: (product: ProductItem) => void;
  onOpenConcierge?: () => void;
}

const HOME_CATEGORIES = [
  "Featured Collection",
  ...CATEGORIES.filter((c) => c !== "All Collections"),
];

export default function Collection({
  onInquirePiece,
  onOpenConcierge,
}: CollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Featured Collection");
  const [allProducts, setAllProducts] = useState<ProductItem[]>(PRODUCTS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ProductItem[] | null) => {
        if (cancelled || !data || !Array.isArray(data) || data.length === 0) {
          return;
        }
        setAllProducts((prev) => {
          if (
            prev.length === data.length &&
            prev.every(
              (p, i) =>
                p.id === data[i]?.id &&
                p.price === data[i]?.price &&
                p.featured === data[i]?.featured &&
                p.image === data[i]?.image
            )
          ) {
            return prev;
          }
          return data;
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredList = allProducts.filter((p) => p.featured);
  const filteredProducts = (
    selectedCategory === "Featured Collection"
      ? featuredList.length > 0
        ? featuredList
        : allProducts
      : allProducts.filter((p) => matchesCategory(p, selectedCategory))
  ).slice(0, 6);

  return (
    <section
      className="w-full bg-surface py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-borderdelicate/80 scroll-mt-16 sm:scroll-mt-20"
      id="collection"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium">
              Handcrafted Decor
            </span>
            <span className="text-mute/60">•</span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
              Signature Collections
            </span>
          </div>
          <h2 className="serif-display text-3xl sm:text-5xl text-espresso font-normal mb-4">
            Featured Collections
          </h2>
          <p className="text-[14px] sm:text-[15px] text-subdued max-w-xl mx-auto font-light leading-relaxed">
            Discover our fine silver-plated brassware, elegant centerpieces, and traditional decor handcrafted to bring warmth and timeless charm to your home.
          </p>
        </Reveal>

        {/* Elegant Minimalist Category Navigation Tabs */}
        <Reveal delayMs={100} className="flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar gap-4 sm:gap-8 pb-3 mb-12 sm:mb-16 border-b border-borderdelicate/80 -mx-4 px-4 sm:mx-0 sm:px-0">
          {HOME_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap border-b-2 -mb-[1px] ${
                selectedCategory === cat
                  ? "border-espresso text-espresso font-semibold"
                  : "border-transparent text-mute hover:text-espresso hover:border-borderdelicate"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Gallery Grid Reusing ProductCard */}
        <div
          key={selectedCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 animate-luxury-fade-in"
        >
          {filteredProducts.map((product, index) => (
            <Reveal key={product.id} delayMs={(index % 3) * 110}>
              <ProductCard
                product={product}
                onInquire={onInquirePiece}
              />
            </Reveal>
          ))}
        </div>

        {/* View All Products CTA */}
        <Reveal delayMs={120} className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href={
              selectedCategory === "Featured Collection"
                ? "/catalogue"
                : `/catalogue?category=${encodeURIComponent(selectedCategory)}`
            }
            className="luxury-cta-sheen group inline-flex items-center justify-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.26em] font-medium text-alabaster bg-espresso px-8 py-4 hover:bg-golddeep transition-all duration-300 cursor-pointer min-h-[48px] shadow-sm active:scale-[0.99]"
          >
            <span>View All Products</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">
              arrow_forward
            </span>
          </Link>
        </Reveal>

        {/* Editorial Catalogue Citation */}
        <Reveal delayMs={160} className="mt-12 sm:mt-16 pt-8 border-t border-borderdelicate/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="serif-display text-2xl sm:text-3xl text-golddeep italic">
              200+
            </span>
            <p className="text-[13px] text-subdued max-w-xl font-light">
              Every year, Mesh ‘E’ Decor crafts over two hundred custom
              designs for weddings, family occasions, and corporate gifting.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={onOpenConcierge}
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-medium text-espresso hover:text-golddeep transition-colors border-b border-espresso hover:border-golddeep pb-1 min-h-[44px] cursor-pointer"
            >
              <span>Custom Order Inquiry</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                arrow_outward
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
