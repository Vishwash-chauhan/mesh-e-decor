"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ProductItem;
  onInquire?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  onInquire,
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

  const productUrl = `/products/${product.code}`;

  return (
    <article className="group flex flex-col bg-transparent h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
      <Link
        href={productUrl}
        className="relative aspect-square overflow-hidden bg-canvas border border-borderdelicate/80 group-hover:border-goldaccent/80 group-hover:shadow-[0_18px_40px_-15px_rgba(22,20,18,0.14)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] mb-4 sm:mb-5 block"
      >
        <Image
          alt={product.code}
          className="w-full h-full object-cover object-center group-hover:scale-[1.045] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          src={product.image}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          quality={75}
          unoptimized={
            product.image.startsWith("data:") ||
            product.image.startsWith("/api/products/")
          }
        />
        {/* Subtle bottom luxury hover veil */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-espresso/45 via-espresso/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end justify-between px-3.5 pb-3">
          <span className="text-[9px] uppercase tracking-[0.22em] text-alabaster/95 font-medium translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            View Product
          </span>
          <span className="material-symbols-outlined text-[14px] text-goldaccent translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            arrow_outward
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-grow">
        <span className="text-[9px] uppercase tracking-[0.2em] text-mute mb-1 font-medium transition-colors duration-300 group-hover:text-golddeep">
          {product.category}
        </span>
        <Link href={productUrl}>
          <h3 className="serif-display text-xl sm:text-2xl text-espresso font-normal group-hover:text-golddeep transition-colors duration-300 leading-snug mb-3">
            {product.code}
          </h3>
        </Link>


        <div className="pt-3.5 mt-auto flex items-center justify-between border-t border-borderdelicate/60 group-hover:border-goldaccent/50 transition-colors duration-500 text-espresso">
          <span className="serif-display text-lg sm:text-xl font-normal">
            {product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`text-[10px] uppercase tracking-[0.2em] py-2 border-b transition-all duration-300 cursor-pointer min-h-[44px] flex items-center gap-1 active:scale-95 ${
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
