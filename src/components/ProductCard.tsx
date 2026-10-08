"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ProductItem;
  onInquire?: (product: ProductItem) => void;
  onQuickView?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  onInquire,
  onQuickView,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
    if (onInquire) {
      onInquire(product);
    }
  };

  return (
    <article className="group flex flex-col bg-transparent h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas border border-borderdelicate/80 mb-4 sm:mb-5">
        <Image
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          src={product.image}
          fill
          unoptimized
        />
        {/* Code Tag */}
        <div className="absolute top-3 left-3 bg-alabaster/95 backdrop-blur-xs px-2.5 py-1 border border-borderdelicate/60 text-[9px] uppercase tracking-[0.18em] text-golddeep font-medium shadow-xs">
          {product.code}
        </div>

        {/* Quick View Overlay Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 inset-x-3 bg-espresso/90 text-alabaster py-2 text-[10px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs hidden sm:flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Quick Dossier View</span>
            <span className="material-symbols-outlined text-[14px]">visibility</span>
          </button>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-[9px] uppercase tracking-[0.2em] text-mute mb-1 font-medium">
          {product.category}
        </span>
        <h3 className="serif-display text-xl sm:text-2xl text-espresso font-normal group-hover:text-golddeep transition-colors leading-snug mb-3">
          {product.name}
        </h3>

        {product.dimensions && (
          <p className="text-[11px] text-mute font-light mb-3 hidden sm:block">
            {product.dimensions}
          </p>
        )}

        <div className="pt-3.5 mt-auto flex items-center justify-between border-t border-borderdelicate/60 text-espresso">
          <span className="serif-display text-lg sm:text-xl font-normal">
            {product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`text-[10px] uppercase tracking-[0.2em] py-2 border-b transition-all cursor-pointer min-h-[44px] flex items-center gap-1 ${
              added
                ? "text-golddeep border-golddeep font-medium"
                : "text-espresso hover:text-golddeep border-espresso hover:border-golddeep"
            }`}
          >
            <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
